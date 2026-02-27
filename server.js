// Study With Prof Dudu - Backend Server
// =====================================

const express = require('express');
const cors    = require('cors');
const fs      = require('fs');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 8080;

// ─── Data files ───────────────────────────────────────────────────────────────
const DATA_DIR     = path.join(__dirname, 'data');
const USERS_FILE   = path.join(DATA_DIR, 'users.json');
const RESULTS_FILE = path.join(DATA_DIR, 'results.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(USERS_FILE))   fs.writeFileSync(USERS_FILE,   '[]');
if (!fs.existsSync(RESULTS_FILE)) fs.writeFileSync(RESULTS_FILE, '[]');

function readUsers()        { try { return JSON.parse(fs.readFileSync(USERS_FILE,   'utf8')); } catch(_){ return []; } }
function saveUsers(u)       { fs.writeFileSync(USERS_FILE,   JSON.stringify(u, null, 2)); }
function readResults()      { try { return JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8')); } catch(_){ return []; } }
function saveResults(r)     { fs.writeFileSync(RESULTS_FILE, JSON.stringify(r, null, 2)); }

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.get('/',           (_req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/admin.html', (_req, res) => res.sendFile(path.join(__dirname, 'admin.html')));

// ─── Maintenance mode ─────────────────────────────────────────────────────────
app.use((req, res, next) => {
    if (process.env.MAINTENANCE !== 'true') return next();
    if (req.path.startsWith('/api/secret/')) return next();
    if (req.path.startsWith('/api/'))
        return res.status(503).json({ success: false, message: 'Site under maintenance.' });
    res.status(503).send(`<h2 style="font-family:sans-serif;text-align:center;margin-top:20vh">
        Temporarily closed for maintenance. Please check back soon.</h2>`);
});

// ─── Secret export ────────────────────────────────────────────────────────────
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'profdudu2025secret';

app.get('/api/secret/export', (req, res) => {
    if (req.query.key !== ADMIN_SECRET)
        return res.status(401).json({ success: false, message: 'Invalid key' });
    res.json({
        exportDate: new Date().toISOString(),
        users:   readUsers().map(({ password, ...u }) => u),
        results: readResults()
    });
});

app.get('/api/secret/export-csv', (req, res) => {
    if (req.query.key !== ADMIN_SECRET)
        return res.status(401).json({ success: false, message: 'Invalid key' });
    let csv = 'Name,Email,Category,Score,Total,Percentage,Time(min),Date\n';
    readResults().forEach(r => {
        csv += `"${r.userName}","${r.userEmail}","${r.category}",${r.totalScore},${r.totalQuestions},${r.percentage}%,${r.timeSpent||'N/A'},"${r.date}"\n`;
    });
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=quiz_results.csv');
    res.send(csv);
});

// ─── User routes ──────────────────────────────────────────────────────────────
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ success: false, message: 'All fields are required' });

    const users = readUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
        return res.status(400).json({ success: false, message: 'Email already registered' });

    users.push({
        id: Date.now(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        registeredDate: new Date().toISOString(),
        quizAttempted: false,
        category: null
    });
    saveUsers(users);
    res.json({ success: true, message: 'Registration successful' });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ success: false, message: 'Email and password are required' });

    const user = readUsers().find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user)
        return res.status(401).json({ success: false, message: 'Invalid email or password' });

    const { password: _, ...safe } = user;
    res.json({ success: true, user: safe });
});

app.get('/api/users', (_req, res) => {
    res.json(readUsers().map(({ password, ...u }) => u));
});

app.get('/api/users/:id', (req, res) => {
    const user = readUsers().find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const { password, ...safe } = user;
    res.json(safe);
});

app.post('/api/users/:id/category', (req, res) => {
    const users = readUsers();
    const i = users.findIndex(u => u.id === parseInt(req.params.id));
    if (i === -1) return res.status(404).json({ success: false, message: 'User not found' });
    users[i].category = req.body.category;
    saveUsers(users);
    res.json({ success: true });
});

app.post('/api/users/:id/reset', (req, res) => {
    const users = readUsers();
    const id = parseInt(req.params.id);
    const i = users.findIndex(u => u.id === id);
    if (i === -1) return res.status(404).json({ success: false, message: 'User not found' });
    users[i].quizAttempted = false;
    users[i].category = null;
    saveUsers(users);
    saveResults(readResults().filter(r => r.userId !== id));
    res.json({ success: true, message: 'User reset successfully' });
});

app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    saveUsers(readUsers().filter(u => u.id !== id));
    saveResults(readResults().filter(r => r.userId !== id));
    res.json({ success: true, message: 'User deleted' });
});

// ─── Results routes ───────────────────────────────────────────────────────────
app.post('/api/results', (req, res) => {
    const result = req.body;
    if (!result.userId || !result.category)
        return res.status(400).json({ success: false, message: 'Invalid result data' });

    const results = readResults();
    if (results.find(r => r.userId === result.userId))
        return res.status(400).json({ success: false, message: 'Quiz already submitted' });

    results.push(result);
    saveResults(results);

    const users = readUsers();
    const i = users.findIndex(u => u.id === result.userId);
    if (i !== -1) { users[i].quizAttempted = true; saveUsers(users); }

    res.json({ success: true, message: 'Results saved' });
});

app.get('/api/results',          (_req, res) => res.json(readResults()));

app.get('/api/results/:userId', (req, res) => {
    const result = readResults().find(r => r.userId === parseInt(req.params.userId));
    res.json(result || null);
});

app.delete('/api/results/:userId', (req, res) => {
    saveResults(readResults().filter(r => r.userId !== parseInt(req.params.userId)));
    res.json({ success: true, message: 'Result deleted' });
});

// ─── Admin routes ─────────────────────────────────────────────────────────────
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123')
        return res.json({ success: true, message: 'Admin login successful' });
    res.status(401).json({ success: false, message: 'Invalid admin credentials' });
});

app.get('/api/admin/stats', (_req, res) => {
    const results = readResults();
    const avg = cat => {
        const r = results.filter(x => x.category === cat);
        return r.length ? Math.round(r.reduce((s, x) => s + x.percentage, 0) / r.length) : 0;
    };
    res.json({
        totalStudents:      readUsers().length,
        completedQuizzes:   results.length,
        scienceStudents:    results.filter(r => r.category === 'science').length,
        artsStudents:       results.filter(r => r.category === 'arts').length,
        commercialStudents: results.filter(r => r.category === 'commercial').length,
        avgScienceScore:    avg('science'),
        avgArtsScore:       avg('arts'),
        avgCommercialScore: avg('commercial')
    });
});

app.get('/api/admin/export', (_req, res) => {
    res.setHeader('Content-Disposition', 'attachment; filename=quiz_results.json');
    res.json(readResults());
});

app.post('/api/admin/clear-all', (_req, res) => {
    saveUsers([]);
    saveResults([]);
    res.json({ success: true, message: 'All data cleared' });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running → http://localhost:${PORT}`);
    console.log(`Admin panel  → http://localhost:${PORT}/admin.html`);
});

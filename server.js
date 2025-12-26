// Study With Prof Dudu - Backend Server
// =====================================

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Data file paths
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const RESULTS_FILE = path.join(DATA_DIR, 'results.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize data files if they don't exist
if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}
if (!fs.existsSync(RESULTS_FILE)) {
    fs.writeFileSync(RESULTS_FILE, JSON.stringify([]));
}

// Maintenance lock file path - if this file exists, the app is locked
const MAINT_LOCK = path.join(DATA_DIR, 'LOCK');

function isMaintenanceMode() {
        // Also allow env var to enable maintenance mode
        if (process.env.MAINTENANCE === 'true') return true;
        return fs.existsSync(MAINT_LOCK);
}

// Middleware to block access when in maintenance mode
app.use((req, res, next) => {
        if (!isMaintenanceMode()) return next();

        // If request is for API, return JSON 503
        if (req.path.startsWith('/api/')) {
                return res.status(503).json({ success: false, message: 'Service temporarily unavailable. The site is under maintenance.' });
        }

        // For static/html requests, serve a friendly maintenance page
        const maintenanceHtml = `<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>Site Under Maintenance</title>
        <style>
            body { font-family: Arial, sans-serif; background:#f4f6f8; color:#333; display:flex; align-items:center; justify-content:center; height:100vh; margin:0 }
            .card { background:white; padding:28px; border-radius:10px; box-shadow:0 6px 18px rgba(0,0,0,0.08); text-align:center; max-width:520px }
            h1{ margin:0 0 10px }
            p{ color:#555 }
            small{ color:#888 }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>We'll be back soon</h1>
            <p>The Study With Prof Dudu quiz portal is temporarily closed for maintenance.</p>
            <p>Please check back later. If you are the administrator and want to re-open the site, remove the file <code>data/LOCK</code> or set the environment variable <code>MAINTENANCE=false</code>.</p>
            <small>Contact the site owner to request access.</small>
        </div>
    </body>
</html>`;

        res.status(503).send(maintenanceHtml);
});

// Helper functions
function readUsers() {
    try {
        return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    } catch (err) {
        return [];
    }
}

function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function readResults() {
    try {
        return JSON.parse(fs.readFileSync(RESULTS_FILE, 'utf8'));
    } catch (err) {
        return [];
    }
}

function saveResults(results) {
    fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));
}

// =====================================
// API ROUTES
// =====================================

// ----- USER ROUTES -----

// Register new user
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const users = readUsers();

    // Check if email already exists
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    const newUser = {
        id: Date.now(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password, // In production, hash this!
        registeredDate: new Date().toISOString(),
        quizAttempted: false,
        category: null
    };

    users.push(newUser);
    saveUsers(users);

    res.json({ success: true, message: 'Registration successful' });
});

// Login user
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const users = readUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Don't send password to client
    const { password: _, ...userWithoutPassword } = user;
    res.json({ success: true, user: userWithoutPassword });
});

// Get all users (for admin)
app.get('/api/users', (req, res) => {
    const users = readUsers();
    // Remove passwords before sending
    const safeUsers = users.map(({ password, ...user }) => user);
    res.json(safeUsers);
});

// Delete user
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    let users = readUsers();
    let results = readResults();

    users = users.filter(u => u.id !== userId);
    results = results.filter(r => r.userId !== userId);

    saveUsers(users);
    saveResults(results);

    res.json({ success: true, message: 'User deleted' });
});

// Reset user quiz attempt
app.post('/api/users/:id/reset', (req, res) => {
    const userId = parseInt(req.params.id);
    const users = readUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    users[userIndex].quizAttempted = false;
    users[userIndex].category = null;
    saveUsers(users);

    // Also remove any results for this user
    let results = readResults();
    results = results.filter(r => r.userId !== userId);
    saveResults(results);

    res.json({ success: true, message: 'User reset successfully' });
});

// Update user category (when starting quiz)
app.post('/api/users/:id/category', (req, res) => {
    const userId = parseInt(req.params.id);
    const { category } = req.body;

    const users = readUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    users[userIndex].category = category;
    saveUsers(users);

    res.json({ success: true });
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const users = readUsers();
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
});

// ----- RESULTS ROUTES -----

// Submit quiz results
app.post('/api/results', (req, res) => {
    const result = req.body;

    if (!result.userId || !result.category) {
        return res.status(400).json({ success: false, message: 'Invalid result data' });
    }

    const results = readResults();

    // Check if user already has a result
    if (results.find(r => r.userId === result.userId)) {
        return res.status(400).json({ success: false, message: 'Quiz already submitted' });
    }

    results.push(result);
    saveResults(results);

    // Update user's quizAttempted status
    const users = readUsers();
    const userIndex = users.findIndex(u => u.id === result.userId);
    if (userIndex !== -1) {
        users[userIndex].quizAttempted = true;
        saveUsers(users);
    }

    res.json({ success: true, message: 'Results saved' });
});

// Get all results (for admin)
app.get('/api/results', (req, res) => {
    const results = readResults();
    res.json(results);
});

// Get result by user ID
app.get('/api/results/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const results = readResults();
    const result = results.find(r => r.userId === userId);

    if (result) {
        res.json(result);
    } else {
        res.json(null);
    }
});

// Delete result
app.delete('/api/results/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    let results = readResults();
    results = results.filter(r => r.userId !== userId);
    saveResults(results);

    res.json({ success: true, message: 'Result deleted' });
});

// ----- ADMIN ROUTES -----

// Admin login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;

    // Admin credentials (in production, use proper authentication)
    if (username === 'admin' && password === 'admin123') {
        res.json({ success: true, message: 'Admin login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }
});

// Get dashboard stats
app.get('/api/admin/stats', (req, res) => {
    const users = readUsers();
    const results = readResults();

    const scienceResults = results.filter(r => r.category === 'science');
    const artsResults = results.filter(r => r.category === 'arts');

    const avgScience = scienceResults.length > 0
        ? Math.round(scienceResults.reduce((sum, r) => sum + r.percentage, 0) / scienceResults.length)
        : 0;

    const avgArts = artsResults.length > 0
        ? Math.round(artsResults.reduce((sum, r) => sum + r.percentage, 0) / artsResults.length)
        : 0;

    res.json({
        totalStudents: users.length,
        completedQuizzes: results.length,
        scienceStudents: scienceResults.length,
        artsStudents: artsResults.length,
        avgScienceScore: avgScience,
        avgArtsScore: avgArts
    });
});

// Export results as JSON (for download)
app.get('/api/admin/export', (req, res) => {
    const results = readResults();
    res.setHeader('Content-Disposition', 'attachment; filename=quiz_results.json');
    res.json(results);
});

// Clear all data (for admin reset)
app.post('/api/admin/clear-all', (req, res) => {
    saveUsers([]);
    saveResults([]);
    res.json({ success: true, message: 'All data cleared' });
});

// =====================================
// START SERVER
// =====================================

app.listen(PORT, '0.0.0.0', () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║          Study With Prof Dudu - Quiz Server                ║
╠════════════════════════════════════════════════════════════╣
║  Server running on:                                        ║
║  • Local:   http://localhost:${PORT}                         ║
║  • Network: http://0.0.0.0:${PORT}                           ║
╠════════════════════════════════════════════════════════════╣
║  Quiz Portal:  http://localhost:${PORT}                      ║
║  Admin Panel:  http://localhost:${PORT}/admin.html           ║
╚════════════════════════════════════════════════════════════╝
    `);
});

// Study With Prof Dudu — Admin Dashboard JS
const API_BASE = '';
let confirmCallback = null;

// ── API ───────────────────────────────────────────────────────────────────────
async function apiCall(endpoint, method = 'GET', data = null) {
    const opts = { method, headers: { 'Content-Type': 'application/json' } };
    if (data) opts.body = JSON.stringify(data);
    const res  = await fetch(API_BASE + endpoint, opts);
    const text = await res.text();
    try { const j = JSON.parse(text); if (!res.ok) throw new Error(j.message || 'Error'); return j; }
    catch(e) { if (e.message !== 'Error') throw new Error('Server error'); throw e; }
}

// ── Toast ─────────────────────────────────────────────────────────────────────
function toast(msg, type = 'success') {
    const el = document.getElementById('adminToast');
    el.className = `toast align-items-center border-0 text-white bg-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'warning'}`;
    document.getElementById('adminToastMessage').textContent = msg;
    bootstrap.Toast.getOrCreateInstance(el, { delay: 3000 }).show();
}

// ── Auth ──────────────────────────────────────────────────────────────────────
async function adminLogin() {
    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value;
    try {
        await apiCall('/api/admin/login', 'POST', { username, password });
        sessionStorage.setItem('adminLoggedIn', '1');
        document.getElementById('adminLoginSection').classList.add('d-none');
        document.getElementById('adminDashboard').classList.remove('d-none');
        toast('Welcome back, Admin!');
        showSection('dashboard');
    } catch(e) { toast('Invalid credentials', 'error'); }
}

function adminLogout() {
    sessionStorage.removeItem('adminLoggedIn');
    document.getElementById('adminDashboard').classList.add('d-none');
    document.getElementById('adminLoginSection').classList.remove('d-none');
}

// ── Navigation ────────────────────────────────────────────────────────────────
const SECTIONS = ['dashboard','all','science','arts','commercial','students'];

function showSection(name) {
    SECTIONS.forEach(s => {
        const el = document.getElementById('sec-'+s);
        const btn = document.getElementById('nav-'+s);
        if (el)  el.classList.toggle('d-none', s !== name);
        if (btn) btn.classList.toggle('active', s === name);
    });
    const loaders = {
        dashboard:  loadDashboard,
        all:        loadAllResults,
        science:    () => loadCategoryResults('science'),
        arts:       () => loadCategoryResults('arts'),
        commercial: () => loadCategoryResults('commercial'),
        students:   loadStudents
    };
    if (loaders[name]) loaders[name]();
    // close mobile sidebar
    document.getElementById('sidebar').classList.remove('open');
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmtDate(d) {
    if (!d) return '—';
    return new Date(d).toLocaleString('en-GB', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
}

function pctBadge(pct) {
    const cls = pct >= 70 ? 'bg-success' : pct >= 50 ? 'bg-warning text-dark' : 'bg-danger';
    return `<span class="badge ${cls}">${pct}%</span>`;
}

function catBadge(cat) {
    const map = { science:'badge-science', arts:'badge-arts', commercial:'badge-commercial' };
    return `<span class="badge ${map[cat]||'bg-secondary'}">${(cat||'').toUpperCase()}</span>`;
}

function scoreBadge(score, total) {
    return `<strong>${score}</strong><span class="text-muted">/${total}</span>`;
}

function initials(name) {
    return (name||'?').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
async function loadDashboard() {
    try {
        const [stats, results] = await Promise.all([apiCall('/api/admin/stats'), apiCall('/api/results')]);

        document.getElementById('totalStudents').textContent     = stats.totalStudents;
        document.getElementById('completedQuizzes').textContent  = stats.completedQuizzes;
        document.getElementById('scienceStudents').textContent   = stats.scienceStudents;
        document.getElementById('artsStudents').textContent      = stats.artsStudents;
        document.getElementById('commercialStudents').textContent= stats.commercialStudents || 0;

        const avgs = [stats.avgScienceScore, stats.avgArtsScore, stats.avgCommercialScore||0].filter(Boolean);
        const overall = avgs.length ? Math.round(avgs.reduce((a,b)=>a+b,0)/avgs.length) : 0;
        document.getElementById('overallAvg').textContent = overall ? overall+'%' : '—';

        const setAvg = (id, barId, val) => {
            document.getElementById(id).textContent   = val ? val+'%' : '—';
            document.getElementById(barId).style.width = val ? val+'%' : '0';
        };
        setAvg('avgScienceScore',    'avgScienceBar',    stats.avgScienceScore);
        setAvg('avgArtsScore',       'avgArtsBar',       stats.avgArtsScore);
        setAvg('avgCommercialScore', 'avgCommercialBar', stats.avgCommercialScore||0);

        // Top performers
        const top = document.getElementById('topPerformers');
        if (results.length) {
            const sorted = [...results].sort((a,b)=>b.percentage-a.percentage).slice(0,5);
            top.innerHTML = sorted.map((r,i) => {
                const medal = ['🥇','🥈','🥉'][i] || `${i+1}.`;
                return `<div class="d-flex align-items-center gap-2 mb-2">
                    <span style="font-size:1.1rem">${medal}</span>
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between">
                            <span class="fw-semibold" style="font-size:.875rem">${r.userName}</span>
                            ${pctBadge(r.percentage)}
                        </div>
                        <div class="perf-bar mt-1"><div class="perf-fill ${r.percentage>=70?'bg-success':r.percentage>=50?'bg-warning':'bg-danger'}" style="width:${r.percentage}%"></div></div>
                    </div>
                </div>`;
            }).join('');
        } else { top.innerHTML = '<p class="text-muted">No results yet</p>'; }

        // Recent
        const tbody = document.getElementById('recentResultsTable');
        if (results.length) {
            const recent = [...results].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,10);
            tbody.innerHTML = recent.map(r => `<tr>
                <td><span class="avatar bg-primary bg-opacity-10 text-primary">${initials(r.userName)}</span> ${r.userName}</td>
                <td class="text-muted" style="font-size:.8rem">${r.userEmail}</td>
                <td>${catBadge(r.category)}</td>
                <td>${scoreBadge(r.totalScore, r.totalQuestions)}</td>
                <td>${pctBadge(r.percentage)}</td>
                <td class="text-muted" style="font-size:.8rem">${fmtDate(r.date)}</td>
            </tr>`).join('');
        } else { tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">No results yet</td></tr>'; }

    } catch(e) { toast('Failed to load dashboard', 'error'); }
}

// ── All Results ───────────────────────────────────────────────────────────────
let _allResults = [];

async function loadAllResults() {
    try {
        _allResults = await apiCall('/api/results');
        renderAllResults(_allResults);
    } catch(e) { toast('Failed to load results', 'error'); }
}

function renderAllResults(results) {
    const tb = document.getElementById('allResultsTable');
    if (!results.length) { tb.innerHTML = '<tr><td colspan="9" class="text-center text-muted py-4">No results yet</td></tr>'; return; }
    tb.innerHTML = results.map((r,i) => `<tr>
        <td class="text-muted">${i+1}</td>
        <td>${r.userName}</td>
        <td class="text-muted" style="font-size:.8rem">${r.userEmail}</td>
        <td>${catBadge(r.category)}</td>
        <td>${scoreBadge(r.totalScore, r.totalQuestions)}</td>
        <td>${pctBadge(r.percentage)}</td>
        <td class="text-muted">${r.timeSpent||'—'} min</td>
        <td class="text-muted" style="font-size:.8rem">${fmtDate(r.date)}</td>
        <td>
            <button class="btn btn-sm btn-outline-primary py-0" onclick="viewDetails(${r.userId})"><i class="fas fa-eye"></i></button>
            <button class="btn btn-sm btn-outline-danger py-0 ms-1" onclick="deleteResultConfirm(${r.userId},'${r.userName}')"><i class="fas fa-trash"></i></button>
        </td>
    </tr>`).join('');
}

function filterResults() {
    const q   = document.getElementById('searchInput').value.toLowerCase();
    const cat = document.getElementById('categoryFilter').value;
    const sc  = document.getElementById('scoreFilter').value;
    let res   = [..._allResults];
    if (q)   res = res.filter(r => r.userName.toLowerCase().includes(q) || r.userEmail.toLowerCase().includes(q));
    if (cat) res = res.filter(r => r.category === cat);
    if (sc === 'below50') res = res.filter(r => r.percentage < 50);
    else if (sc) res = res.filter(r => r.percentage >= +sc);
    renderAllResults(res);
}

// ── Category Results ──────────────────────────────────────────────────────────
const CAT_COLS = {
    science:    ['maths','english','physics','biology','chemistry'],
    arts:       ['maths','english','literature','government','crs'],
    commercial: ['maths','english','economics','commerce','accounting']
};

async function loadCategoryResults(cat) {
    try {
        const all  = await apiCall('/api/results');
        const data = all.filter(r => r.category === cat);
        const tb   = document.getElementById(`${cat}ResultsTable`);
        const cols = CAT_COLS[cat];

        if (!data.length) {
            tb.innerHTML = `<tr><td colspan="${cols.length+6}" class="text-center text-muted py-4">No ${cat} results yet</td></tr>`;
            return;
        }
        tb.innerHTML = data.map((r,i) => `<tr>
            <td class="text-muted">${i+1}</td>
            <td>${r.userName}</td>
            <td class="text-muted" style="font-size:.8rem">${r.userEmail}</td>
            ${cols.map(s => `<td>${r.subjectScores?.[s]??'—'}/20</td>`).join('')}
            <td><strong>${r.totalScore}/${r.totalQuestions}</strong></td>
            <td>${pctBadge(r.percentage)}</td>
            <td class="text-muted" style="font-size:.8rem">${fmtDate(r.date)}</td>
        </tr>`).join('');
    } catch(e) { toast('Failed to load results', 'error'); }
}

// ── Students ──────────────────────────────────────────────────────────────────
async function loadStudents() {
    try {
        const [users, results] = await Promise.all([apiCall('/api/users'), apiCall('/api/results')]);
        const tb = document.getElementById('studentsTable');
        if (!users.length) { tb.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-4">No students registered</td></tr>'; return; }
        tb.innerHTML = users.map((u,i) => {
            const res = results.find(r => r.userId === u.id);
            const status = res ? '<span class="badge bg-success">Completed</span>'
                : u.category ? '<span class="badge bg-warning text-dark">In Progress</span>'
                : '<span class="badge bg-secondary">Not Started</span>';
            return `<tr>
                <td class="text-muted">${i+1}</td>
                <td><span class="avatar me-2" style="background:#f1f5f9;color:#6366f1">${initials(u.name)}</span>${u.name}</td>
                <td class="text-muted" style="font-size:.8rem">${u.email}</td>
                <td class="text-muted" style="font-size:.8rem">${fmtDate(u.registeredDate)}</td>
                <td>${status}</td>
                <td>${u.category ? catBadge(u.category) : '<span class="text-muted">—</span>'}</td>
                <td>
                    ${res ? `<button class="btn btn-sm btn-outline-primary py-0 me-1" onclick="viewDetails(${u.id})"><i class="fas fa-eye"></i></button>` : ''}
                    <button class="btn btn-sm btn-outline-warning py-0 me-1" onclick="resetStudentConfirm(${u.id},'${u.name}')"><i class="fas fa-undo"></i></button>
                    <button class="btn btn-sm btn-outline-danger py-0" onclick="deleteStudentConfirm(${u.id},'${u.name}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
        }).join('');
    } catch(e) { toast('Failed to load students', 'error'); }
}

// ── View Details ──────────────────────────────────────────────────────────────
async function viewDetails(userId) {
    try {
        const [user, result] = await Promise.all([apiCall(`/api/users/${userId}`), apiCall(`/api/results/${userId}`)]);
        const body = document.getElementById('detailsBody');
        body.innerHTML = `
            <div class="row g-3 p-2">
                <div class="col-sm-6">
                    <p class="text-muted mb-1" style="font-size:.75rem">FULL NAME</p>
                    <p class="fw-semibold mb-0">${user.name}</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-1" style="font-size:.75rem">EMAIL</p>
                    <p class="fw-semibold mb-0">${user.email}</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-1" style="font-size:.75rem">REGISTERED</p>
                    <p class="fw-semibold mb-0">${fmtDate(user.registeredDate)}</p>
                </div>
                <div class="col-sm-6">
                    <p class="text-muted mb-1" style="font-size:.75rem">STATUS</p>
                    <p class="mb-0">${user.quizAttempted ? '<span class="badge bg-success">Completed</span>' : '<span class="badge bg-secondary">Pending</span>'}</p>
                </div>
                ${result ? `
                <div class="col-12"><hr class="my-1"></div>
                <div class="col-sm-3 text-center">
                    <div class="stat-card sc-total p-3"><p style="font-size:.7rem">SCORE</p><h3>${result.totalScore}/${result.totalQuestions}</h3></div>
                </div>
                <div class="col-sm-3 text-center">
                    <div class="stat-card ${result.percentage>=70?'sc-commercial':result.percentage>=50?'sc-arts':'sc-completed'} p-3"><p style="font-size:.7rem">PERCENTAGE</p><h3>${result.percentage}%</h3></div>
                </div>
                <div class="col-sm-3 text-center">
                    <div class="stat-card sc-science p-3"><p style="font-size:.7rem">TIME SPENT</p><h3>${result.timeSpent||'—'} min</h3></div>
                </div>
                <div class="col-sm-3 text-center">
                    <div class="stat-card" style="background:linear-gradient(135deg,#64748b,#94a3b8);color:#fff;border-radius:16px;padding:16px;"><p style="font-size:.7rem">CATEGORY</p><h3 style="font-size:1rem">${(result.category||'').toUpperCase()}</h3></div>
                </div>
                <div class="col-12">
                    <p class="fw-semibold mb-2">Subject Breakdown</p>
                    ${Object.entries(result.subjectScores||{}).map(([s,sc]) => `
                        <div class="d-flex align-items-center gap-2 mb-2">
                            <span style="width:110px;font-size:.8rem;text-transform:capitalize">${s}</span>
                            <div class="perf-bar flex-grow-1"><div class="perf-fill bg-primary" style="width:${Math.round(sc/(result.subjectTotals?.[s]||20)*100)}%"></div></div>
                            <span style="font-size:.8rem;width:50px;text-align:right">${sc}/${result.subjectTotals?.[s]||20}</span>
                        </div>`).join('')}
                </div>` : '<div class="col-12"><p class="text-muted text-center py-2">No quiz result yet</p></div>'}
            </div>`;
        bootstrap.Modal.getOrCreateInstance(document.getElementById('detailsModal')).show();
    } catch(e) { toast('Failed to load details', 'error'); }
}

// ── Confirm helpers ───────────────────────────────────────────────────────────
function showConfirm(title, msg, cb) {
    document.getElementById('confirmTitle').textContent   = title;
    document.getElementById('confirmMessage').textContent = msg;
    confirmCallback = cb;
    bootstrap.Modal.getOrCreateInstance(document.getElementById('confirmModal')).show();
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('confirmBtn').onclick = () => {
        bootstrap.Modal.getInstance(document.getElementById('confirmModal')).hide();
        if (confirmCallback) confirmCallback();
    };
    if (sessionStorage.getItem('adminLoggedIn')) {
        document.getElementById('adminLoginSection').classList.add('d-none');
        document.getElementById('adminDashboard').classList.remove('d-none');
        showSection('dashboard');
    }
});

function deleteResultConfirm(userId, name) {
    showConfirm('Delete Result', `Delete quiz result for "${name}"?`, async () => {
        await apiCall(`/api/results/${userId}`, 'DELETE');
        toast('Result deleted'); loadAllResults();
    });
}
function deleteStudentConfirm(userId, name) {
    showConfirm('Delete Student', `Delete student "${name}" and all their data?`, async () => {
        await apiCall(`/api/users/${userId}`, 'DELETE');
        toast('Student deleted'); loadStudents();
    });
}
function resetStudentConfirm(userId, name) {
    showConfirm('Reset Student', `Reset quiz attempt for "${name}"? They can retake the quiz.`, async () => {
        await apiCall(`/api/users/${userId}/reset`, 'POST');
        toast('Student reset'); loadStudents();
    });
}
function confirmClearAll() {
    showConfirm('Clear ALL Data', 'Delete ALL students and results? This wipes everything.', async () => {
        await apiCall('/api/admin/clear-all', 'POST');
        toast('All data cleared'); loadDashboard();
    });
}
function confirmClearStudents() {
    showConfirm('Clear All Students', 'Delete ALL registered students and their results?', async () => {
        const users = await apiCall('/api/users');
        await Promise.all(users.map(u => apiCall(`/api/users/${u.id}`, 'DELETE')));
        toast('All students cleared'); loadStudents();
    });
}

// ── Export ────────────────────────────────────────────────────────────────────
async function exportCSV() {
    try {
        const results = await apiCall('/api/results');
        let csv = 'Name,Email,Category,Score,Total,Percentage,Time(min),Date\n';
        results.forEach(r => {
            csv += `"${r.userName}","${r.userEmail}","${r.category}",${r.totalScore},${r.totalQuestions},${r.percentage}%,${r.timeSpent||'N/A'},"${r.date}"\n`;
        });
        downloadFile(csv, 'text/csv', 'quiz_results.csv');
    } catch(e) { toast('Export failed', 'error'); }
}

async function exportCategoryCSV(cat) {
    try {
        const all  = await apiCall('/api/results');
        const data = all.filter(r => r.category === cat);
        const cols = CAT_COLS[cat];
        let csv = `Name,Email,${cols.map(c=>c.charAt(0).toUpperCase()+c.slice(1)).join(',')},Total,Percentage,Date\n`;
        data.forEach(r => {
            csv += `"${r.userName}","${r.userEmail}",${cols.map(s=>r.subjectScores?.[s]??0).join(',')},${r.totalScore},${r.percentage}%,"${r.date}"\n`;
        });
        downloadFile(csv, 'text/csv', `${cat}_results.csv`);
    } catch(e) { toast('Export failed', 'error'); }
}

function downloadFile(content, type, filename) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([content], { type }));
    a.download = filename;
    a.click();
}

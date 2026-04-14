const API_BASE = '';

let confirmCallback = null;
let adminLoginInProgress = false;
let allResults = [];

const SUBJECT_ORDER = ['english', 'maths', 'physics', 'biology', 'chemistry'];
const SUBJECT_LABELS = {
    english: 'English',
    maths: 'Mathematics',
    physics: 'Physics',
    biology: 'Biology',
    chemistry: 'Chemistry',
};

function apiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };

    if (data) options.body = JSON.stringify(data);

    return fetch(`${API_BASE}${endpoint}`, options).then(async (response) => {
        const text = await response.text();
        let result = {};

        try {
            result = text ? JSON.parse(text) : {};
        } catch (_error) {
            throw new Error('Server error');
        }

        if (!response.ok) throw new Error(result.message || 'Request failed');
        return result;
    });
}

function escapeHtml(value) {
    return String(value ?? '')
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function escapeForSingleQuote(value) {
    return String(value ?? '').replaceAll('\\', '\\\\').replaceAll("'", "\\'");
}

function toast(message, type = 'success') {
    const el = document.getElementById('adminToast');
    const text = document.getElementById('adminToastMessage');
    if (!el || !text) return;

    const tone = type === 'error' ? 'danger' : type === 'warning' ? 'warning' : 'success';
    const textClass = tone === 'warning' ? 'text-dark' : 'text-white';

    el.className = `toast align-items-center border-0 bg-${tone} ${textClass}`;
    text.textContent = message;
    bootstrap.Toast.getOrCreateInstance(el, { delay: 3000 }).show();
}

function fmtDate(value) {
    if (!value) return '—';
    return new Date(value).toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function pctBadge(pct) {
    const percentage = Math.max(0, Math.round(Number(pct) || 0));
    const cls = percentage >= 70 ? 'bg-success' : percentage >= 50 ? 'bg-warning text-dark' : 'bg-danger';
    return `<span class="badge ${cls}">${percentage}%</span>`;
}

function initials(name) {
    return (name || '?')
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
}

function scoreBadge(score, total) {
    const safeScore = Math.max(0, Number(score) || 0);
    const safeTotal = Math.max(0, Number(total) || 0);
    return `<strong>${safeScore}</strong><span class="text-muted">/${safeTotal}</span>`;
}

function toggleSidebar() {
    document.getElementById('sidebar')?.classList.toggle('open');
    document.getElementById('sidebarOverlay')?.classList.toggle('show');
}

function closeSidebar() {
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('sidebarOverlay')?.classList.remove('show');
}

function showSection(name) {
    const sections = ['dashboard', 'all', 'engineering', 'medical', 'students'];

    sections.forEach((section) => {
        document.getElementById(`sec-${section}`)?.classList.toggle('d-none', section !== name);
        document.getElementById(`nav-${section}`)?.classList.toggle('active', section === name);
    });

    const loaders = {
        dashboard: loadDashboard,
        all: loadAllResults,
        engineering: loadEngineeringResults,
        medical: loadMedicalResults,
        students: loadStudents,
    };

    const loader = loaders[name];
    if (loader) loader();

    closeSidebar();
}

async function adminLogin() {
    if (adminLoginInProgress) return;

    const username = document.getElementById('adminUsername')?.value.trim() || '';
    const password = document.getElementById('adminPassword')?.value || '';

    if (!username || !password) {
        toast('Enter username and password', 'error');
        return;
    }

    const loginBtn = document.getElementById('adminLoginBtn');
    adminLoginInProgress = true;

    if (loginBtn) {
        loginBtn.disabled = true;
        loginBtn.textContent = 'Logging in...';
    }

    try {
        await apiCall('/api/admin/login', 'POST', { username, password });

        sessionStorage.setItem('adminLoggedIn', '1');
        document.getElementById('adminLoginSection')?.classList.add('d-none');
        document.getElementById('adminDashboard')?.classList.remove('d-none');

        showSection('dashboard');
        toast('Welcome back, Admin!');
    } catch (error) {
        toast(error?.message || 'Admin login failed', 'error');
    } finally {
        adminLoginInProgress = false;
        if (loginBtn) {
            loginBtn.disabled = false;
            loginBtn.textContent = 'Login';
        }
    }
}

function adminLogout() {
    sessionStorage.removeItem('adminLoggedIn');
    document.getElementById('adminDashboard')?.classList.add('d-none');
    document.getElementById('adminLoginSection')?.classList.remove('d-none');
    closeSidebar();
}

async function loadDashboard() {
    const tbody = document.getElementById('recentResultsTable');

    try {
        const [stats, results] = await Promise.all([
            apiCall('/api/admin/stats'),
            apiCall('/api/results'),
        ]);

        document.getElementById('totalStudents').textContent = stats.totalStudents || 0;
        document.getElementById('completedQuizzes').textContent = stats.completedQuizzes || 0;
        document.getElementById('engineeringStudents').textContent = stats.engineeringStudents || 0;
        document.getElementById('medicalStudents').textContent = stats.medicalStudents || 0;
        document.getElementById('avgEngineeringScore').textContent = `${stats.avgEngineeringScore || 0}%`;
        document.getElementById('avgMedicalScore').textContent = `${stats.avgMedicalScore || 0}%`;
        document.getElementById('avgEngineeringBar').style.width = `${stats.avgEngineeringScore || 0}%`;
        document.getElementById('avgMedicalBar').style.width = `${stats.avgMedicalScore || 0}%`;
        document.getElementById('engineeringAvgCount').textContent = `${stats.engineeringStudents || 0}`;
        document.getElementById('medicalAvgCount').textContent = `${stats.medicalStudents || 0}`;

        if (!results.length) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">No results yet</td></tr>';
            return;
        }

        const recent = [...results].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
        tbody.innerHTML = recent.map((result) => `
            <tr>
                <td><span class="avatar avatar-science">${initials(result.userName)}</span> ${escapeHtml(result.userName)}</td>
                <td class="text-muted d-none d-md-table-cell">${escapeHtml(result.userEmail)}</td>
                <td>${scoreBadge(result.totalScore, result.totalQuestions)}</td>
                <td>${pctBadge(result.percentage)}</td>
                <td class="text-muted d-none d-lg-table-cell">${result.timeSpent || '—'} min</td>
                <td class="text-muted d-none d-lg-table-cell">${fmtDate(result.date)}</td>
            </tr>
        `).join('');
    } catch (_error) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">Unable to load dashboard data.</td></tr>';
        toast('Failed to load dashboard', 'error');
    }
}

async function loadAllResults() {
    try {
        allResults = await apiCall('/api/results');
        renderAllResults(allResults);
    } catch (_error) {
        toast('Failed to load results', 'error');
    }
}

function renderAllResults(results) {
    const tbody = document.getElementById('allResultsTable');

    if (!results.length) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted py-4">No results yet</td></tr>';
        return;
    }

    tbody.innerHTML = results.map((result, index) => `
        <tr>
            <td class="text-muted">${index + 1}</td>
            <td>${escapeHtml(result.userName)}</td>
            <td class="text-muted d-none d-md-table-cell">${escapeHtml(result.userEmail)}</td>
            <td>${scoreBadge(result.totalScore, result.totalQuestions)}</td>
            <td>${pctBadge(result.percentage)}</td>
            <td class="text-muted d-none d-lg-table-cell">${result.timeSpent || '—'} min</td>
            <td class="text-muted d-none d-lg-table-cell">${fmtDate(result.date)}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="viewDetails(${Number(result.userId)})"><i class="fas fa-eye"></i></button>
                <button class="btn btn-sm btn-outline-danger ms-1" onclick="deleteResultConfirm(${Number(result.userId)}, '${escapeForSingleQuote(result.userName)}')"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function filterResults() {
    const query = (document.getElementById('searchInput')?.value || '').toLowerCase();
    const scoreFilter = document.getElementById('scoreFilter')?.value || '';

    let filtered = [...allResults];

    if (query) {
        filtered = filtered.filter((result) =>
            (result.userName || '').toLowerCase().includes(query) ||
            (result.userEmail || '').toLowerCase().includes(query)
        );
    }

    if (scoreFilter === 'below50') {
        filtered = filtered.filter((result) => (result.percentage || 0) < 50);
    } else if (scoreFilter) {
        filtered = filtered.filter((result) => (result.percentage || 0) >= Number(scoreFilter));
    }

    renderAllResults(filtered);
}

function isEngineeringResult(result) {
    return Array.isArray(result?.selectedSubjects) && result.selectedSubjects.includes('maths');
}

function isMedicalResult(result) {
    return Array.isArray(result?.selectedSubjects) && result.selectedSubjects.includes('biology');
}

function renderEngineeringRows(results) {
    return results.map((result, index) => `
        <tr>
            <td class="text-muted">${index + 1}</td>
            <td>${escapeHtml(result.userName)}</td>
            <td class="text-muted d-none d-md-table-cell">${escapeHtml(result.userEmail)}</td>
            <td>${result.subjectScores?.english || 0}/100</td>
            <td>${result.subjectScores?.maths || 0}/100</td>
            <td class="d-none d-lg-table-cell">${result.subjectScores?.physics || 0}/100</td>
            <td class="d-none d-lg-table-cell">${result.subjectScores?.chemistry || 0}/100</td>
            <td><strong>${result.totalScore}/${result.totalQuestions}</strong></td>
            <td>${pctBadge(result.percentage)}</td>
            <td class="text-muted d-none d-lg-table-cell">${fmtDate(result.date)}</td>
        </tr>
    `).join('');
}

function renderMedicalRows(results) {
    return results.map((result, index) => `
        <tr>
            <td class="text-muted">${index + 1}</td>
            <td>${escapeHtml(result.userName)}</td>
            <td class="text-muted d-none d-md-table-cell">${escapeHtml(result.userEmail)}</td>
            <td>${result.subjectScores?.english || 0}/100</td>
            <td>${result.subjectScores?.chemistry || 0}/100</td>
            <td class="d-none d-lg-table-cell">${result.subjectScores?.physics || 0}/100</td>
            <td class="d-none d-lg-table-cell">${result.subjectScores?.biology || 0}/100</td>
            <td><strong>${result.totalScore}/${result.totalQuestions}</strong></td>
            <td>${pctBadge(result.percentage)}</td>
            <td class="text-muted d-none d-lg-table-cell">${fmtDate(result.date)}</td>
        </tr>
    `).join('');
}

async function loadEngineeringResults() {
    try {
        const results = (await apiCall('/api/results')).filter((result) => isEngineeringResult(result));
        const tbody = document.getElementById('engineeringResultsTable');

        if (!results.length) {
            tbody.innerHTML = '<tr><td colspan="10" class="text-center text-muted py-4">No engineering results yet</td></tr>';
            return;
        }

        tbody.innerHTML = renderEngineeringRows(results);
    } catch (_error) {
        toast('Failed to load engineering results', 'error');
    }
}

async function loadMedicalResults() {
    try {
        const results = (await apiCall('/api/results')).filter((result) => isMedicalResult(result));
        const tbody = document.getElementById('medicalResultsTable');

        if (!results.length) {
            tbody.innerHTML = '<tr><td colspan="10" class="text-center text-muted py-3">No medical results yet</td></tr>';
            return;
        }

        tbody.innerHTML = renderMedicalRows(results);
    } catch (_error) {
        toast('Failed to load medical results', 'error');
    }
}

async function loadStudents() {
    try {
        const [users, results] = await Promise.all([apiCall('/api/users'), apiCall('/api/results')]);
        const tbody = document.getElementById('studentsTable');

        if (!users.length) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">No students registered</td></tr>';
            return;
        }

        tbody.innerHTML = users.map((user, index) => {
            const result = results.find((item) => item.userId === user.id);
            const status = result
                ? '<span class="badge bg-success">Completed</span>'
                : user.category
                    ? '<span class="badge bg-warning text-dark">In Progress</span>'
                    : '<span class="badge bg-secondary">Not Started</span>';

            return `
                <tr>
                    <td class="text-muted">${index + 1}</td>
                    <td><span class="avatar avatar-science me-2">${initials(user.name)}</span>${escapeHtml(user.name)}</td>
                    <td class="text-muted d-none d-md-table-cell">${escapeHtml(user.email)}</td>
                    <td class="text-muted d-none d-md-table-cell">${fmtDate(user.registeredDate)}</td>
                    <td>${status}</td>
                    <td>
                        ${result ? `<button class="btn btn-sm btn-outline-primary" onclick="viewDetails(${Number(user.id)})"><i class="fas fa-eye"></i></button>` : ''}
                        <button class="btn btn-sm btn-outline-warning ms-1" onclick="resetStudentConfirm(${Number(user.id)}, '${escapeForSingleQuote(user.name)}')"><i class="fas fa-undo"></i></button>
                        <button class="btn btn-sm btn-outline-danger ms-1" onclick="deleteStudentConfirm(${Number(user.id)}, '${escapeForSingleQuote(user.name)}')"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
        }).join('');
    } catch (_error) {
        toast('Failed to load students', 'error');
    }
}

async function viewDetails(userId) {
    try {
        const [user, result] = await Promise.all([
            apiCall(`/api/users/${userId}`),
            apiCall(`/api/results/${userId}`),
        ]);

        const body = document.getElementById('detailsBody');

        const resultHtml = result ? `
            <div class="col-12"><hr></div>
            <div class="col-md-4"><div class="detail-card accent"><span>Score</span><strong>${result.totalScore}/${result.totalQuestions}</strong></div></div>
            <div class="col-md-4"><div class="detail-card accent"><span>Percentage</span><strong>${result.percentage}%</strong></div></div>
            <div class="col-md-4"><div class="detail-card accent"><span>Time</span><strong>${result.timeSpent || '—'} min</strong></div></div>
            <div class="col-12 mt-2">
                <h6 class="fw-bold mb-3">Subject Breakdown</h6>
                ${SUBJECT_ORDER.map((subject) => {
            const score = result.subjectScores?.[subject] || 0;
            const total = result.subjectTotals?.[subject] || 100;
            const pct = total ? Math.round((score / total) * 100) : 0;
            return `
                        <div class="mb-3">
                            <div class="d-flex justify-content-between mb-1"><span>${SUBJECT_LABELS[subject]}</span><strong>${score}/${total}</strong></div>
                            <div class="progress"><div class="progress-bar" style="width:${pct}%"></div></div>
                        </div>
                    `;
        }).join('')}
            </div>
        ` : '<div class="col-12"><p class="text-center text-muted py-3 mb-0">No quiz result yet</p></div>';

        body.innerHTML = `
            <div class="row g-3">
                <div class="col-md-6"><div class="detail-card"><span>Name</span><strong>${escapeHtml(user.name)}</strong></div></div>
                <div class="col-md-6"><div class="detail-card"><span>Email</span><strong>${escapeHtml(user.email)}</strong></div></div>
                <div class="col-md-6"><div class="detail-card"><span>Registered</span><strong>${fmtDate(user.registeredDate)}</strong></div></div>
                <div class="col-md-6"><div class="detail-card"><span>Status</span><strong>${user.quizAttempted ? 'Completed' : 'Pending'}</strong></div></div>
                ${resultHtml}
            </div>
        `;

        bootstrap.Modal.getOrCreateInstance(document.getElementById('detailsModal')).show();
    } catch (_error) {
        toast('Failed to load details', 'error');
    }
}

function showConfirm(title, message, callback) {
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmMessage').textContent = message;
    confirmCallback = callback;
    bootstrap.Modal.getOrCreateInstance(document.getElementById('confirmModal')).show();
}

function deleteResultConfirm(userId, name) {
    showConfirm('Delete Result', `Delete quiz result for ${name}?`, async () => {
        await apiCall(`/api/results/${userId}`, 'DELETE');
        toast('Result deleted');
        await refreshAdminData();
    });
}

function deleteStudentConfirm(userId, name) {
    showConfirm('Delete Student', `Delete ${name} and all associated data?`, async () => {
        await apiCall(`/api/users/${userId}`, 'DELETE');
        toast('Student deleted');
        await refreshAdminData();
    });
}

function resetStudentConfirm(userId, name) {
    showConfirm('Reset Student', `Reset quiz attempt for ${name}?`, async () => {
        await apiCall(`/api/users/${userId}/reset`, 'POST');
        toast('Student reset');
        await refreshAdminData();
    });
}

function clearDashboardUI() {
    document.getElementById('totalStudents').textContent = '0';
    document.getElementById('completedQuizzes').textContent = '0';
    document.getElementById('engineeringStudents').textContent = '0';
    document.getElementById('medicalStudents').textContent = '0';
    document.getElementById('avgEngineeringScore').textContent = '0%';
    document.getElementById('avgMedicalScore').textContent = '0%';
    document.getElementById('avgEngineeringBar').style.width = '0%';
    document.getElementById('avgMedicalBar').style.width = '0%';
    document.getElementById('engineeringAvgCount').textContent = '0';
    document.getElementById('medicalAvgCount').textContent = '0';
    document.getElementById('recentResultsTable').innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">No results yet</td></tr>';
    document.getElementById('allResultsTable').innerHTML = '<tr><td colspan="8" class="text-center text-muted py-4">No results yet</td></tr>';
    document.getElementById('engineeringResultsTable').innerHTML = '<tr><td colspan="10" class="text-center text-muted py-4">No engineering results yet</td></tr>';
    document.getElementById('medicalResultsTable').innerHTML = '<tr><td colspan="10" class="text-center text-muted py-4">No medical results yet</td></tr>';
    document.getElementById('studentsTable').innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">No students registered</td></tr>';
}

async function refreshAdminData() {
    await Promise.all([loadDashboard(), loadAllResults(), loadEngineeringResults(), loadMedicalResults(), loadStudents()]);
}

function confirmClearAll() {
    showConfirm('Clear ALL Data', 'Delete all students and results?', async () => {
        await apiCall('/api/admin/clear-all', 'POST');
        allResults = [];
        clearDashboardUI();
        toast('All data cleared');
        await refreshAdminData();
    });
}

function confirmClearStudents() {
    showConfirm('Clear Students', 'Delete all registered students?', async () => {
        const users = await apiCall('/api/users');
        await Promise.all(users.map((user) => apiCall(`/api/users/${user.id}`, 'DELETE')));
        toast('All students cleared');
        await refreshAdminData();
    });
}

function toCsvValue(value) {
    return `"${String(value ?? '').replaceAll('"', '""')}"`;
}

function downloadFile(content, type, filename) {
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(new Blob([content], { type }));
    anchor.download = filename;
    anchor.click();
}

async function exportCSV() {
    const results = await apiCall('/api/results');
    const lines = [
        'Name,Email,Category,Score,Total,Percentage,Time(min),Date',
        ...results.map((result) => [
            toCsvValue(result.userName),
            toCsvValue(result.userEmail),
            toCsvValue(result.category),
            result.totalScore,
            result.totalQuestions,
            `${result.percentage}%`,
            result.timeSpent || 'N/A',
            toCsvValue(result.date),
        ].join(',')),
    ];

    downloadFile(lines.join('\n'), 'text/csv', 'acejamb_results.csv');
}

async function exportCategoryCSV(category) {
    const results = (await apiCall('/api/results')).filter((result) => category === 'engineering' ? isEngineeringResult(result) : isMedicalResult(result));
    const header = category === 'engineering'
        ? 'Name,Email,English,Mathematics,Physics,Chemistry,Total,Percentage,Date'
        : 'Name,Email,English,Chemistry,Physics,Biology,Total,Percentage,Date';

    const lines = [header, ...results.map((result) => {
        const values = category === 'engineering'
            ? [
                toCsvValue(result.userName),
                toCsvValue(result.userEmail),
                result.subjectScores?.english || 0,
                result.subjectScores?.maths || 0,
                result.subjectScores?.physics || 0,
                result.subjectScores?.chemistry || 0,
                result.totalScore,
                `${result.percentage}%`,
                toCsvValue(result.date),
            ]
            : [
                toCsvValue(result.userName),
                toCsvValue(result.userEmail),
                result.subjectScores?.english || 0,
                result.subjectScores?.chemistry || 0,
                result.subjectScores?.physics || 0,
                result.subjectScores?.biology || 0,
                result.totalScore,
                `${result.percentage}%`,
                toCsvValue(result.date),
            ];
        return values.join(',');
    })];

    downloadFile(lines.join('\n'), 'text/csv', `${category}_results.csv`);
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            adminLogin();
        });
    }

    const confirmBtn = document.getElementById('confirmBtn');
    if (confirmBtn) {
        confirmBtn.onclick = () => {
            bootstrap.Modal.getInstance(document.getElementById('confirmModal'))?.hide();
            if (confirmCallback) confirmCallback();
        };
    }

    if (sessionStorage.getItem('adminLoggedIn') === '1') {
        document.getElementById('adminLoginSection')?.classList.add('d-none');
        document.getElementById('adminDashboard')?.classList.remove('d-none');
        showSection('dashboard');
    }
});

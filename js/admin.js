// Study With Prof Dudu - Admin Dashboard
// ======================================
// Using Backend API

const API_BASE = '';

let isAdminLoggedIn = false;
let currentSection = 'dashboard';
let deleteCallback = null;

// ======================================
// API HELPER
// ======================================

async function apiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(`${API_BASE}${endpoint}`, options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'API request failed');
        }

        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// ======================================
// ADMIN AUTHENTICATION
// ======================================

function showAdminToast(title, message, type = 'info') {
    const toast = document.getElementById('adminToast');
    const toastTitle = document.getElementById('adminToastTitle');
    const toastMessage = document.getElementById('adminToastMessage');

    toastTitle.textContent = title;
    toastMessage.textContent = message;

    toast.classList.remove('bg-success', 'bg-danger', 'bg-warning', 'bg-info');
    if (type === 'success') toast.classList.add('bg-success', 'text-white');
    else if (type === 'error') toast.classList.add('bg-danger', 'text-white');
    else if (type === 'warning') toast.classList.add('bg-warning');

    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}

async function adminLogin() {
    const username = document.getElementById('adminUsername').value.trim();
    const password = document.getElementById('adminPassword').value;

    try {
        await apiCall('/api/admin/login', 'POST', { username, password });

        isAdminLoggedIn = true;
        sessionStorage.setItem('adminLoggedIn', 'true');

        document.getElementById('adminLoginSection').classList.add('d-none');
        document.getElementById('adminDashboard').classList.remove('d-none');
        document.getElementById('adminLogoutBtn').classList.remove('d-none');

        showAdminToast('Welcome', 'Logged in as Admin', 'success');
        loadDashboardData();
    } catch (error) {
        showAdminToast('Error', 'Invalid admin credentials', 'error');
    }
}

function adminLogout() {
    isAdminLoggedIn = false;
    sessionStorage.removeItem('adminLoggedIn');

    document.getElementById('adminDashboard').classList.add('d-none');
    document.getElementById('adminLoginSection').classList.remove('d-none');
    document.getElementById('adminLogoutBtn').classList.add('d-none');

    // Clear form
    document.getElementById('adminUsername').value = '';
    document.getElementById('adminPassword').value = '';
}

// ======================================
// NAVIGATION FUNCTIONS
// ======================================

function updateNavigation(section) {
    document.querySelectorAll('.nav-pills .nav-link').forEach(link => {
        link.classList.remove('active');
    });

    const links = document.querySelectorAll('.nav-pills .nav-link');
    const sectionIndex = {
        'dashboard': 0,
        'all': 1,
        'science': 2,
        'arts': 3,
        'students': 4
    };

    if (links[sectionIndex[section]]) {
        links[sectionIndex[section]].classList.add('active');
    }
}

function hideAllSections() {
    document.getElementById('dashboardOverview').classList.add('d-none');
    document.getElementById('allResultsSection').classList.add('d-none');
    document.getElementById('scienceResultsSection').classList.add('d-none');
    document.getElementById('artsResultsSection').classList.add('d-none');
    document.getElementById('studentsSection').classList.add('d-none');
}

function showDashboard() {
    hideAllSections();
    document.getElementById('dashboardOverview').classList.remove('d-none');
    updateNavigation('dashboard');
    loadDashboardData();
}

function showAllResults() {
    hideAllSections();
    document.getElementById('allResultsSection').classList.remove('d-none');
    updateNavigation('all');
    loadAllResults();
}

function showScienceResults() {
    hideAllSections();
    document.getElementById('scienceResultsSection').classList.remove('d-none');
    updateNavigation('science');
    loadScienceResults();
}

function showArtsResults() {
    hideAllSections();
    document.getElementById('artsResultsSection').classList.remove('d-none');
    updateNavigation('arts');
    loadArtsResults();
}

function showStudents() {
    hideAllSections();
    document.getElementById('studentsSection').classList.remove('d-none');
    updateNavigation('students');
    loadStudents();
}

// ======================================
// DASHBOARD FUNCTIONS
// ======================================

async function loadDashboardData() {
    try {
        const stats = await apiCall('/api/admin/stats');
        const users = await apiCall('/api/users');
        const results = await apiCall('/api/results');

        // Update stats
        document.getElementById('totalStudents').textContent = stats.totalStudents;
        document.getElementById('completedQuizzes').textContent = stats.completedQuizzes;
        document.getElementById('scienceStudents').textContent = stats.scienceStudents;
        document.getElementById('artsStudents').textContent = stats.artsStudents;

        // Averages
        document.getElementById('avgScienceScore').textContent = stats.avgScienceScore > 0 ? `${stats.avgScienceScore}%` : 'N/A';
        document.getElementById('avgArtsScore').textContent = stats.avgArtsScore > 0 ? `${stats.avgArtsScore}%` : 'N/A';

        // Top performers
        const topPerformersDiv = document.getElementById('topPerformers');
        if (results.length > 0) {
            const sortedResults = [...results].sort((a, b) => b.percentage - a.percentage).slice(0, 5);
            topPerformersDiv.innerHTML = sortedResults.map((r, i) => `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <span>
                        <i class="fas fa-medal ${i === 0 ? 'text-warning' : i === 1 ? 'text-secondary' : 'text-dark'} me-2"></i>
                        ${r.userName}
                    </span>
                    <span class="badge ${r.percentage >= 70 ? 'bg-success' : r.percentage >= 50 ? 'bg-warning' : 'bg-danger'}">
                        ${r.percentage}%
                    </span>
                </div>
            `).join('');
        } else {
            topPerformersDiv.innerHTML = '<p class="text-muted">No results yet</p>';
        }

        // Recent results
        const recentTable = document.getElementById('recentResultsTable');
        if (results.length > 0) {
            const recentResults = [...results].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
            recentTable.innerHTML = recentResults.map(r => `
                <tr>
                    <td>${r.userName}</td>
                    <td>${r.userEmail}</td>
                    <td><span class="badge ${r.category === 'science' ? 'bg-info' : 'bg-warning'}">${r.category.toUpperCase()}</span></td>
                    <td>${r.totalScore}/${r.totalQuestions}</td>
                    <td><span class="badge ${r.percentage >= 70 ? 'bg-success' : r.percentage >= 50 ? 'bg-warning' : 'bg-danger'}">${r.percentage}%</span></td>
                    <td>${formatDate(r.date)}</td>
                </tr>
            `).join('');
        } else {
            recentTable.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No results yet</td></tr>';
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
        showAdminToast('Error', 'Failed to load dashboard data', 'error');
    }
}

// ======================================
// ALL RESULTS FUNCTIONS
// ======================================

async function loadAllResults() {
    try {
        const results = await apiCall('/api/results');
        renderAllResults(results);
    } catch (error) {
        console.error('Error loading results:', error);
    }
}

function renderAllResults(results) {
    const table = document.getElementById('allResultsTable');

    if (results.length > 0) {
        table.innerHTML = results.map((r, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${r.userName}</td>
                <td>${r.userEmail}</td>
                <td><span class="badge ${r.category === 'science' ? 'bg-info' : 'bg-warning'}">${r.category.toUpperCase()}</span></td>
                <td>${r.totalScore}</td>
                <td>${r.totalQuestions}</td>
                <td><span class="badge ${r.percentage >= 70 ? 'bg-success' : r.percentage >= 50 ? 'bg-warning' : 'bg-danger'}">${r.percentage}%</span></td>
                <td>${r.timeSpent || 'N/A'} min</td>
                <td>${formatDate(r.date)}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="viewDetails('${r.userId}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteResult('${r.userId}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    } else {
        table.innerHTML = '<tr><td colspan="10" class="text-center text-muted">No results yet</td></tr>';
    }
}

async function filterResults() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const scoreFilter = document.getElementById('scoreFilter').value;

    try {
        let results = await apiCall('/api/results');

        // Apply search filter
        if (search) {
            results = results.filter(r =>
                r.userName.toLowerCase().includes(search) ||
                r.userEmail.toLowerCase().includes(search)
            );
        }

        // Apply category filter
        if (category) {
            results = results.filter(r => r.category === category);
        }

        // Apply score filter
        if (scoreFilter) {
            if (scoreFilter === 'below50') {
                results = results.filter(r => r.percentage < 50);
            } else {
                const minScore = parseInt(scoreFilter);
                results = results.filter(r => r.percentage >= minScore);
            }
        }

        renderAllResults(results);
    } catch (error) {
        console.error('Error filtering results:', error);
    }
}

// ======================================
// SCIENCE & ARTS RESULTS FUNCTIONS
// ======================================

async function loadScienceResults() {
    try {
        const allResults = await apiCall('/api/results');
        const results = allResults.filter(r => r.category === 'science');
        const table = document.getElementById('scienceResultsTable');

        if (results.length > 0) {
            table.innerHTML = results.map((r, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${r.userName}</td>
                    <td>${r.userEmail}</td>
                    <td>${r.subjectScores.maths || 0}/10</td>
                    <td>${r.subjectScores.english || 0}/10</td>
                    <td>${r.subjectScores.physics || 0}/10</td>
                    <td>${r.subjectScores.biology || 0}/10</td>
                    <td>${r.subjectScores.chemistry || 0}/10</td>
                    <td><strong>${r.totalScore}/${r.totalQuestions}</strong></td>
                    <td><span class="badge ${r.percentage >= 70 ? 'bg-success' : r.percentage >= 50 ? 'bg-warning' : 'bg-danger'}">${r.percentage}%</span></td>
                    <td>${formatDate(r.date)}</td>
                </tr>
            `).join('');
        } else {
            table.innerHTML = '<tr><td colspan="11" class="text-center text-muted">No science results yet</td></tr>';
        }
    } catch (error) {
        console.error('Error loading science results:', error);
    }
}

async function loadArtsResults() {
    try {
        const allResults = await apiCall('/api/results');
        const results = allResults.filter(r => r.category === 'arts');
        const table = document.getElementById('artsResultsTable');

        if (results.length > 0) {
            table.innerHTML = results.map((r, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${r.userName}</td>
                    <td>${r.userEmail}</td>
                    <td>${r.subjectScores.english || 0}/10</td>
                    <td>${r.subjectScores.literature || 0}/10</td>
                    <td>${r.subjectScores.government || 0}/10</td>
                    <td>${r.subjectScores.crs || 0}/10</td>
                    <td><strong>${r.totalScore}/${r.totalQuestions}</strong></td>
                    <td><span class="badge ${r.percentage >= 70 ? 'bg-success' : r.percentage >= 50 ? 'bg-warning' : 'bg-danger'}">${r.percentage}%</span></td>
                    <td>${formatDate(r.date)}</td>
                </tr>
            `).join('');
        } else {
            table.innerHTML = '<tr><td colspan="10" class="text-center text-muted">No arts results yet</td></tr>';
        }
    } catch (error) {
        console.error('Error loading arts results:', error);
    }
}

// ======================================
// STUDENTS FUNCTIONS
// ======================================

async function loadStudents() {
    try {
        const users = await apiCall('/api/users');
        const results = await apiCall('/api/results');
        const table = document.getElementById('studentsTable');

        if (users.length > 0) {
            table.innerHTML = users.map((u, index) => {
                const userResult = results.find(r => r.userId === u.id);
                return `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${u.name}</td>
                        <td>${u.email}</td>
                        <td>${formatDate(u.registeredDate)}</td>
                        <td>
                            ${userResult
                        ? '<span class="badge bg-success">Completed</span>'
                        : u.category
                            ? '<span class="badge bg-warning">In Progress</span>'
                            : '<span class="badge bg-secondary">Not Started</span>'}
                        </td>
                        <td>
                            ${u.category
                        ? `<span class="badge ${u.category === 'science' ? 'bg-info' : 'bg-warning'}">${u.category.toUpperCase()}</span>`
                        : '-'}
                        </td>
                        <td>
                            <button class="btn btn-sm btn-danger" onclick="deleteStudent('${u.id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                            ${!userResult && u.category ? `
                                <button class="btn btn-sm btn-warning" onclick="resetStudent('${u.id}')" title="Reset quiz attempt">
                                    <i class="fas fa-redo"></i>
                                </button>
                            ` : ''}
                        </td>
                    </tr>
                `;
            }).join('');
        } else {
            table.innerHTML = '<tr><td colspan="7" class="text-center text-muted">No students registered</td></tr>';
        }
    } catch (error) {
        console.error('Error loading students:', error);
    }
}

// ======================================
// ACTION FUNCTIONS
// ======================================

async function viewDetails(userId) {
    try {
        const results = await apiCall('/api/results');
        const result = results.find(r => r.userId == userId);

        if (!result) {
            showAdminToast('Error', 'Result not found', 'error');
            return;
        }

        const body = document.getElementById('studentDetailsBody');

        let subjectsHtml = '';
        for (const subject in result.subjectScores) {
            const score = result.subjectScores[subject];
            const total = result.subjectTotals[subject];
            const percent = Math.round((score / total) * 100);
            subjectsHtml += `
                <div class="col-md-6 mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h6 class="text-capitalize">${subject}</h6>
                            <div class="progress">
                                <div class="progress-bar ${percent >= 50 ? 'bg-success' : 'bg-danger'}" 
                                     style="width: ${percent}%">${score}/${total}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        body.innerHTML = `
            <div class="row mb-4">
                <div class="col-md-6">
                    <p><strong>Name:</strong> ${result.userName}</p>
                    <p><strong>Email:</strong> ${result.userEmail}</p>
                    <p><strong>Category:</strong> <span class="badge ${result.category === 'science' ? 'bg-info' : 'bg-warning'}">${result.category.toUpperCase()}</span></p>
                </div>
                <div class="col-md-6">
                    <p><strong>Date:</strong> ${formatDate(result.date)}</p>
                    <p><strong>Time Spent:</strong> ${result.timeSpent || 'N/A'} minutes</p>
                    <p><strong>Overall Score:</strong> <span class="badge bg-primary fs-5">${result.totalScore}/${result.totalQuestions} (${result.percentage}%)</span></p>
                </div>
            </div>
            
            <h5>Subject Breakdown</h5>
            <div class="row">
                ${subjectsHtml}
            </div>
        `;

        const modal = new bootstrap.Modal(document.getElementById('studentDetailsModal'));
        modal.show();
    } catch (error) {
        console.error('Error viewing details:', error);
        showAdminToast('Error', 'Failed to load student details', 'error');
    }
}

function deleteResult(userId) {
    deleteCallback = async () => {
        try {
            await apiCall(`/api/results/${userId}`, 'DELETE');
            showAdminToast('Success', 'Result deleted', 'success');
            loadAllResults();
            loadDashboardData();
        } catch (error) {
            showAdminToast('Error', 'Failed to delete result', 'error');
        }
    };

    document.getElementById('deleteConfirmMessage').textContent = 'Are you sure you want to delete this result?';
    const modal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
    modal.show();
}

function deleteStudent(userId) {
    deleteCallback = async () => {
        try {
            await apiCall(`/api/users/${userId}`, 'DELETE');
            showAdminToast('Success', 'Student deleted', 'success');
            loadStudents();
            loadDashboardData();
        } catch (error) {
            showAdminToast('Error', 'Failed to delete student', 'error');
        }
    };

    document.getElementById('deleteConfirmMessage').textContent = 'Are you sure you want to delete this student and all their data?';
    const modal = new bootstrap.Modal(document.getElementById('deleteConfirmModal'));
    modal.show();
}

async function resetStudent(userId) {
    if (confirm('Reset this student\'s quiz attempt? They will be able to take the quiz again.')) {
        try {
            await apiCall(`/api/users/${userId}/reset`, 'POST');
            showAdminToast('Success', 'Student reset successfully', 'success');
            loadStudents();
        } catch (error) {
            showAdminToast('Error', 'Failed to reset student', 'error');
        }
    }
}

function confirmDelete() {
    if (deleteCallback) {
        deleteCallback();
        deleteCallback = null;
    }
    bootstrap.Modal.getInstance(document.getElementById('deleteConfirmModal')).hide();
}

// ======================================
// UTILITY FUNCTIONS
// ======================================

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

async function exportToCSV() {
    try {
        const results = await apiCall('/api/results');

        if (results.length === 0) {
            showAdminToast('Warning', 'No results to export', 'warning');
            return;
        }

        let csv = 'Name,Email,Category,Score,Total,Percentage,Time Spent,Date\n';

        results.forEach(r => {
            csv += `"${r.userName}","${r.userEmail}","${r.category}",${r.totalScore},${r.totalQuestions},${r.percentage}%,${r.timeSpent || 'N/A'} min,"${formatDate(r.date)}"\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quiz_results_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);

        showAdminToast('Success', 'Results exported to CSV', 'success');
    } catch (error) {
        showAdminToast('Error', 'Failed to export results', 'error');
    }
}

async function clearAllData() {
    if (confirm('⚠️ WARNING: This will delete ALL students and results. This cannot be undone!\n\nAre you absolutely sure?')) {
        if (confirm('FINAL WARNING: All data will be permanently deleted. Continue?')) {
            try {
                await apiCall('/api/admin/clear-all', 'POST');
                showAdminToast('Success', 'All data cleared', 'success');
                loadDashboardData();
            } catch (error) {
                showAdminToast('Error', 'Failed to clear data', 'error');
            }
        }
    }
}

function refreshData() {
    switch (currentSection) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'all':
            loadAllResults();
            break;
        case 'science':
            loadScienceResults();
            break;
        case 'arts':
            loadArtsResults();
            break;
        case 'students':
            loadStudents();
            break;
    }
    showAdminToast('Refreshed', 'Data updated', 'success');
}

// ======================================
// INITIALIZATION
// ======================================

document.addEventListener('DOMContentLoaded', function () {
    // Check if admin was previously logged in
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        isAdminLoggedIn = true;
        document.getElementById('adminLoginSection').classList.add('d-none');
        document.getElementById('adminDashboard').classList.remove('d-none');
        document.getElementById('adminLogoutBtn').classList.remove('d-none');
        loadDashboardData();
    }

    // Auto-refresh every 30 seconds
    setInterval(() => {
        if (isAdminLoggedIn) {
            refreshData();
        }
    }, 30000);
});

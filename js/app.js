const API_BASE = '';

const MOCK = {
    category: 'science',
    title: 'AceJAMB',
    durationSeconds: 90 * 60,
    maxSubjects: 4
};

const TRACK_OPTIONS = {
    engineering: {
        label: 'Engineering',
        subjects: ['physics', 'chemistry', 'maths', 'english']
    },
    medical: {
        label: 'Medical',
        subjects: ['physics', 'chemistry', 'biology', 'english']
    }
};

let currentUser = null;
let currentQuestionIndex = 0;
let allQuestions = [];
let currentSelectedSubjects = [];
let userAnswers = {};
let timerInterval = null;
let timeRemaining = MOCK.durationSeconds;
let quizStartTime = null;
let selectionState = {};

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
            throw new Error('Server error — please try again.');
        }

        if (!response.ok) throw new Error(result.message || 'Request failed');
        return result;
    });
}

function getSelectionStorageKey() {
    return currentUser ? `acejamb_subject_selection_${currentUser.id}` : 'acejamb_subject_selection';
}

function getAvailableSubjects() {
    return Object.keys((typeof questionsData !== 'undefined' && questionsData.science) ? questionsData.science : {});
}

function getDefaultTrack() {
    return 'engineering';
}

function getSelectedTrack() {
    const track = selectionState.scienceTrack;
    if (!track || !TRACK_OPTIONS[track]) {
        selectionState.scienceTrack = getDefaultTrack();
    }
    return selectionState.scienceTrack;
}

function setSelectedTrack(track) {
    if (!TRACK_OPTIONS[track]) return;
    selectionState.scienceTrack = track;
    saveSubjectSelections();
}

function getSelectedSubjects() {
    const available = getAvailableSubjects();
    const track = getSelectedTrack();
    return TRACK_OPTIONS[track].subjects.filter((subject) => available.includes(subject));
}

function isValidSelection() {
    const track = getSelectedTrack();
    const subjects = getSelectedSubjects();
    return Boolean(TRACK_OPTIONS[track]) && subjects.length === MOCK.maxSubjects;
}

function loadSubjectSelections() {
    if (!currentUser) return;

    try {
        selectionState = JSON.parse(sessionStorage.getItem(getSelectionStorageKey()) || '{}') || {};
    } catch (_error) {
        selectionState = {};
    }

    if (!selectionState.scienceTrack || !TRACK_OPTIONS[selectionState.scienceTrack]) {
        selectionState.scienceTrack = getDefaultTrack();
    }

    setSelectedTrack(selectionState.scienceTrack);
}

function saveSubjectSelections() {
    if (!currentUser) return;
    sessionStorage.setItem(getSelectionStorageKey(), JSON.stringify(selectionState));
}

function showToast(title, message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');

    if (!toast || !toastTitle || !toastMessage) return;

    toastTitle.textContent = title;
    toastMessage.textContent = message;
    toast.classList.remove('bg-success', 'bg-danger', 'bg-warning', 'bg-info', 'text-white');

    if (type === 'success') toast.classList.add('bg-success', 'text-white');
    else if (type === 'error') toast.classList.add('bg-danger', 'text-white');
    else if (type === 'warning') toast.classList.add('bg-warning');
    else toast.classList.add('bg-info', 'text-white');

    bootstrap.Toast.getOrCreateInstance(toast).show();
}

function showLogin() {
    document.getElementById('loginForm').classList.remove('d-none');
    document.getElementById('registerForm').classList.add('d-none');
    document.querySelectorAll('.auth-tab').forEach((btn, index) => {
        btn.classList.toggle('active', index === 0);
    });
}

function showRegister() {
    document.getElementById('loginForm').classList.add('d-none');
    document.getElementById('registerForm').classList.remove('d-none');
    document.querySelectorAll('.auth-tab').forEach((btn, index) => {
        btn.classList.toggle('active', index === 1);
    });
}

async function register() {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (!name || !email || !password || !confirmPassword) return showToast('Error', 'Please fill in all fields', 'error');
    if (!email.includes('@')) return showToast('Error', 'Please enter a valid email address', 'error');
    if (password.length < 6) return showToast('Error', 'Password must be at least 6 characters', 'error');
    if (password !== confirmPassword) return showToast('Error', 'Passwords do not match', 'error');

    try {
        await apiCall('/api/register', 'POST', { name, email, password });
        showToast('Success', 'Registration successful. Please login.', 'success');
        showLogin();
        document.getElementById('regName').value = '';
        document.getElementById('regEmail').value = '';
        document.getElementById('regPassword').value = '';
        document.getElementById('regConfirmPassword').value = '';
    } catch (error) {
        showToast('Error', error.message, 'error');
    }
}

async function login() {
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) return showToast('Error', 'Please enter email and password', 'error');

    try {
        const result = await apiCall('/api/login', 'POST', { email, password });
        currentUser = result.user;
        sessionStorage.setItem('acejamb_currentUser', JSON.stringify(currentUser));

        if (currentUser.deviceReset) {
            localStorage.removeItem('acejamb_device_locked');
            await apiCall(`/api/users/${currentUser.id}/acknowledge-reset`, 'POST');
            currentUser.deviceReset = false;
            sessionStorage.setItem('acejamb_currentUser', JSON.stringify(currentUser));
        }

        if (!currentUser.quizAttempted) {
            localStorage.removeItem('acejamb_device_locked');
        }

        showToast('Welcome', `Welcome back, ${currentUser.name}!`, 'success');
        showSelectionSection();
    } catch (error) {
        showToast('Error', error.message || 'Invalid credentials', 'error');
    }
}

function logout() {
    currentUser = null;
    currentSelectedSubjects = [];
    selectionState = {};
    sessionStorage.removeItem('acejamb_currentUser');

    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    document.getElementById('authSection').classList.remove('d-none');
    document.getElementById('selectionSection').classList.add('d-none');
    document.getElementById('quizSection').classList.add('d-none');
    document.getElementById('resultsSection').classList.add('d-none');
    document.getElementById('deviceLockedSection').classList.add('d-none');
    document.getElementById('userDisplay').classList.add('d-none');
    document.getElementById('logoutBtn').classList.add('d-none');
}

async function showSelectionSection() {
    const deviceLocked = localStorage.getItem('acejamb_device_locked') === '1';
    if (deviceLocked) {
        document.getElementById('authSection').classList.add('d-none');
        document.getElementById('selectionSection').classList.add('d-none');
        document.getElementById('deviceLockedSection').classList.remove('d-none');
        return;
    }

    document.getElementById('authSection').classList.add('d-none');
    document.getElementById('deviceLockedSection').classList.add('d-none');
    document.getElementById('selectionSection').classList.remove('d-none');
    document.getElementById('quizSection').classList.add('d-none');
    document.getElementById('resultsSection').classList.add('d-none');
    document.getElementById('userDisplay').classList.remove('d-none');
    document.getElementById('logoutBtn').classList.remove('d-none');
    document.getElementById('userName').textContent = currentUser.name;

    loadSubjectSelections();
    renderSubjectSelectionCards();
    updateScienceCount();

    try {
        const result = await apiCall(`/api/results/${currentUser.id}`);

        const startBtn = document.getElementById('startScienceBtn');

        if (result) {
            startBtn.disabled = false;
            startBtn.title = '';
        } else {
            startBtn.disabled = false;
            startBtn.title = '';
        }
    } catch (_error) {
        const startBtn = document.getElementById('startScienceBtn');
        if (startBtn) startBtn.disabled = false;
    }
}

function renderSubjectSelectionCards() {
    const container = document.getElementById('scienceSubjectSelection');
    const status = document.getElementById('scienceSelectionStatus');
    const subjects = (typeof questionsData !== 'undefined' && questionsData.science) ? questionsData.science : {};
    if (!container) return;

    const track = getSelectedTrack();
    const selectedSubjects = getSelectedSubjects();

    container.innerHTML = `
        <div class="subject-grid aspirant-grid">
            ${Object.entries(TRACK_OPTIONS).map(([key, option]) => `
                <button type="button" class="subject-tile track-tile ${track === key ? 'selected' : ''}" onclick="chooseTrack('${key}')">
                    <span class="track-check" aria-hidden="true"><i class="fas ${track === key ? 'fa-square-check' : 'fa-square'}"></i></span>
                    <span class="subject-title">${option.label} Category</span>
                    <span class="subject-meta">${option.subjects.map((subject) => subjects[subject]?.name || subject).join(' • ')}</span>
                </button>
            `).join('')}
        </div>
    `;

    if (status) {
        status.innerHTML = `
            <div class="status-pill ${isValidSelection() ? 'ready' : 'pending'}">
                <i class="fas ${isValidSelection() ? 'fa-check-circle' : 'fa-info-circle'} me-2"></i>
                ${isValidSelection()
                ? `${TRACK_OPTIONS[track].label} selected: ${selectedSubjects.map((subject) => subjects[subject]?.name || subject).join(', ')}`
                : 'Choose a category to continue.'}
            </div>
        `;
    }

    updateSelectedSubjectsSummary();
}

function chooseTrack(track) {
    setSelectedTrack(track);
    renderSubjectSelectionCards();
    updateScienceCount();
}

function updateSelectedSubjectsSummary() {
    const list = document.getElementById('selectedSubjectsList');
    const warningList = document.getElementById('warningSelectedSubjectsList');
    const trackLabel = document.getElementById('warningTrackLabel');
    if (!list && !warningList && !trackLabel) return;

    const subjects = getSelectedSubjects();
    const bank = (typeof questionsData !== 'undefined' && questionsData.science) ? questionsData.science : {};
    const track = getSelectedTrack();
    const html = subjects.map((subjectKey) => `
        <span class="selected-pill">${bank[subjectKey]?.name || subjectKey}</span>
    `).join('');

    if (list) list.innerHTML = html;
    if (warningList) warningList.innerHTML = html;
    if (trackLabel) trackLabel.textContent = TRACK_OPTIONS[track]?.label || 'Engineering';
}

function getSubjectTargetCount(subjectKey) {
    const targets = {
        english: 60,
        maths: 40,
        physics: 40,
        biology: 40,
        chemistry: 40,
    };
    return targets[subjectKey] || 40;
}

function updateScienceCount() {
    const heroCount = document.getElementById('scienceQuestionCountHero');
    const sectionCount = document.getElementById('scienceQuestionCount');
    if (heroCount) heroCount.textContent = '180';
    if (sectionCount) sectionCount.textContent = '180';
}

function confirmStartQuiz() {
    if (!isValidSelection()) {
        showToast('Selection required', 'Choose Engineering or Medical before continuing.', 'warning');
        return;
    }

    updateSelectedSubjectsSummary();
    bootstrap.Modal.getOrCreateInstance(document.getElementById('confirmStartModal')).show();
}

async function startQuiz() {
    if (!isValidSelection()) {
        showToast('Selection required', 'Choose Engineering or Medical before continuing.', 'warning');
        return;
    }

    const modalElement = document.getElementById('confirmStartModal');
    const modalProceedBtn = document.getElementById('modalProceedBtn');
    if (modalProceedBtn) modalProceedBtn.disabled = true;

    currentSelectedSubjects = getSelectedSubjects();
    currentQuestionIndex = 0;
    userAnswers = {};
    quizStartTime = new Date();
    timeRemaining = MOCK.durationSeconds;

    try {
        await apiCall(`/api/users/${currentUser.id}/category`, 'POST', { category: MOCK.category });
    } catch (_error) {
        // continue even if the category update fails
    }

    allQuestions = getAllQuestions(MOCK.category, currentSelectedSubjects);
    if (!allQuestions.length) {
        if (modalProceedBtn) modalProceedBtn.disabled = false;
        showToast('No questions', 'Add questions to the bank before starting the mock.', 'error');
        return;
    }

    const modalInstance = modalElement ? bootstrap.Modal.getInstance(modalElement) : null;
    if (modalInstance) modalInstance.hide();
    document.body.classList.remove('modal-open');
    document.body.style.removeProperty('padding-right');
    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => backdrop.remove());

    document.getElementById('selectionSection').classList.add('d-none');
    document.getElementById('quizSection').classList.remove('d-none');
    document.getElementById('resultsSection').classList.add('d-none');

    buildQuestionNavigator();
    loadQuestion(0);
    startTimer(true);
    if (modalProceedBtn) modalProceedBtn.disabled = false;
}

function buildQuestionNavigator() {
    const navigator = document.getElementById('questionNavigator');
    navigator.innerHTML = '';

    allQuestions.forEach((_question, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'nav-badge';
        button.id = `nav-btn-${index}`;
        button.textContent = index + 1;
        button.onclick = () => goToQuestion(index);
        navigator.appendChild(button);
    });
}

function updateQuestionNavigator() {
    allQuestions.forEach((_question, index) => {
        const button = document.getElementById(`nav-btn-${index}`);
        if (!button) return;
        button.className = 'nav-badge';
        if (index === currentQuestionIndex) button.classList.add('current');
        if (userAnswers[index] !== undefined) button.classList.add('answered');
    });
}

function loadQuestion(index) {
    currentQuestionIndex = index;
    const question = allQuestions[index];
    if (!question) return;

    document.getElementById('currentSubject').textContent = question.subjectName;
    document.getElementById('questionNumber').textContent = `Question ${index + 1}`;
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('questionProgress').textContent = `${index + 1}/${allQuestions.length}`;
    document.getElementById('progressBar').style.width = `${((index + 1) / allQuestions.length) * 100}%`;

    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    (question.options || []).forEach((option, optionIndex) => {
        const letter = ['A', 'B', 'C', 'D', 'E'][optionIndex];
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `option-card ${userAnswers[index] === letter ? 'selected' : ''}`;
        button.innerHTML = `<span class="option-letter">${letter}</span><span class="option-text">${option}</span>`;
        button.onclick = () => selectAnswer(letter);
        optionsContainer.appendChild(button);
    });

    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = index === allQuestions.length - 1;
    updateQuestionNavigator();
}

function selectAnswer(answer) {
    userAnswers[currentQuestionIndex] = answer;
    loadQuestion(currentQuestionIndex);
}

function previousQuestion() {
    if (currentQuestionIndex > 0) loadQuestion(currentQuestionIndex - 1);
}

function nextQuestion() {
    if (currentQuestionIndex < allQuestions.length - 1) loadQuestion(currentQuestionIndex + 1);
}

function goToQuestion(index) {
    loadQuestion(index);
}

function startTimer(forceReset = false) {
    const endTimeKey = `acejamb_mock_end_time_${currentUser.id}`;
    if (forceReset) localStorage.removeItem(endTimeKey);

    const savedEndTime = parseInt(localStorage.getItem(endTimeKey), 10);
    if (savedEndTime) {
        timeRemaining = Math.max(0, Math.round((savedEndTime - Date.now()) / 1000));
    } else {
        localStorage.setItem(endTimeKey, String(Date.now() + timeRemaining * 1000));
    }

    updateTimerDisplay();
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        const stored = parseInt(localStorage.getItem(endTimeKey), 10);
        timeRemaining = stored ? Math.max(0, Math.round((stored - Date.now()) / 1000)) : Math.max(0, timeRemaining - 1);
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            showToast('Time up', 'Your mock test has been submitted automatically.', 'warning');
            confirmSubmit();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const timerElement = document.getElementById('timerDisplay');
    if (timerElement) timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const timerBox = document.getElementById('timerBox');
    if (timerBox) {
        timerBox.classList.remove('warning', 'danger');
        if (timeRemaining <= 60) timerBox.classList.add('danger');
        else if (timeRemaining <= 300) timerBox.classList.add('warning');
    }
}

function submitQuiz() {
    const answeredCount = Object.keys(userAnswers).length;
    const unansweredCount = allQuestions.length - answeredCount;
    document.getElementById('submitWarning').textContent = unansweredCount > 0
        ? `You still have ${unansweredCount} unanswered question(s). Submit anyway?`
        : 'All questions are answered. Submit now?';

    bootstrap.Modal.getOrCreateInstance(document.getElementById('confirmSubmitModal')).show();
}

async function confirmSubmit() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('confirmSubmitModal'));
    if (modal) modal.hide();

    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    const endTimeKey = `acejamb_mock_end_time_${currentUser.id}`;
    localStorage.removeItem(endTimeKey);

    const results = calculateResults();

    try {
        await apiCall('/api/results', 'POST', results);
        localStorage.setItem('acejamb_device_locked', '1');
    } catch (error) {
        const message = error?.message || 'Could not save results to the server right now.';
        if (/already submitted/i.test(message)) {
            showToast('Submission blocked', 'This account has already submitted the mock test.', 'warning');
        } else {
            showToast('Warning', message, 'warning');
        }
    }

    showResults(results);
}

function calculateResults() {
    const rawSubjectScores = {};
    const subjectScores = {};
    const subjectTotals = {};

    currentSelectedSubjects.forEach((subjectKey) => {
        rawSubjectScores[subjectKey] = 0;
        subjectTotals[subjectKey] = getSubjectTargetCount(subjectKey);
    });

    allQuestions.forEach((question, index) => {
        if (userAnswers[index] === question.answer) {
            rawSubjectScores[question.subject] = (rawSubjectScores[question.subject] || 0) + 1;
        }
    });

    Object.entries(rawSubjectScores).forEach(([subjectKey, rawScore]) => {
        const total = subjectTotals[subjectKey] || getSubjectTargetCount(subjectKey);
        subjectScores[subjectKey] = total ? Math.round((rawScore / total) * 100) : 0;
        subjectTotals[subjectKey] = 100;
    });

    const totalScore = Object.values(subjectScores).reduce((sum, value) => sum + value, 0);
    const totalQuestions = 400;
    const examTotalQuestions = allQuestions.length || currentSelectedSubjects.reduce((sum, subject) => sum + getSubjectTargetCount(subject), 0);
    const percentage = Math.round((totalScore / totalQuestions) * 100);
    const timeSpent = Math.round((MOCK.durationSeconds - timeRemaining) / 60);

    return {
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        category: MOCK.category,
        totalScore,
        totalQuestions,
        examTotalQuestions,
        percentage,
        subjectScores,
        subjectTotals,
        timeSpent,
        date: new Date().toISOString(),
        answers: userAnswers,
        selectedSubjects: currentSelectedSubjects,
    };
}

function showResults(results) {
    document.getElementById('quizSection').classList.add('d-none');
    document.getElementById('resultsSection').classList.remove('d-none');

    const overallPercent = Math.round((results.totalScore / results.totalQuestions) * 100);
    const trophyCircle = document.getElementById('trophyCircle');
    const resultIcon = document.getElementById('resultIcon');
    const resultMessage = document.getElementById('resultMessage');

    trophyCircle.className = 'trophy-badge';
    if (overallPercent >= 80) {
        trophyCircle.classList.add('gold');
        resultIcon.className = 'fas fa-trophy';
        resultMessage.textContent = 'Outstanding work.';
    } else if (overallPercent >= 60) {
        trophyCircle.classList.add('silver');
        resultIcon.className = 'fas fa-medal';
        resultMessage.textContent = 'Good performance. Keep going.';
    } else {
        trophyCircle.classList.add('bronze');
        resultIcon.className = 'fas fa-book-open';
        resultMessage.textContent = 'Keep studying and try again later.';
    }

    document.getElementById('finalScoreDisplay').textContent = `Final Score: ${results.totalScore}/${results.totalQuestions}`;

    const breakdown = document.getElementById('subjectBreakdown');
    const subjectNames = getSubjectNames('science', currentSelectedSubjects);
    breakdown.innerHTML = Object.entries(results.subjectScores || {}).map(([subject, score]) => {
        const total = results.subjectTotals?.[subject] || getSubjectTargetCount(subject);
        const pct = total ? Math.round((score / total) * 100) : 0;
        return `
            <div class="breakdown-item">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <strong>${subjectNames[subject] || subject}</strong>
                    <span>${score}/${total}</span>
                </div>
                <div class="progress breakdown-progress">
                    <div class="progress-bar" style="width:${pct}%"></div>
                </div>
            </div>
        `;
    }).join('');
}

function getSubjectNames(category, selectedSubjects = null) {
    const bank = (typeof questionsData !== 'undefined' && questionsData[category]) ? questionsData[category] : {};
    const keys = Array.isArray(selectedSubjects) && selectedSubjects.length ? selectedSubjects : Object.keys(bank);
    const names = {};

    keys.forEach((subject) => {
        if (bank[subject]) names[subject] = bank[subject].name;
    });

    return names;
}

function getSubjectTargetCount(subjectKey) {
    const targets = {
        english: 60,
        maths: 40,
        physics: 40,
        biology: 40,
        chemistry: 40,
    };
    return targets[subjectKey] || 40;
}

function updateCardCounts() {
    const count = document.getElementById('scienceQuestionCount');
    if (count) count.textContent = '180';
}

document.addEventListener('DOMContentLoaded', () => {
    updateCardCounts();

    const savedUser = sessionStorage.getItem('acejamb_currentUser');
    const deviceLocked = localStorage.getItem('acejamb_device_locked') === '1';

    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        if (deviceLocked) {
            apiCall(`/api/users/${currentUser.id}`).then((freshUser) => {
                if (freshUser && freshUser.deviceReset) {
                    localStorage.removeItem('acejamb_device_locked');
                    return apiCall(`/api/users/${currentUser.id}/acknowledge-reset`, 'POST');
                }
            }).catch(() => { }).finally(() => {
                showSelectionSection();
            });
        } else {
            showSelectionSection();
        }
    }
});
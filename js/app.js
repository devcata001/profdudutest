// Study With Prof Dudu - Main Quiz Application
// ============================================
// Using Backend API

// API Base URL (will be updated for production)
const API_BASE = '';

// Global Variables
let currentUser = null;
let currentCategory = null;
let pendingCategory = null;
let currentQuestionIndex = 0;
let allQuestions = [];
let currentSelectedSubjects = [];
let userAnswers = {};
let timerInterval = null;
let timeRemaining = 90 * 60; // 1 hour 30 minutes in seconds
let quizStartTime = null;
let subjectSelections = {};

// ============================================
// API HELPER FUNCTIONS
// ============================================

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
        const text = await response.text();

        let result;
        try {
            result = JSON.parse(text);
        } catch (parseErr) {
            console.error('Non-JSON response from', endpoint, ':', text.slice(0, 200));
            throw new Error('Server error — please try again shortly.');
        }

        if (!response.ok) {
            throw new Error(result.message || 'Request failed');
        }

        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

function getSelectionStorageKey() {
    return currentUser ? `profdudu_subject_selection_${currentUser.id}` : 'profdudu_subject_selection';
}

function loadSubjectSelections() {
    if (!currentUser) return;

    const key = getSelectionStorageKey();
    let saved = null;

    try {
        saved = JSON.parse(sessionStorage.getItem(key) || 'null');
    } catch (error) {
        console.warn('Invalid subject selection data:', error);
    }

    subjectSelections = saved && typeof saved === 'object' ? saved : {};

    ['science', 'arts', 'commercial'].forEach(category => {
        if (!Array.isArray(subjectSelections[category]) || !subjectSelections[category].length) {
            subjectSelections[category] = getDefaultSubjectSelection(category);
        } else {
            const available = getAvailableSubjects(category);
            const required = getRequiredSubjects(category);
            const unique = [...new Set(subjectSelections[category])].filter(subject => available.includes(subject));
            required.forEach(subject => {
                if (available.includes(subject) && !unique.includes(subject)) unique.unshift(subject);
            });
            subjectSelections[category] = unique.slice(0, MAX_MOCK_SUBJECTS);
        }
    });

    saveSubjectSelections();
}

function saveSubjectSelections() {
    if (!currentUser) return;
    sessionStorage.setItem(getSelectionStorageKey(), JSON.stringify(subjectSelections));
}

function getSelectedSubjects(category) {
    if (!Array.isArray(subjectSelections[category]) || !subjectSelections[category].length) {
        subjectSelections[category] = getDefaultSubjectSelection(category);
    }
    return [...subjectSelections[category]];
}

function setSelectedSubjects(category, subjects) {
    const available = getAvailableSubjects(category);
    const required = getRequiredSubjects(category).filter(subject => available.includes(subject));
    const sanitized = [...new Set(subjects)].filter(subject => available.includes(subject));

    required.forEach(subject => {
        if (!sanitized.includes(subject)) sanitized.unshift(subject);
    });

    subjectSelections[category] = sanitized.slice(0, MAX_MOCK_SUBJECTS);
    saveSubjectSelections();
}

function isValidSelection(category, subjects) {
    const required = getRequiredSubjects(category);
    return Array.isArray(subjects)
        && subjects.length === MAX_MOCK_SUBJECTS
        && required.every(subject => subjects.includes(subject));
}

function renderSubjectSelectionCards() {
    if (typeof questionsData === 'undefined') return;

    const config = {
        science: {
            id: 'scienceSubjectSelection',
            statusId: 'scienceSelectionStatus',
            note: 'Choose 2 more subjects.',
        },
        arts: {
            id: 'artsSubjectSelection',
            statusId: 'artsSelectionStatus',
            note: 'Choose 3 more subjects.',
        },
        commercial: {
            id: 'commercialSubjectSelection',
            statusId: 'commercialSelectionStatus',
            note: 'Choose 3 more subjects.',
        }
    };

    Object.entries(config).forEach(([category, details]) => {
        const container = document.getElementById(details.id);
        const status = document.getElementById(details.statusId);
        if (!container || !status || !questionsData[category]) return;

        const subjects = questionsData[category];
        const required = getRequiredSubjects(category);
        const selected = getSelectedSubjects(category);

        container.innerHTML = `
            <div class="subject-selection-header">
                <span class="subject-selection-title">Pick 4 subjects total</span>
                <span class="subject-selection-count">${selected.length}/${MAX_MOCK_SUBJECTS} selected</span>
            </div>
            <div class="subject-selection-grid">
                ${Object.entries(subjects).map(([subjectKey, subject]) => {
            const checked = selected.includes(subjectKey);
            const compulsory = required.includes(subjectKey);
            return `
                        <label class="subject-option ${checked ? 'selected' : ''} ${compulsory ? 'compulsory' : ''}">
                            <input type="checkbox"
                                   data-category="${category}"
                                   data-subject="${subjectKey}"
                                   ${checked ? 'checked' : ''}
                                   ${compulsory ? 'disabled' : ''}>
                            <span class="subject-option-info">
                                <span class="subject-option-name">${subject.name}</span>
                                <span class="subject-option-meta">${compulsory ? 'Compulsory' : 'Optional'}</span>
                            </span>
                            <span class="subject-option-check"><i class="fas fa-check"></i></span>
                        </label>
                    `;
        }).join('')}
            </div>
        `;

        status.innerHTML = `
            <div class="selection-chip ${isValidSelection(category, selected) ? 'ready' : 'pending'}">
                <i class="fas ${isValidSelection(category, selected) ? 'fa-check-circle' : 'fa-info-circle'} me-2"></i>
                ${isValidSelection(category, selected)
                ? 'Ready to start'
                : `${details.note} Compulsory: ${required.map(s => subjects[s]?.name || s).join(', ')}`}
            </div>
        `;

        container.querySelectorAll('input[type="checkbox"]').forEach(input => {
            input.addEventListener('change', (event) => {
                const cat = event.target.dataset.category;
                const subjectKey = event.target.dataset.subject;
                const chosen = getSelectedSubjects(cat);

                if (event.target.checked) {
                    if (chosen.length >= MAX_MOCK_SUBJECTS) {
                        event.target.checked = false;
                        showToast('Limit reached', `Select only ${MAX_MOCK_SUBJECTS} subjects.`, 'warning');
                        return;
                    }
                    if (!chosen.includes(subjectKey)) chosen.push(subjectKey);
                } else {
                    const requiredSubjects = getRequiredSubjects(cat);
                    if (requiredSubjects.includes(subjectKey)) {
                        event.target.checked = true;
                        return;
                    }
                    const next = chosen.filter(subject => subject !== subjectKey);
                    setSelectedSubjects(cat, next);
                }

                if (event.target.checked) setSelectedSubjects(cat, chosen);
                renderSubjectSelectionCards();
                updateCardCounts();
            });
        });
    });
}

function updateSelectedSubjectsSummary(category) {
    const list = document.getElementById('selectedSubjectsList');
    if (!list || !questionsData[category]) return;

    const selected = getSelectedSubjects(category);
    list.innerHTML = selected.map(subjectKey => {
        const subject = questionsData[category][subjectKey];
        return `<span class="selected-subject-pill">${subject ? subject.name : subjectKey}</span>`;
    }).join('');
}

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

function showToast(title, message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');

    toastTitle.textContent = title;
    toastMessage.textContent = message;

    toast.classList.remove('bg-success', 'bg-danger', 'bg-warning', 'bg-info');
    if (type === 'success') toast.classList.add('bg-success', 'text-white');
    else if (type === 'error') toast.classList.add('bg-danger', 'text-white');
    else if (type === 'warning') toast.classList.add('bg-warning');

    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();
}

function showLogin() {
    document.getElementById('loginForm').classList.remove('d-none');
    document.getElementById('registerForm').classList.add('d-none');
}

function showRegister() {
    document.getElementById('loginForm').classList.add('d-none');
    document.getElementById('registerForm').classList.remove('d-none');
}

async function register() {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showToast('Error', 'Please fill in all fields', 'error');
        return;
    }

    if (!email.includes('@')) {
        showToast('Error', 'Please enter a valid email address', 'error');
        return;
    }

    if (password.length < 6) {
        showToast('Error', 'Password must be at least 6 characters', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showToast('Error', 'Passwords do not match', 'error');
        return;
    }

    try {
        await apiCall('/api/register', 'POST', { name, email, password });
        showToast('Success', 'Registration successful! Please login.', 'success');
        showLogin();

        // Clear form
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

    if (!email || !password) {
        showToast('Error', 'Please enter email and password', 'error');
        return;
    }

    try {
        const result = await apiCall('/api/login', 'POST', { email, password });
        currentUser = result.user;
        sessionStorage.setItem('profdudu_currentUser', JSON.stringify(currentUser));

        // If admin reset this user, clear the device lock so they can retake
        if (currentUser.deviceReset) {
            localStorage.removeItem('profdudu_device_locked');
            await apiCall(`/api/users/${currentUser.id}/acknowledge-reset`, 'POST');
            currentUser.deviceReset = false;
            sessionStorage.setItem('profdudu_currentUser', JSON.stringify(currentUser));
        }

        // Also clear device lock for freshly registered/re-registered users (deleted and re-signed up)
        if (!currentUser.quizAttempted) {
            localStorage.removeItem('profdudu_device_locked');
        }

        showToast('Welcome', `Welcome back, ${currentUser.name}!`, 'success');
        showCategorySection();
    } catch (error) {
        showToast('Error', error.message || 'Invalid email or password', 'error');
    }
}

function logout() {
    currentUser = null;
    currentSelectedSubjects = [];
    subjectSelections = {};
    sessionStorage.removeItem('profdudu_currentUser');

    // Stop timer if running
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    // Reset UI
    document.getElementById('authSection').classList.remove('d-none');
    document.getElementById('categorySection').classList.add('d-none');
    document.getElementById('quizSection').classList.add('d-none');
    document.getElementById('resultsSection').classList.add('d-none');
    document.getElementById('userDisplay').classList.add('d-none');
    document.getElementById('logoutBtn').classList.add('d-none');

    // Clear login form
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
}

async function showCategorySection() {
    // Enforce device lock even if somehow reached directly
    if (localStorage.getItem('profdudu_device_locked') === '1') {
        document.getElementById('authSection').classList.add('d-none');
        document.getElementById('categorySection').classList.add('d-none');
        document.getElementById('deviceLockedSection').classList.remove('d-none');
        return;
    }

    document.getElementById('authSection').classList.add('d-none');
    document.getElementById('categorySection').classList.remove('d-none');

    // Update user display for new UI
    const userNameEl = document.getElementById('userName');
    if (userNameEl) {
        userNameEl.textContent = currentUser.name;
    }
    document.getElementById('userDisplay').classList.remove('d-none');
    document.getElementById('logoutBtn').classList.remove('d-none');

    loadSubjectSelections();
    renderSubjectSelectionCards();
    updateCardCounts();

    // Check if user has already attempted quiz
    try {
        const userResult = await apiCall(`/api/results/${currentUser.id}`);
        const freshUser = await apiCall(`/api/users/${currentUser.id}`);

        if (userResult) {
            // User has already attempted
            document.getElementById('alreadyAttempted').classList.remove('d-none');
            document.getElementById('attemptedMessage').textContent =
                `You have already completed the ${userResult.category.toUpperCase()} quiz with a score of ${userResult.totalScore}/${userResult.totalQuestions}.`;

            // Disable all cards
            document.getElementById('scienceCard').classList.add('disabled');
            document.getElementById('artsCard').classList.add('disabled');
            document.getElementById('commercialCard').classList.add('disabled');
        } else {
            document.getElementById('alreadyAttempted').classList.add('d-none');

            if (freshUser && freshUser.category) {
                // User started but didn't finish - lock the other categories
                ['science', 'arts', 'commercial'].forEach(cat => {
                    const el = document.getElementById(cat + 'Card');
                    if (el) el.classList.add('disabled');
                });
                const activeEl = document.getElementById(freshUser.category + 'Card');
                if (activeEl) activeEl.classList.remove('disabled');
            } else {
                document.getElementById('scienceCard').classList.remove('disabled');
                document.getElementById('artsCard').classList.remove('disabled');
                document.getElementById('commercialCard').classList.remove('disabled');
            }
        }
    } catch (error) {
        console.error('Error checking user status:', error);
        document.getElementById('scienceCard').classList.remove('disabled');
        document.getElementById('artsCard').classList.remove('disabled');
        document.getElementById('commercialCard').classList.remove('disabled');
    }
}

// ============================================
// QUIZ FUNCTIONS
// ============================================

// Called by category buttons — shows confirmation modal
function confirmStartQuiz(category) {
    if (category) {
        const selected = getSelectedSubjects(category);
        if (!isValidSelection(category, selected)) {
            showToast('Selection required', `Pick exactly ${MAX_MOCK_SUBJECTS} subjects before starting.`, 'warning');
            return;
        }

        // Called from the card button: store category and show modal
        pendingCategory = category;
        const names = { science: 'Science', arts: 'Arts', commercial: 'Commercial' };
        document.getElementById('startCategoryName').textContent = names[category] || category;
        updateSelectedSubjectsSummary(category);

        const modal = new bootstrap.Modal(document.getElementById('confirmStartModal'));
        modal.show();
    } else {
        // Called from modal "Yes" button: close modal and start
        const modal = bootstrap.Modal.getInstance(document.getElementById('confirmStartModal'));
        if (modal) modal.hide();
        startQuiz(pendingCategory);
    }
}

async function startQuiz(category) {
    currentCategory = category;
    currentSelectedSubjects = getSelectedSubjects(category);
    currentQuestionIndex = 0;
    userAnswers = {};
    timeRemaining = 90 * 60; // Reset timer to 1 hour 30 minutes
    quizStartTime = new Date();

    // Lock user's category choice
    try {
        await apiCall(`/api/users/${currentUser.id}/category`, 'POST', { category });
    } catch (error) {
        console.error('Error locking category:', error);
    }

    // Get all questions for this category
    allQuestions = getAllQuestions(category, currentSelectedSubjects);

    // Show quiz section
    document.getElementById('categorySection').classList.add('d-none');
    document.getElementById('quizSection').classList.remove('d-none');

    // Build question navigator
    buildQuestionNavigator();

    // Load first question
    loadQuestion(0);

    // Start timer (fresh duration for each new attempt)
    startTimer(true);
}

function buildQuestionNavigator() {
    const navigator = document.getElementById('questionNavigator');
    navigator.innerHTML = '';

    allQuestions.forEach((q, index) => {
        const btn = document.createElement('button');
        btn.className = 'nav-btn';
        btn.textContent = index + 1;
        btn.onclick = () => goToQuestion(index);
        btn.id = `nav-btn-${index}`;
        btn.title = q.subjectName;
        navigator.appendChild(btn);
    });
}

function updateQuestionNavigator() {
    allQuestions.forEach((q, index) => {
        const btn = document.getElementById(`nav-btn-${index}`);
        btn.className = 'nav-btn';

        if (index === currentQuestionIndex) {
            btn.classList.add('current');
        }

        if (userAnswers[index] !== undefined && userAnswers[index] !== '') {
            btn.classList.add('answered');
        }
    });
}

function loadQuestion(index) {
    currentQuestionIndex = index;
    const question = allQuestions[index];

    // Update subject display
    document.getElementById('currentSubject').textContent = question.subjectName;

    // Update question number
    document.getElementById('questionNumber').textContent = `Question ${index + 1}`;
    document.getElementById('questionText').textContent = question.question;

    // Update progress
    document.getElementById('questionProgress').textContent = `${index + 1}/${allQuestions.length}`;
    const progress = ((index + 1) / allQuestions.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;

    // Build options
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    if (question.type === 'structural') {
        // Structural question — text input
        const wrapper = document.createElement('div');
        wrapper.className = 'structural-wrapper';

        const label = document.createElement('p');
        label.className = 'structural-label';
        label.innerHTML = '<i class="fas fa-pencil-alt me-2"></i>Type your answer below:';

        const textarea = document.createElement('textarea');
        textarea.className = 'structural-input';
        textarea.placeholder = 'Enter your answer here...';
        textarea.rows = 3;
        textarea.value = userAnswers[index] || '';
        textarea.addEventListener('input', () => {
            userAnswers[index] = textarea.value.trim() ? textarea.value : undefined;
            updateQuestionNavigator();
        });

        wrapper.appendChild(label);
        wrapper.appendChild(textarea);
        optionsContainer.appendChild(wrapper);

        // Auto-focus the textarea
        setTimeout(() => textarea.focus(), 50);
    } else {
        // MCQ question — option buttons
        const letters = ['A', 'B', 'C', 'D', 'E'];
        question.options.forEach((option, i) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            if (userAnswers[index] === letters[i]) {
                btn.classList.add('selected');
            }
            btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span class="option-text">${option}</span>`;
            btn.onclick = () => selectAnswer(letters[i]);
            optionsContainer.appendChild(btn);
        });
    }

    // Update navigation buttons
    document.getElementById('prevBtn').disabled = index === 0;

    // Disable next button on last question
    if (index === allQuestions.length - 1) {
        document.getElementById('nextBtn').disabled = true;
    } else {
        document.getElementById('nextBtn').disabled = false;
    }

    // Update navigator
    updateQuestionNavigator();
}

function selectAnswer(answer) {
    userAnswers[currentQuestionIndex] = answer;

    // Update UI
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.classList.remove('selected'));

    const letters = ['A', 'B', 'C', 'D', 'E'];
    const index = letters.indexOf(answer);
    if (index !== -1) {
        buttons[index].classList.add('selected');
    }

    updateQuestionNavigator();
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        loadQuestion(currentQuestionIndex - 1);
    }
}

function nextQuestion() {
    if (currentQuestionIndex < allQuestions.length - 1) {
        loadQuestion(currentQuestionIndex + 1);
    }
}

function goToQuestion(index) {
    loadQuestion(index);
}

function startTimer(forceReset = false) {
    // Use wall-clock end time so the timer survives tab switches / browser closes
    const endTimeKey = 'profdudu_quiz_end_time_' + (currentUser && currentUser.id);
    if (forceReset) {
        localStorage.removeItem(endTimeKey);
    }
    const saved = localStorage.getItem(endTimeKey);
    if (saved) {
        const remaining = Math.round((parseInt(saved) - Date.now()) / 1000);
        timeRemaining = remaining > 0 ? remaining : 0;
    } else {
        localStorage.setItem(endTimeKey, Date.now() + timeRemaining * 1000);
    }

    updateTimerDisplay();

    timerInterval = setInterval(() => {
        // Always recalculate from wall-clock so pausing the tab doesn't pause the timer
        const endTime = parseInt(localStorage.getItem(endTimeKey));
        timeRemaining = endTime ? Math.max(0, Math.round((endTime - Date.now()) / 1000)) : timeRemaining - 1;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            showToast('Time Up!', 'Your quiz has been automatically submitted.', 'warning');
            confirmSubmit();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const timerElement = document.getElementById('timerDisplay');
    const timerBox = document.getElementById('timerBox');
    timerElement.textContent = display;

    // Change color based on time remaining
    if (timerBox) {
        timerBox.classList.remove('warning', 'danger');
        if (timeRemaining <= 60) {
            timerBox.classList.add('danger');
        } else if (timeRemaining <= 300) {
            timerBox.classList.add('warning');
        }
    }
}

function submitQuiz() {
    // Count unanswered questions
    const answeredCount = Object.keys(userAnswers).length;
    const unansweredCount = allQuestions.length - answeredCount;

    const warning = document.getElementById('submitWarning');
    if (unansweredCount > 0) {
        warning.textContent = `You have ${unansweredCount} unanswered question(s). Are you sure you want to submit?`;
    } else {
        warning.textContent = 'You have answered all questions. Ready to submit?';
    }

    const modal = new bootstrap.Modal(document.getElementById('confirmSubmitModal'));
    modal.show();
}

async function confirmSubmit() {
    // Close modal if open
    const modal = bootstrap.Modal.getInstance(document.getElementById('confirmSubmitModal'));
    if (modal) modal.hide();

    // Stop timer and clear persisted end time
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    if (currentUser) {
        localStorage.removeItem('profdudu_quiz_end_time_' + currentUser.id);
    }

    // Calculate results
    const results = calculateResults();

    // Save results to server
    try {
        await apiCall('/api/results', 'POST', results);
        // Lock this device — no account can re-sit the exam in this browser
        localStorage.setItem('profdudu_device_locked', '1');
    } catch (error) {
        console.error('Error saving results:', error);
        showToast('Warning', 'Could not save results to server', 'warning');
    }

    // Show results section
    showResults(results);
}

function calculateResults() {
    let totalScore = 0;
    const subjectScores = {};
    const subjectTotals = {};

    // Initialize subject scores
    const subjectsInUse = currentSelectedSubjects.length ? currentSelectedSubjects : Object.keys(questionsData[currentCategory] || {});
    for (const subjectKey of subjectsInUse) {
        subjectScores[subjectKey] = 0;
        subjectTotals[subjectKey] = Math.min(QUESTIONS_PER_SUBJECT, questionsData[currentCategory][subjectKey].questions.length);
    }

    // Helper: normalize text for structural comparison
    function normalizeAns(str) {
        return (str || '').trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.,;:!?]+$/, '');
    }

    // Calculate raw scores
    allQuestions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        let isCorrect = false;

        if (question.type === 'structural') {
            const userNorm = normalizeAns(userAnswer);
            if (userNorm) {
                isCorrect = question.acceptableAnswers.some(a => {
                    const aNorm = normalizeAns(a);
                    // Accept if exact match, or user's answer contains the key phrase
                    return userNorm === aNorm || userNorm.includes(aNorm);
                });
            }
        } else {
            isCorrect = userAnswer === question.answer;
        }

        if (isCorrect) {
            subjectScores[question.subject]++;
        }
    });

    // Normalize each selected subject to /100 using (subjectScore / 30) * 100
    for (const subjectKey in subjectScores) {
        const rawScore = subjectScores[subjectKey];
        const normalizedScore = Math.round((rawScore / QUESTIONS_PER_SUBJECT) * 100);

        subjectScores[subjectKey] = normalizedScore;
        subjectTotals[subjectKey] = 100;
        totalScore += normalizedScore;
    }

    const totalQuestions = MAX_MOCK_SUBJECTS * 100;
    const percentage = Math.round((totalScore / totalQuestions) * 100);
    const timeSpent = Math.round((90 * 60 - timeRemaining) / 60); // in minutes

    return {
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        category: currentCategory,
        totalScore: totalScore,
        totalQuestions: totalQuestions,
        percentage: percentage,
        subjectScores: subjectScores,
        subjectTotals: subjectTotals,
        timeSpent: timeSpent,
        date: new Date().toISOString(),
        answers: userAnswers
    };
}

function showResults(results) {
    document.getElementById('quizSection').classList.add('d-none');
    document.getElementById('resultsSection').classList.remove('d-none');

    // Update result message and trophy based on overall performance
    const trophyCircle = document.getElementById('trophyCircle');
    const resultIcon = document.getElementById('resultIcon');
    const resultMessage = document.getElementById('resultMessage');
    const overallPercent = Math.round((results.totalScore / results.totalQuestions) * 100);

    trophyCircle.className = 'trophy-circle';

    if (overallPercent >= 80) {
        trophyCircle.classList.add('gold');
        resultIcon.className = 'fas fa-trophy';
        resultMessage.textContent = 'Excellent! Outstanding performance!';
    } else if (overallPercent >= 60) {
        trophyCircle.classList.add('silver');
        resultIcon.className = 'fas fa-medal';
        resultMessage.textContent = 'Good job! You did well!';
    } else if (overallPercent >= 40) {
        trophyCircle.classList.add('bronze');
        resultIcon.className = 'fas fa-thumbs-up';
        resultMessage.textContent = 'Fair performance. Keep studying!';
    } else {
        trophyCircle.classList.add('default');
        resultIcon.className = 'fas fa-book-reader';
        resultMessage.textContent = 'Keep learning! Practice makes perfect.';
    }

    const finalScoreDisplay = document.getElementById('finalScoreDisplay');
    if (finalScoreDisplay) {
        finalScoreDisplay.textContent = `Final Score: ${results.totalScore}/${results.totalQuestions}`;
    }

    // Build subject breakdown with new UI
    const breakdown = document.getElementById('subjectBreakdown');
    breakdown.innerHTML = '';

    const subjectNames = getSubjectNames(currentCategory, currentSelectedSubjects);

    for (const subject in results.subjectScores) {
        const score = results.subjectScores[subject];
        const total = results.subjectTotals[subject];
        const percent = Math.round((score / total) * 100);

        const div = document.createElement('div');
        div.className = 'subject-score-item';

        let progressClass = 'success';
        if (percent < 40) progressClass = 'danger';
        else if (percent < 60) progressClass = 'warning';

        div.innerHTML = `
            <div class="subject-score-header">
                <span class="subject-score-name">${subjectNames[subject]}</span>
                <span class="subject-score-value">${score}/${total}</span>
            </div>
            <div class="subject-progress">
                <div class="subject-progress-bar ${progressClass}" style="width: ${percent}%"></div>
            </div>
        `;
        breakdown.appendChild(div);
    }
}

// ============================================
// UPDATE CARD COUNTS
// ============================================

function updateCardCounts() {
    if (typeof questionsData === 'undefined') return;

    const categories = ['science', 'arts', 'commercial'];

    categories.forEach(cat => {
        const totalQuestions = MAX_MOCK_SUBJECTS * QUESTIONS_PER_SUBJECT;

        // Update the card count display
        const card = document.getElementById(cat + 'Card');
        if (card) {
            const countElement = card.querySelector('.count-number');
            if (countElement) {
                countElement.textContent = totalQuestions;
            }
        }
    });
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // Update question counts on cards
    updateCardCounts();
    renderSubjectSelectionCards();

    // If device is locked, still show the login form so a reset user can log in
    // The actual lock enforcement happens in showCategorySection after login
    const deviceLocked = localStorage.getItem('profdudu_device_locked') === '1';
    if (deviceLocked) {
        // Show auth so a reset user can log in and clear the lock
        document.getElementById('authSection').classList.remove('d-none');
        document.getElementById('deviceLockedSection').classList.add('d-none');
    }

    // Check if user is already logged in
    const savedUser = sessionStorage.getItem('profdudu_currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        loadSubjectSelections();
        // If device is locked, check server for a reset before proceeding
        if (deviceLocked) {
            apiCall(`/api/users/${currentUser.id}`).then(freshUser => {
                if (freshUser && freshUser.deviceReset) {
                    localStorage.removeItem('profdudu_device_locked');
                    return apiCall(`/api/users/${currentUser.id}/acknowledge-reset`, 'POST');
                }
            }).catch(() => { }).finally(() => {
                showCategorySection();
            });
        } else {
            showCategorySection();
        }
    }

    // ── Prevent page refresh during quiz (SECURITY — DISABLED) ──────────────
    // window.addEventListener('beforeunload', function (e) {
    //     if (timerInterval) {
    //         e.preventDefault();
    //         e.returnValue = 'You have an ongoing quiz. Are you sure you want to leave?';
    //     }
    // });
});

// ── Auto-submit on tab switch (SECURITY — DISABLED) ──────────────────────────
// document.addEventListener('visibilitychange', function () {
//     if (!timerInterval) return;
//     if (document.hidden) {
//         clearInterval(timerInterval);
//         timerInterval = null;
//         showToast('⚠ Exam Terminated', 'Your exam has been auto-submitted because you switched tabs!', 'error');
//         setTimeout(() => confirmSubmit(), 1200);
//     }
// });

// window.addEventListener('blur', function () {
//     if (!timerInterval) return;
//     showToast('⚠ Stay Focused', 'Please stay on this tab during the exam!', 'warning');
// });

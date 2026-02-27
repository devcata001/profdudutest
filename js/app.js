// Study With Prof Dudu - Main Quiz Application
// ============================================
// Using Backend API

// API Base URL (will be updated for production)
const API_BASE = '';

// Global Variables
let currentUser = null;
let currentCategory = null;
let currentQuestionIndex = 0;
let allQuestions = [];
let userAnswers = {};
let timerInterval = null;
let timeRemaining = 30 * 60; // 30 minutes in seconds
let quizStartTime = null;

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

        showToast('Welcome', `Welcome back, ${currentUser.name}!`, 'success');
        showCategorySection();
    } catch (error) {
        showToast('Error', error.message || 'Invalid email or password', 'error');
    }
}

function logout() {
    currentUser = null;
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

    // Check if user has already attempted quiz
    try {
        const userResult = await apiCall(`/api/results/${currentUser.id}`);
        const freshUser = await apiCall(`/api/users/${currentUser.id}`);

        if (userResult) {
            // User has already attempted
            document.getElementById('alreadyAttempted').classList.remove('d-none');
            document.getElementById('attemptedMessage').textContent =
                `You have already completed the ${userResult.category.toUpperCase()} quiz with a score of ${userResult.totalScore}/${userResult.totalQuestions} (${userResult.percentage}%).`;

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

async function startQuiz(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    userAnswers = {};
    timeRemaining = 30 * 60; // Reset timer to 30 minutes
    quizStartTime = new Date();

    // Lock user's category choice
    try {
        await apiCall(`/api/users/${currentUser.id}/category`, 'POST', { category });
    } catch (error) {
        console.error('Error locking category:', error);
    }

    // Get all questions for this category
    allQuestions = getAllQuestions(category);

    // Show quiz section
    document.getElementById('categorySection').classList.add('d-none');
    document.getElementById('quizSection').classList.remove('d-none');

    // Build question navigator
    buildQuestionNavigator();

    // Load first question
    loadQuestion(0);

    // Start timer
    startTimer();
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

function startTimer() {
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeRemaining--;
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

    // Stop timer
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
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
    for (const subjectKey in questionsData[currentCategory]) {
        subjectScores[subjectKey] = 0;
        subjectTotals[subjectKey] = questionsData[currentCategory][subjectKey].questions.length;
    }

    // Helper: normalize text for structural comparison
    function normalizeAns(str) {
        return (str || '').trim().toLowerCase().replace(/\s+/g, ' ').replace(/[.,;:!?]+$/, '');
    }

    // Calculate scores
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
            totalScore++;
            subjectScores[question.subject]++;
        }
    });

    const percentage = Math.round((totalScore / allQuestions.length) * 100);
    const timeSpent = Math.round((30 * 60 - timeRemaining) / 60); // in minutes

    return {
        userId: currentUser.id,
        userName: currentUser.name,
        userEmail: currentUser.email,
        category: currentCategory,
        totalScore: totalScore,
        totalQuestions: allQuestions.length,
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

    // Update result message and trophy based on percentage
    const trophyCircle = document.getElementById('trophyCircle');
    const resultIcon = document.getElementById('resultIcon');
    const resultMessage = document.getElementById('resultMessage');

    trophyCircle.className = 'trophy-circle';

    if (results.percentage >= 80) {
        trophyCircle.classList.add('gold');
        resultIcon.className = 'fas fa-trophy';
        resultMessage.textContent = 'Excellent! Outstanding performance!';
    } else if (results.percentage >= 60) {
        trophyCircle.classList.add('silver');
        resultIcon.className = 'fas fa-medal';
        resultMessage.textContent = 'Good job! You did well!';
    } else if (results.percentage >= 40) {
        trophyCircle.classList.add('bronze');
        resultIcon.className = 'fas fa-thumbs-up';
        resultMessage.textContent = 'Fair performance. Keep studying!';
    } else {
        trophyCircle.classList.add('default');
        resultIcon.className = 'fas fa-book-reader';
        resultMessage.textContent = 'Keep learning! Practice makes perfect.';
    }

    // Update scores
    document.getElementById('totalScore').textContent = results.totalScore;
    document.getElementById('totalQuestions').textContent = results.totalQuestions;
    document.getElementById('percentage').textContent = `${results.percentage}%`;
    document.getElementById('timeSpent').textContent = results.timeSpent;

    // Build subject breakdown with new UI
    const breakdown = document.getElementById('subjectBreakdown');
    breakdown.innerHTML = '';

    const subjectNames = getSubjectNames(currentCategory);

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
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    // Check device-level lock first (prevents any account on this browser from re-sitting)
    if (localStorage.getItem('profdudu_device_locked') === '1') {
        document.getElementById('authSection').classList.add('d-none');
        document.getElementById('deviceLockedSection').classList.remove('d-none');
        return; // Stop all further init
    }

    // Check if user is already logged in
    const savedUser = sessionStorage.getItem('profdudu_currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showCategorySection();
    }

    // Prevent page refresh during quiz
    window.addEventListener('beforeunload', function (e) {
        if (timerInterval) {
            e.preventDefault();
            e.returnValue = 'You have an ongoing quiz. Are you sure you want to leave?';
        }
    });
});

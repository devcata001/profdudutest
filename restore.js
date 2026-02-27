// restore.js — rebuild users.json and results.json from quiz_results.csv
const fs = require('fs');
const path = require('path');

const csv = fs.readFileSync(path.join(__dirname, 'quiz_results.csv'), 'utf8');
const lines = csv.trim().split('\n').slice(1); // skip header

const users = [];
const results = [];

lines.forEach((line, i) => {
    // parse CSV line respecting quoted fields
    const cols = [];
    let cur = '', inQ = false;
    for (const ch of line) {
        if (ch === '"') { inQ = !inQ; }
        else if (ch === ',' && !inQ) { cols.push(cur); cur = ''; }
        else cur += ch;
    }
    cols.push(cur);

    const [name, email, category, score, total, pctRaw, timeRaw, date] = cols;
    const id = Date.now() + i * 7; // unique ids
    const percentage = parseInt(pctRaw);
    const timeSpent = timeRaw === 'N/A' ? null : parseInt(timeRaw);

    users.push({
        id,
        name,
        email,
        password: 'student123',   // default — they can't log in anyway (portal closed)
        registeredDate: date,
        quizAttempted: true,
        category
    });

    results.push({
        userId: id,
        userName: name,
        userEmail: email,
        category,
        totalScore: parseInt(score),
        totalQuestions: parseInt(total),
        percentage,
        timeSpent,
        date,
        subjectScores: {}
    });
});

fs.writeFileSync(path.join(__dirname, 'data/users.json'), JSON.stringify(users, null, 2));
fs.writeFileSync(path.join(__dirname, 'data/results.json'), JSON.stringify(results, null, 2));

console.log(`✅ Restored ${users.length} students and ${results.length} results.`);

# Study With Prof Dudu - Quiz Application

A comprehensive quiz application for students to test their knowledge in Science and Arts subjects.

## Features

### Student Features

- **User Registration & Login**: Simple authentication system
- **Two Quiz Categories**:
  - **Science**: Mathematics, English, Physics, Biology, Chemistry (50 questions)
  - **Arts**: English, Literature, Government, CRS (40 questions)
- **30-minute Timer**: Automatic submission when time expires
- **One Attempt Only**: Students can only take the quiz once
- **Category Lock**: Once a student selects Science or Arts, the other category is locked
- **Question Navigator**: Easy navigation between questions
- **Progress Tracking**: Visual progress bar and question status
- **Instant Results**: Detailed score breakdown by subject

### Admin Features

- **Dashboard Overview**: Stats, averages, top performers
- **View All Results**: Search, filter, and export results
- **Science Results**: Detailed breakdown by science subjects
- **Arts Results**: Detailed breakdown by arts subjects
- **Student Management**: View registered students, reset attempts, delete students
- **Export to CSV**: Download results for external analysis

## Subjects & Questions

### Science Track (50 Questions)

| Subject     | Questions |
| ----------- | --------- |
| Mathematics | 10        |
| English     | 10        |
| Physics     | 10        |
| Biology     | 10        |
| Chemistry   | 10        |

### Arts Track (40 Questions)

| Subject                           | Questions |
| --------------------------------- | --------- |
| English                           | 10        |
| Literature                        | 10        |
| Government                        | 10        |
| CRS (Christian Religious Studies) | 10        |

## How to Run

### Option 1: Open directly in browser

Simply open `index.html` in any modern web browser.

### Option 2: Using a local server

For best experience, use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

Then open `http://localhost:8000` in your browser.

## File Structure

```
profdudutest/
├── index.html          # Main student interface
├── admin.html          # Admin dashboard
├── css/
│   └── style.css       # All styles
├── js/
│   ├── app.js          # Main application logic
│   ├── admin.js        # Admin dashboard logic
│   └── questions.js    # Question database
├── questions/          # Original PDF questions (reference)
└── README.md           # This file
```

## Admin Access

**Default Admin Credentials:**

- Username: `admin`
- Password: `admin123`

Access the admin panel at `admin.html`

## Technologies Used

- HTML5
- CSS3
- Bootstrap 5.3.2
- Font Awesome 6.4.2
- Vanilla JavaScript
- LocalStorage for data persistence

## Data Storage

All data is stored in the browser's LocalStorage:

- `profdudu_users`: Registered students
- `profdudu_results`: Quiz results

**Note**: Data will be lost if browser data is cleared.

## Quiz Rules

1. Students must register and login before taking the quiz
2. Each student can only attempt ONE quiz (Science OR Arts)
3. Quiz duration is 30 minutes for both categories
4. Once a category is selected, the other becomes locked
5. Quiz auto-submits when time expires
6. Results are displayed immediately after submission
7. Students cannot retake the quiz (admin can reset if needed)

## Customization

### Adding More Questions

Edit `js/questions.js` to add or modify questions. Follow the existing format:

```javascript
{
    id: 1,
    question: "Your question here?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    answer: "A"  // Correct answer letter
}
```

### Changing Timer Duration

In `js/app.js`, modify the `timeRemaining` variable (in seconds):

```javascript
timeRemaining = 30 * 60; // 30 minutes
```

### Changing Admin Credentials

In `js/admin.js`, modify the `ADMIN_CREDENTIALS` object:

```javascript
const ADMIN_CREDENTIALS = {
  username: "your_username",
  password: "your_password",
};
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

© 2025 Study With Prof Dudu. All Rights Reserved.

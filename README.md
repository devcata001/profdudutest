# AceJAMB

AceJAMB is a clean, green-and-white UTME mock test app.

## Flow

1. Register or login
2. Choose subjects
3. Review the final warning page
4. Start the real exam

## Subject rules

- English is compulsory
- Physics is compulsory
- Candidate chooses one track:
  - Engineering: Physics, Chemistry, Mathematics, English
  - Medical: Physics, Chemistry, Biology, English
- Total exam length: 180 questions

## Question plan

- English: 60 questions
- Physics: 40 questions
- Mathematics: 40 questions
- Biology: 40 questions
- Chemistry: 40 questions

## Run locally

```bash
npm install
npm start
```

Open:

- Student portal: http://localhost:8080
- Admin portal: http://localhost:8080/admin.html

## Admin login

- Username: admin
- Password: admin123

## Notes

The question bank is ready for your next upload. Add or replace the questions in js/questions.js.

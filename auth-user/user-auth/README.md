# user-auth

Simple Node + Express user auth demo with a clean frontend (vanilla HTML/CSS/JS).

## Features

- Login and Register forms with a smooth switch animation.
- Centered feedback messages under each card (errors in red).
- Backend routes mounted at `/api/auth`.

## Prerequisites

- Node.js 14+ installed
- npm

## Install

1. From project root:
   npm install

## Run

1. Start server:
   npm start
2. Open in browser:
   http://localhost:3000

## Frontend

- Files in `public/`
  - `public/index.html` — forms and layout
  - `public/styles.css` — UI styles (feedback centered)
  - `public/js/main.js` — handles form switching, POST requests and shows feedback
- The frontend posts to:
  - POST /api/auth/login
  - POST /api/auth/register

If your auth router uses different paths, update `public/js/main.js` endpoints to match.

## Backend

- `server.js` mounts the auth router:
  app.use('/api/auth', require('./routes/auth'));
- Ensure your router defines POST `/login` and POST `/register`.
- Ensure JSON parsing middleware is enabled:
  app.use(express.json()) or app.use(bodyParser.json())

## Troubleshooting

- "Cannot POST /login" → frontend called `/login` but server expects `/api/auth/login`. Fix by updating `public/js/main.js` or add matching route on server.
- Check the browser Network tab for request URL, status and response body.
- Server logs: check terminal where Node is running.

## Where to edit

- Change endpoints: `public/js/main.js`
- Change UI: `public/styles.css` and `public/index.html`
- Backend routes: `routes/auth.js` and `server.js`

## Notes

- Feedback divs are hidden when empty to avoid layout shifts.
- Replace placeholder auth logic with your real authentication and validation.

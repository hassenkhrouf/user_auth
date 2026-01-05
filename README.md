# Express.js Register & Login Backend (bcrypt)

This project is a tutorial demonstrating a minimal Express.js backend for user registration and login using the `bcrypt` library for password hashing.

## Features
- Register users with hashed passwords
- Login with password verification
- Minimal, in-memory user store (for demo/tutorial only)

## Prerequisites
- Node.js (v16+)
- npm

## Install
```sh
npm install
```

## Run
```sh
npm start
```

## Endpoints
- POST /register
  - Body: `{ "email": "user@example.com", "password": "secret" }`
  - Returns 201 on success
- POST /login
  - Body: `{ "email": "user@example.com", "password": "secret" }`
  - Returns 200 on success

## Notes
- Passwords are hashed with `bcrypt` (saltRounds = 10).
- Users are stored in-memory (`users` array) — replace with a database for production.
- Add input validation, rate limiting, HTTPS, and session/token handling for real apps.

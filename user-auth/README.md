# Express.js User Authentication

This project is a minimal Express.js backend for user registration and login functionality, utilizing the `bcrypt` library for password hashing and providing a simple front-end interface for testing.

## Project Structure
```
user-auth
├── public
│   ├── index.html        # Main HTML page for testing
│   └── js
│       └── main.js       # Client-side JavaScript for handling form submissions
├── routes
│   └── auth.js           # Routes for user authentication
├── server.js             # Entry point of the application
├── package.json          # npm configuration file
└── README.md             # Project documentation
```

## Features
- User registration with hashed passwords
- User login with password verification
- Simple front-end for testing the functionality

## Prerequisites
- Node.js (v16+)
- npm

## Installation
Run the following command to install the necessary dependencies:
```sh
npm install
```

## Running the Application
Start the server with:
```sh
npm start
```

## Endpoints
- **POST /register**
  - Body: `{ "email": "user@example.com", "password": "secret" }`
  - Returns 201 on success
- **POST /login**
  - Body: `{ "email": "user@example.com", "password": "secret" }`
  - Returns 200 on success

## Notes
- Passwords are hashed using `bcrypt` with a salt round of 10.
- User data is stored in-memory for demonstration purposes; consider using a database for production applications.
- For a production-ready application, implement input validation, rate limiting, HTTPS, and session/token management.
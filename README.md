# AI Habit Tracker

A full-stack MERN application for tracking habits with AI-powered coaching.

## Features

- **User Authentication**: Secure signup and login with JWT.
- **Habit Management**: Create, update, delete, and track daily habits.
- **Calendar View**: Visualize your progress on a monthly/weekly calendar.
- **AI Coach**: Get personalized advice and motivation from Google Gemini AI.
- **Modern UI**: Built with React, Tailwind CSS, and DaisyUI.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, DaisyUI, React Router, Axios.
- **Backend**: Node.js, Express.js, Mongoose, JWT.
- **Database**: MongoDB Atlas.
- **AI**: Google Gemini API.

## Getting Started

### Prerequisites

- Node.js installed.
- MongoDB Atlas URI.
- Google Gemini API Key.

### Installation

1.  **Clone the repository** (if applicable) or navigate to the project folder.

2.  **Backend Setup**:
    ```bash
    cd server
    npm install
    ```
    Create a `.env` file in the `server` directory:
    ```env
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    GEMINI_API_KEY=your_gemini_api_key
    PORT=5000
    ```
    Start the server:
    ```bash
    npm start
    ```

3.  **Frontend Setup**:
    ```bash
    cd client
    npm install
    ```
    Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

## Usage

1.  Sign up for a new account.
2.  Add habits you want to track.
3.  Check off habits as you complete them.
4.  View your progress on the calendar.
5.  Ask the AI Coach for advice on how to improve.

## License

MIT

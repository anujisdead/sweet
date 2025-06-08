# Filmmaking Organization Platform

A MERN stack application for filmmaking organization and collaboration.

## Project Structure
```
├── client/             # React frontend
├── server/             # Node.js/Express backend
└── README.md
```

## Features (Current)
- User authentication with modal popups for Login, Signup, and Forgot Password
- Modern, responsive dashboard with sidebar navigation
- Draggable sidebar: Resize the sidebar by dragging the vertical handle
- Customizable font: Dashboard uses 'Courier New', 16pt for a classic script look
- Animated rolling titles on the home page
- Theme toggle (light/dark mode)
- Placeholder sections for Projects, Ideas, Team, and more
- Highly responsive and accessible UI

## Features (Planned)
- Project management
- Team collaboration
- AI-powered features (coming soon)
- File sharing and organization
- Timeline management

## Tech Stack
- MongoDB: Database
- Express.js: Backend framework
- React: Frontend framework (with styled-components & framer-motion)
- Node.js: Runtime environment
- Styled-components: Theming and custom styles
- Framer Motion: Animations

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation
1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

### Running the Application
1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```
2. Start the frontend development server:
   ```bash
   cd client
   npm start
   ```

## Usage Notes
- Access the dashboard at: http://localhost:3000/dashboard
- Drag the vertical handle between the sidebar and main content to resize the sidebar (min: 180px, max: 400px)
- The dashboard uses 'Courier New', 16pt for all text for a screenplay-inspired look
- The home page features animated rolling titles and a modern authentication modal
- Easily switch between light and dark themes using the toggle in the top left

## Development
- Backend runs on: http://localhost:5000
- Frontend runs on: http://localhost:3000

## License
MIT
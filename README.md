# AI Recruitment Dashboard

A modern, responsive B2B recruiting platform dashboard with AI-assisted features for talent acquisition professionals.

## Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Modern UI**: Clean interface with intuitive navigation and smooth animations
- **AI Assistant**: Interactive chatbot with speech-to-text and text-to-speech capabilities
- **Data Visualization**: Comprehensive recruitment metrics and insights
- **Candidate Management**: Streamlined tracking of applicants through the hiring pipeline
- **Job Management**: Easy organization of open positions and applicant volume

## Technology Stack

- React 18 with TypeScript
- TailwindCSS for styling
- Framer Motion for animations
- Zustand for state management
- Recharts for data visualization

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/Krishnapc04/AI-Recruitment-Dashboard.git
cd ai-recruitment-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
  ├── components/       # Reusable UI components
  │   ├── layout/       # Layout components (Sidebar, Navbar)
  │   └── ui/           # UI components (Button, Input, Card)
  ├── data/             # Mock data for demonstration
  ├── pages/            # Application pages
  ├── services/         # API and external service integrations
  ├── store/            # State management with Zustand
  ├── types/            # TypeScript type definitions
  ├── App.tsx           # Main application component
  └── main.tsx          # Application entry point
```

## API Integration

The application integrates with the following endpoints:

- `/api/tts` - Text-to-speech conversion
- `/api/stt/{id}` - Speech-to-text conversion
- `/ws/stt/{id}` - WebSocket for real-time voice transcription

## Deployment

This application can be easily deployed to Vercel or Netlify.

### Demo

[View Live Demo](https://ai-recruitment-dashboard.vercel.app) (placeholder link)

## License

MIT

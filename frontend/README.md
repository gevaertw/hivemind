# Hivemind Frontend

A modern React frontend for the Hivemind Customer Intelligence Platform.

## Features

- **Profile Selector**: Choose your role (Customer Success Manager, Sales Executive, Support Lead, etc.) to get personalized insights
- **Customer Activity Overview**: View customer interactions and events with a configurable time period (24 hours, 7 days, 2 weeks, etc.)
- **AI Chat Interface**: Chat with your customer data to get role-specific insights and recommendations

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS v4** for styling
- **Radix UI** primitives for accessible components
- **Lucide React** for icons

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components (Button, Card, Select, etc.)
│   ├── ProfileSelector.tsx    # Role/profile selection component
│   ├── PeriodSelector.tsx     # Time period selection component
│   ├── CustomerOverview.tsx   # Customer activity timeline
│   └── ChatInterface.tsx      # AI chat interface
├── data/
│   └── mockData.ts            # Mock data for development
├── lib/
│   └── utils.ts               # Utility functions
├── types/
│   └── index.ts               # TypeScript type definitions
├── App.tsx                    # Main application component
├── main.tsx                   # Application entry point
└── index.css                  # Global styles with Tailwind
```

## User Interactions

1. **Profile Selection**: Select your role from the sidebar to personalize the experience
2. **Period Selection**: Choose a time period to filter customer activity (e.g., last 7 days)
3. **Activity Timeline**: Browse customer events grouped by date with sentiment indicators
4. **Chat with Data**: Ask questions about your customers and get AI-powered insights based on your role

## Mock Data

The application includes realistic mock data for 5 customers and 15+ customer events across different types:
- Emails, calls, meetings
- Support tickets
- Purchases
- Feedback and social mentions

## Connecting to Backend

To connect to a real backend API:

1. Create an API service in `src/services/api.ts`
2. Replace mock data imports with API calls
3. Update the chat interface to call your AI/LLM endpoint

## License

ISC

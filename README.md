# GTM Navigator

An interactive workspace that provides a single source of truth for go-to-market strategy. GTM Navigator guides founders through a stage-gated framework, connecting foundational business assumptions to testable experiments and measurable progress.

## Overview

GTM Navigator helps founders and teams:
- 📋 Document their strategic canvas with market truths and objectives
- 🔄 Track product-market fit iterations through an interactive PMF cycle
- 📈 Progress through 5 GTM stages with clear goals and metrics
- 🎯 Define and validate go-to-market strategies systematically

## Features

### Strategic Canvas
- Market truths documentation
- Product and problem definition
- Target customer identification
- Competitive landscape mapping
- GTM objectives setting

### PMF Cycle
- Interactive hypothesis → test → analyze → decision workflow
- Iteration history tracking
- Pivot/validate decision support

### Stage-Gated Progress
- 5 progressive GTM stages
- Visual stage completion tracking
- Achievement badges for milestones
- Stage-specific strategy definition

### User Experience
- 💾 Automatic local storage persistence
- 🎨 Delightful animations and interactions
- 📊 Storage usage monitoring
- 📝 Integrated feedback system

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/gtm-navigator.git
cd gtm-navigator

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Configuration

### Access Codes
For the invite-only beta, valid access codes are defined in `/app/invite/page.tsx`:
- EARLY2025
- FOUNDER100
- GTMPILOT

### Tally.so Integration
Update the feedback form URL in `/components/ui/FeedbackButton.tsx`:
```javascript
const tallyFormUrl = 'https://tally.so/r/YOUR_FORM_ID';
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Project Structure
```
gtm-navigator/
├── app/                    # Next.js app directory
│   ├── (views)/           # Main application views
│   ├── invite/            # Invite-only access page
│   └── error.tsx          # Error boundary
├── components/            # React components
│   ├── canvas/           # Strategic canvas components
│   ├── strategy/         # Strategy definition components
│   ├── pmf/              # PMF cycle components
│   ├── modals/           # Modal components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and types
└── state/               # Zustand store
```

### Data Persistence
All data is stored in browser localStorage with automatic persistence on every state change. The data model includes:
- Project metadata
- Canvas data (market truths, product info, etc.)
- Stage progression data
- PMF cycle iterations

## Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/gtm-navigator)

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `.next` folder to any Node.js hosting service
3. Set up environment variables if needed
4. Configure domain and SSL

## Success Metrics

The application tracks:
- **Activation**: >50% of users completing the Strategic Canvas
- **Time-to-Value**: Median time to complete canvas <45 minutes
- **Engagement**: >30% completing at least one PMF cycle
- **Retention**: >15% returning within 7 days

## Contributing

This is currently a private beta project. For bug reports and feature requests, please use the in-app feedback button.

## License

Copyright (c) 2025 Bogdan Slobodian. All rights reserved.

## Acknowledgments

Built with ❤️ for founders navigating their go-to-market journey.
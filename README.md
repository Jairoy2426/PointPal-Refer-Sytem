# PointPal - Referral Rewards System

A modern referral and rewards platform built with React and TypeScript. Users can share referral codes with friends, earn points, and redeem rewards.

## Screenshots

![Landing Page](https://h3rcules.space/u/3bNY6q.png)
![Dashboard](https://h3rcules.space/u/gSqWif.png)
![Rewards Marketplace](https://h3rcules.space/u/asGAEl.png)

## Features

✨ **Referral System**
- Unique referral codes for each user (e.g., ASH123)
- Share via custom links or social media
- Automatic point attribution

🎁 **Rewards Marketplace**
- Browse available rewards
- Redeem points for exciting prizes
- Track redemption history

📊 **User Dashboard**
- Real-time points balance
- Referral statistics
- Rewards history

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Routing**: React Router v6
- **State Management**: React Context + TanStack Query
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- npm, yarn, or bun package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd point-pal-refer

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:8080`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## How It Works

1. **Sign Up**: Create an account and receive a unique referral code
2. **Share**: Invite friends using your referral link or code
3. **Earn Points**: 
   - Get 10 points for each successful referral
   - New users get 5 points when signing up with a referral code
4. **Redeem**: Browse the rewards marketplace and redeem your points

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ui/           # shadcn/ui components
│   ├── AuthForm.tsx  # Login/Signup forms
│   ├── Header.tsx    # Navigation header
│   └── ...           # Other components
├── context/          # React Context providers
│   └── AuthContext.tsx
├── pages/            # Route pages
│   ├── Index.tsx     # Landing page
│   ├── Dashboard.tsx # User dashboard
│   └── Rewards.tsx   # Rewards marketplace
├── types/            # TypeScript interfaces
├── utils/            # Utility functions
│   ├── referral.ts   # Referral code generation
│   ├── rewards.ts    # Reward management
│   └── localStorage-init.ts
└── lib/              # Shared libraries
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Configuration

### Tailwind Theme

Custom brand colors are defined in `tailwind.config.ts`:
- `brand-purple`: #9b87f5
- `brand-purpleDark`: #7E69AB
- `brand-softBlue`: #D3E4FD
- `brand-softPurple`: #E5DEFF
- `brand-softGreen`: #F2FCE2

### Environment

This demo uses localStorage for data persistence. In production, integrate with a proper Backend API.

## License

MIT License - feel free to use this project for your own purposes.

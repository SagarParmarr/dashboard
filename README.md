# FlawkTV Analytics Dashboard

A production-ready analytics dashboard for FlawkTV digital signage. Built with Next.js 16 and TypeScript, this platform helps restaurant owners understand their customer traffic, content engagement, and promotion performance.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)

## What It Does

This dashboard turns digital signage data into actionable insights. Track customer traffic patterns, see which menu items get attention, and measure how well promotions perform.

### Features

- Real-time metrics with trend indicators
- Traffic analytics with hourly/daily breakdowns
- Content engagement tracking
- Promotion ROI analysis
- Interactive charts and heatmaps
- Date range filtering
- Dark/Light mode toggle
- Fully responsive design

## Tech Stack

- **Framework**: Next.js 16.1 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **Charts**: Recharts
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/
│   ├── dashboard/page.tsx        # Main dashboard
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Tailwind styles
├── components/
│   ├── Sidebar.tsx               # Navigation
│   ├── TopMetrics.tsx            # KPI cards
│   ├── DashboardToolbar.tsx      # Filters and controls
│   ├── Charts.tsx                # Chart components
│   └── HeatmapChart.tsx          # Traffic heatmap
├── context/
│   └── ThemeContext.tsx          # Dark mode state
├── hooks/
│   └── useDashboardData.ts       # Custom hooks
└── lib/
    ├── types.ts                  # TypeScript types
    └── mockData.ts               # Mock data generator
```

## Getting Started

**Requirements**: Node.js 18+

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) and you'll be redirected to the dashboard.

## Dashboard Sections

**Overview** - Summary metrics, traffic trends, heatmaps, and top promotions

**Traffic Analytics** - Deep dive into customer traffic with hourly patterns and day-of-week analysis

**Content Engagement** - See which menu items and promotions catch attention

**Promotion Performance** - ROI metrics, conversion rates, and revenue impact

## Mock Data

Currently uses generated data for demo purposes. It simulates:

- 30 days of traffic history
- Peak hours at lunch (12-1 PM) and dinner (6-7 PM)
- Higher weekend traffic
- Realistic engagement rates (40-70%)

To customize, edit `src/lib/mockData.ts`.

## Connecting to Real Data

Replace the mock data functions in `src/lib/mockData.ts` with API calls. You'll need to:

1. Add environment variables for your API endpoint
2. Update the data fetching functions
3. Add loading states to components
4. Handle errors appropriately

## Available Commands

```bash
npm run dev       # Development server
npm run build     # Production build
npm start         # Run production server
npm run lint      # Run ESLint
```

## Filtering & Controls

Filter data by date range (Today, Yesterday, Last 7/30 days, Custom) and location. Export functionality is built-in but needs backend integration.

## Responsive Design

Works on desktop, tablet, and mobile. The sidebar collapses on smaller screens, and charts adapt to available space.

## Color Scheme

- Orange (#f97316) - Primary actions
- Slate - Text and borders
- Green - Positive metrics
- Blue - Information

## Deployment

**Vercel** (recommended): Connect your repo and it deploys automatically

**Self-hosted**: Run `npm run build` then `npm start`

## What's Next

- User authentication
- Real-time data updates
- Scheduled email reports
- Mobile app version

Built with Next.js 16 • Last updated 1st January 2026

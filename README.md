# FlawkTV Analytics Dashboard

A professional, production-ready analytics dashboard for FlawkTV digital signage systems. This platform provides comprehensive business intelligence for restaurant owners through interactive charts, real-time metrics, and actionable insights.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)

## 🎯 Overview

FlawkTV Analytics Dashboard transforms raw digital signage data into meaningful business insights. Restaurant owners can track customer traffic patterns, monitor content engagement, analyze promotion performance, and make data-driven decisions to optimize their operations.

### Key Features

✅ **Real-time Metrics Dashboard** - KPI summary cards with trend indicators
✅ **Traffic Analytics** - Hourly, daily, and weekly traffic patterns with heatmaps
✅ **Content Engagement Tracking** - Monitor menu special and promotion performance
✅ **Promotion ROI Analysis** - Sales correlation and conversion metrics
✅ **Interactive Visualizations** - Recharts for responsive, professional charts
✅ **Date Range Filtering** - Today, Yesterday, Last 7/30 days, or custom ranges
✅ **Export Functionality** - Generate and download business reports
✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
✅ **Professional UI** - Modern analytics platform design

## 🛠 Tech Stack

- **Framework**: [Next.js 16.1](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **UI Framework**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Utilities**: [date-fns](https://date-fns.org/)
- **Node Version**: 18+

## 📁 Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   └── page.tsx              # Main dashboard component
│   ├── globals.css               # Global Tailwind styles
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Redirects to dashboard
├── components/
│   ├── Sidebar.tsx               # Navigation sidebar with collapsible menu
│   ├── TopMetrics.tsx            # KPI metric cards with trends
│   ├── DashboardToolbar.tsx      # Date range and filter controls
│   ├── Charts.tsx                # Recharts components
│   └── HeatmapChart.tsx          # Interactive heatmap visualization
├── hooks/
│   └── useDashboardData.ts       # Custom hooks for state management
└── lib/
    ├── types.ts                  # TypeScript type definitions
    └── mockData.ts               # Mock data generation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd flawk-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

The dashboard will automatically redirect from the root path to `/dashboard`.

## 📊 Dashboard Sections

### Overview
Main dashboard view with:
- Top metrics summary (traffic, engagement, dwell time, revenue)
- Performance insights and recommendations
- Traffic trends and hourly patterns
- Traffic heatmap visualization
- Content engagement breakdown
- Top-performing promotions table

### Traffic Analytics
Detailed customer traffic analysis:
- Daily traffic comparison (current vs. previous period)
- Hourly traffic patterns throughout the day
- Day-of-week heatmap showing peak times
- Detailed traffic statistics and insights

### Content Engagement
Content performance tracking:
- Engagement rate by content type
- Total views and average view time
- Engagement breakdown pie chart
- Content performance rankings
- Engagement optimization insights

### Promotion Performance
Sales and ROI analysis:
- Promotion metrics and conversion rates
- Revenue impact analysis
- Sales correlation visualization
- ROI efficiency rankings
- Promotion optimization recommendations

## 🎨 Key Visualizations

- **Line Charts**: Traffic trends over time with period comparison
- **Bar Charts**: Hourly and daily traffic comparisons
- **Pie Charts**: Content engagement breakdown
- **Heatmaps**: Day vs. Hour traffic patterns with color intensity
- **Tables**: Detailed promotion performance metrics
- **Metric Cards**: KPI summaries with trend indicators and comparisons

## 📈 Mock Data

The dashboard includes realistic mock data generation:
- 30 days of historical traffic data
- Peak hours: 12-1 PM, 6-7 PM
- Weekend traffic boost: +15-20%
- Engagement rates: 40-70%
- Promotion revenue correlation

### Customizing Mock Data

Edit `src/lib/mockData.ts` to modify:
- `generateTrafficData()` - Traffic patterns
- `getContentEngagement()` - Content metrics
- `getTopPromotions()` - Promotion data
- `generateHeatmapData()` - Heatmap patterns

## 🔧 Available Scripts

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🎯 Filtering & Controls

### Date Range Selector
- **Today** - Current day metrics
- **Yesterday** - Previous day comparison
- **Last 7 Days** - Weekly view
- **Last 30 Days** - Monthly overview
- **Custom** - Select specific date range

### Filters
- **Location** - Filter by restaurant location (if multi-location)
- **Promotion** - Focus on specific promotions

### Export
- Generate downloadable reports (PDF/CSV format)
- Integration point for backend API

## 🔌 API Integration

Currently uses mock data for demonstration. To integrate with a real API:

1. Update `src/lib/mockData.ts` functions to fetch from API endpoints
2. Add environment variables for API configuration
3. Add error handling and loading states in components
4. Implement data caching if needed

## 📱 Responsive Design

The dashboard is fully responsive:
- **Desktop**: Full-width layout with sidebar
- **Tablet**: Optimized grid layouts, collapsible sidebar
- **Mobile**: Single column, touch-friendly controls

## ⚡ Performance Optimizations

- `useMemo` for expensive calculations
- `useCallback` for event handlers
- Recharts responsive containers for optimal rendering
- CSS-in-JS with Tailwind for minimal bundle size

## 🎨 Color Scheme

- **Primary Orange**: `#f97316` - Main CTAs and active states
- **Secondary Slate**: `#64748b` - Text and borders
- **Success Green**: `#16a34a` - Positive metrics
- **Info Blue**: `#2563eb` - Informational content

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repository to Vercel
3. Auto-deploys on push

### Self-Hosted
```bash
npm run build
npm start
```

## 🗺 Roadmap

- Phase 2: User authentication and role-based access
- Phase 3: Real-time data with WebSocket
- Phase 4: Email report scheduling
- Phase 5: Dark mode toggle
- Phase 6: Mobile app (React Native)

## 📖 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Recharts Documentation](https://recharts.org)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📄 License

Proprietary software for FlawkTV

---

**Status**: Production Ready
**Last Updated**: January 2026
**Node Version**: 18+

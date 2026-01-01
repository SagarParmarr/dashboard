# FlawkTV Analytics Dashboard - Development Guidelines

## Project Overview

This is a production-ready Next.js analytics dashboard for FlawkTV digital signage systems. The application provides comprehensive business intelligence for restaurant owners through interactive charts, real-time metrics, and actionable insights.

## Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Next.js 16.1.1 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 with PostCSS
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useMemo, useCallback)

## Project Structure

```
src/
├── app/
│   ├── dashboard/page.tsx      # Main dashboard component
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Redirects to /dashboard
│   └── globals.css             # Global Tailwind styles
├── components/
│   ├── Sidebar.tsx             # Navigation sidebar with menu
│   ├── TopMetrics.tsx          # KPI metric cards
│   ├── DashboardToolbar.tsx    # Date range and filters
│   ├── Charts.tsx              # Main chart components (Traffic, Hourly, Engagement, Promotions)
│   └── HeatmapChart.tsx        # Interactive heatmap visualization
├── hooks/
│   └── useDashboardData.ts     # Custom hooks for state management
└── lib/
    ├── types.ts                # TypeScript type definitions
    └── mockData.ts             # Mock data generation and utilities
```

## Key Features

### Dashboard Sections

1. **Overview** - Main dashboard with metrics summary and key insights
2. **Traffic Analytics** - Customer foot traffic analysis and patterns
3. **Content Engagement** - Menu special and promotion engagement tracking
4. **Promotion Performance** - Sales impact and ROI analysis

### Visualizations

- **Line Charts**: Traffic trends over time
- **Bar Charts**: Hourly and daily comparisons
- **Pie Charts**: Content engagement breakdown
- **Heatmaps**: Day vs. hour traffic patterns
- **Tables**: Promotion performance metrics
- **Metric Cards**: KPI summaries with trend indicators

## Development Guidelines

### Code Style

- Use functional components with TypeScript
- Define interfaces for all props in `src/lib/types.ts`
- Use 'use client' directive for interactive components
- Follow Tailwind CSS conventions for styling
- Use Lucide React icons for consistent iconography

### Adding New Features

1. **New Metric**:

   - Add type in `src/lib/types.ts`
   - Add calculation function in `src/lib/mockData.ts`
   - Create component in `src/components/`
   - Integrate into dashboard

2. **New Chart Type**:

   - Create component in `src/components/Charts.tsx` or new file
   - Use Recharts library
   - Include tooltips and legends
   - Add responsive container wrapper

3. **State Management**:
   - Add custom hook in `src/hooks/useDashboardData.ts`
   - Use React hooks (useState, useCallback, useMemo)
   - Export from hooks file for use in components

### API Integration

Currently uses mock data. To integrate with real API:

1. Update `src/lib/mockData.ts` functions to fetch from endpoints
2. Add error handling and loading states
3. Implement data caching if needed
4. Update types based on actual API responses

### Performance Considerations

- Use `useMemo` for expensive calculations
- Implement `useCallback` for event handlers
- Lazy load charts if needed
- Optimize re-renders with proper dependency arrays
- Use responsive containers for charts

### Testing

- Run `npm run lint` before committing
- Build with `npm run build` to check for errors
- Test responsive design on multiple devices
- Verify chart interactions work smoothly

## Color Scheme

**Primary**: Orange (#f97316) - Used for active states, main CTAs
**Secondary**: Slate (#64748b) - Used for text and borders
**Success**: Green (#16a34a) - Used for positive metrics
**Info**: Blue (#2563eb) - Used for informational content
**Background**: White with slate-50 accents

To change theme, update Tailwind classes throughout components.

## TypeScript Types

Key types defined in `src/lib/types.ts`:

```typescript
TrafficDataPoint; // Individual traffic measurement
HourlyTraffic; // Aggregated hourly data
DailyTraffic; // Aggregated daily data
ContentEngagement; // Menu special engagement
Promotion; // Promotion performance
HeatmapData; // Heatmap visualization data
DashboardMetrics; // Summary metrics
DateRange; // Date range selections
```

## Mock Data Structure

Mock data is generated in `src/lib/mockData.ts` with realistic patterns:

- 30 days of historical data
- Peak hours: 12-1 PM, 6-7 PM
- Weekend traffic boost: +15-20%
- Realistic engagement rates: 40-70%
- Promotion revenue correlation

To customize, edit generation functions.

## Component Hierarchy

```
Dashboard (page.tsx)
├── Sidebar
├── Main Content
│   ├── Header
│   ├── DashboardToolbar
│   │   ├── DateRangeSelector
│   │   └── FilterPanel
│   └── Content Sections
│       ├── TopMetrics
│       ├── Insight Cards
│       ├── TrafficChart
│       ├── HourlyTrafficChart
│       ├── HeatmapChart
│       ├── ContentEngagementChart
│       └── PromotionTable
```

## Deployment

### Development

```bash
npm run dev
# Runs on http://localhost:3000
```

### Production

```bash
npm run build
npm start
# Optimized build, ready for deployment
```

### Hosting Options

- Vercel (recommended for Next.js)
- AWS Amplify
- Google Cloud Run
- Self-hosted with Node.js

## Environment Variables

Currently no env variables needed. For API integration, add:

```
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_API_KEY=your-key-here
```

## Future Roadmap

- Phase 2: User authentication and role-based access
- Phase 3: Real-time data with WebSocket
- Phase 4: Email report scheduling
- Phase 5: Dark mode toggle
- Phase 6: Mobile app (React Native)

## Common Issues & Solutions

**Port Already in Use**:

```bash
npm run dev -- -p 3001
```

**TypeScript Errors**:

```bash
npm run build  # Check for type errors
```

**Module Not Found**:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Important Files

- `src/app/layout.tsx` - Metadata and global layout
- `src/app/dashboard/page.tsx` - Main dashboard component
- `src/lib/mockData.ts` - Data generation and API integration point
- `src/lib/types.ts` - TypeScript definitions
- `tailwind.config.ts` - Tailwind configuration (if created)

## Contact & Support

For development questions:

1. Check type definitions in `src/lib/types.ts`
2. Review component props and interfaces
3. Check mock data structure in `src/lib/mockData.ts`
4. Run build to identify TypeScript errors

## Git Workflow

```bash
# Feature branch
git checkout -b feature/feature-name

# Commit with clear messages
git commit -m "feat: add new metric visualization"

# Push and create pull request
git push origin feature/feature-name
```

---

Last Updated: January 2026
Status: Production Ready

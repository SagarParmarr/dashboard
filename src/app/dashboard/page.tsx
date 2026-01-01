'use client';

import { useState, useMemo, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { TopMetrics } from '@/components/TopMetrics';
import { DashboardToolbar } from '@/components/DashboardToolbar';
import { TrafficChart, HourlyTrafficChart, ContentEngagementChart, PromotionTable } from '@/components/Charts';
import { HeatmapChart } from '@/components/HeatmapChart';
import { useDateRange, useFilters, useComparison } from '@/hooks/useDashboardData';
import { calculateMetrics, getHourlyTraffic, getDailyTraffic, generateTrafficData, getContentEngagement, getTopPromotions, generateHeatmapData } from '@/lib/mockData';
import { AlertCircle, CheckCircle } from 'lucide-react';

type SectionType = 'overview' | 'traffic' | 'engagement' | 'promotions';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<SectionType>('overview');
  const [isClient, setIsClient] = useState(false);
  const { dateRange, handleDateRangeChange } = useDateRange();
  const { selectedLocation, setSelectedLocation, selectedPromotion, setSelectedPromotion } = useFilters();
  const { comparisonMode, setComparisonMode } = useComparison();

  // Ensure we only generate data on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const mockData = useMemo(() => {
    if (!isClient) return null;
    return {
      trafficData: generateTrafficData(),
      contentEngagement: getContentEngagement(),
      topPromotions: getTopPromotions(),
      heatmapData: generateHeatmapData(),
    };
  }, [isClient]);

  const metrics = useMemo(() => mockData ? calculateMetrics(mockData.trafficData) : null, [mockData]);
  const hourlyData = useMemo(() => mockData ? getHourlyTraffic(mockData.trafficData) : [], [mockData]);
  const dailyData = useMemo(() => mockData ? getDailyTraffic(mockData.trafficData) : [], [mockData]);

  const handleExport = () => {
    alert('Export functionality would prepare PDF/CSV reports. In production, this would connect to your backend.');
  };

  // Loading state during hydration
  if (!isClient || !mockData || !metrics) {
    return (
      <div className="flex h-screen bg-slate-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
              <div className="w-6 h-6 border-3 border-orange-300 border-t-orange-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-600 font-medium">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (!mockData) return null;
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <TopMetrics metrics={metrics} />

            {/* Insights Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900 dark:text-green-300">Strong Performance</h4>
                  <p className="text-sm text-green-800 dark:text-green-200">Traffic up 12.5% this week. Your busiest hours are 12-1 PM and 6-7 PM.</p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300">Recommendation</h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">Consider increasing staff during peak hours. ROI on promotions is excellent at 28%+ conversion.</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TrafficChart data={dailyData} title="Daily Traffic Comparison" />
              <HourlyTrafficChart data={hourlyData} />
            </div>

            <HeatmapChart data={mockData.heatmapData} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ContentEngagementChart data={mockData.contentEngagement} />
              <PromotionTable data={mockData.topPromotions} />
            </div>
          </div>
        );

      case 'traffic':
        return (
          <div className="space-y-6">
            <TopMetrics metrics={metrics} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TrafficChart data={dailyData} title="Weekly Traffic Trends" />
              <HourlyTrafficChart data={hourlyData} />
            </div>

            <HeatmapChart data={mockData.heatmapData} />

            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Traffic Analysis Details</h3>
              <div className="space-y-3 text-slate-700 dark:text-slate-300">
                <p><strong>Peak Hours:</strong> 12:00 PM - 1:00 PM, 6:00 PM - 7:00 PM</p>
                <p><strong>Slowest Hours:</strong> 9:00 AM - 10:00 AM, 3:00 PM - 4:00 PM</p>
                <p><strong>Busiest Days:</strong> Saturday (20% above average), Friday (15% above average)</p>
                <p><strong>Average Dwell Time:</strong> 12.5 minutes</p>
                <p><strong>Week-over-Week Growth:</strong> +12.5%</p>
              </div>
            </div>
          </div>
        );

      case 'engagement':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Engagement Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{(metrics.avgEngagementRate * 100).toFixed(1)}%</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">Average Engagement Rate</p>
                </div>
                <div className="text-center p-4">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{mockData.contentEngagement.reduce((sum, item) => sum + item.views, 0)}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">Total Content Views</p>
                </div>
                <div className="text-center p-4">
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">{mockData.topPromotions.length}</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">Active Promotions</p>
                </div>
              </div>
            </div>

            <ContentEngagementChart data={mockData.contentEngagement} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Content Performance</h3>
                <div className="space-y-3">
                  {mockData.contentEngagement.sort((a, b) => b.views - a.views).map((content, index) => (
                    <div key={content.contentId} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{content.contentName}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{content.views} views • {content.avgViewTime.toFixed(1)}s avg</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">{(content.engagementRate * 100).toFixed(0)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Engagement Insights</h3>
                <div className="space-y-3 text-slate-700 dark:text-slate-300 text-sm">
                  <p>✓ <strong>Most Engaging:</strong> BBQ Burger Special - 67% engagement rate</p>
                  <p>✓ <strong>Longest View Time:</strong> BBQ Burger Special - 8.5 seconds</p>
                  <p>✓ <strong>Trend:</strong> Food promotional content outperforms beverage content by 15%</p>
                  <p>✓ <strong>Recommendation:</strong> Rotate content every 7-10 days to maintain engagement</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'promotions':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">Total Promotion Revenue</p>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  ${(metrics.totalRevenue / 1000).toFixed(1)}k
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  ↑ 15.3% vs last period
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">Avg Conversion Rate</p>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {(mockData.topPromotions.reduce((sum, p) => sum + p.conversionRate, 0) / mockData.topPromotions.length * 100).toFixed(1)}%
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  Excellent performance
                </p>
              </div>
            </div>

            <PromotionTable data={mockData.topPromotions} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Sales Impact Analysis</h3>
                <div className="space-y-4">
                  {mockData.topPromotions.map((promo) => (
                    <div key={promo.id}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{promo.name}</span>
                        <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">${promo.revenue}</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-orange-600 h-2 rounded-full"
                          style={{ width: `${(promo.revenue / 3420) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Promotion ROI</h3>
                <div className="space-y-3 text-slate-700 dark:text-slate-300 text-sm">
                  <p>📊 <strong>Best Performer:</strong> BBQ Burger Special</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">542 views | 28% conversion | $3,420 revenue</p>
                  <hr className="my-3" />
                  <p>📊 <strong>Most Efficient:</strong> Dessert Combo Deal</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">421 views | 32% conversion | 71% efficiency ratio</p>
                  <hr className="my-3" />
                  <p>💡 <strong>Action Item:</strong> Increase rotation frequency of top 3 promotions to capitalize on momentum</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="flex-1 overflow-auto flex flex-col">
        {/* Toolbar - Sticky at top */}
        <DashboardToolbar
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
          onLocationChange={setSelectedLocation}
          onPromotionChange={setSelectedPromotion}
          selectedLocation={selectedLocation}
          selectedPromotion={selectedPromotion}
          onExport={handleExport}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {activeSection === 'overview' && 'Dashboard Overview'}
                {activeSection === 'traffic' && 'Traffic Analytics'}
                {activeSection === 'engagement' && 'Content Engagement'}
                {activeSection === 'promotions' && 'Promotion Performance'}
              </h1>
              <p className="text-slate-600 dark:text-slate-400">Track your restaurant business performance in real-time</p>
              
              {/* Active Filters Display */}
              {(selectedLocation !== 'All Locations' || selectedPromotion !== 'All Promotions') && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-blue-900 dark:text-blue-300">
                  <strong>Active Filters:</strong> 
                  {selectedLocation !== 'All Locations' && ` Location: ${selectedLocation}`}
                  {selectedLocation !== 'All Locations' && selectedPromotion !== 'All Promotions' && ' • '}
                  {selectedPromotion !== 'All Promotions' && `Promotion: ${selectedPromotion}`}
                </div>
              )}
            </div>

            {/* Main Content */}
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import { DashboardMetrics } from '@/lib/types';
import { TrendingUp, TrendingDown, Users, Eye, Clock, DollarSign } from 'lucide-react';

interface TopMetricsProps {
  metrics: DashboardMetrics;
}

interface MetricCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  unit?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  icon,
  trend,
  trendLabel,
  unit,
}) => {
  const isPositiveTrend = trend && trend > 0;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md dark:hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-2">{label}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{value}</h3>
            {unit && <span className="text-slate-500 dark:text-slate-400 text-sm">{unit}</span>}
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 dark:from-orange-900/20 to-orange-100 dark:to-orange-800/20 rounded-lg p-3 text-orange-600 dark:text-orange-400">
          {icon}
        </div>
      </div>

      {trend !== undefined && (
        <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
          {isPositiveTrend ? (
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>+{trend.toFixed(1)}%</span>
            </div>
          ) : trend === 0 ? (
            <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">No change</div>
          ) : (
            <div className="flex items-center gap-1 text-red-600 dark:text-red-400 text-sm font-medium">
              <TrendingDown className="w-4 h-4" />
              <span>{trend.toFixed(1)}%</span>
            </div>
          )}
          <span className="text-slate-500 dark:text-slate-400 text-xs">{trendLabel || 'vs last week'}</span>
        </div>
      )}
    </div>
  );
};

export const TopMetrics: React.FC<TopMetricsProps> = ({ metrics }) => {
  const trafficTrend =
    metrics.previousPeriodTraffic > 0
      ? ((metrics.totalTraffic - metrics.previousPeriodTraffic) /
          metrics.previousPeriodTraffic) *
        100
      : 0;

  const revenueTrend =
    metrics.previousPeriodRevenue > 0
      ? ((metrics.totalRevenue - metrics.previousPeriodRevenue) /
          metrics.previousPeriodRevenue) *
        100
      : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Total Traffic"
        value={metrics.totalTraffic.toLocaleString()}
        icon={<Users className="w-6 h-6" />}
        trend={trafficTrend}
        trendLabel="vs last week"
      />
      <MetricCard
        label="Avg Engagement Rate"
        value={(metrics.avgEngagementRate * 100).toFixed(1)}
        unit="%"
        icon={<Eye className="w-6 h-6" />}
      />
      <MetricCard
        label="Avg Dwell Time"
        value={metrics.avgDwellTime.toFixed(1)}
        unit="min"
        icon={<Clock className="w-6 h-6" />}
      />
      <MetricCard
        label="Total Revenue"
        value={`$${(metrics.totalRevenue / 1000).toFixed(1)}k`}
        icon={<DollarSign className="w-6 h-6" />}
        trend={revenueTrend}
        trendLabel="vs last week"
      />
    </div>
  );
};

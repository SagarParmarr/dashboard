'use client';

import { HeatmapData } from '@/lib/types';

interface HeatmapChartProps {
  data: HeatmapData[];
}

export const HeatmapChart: React.FC<HeatmapChartProps> = ({ data }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getColor = (value: number): string => {
    if (value >= 80) return 'bg-orange-700';
    if (value >= 60) return 'bg-orange-600';
    if (value >= 40) return 'bg-orange-500';
    if (value >= 20) return 'bg-orange-300';
    return 'bg-orange-100';
  };

  const maxValue = Math.max(
    ...data.flatMap((row) =>
      days.map((day) => {
        const val = row[day];
        return typeof val === 'number' ? val : 0;
      })
    )
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Traffic Heatmap: Day vs Hour</h3>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="flex gap-1 mb-2">
            <div className="w-16 flex-shrink-0" />
            {days.map((day) => (
              <div
                key={day}
                className="w-12 h-12 flex items-center justify-center text-xs font-semibold text-slate-900 dark:text-white"
              >
                {day.slice(0, 3)}
              </div>
            ))}
          </div>

          {data.map((row) => (
            <div key={row.hour} className="flex gap-1 mb-1">
              <div className="w-16 flex-shrink-0 flex items-center justify-end pr-3 text-xs font-medium text-slate-600 dark:text-slate-400">
                {row.hour}
              </div>
              {days.map((day) => {
                const rawValue = row[day];
                const value = typeof rawValue === 'number' ? rawValue : 0;
                const intensity = (value / maxValue) * 100;

                return (
                  <div
                    key={`${row.hour}-${day}`}
                    className={`w-12 h-12 flex items-center justify-center rounded text-white text-xs font-medium transition-all duration-200 hover:ring-2 hover:ring-offset-2 dark:hover:ring-offset-slate-800 hover:ring-orange-500 cursor-pointer ${getColor(
                      value
                    )}`}
                    title={`${day} ${row.hour}: ${value} customers`}
                  >
                    <span className="opacity-90">{value}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
        <div>Low traffic</div>
        <div className="flex gap-1">
          <div className="w-4 h-4 bg-orange-100 rounded" />
          <div className="w-4 h-4 bg-orange-300 rounded" />
          <div className="w-4 h-4 bg-orange-500 rounded" />
          <div className="w-4 h-4 bg-orange-600 rounded" />
          <div className="w-4 h-4 bg-orange-700 rounded" />
        </div>
        <div>High traffic</div>
      </div>

      <div className="mt-4 text-sm text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
        <p>💡 <strong>Insight:</strong> Lunch hours (12-1 PM) and dinner time (6-7 PM) show consistently higher traffic across all days. Weekends see 15-20% higher traffic during these peak hours.</p>
      </div>
    </div>
  );
};

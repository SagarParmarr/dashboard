'use client';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import { DailyTraffic, HourlyTraffic, ContentEngagement, Promotion } from '@/lib/types';

interface TrafficChartProps {
  data: DailyTraffic[];
  title?: string;
}

export const TrafficChart: React.FC<TrafficChartProps> = ({
  data,
  title = 'Daily Traffic Overview',
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis dataKey="day" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
            cursor={{ fill: 'rgba(249, 115, 22, 0.1)' }}
          />
          <Legend />
          <Bar dataKey="count" fill="#f97316" name="This Week" radius={[8, 8, 0, 0]} />
          <Bar
            dataKey="previous"
            fill="#cbd5e1"
            name="Last Week"
            radius={[8, 8, 0, 0]}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
        <p>📊 Peak days: {[...data].sort((a, b) => b.count - a.count)[0]?.day}</p>
      </div>
    </div>
  );
};

interface HourlyTrafficChartProps {
  data: HourlyTraffic[];
}

export const HourlyTrafficChart: React.FC<HourlyTrafficChartProps> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Hourly Traffic Pattern</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis dataKey="hour" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
            cursor={{ stroke: '#f97316' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#f97316"
            name="This Week"
            strokeWidth={2}
            dot={{ fill: '#f97316', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="previous"
            stroke="#cbd5e1"
            name="Last Week"
            strokeWidth={2}
            dot={{ fill: '#cbd5e1', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
        <p>⏰ Peak hours: 12:00-13:00 and 18:00-19:00</p>
      </div>
    </div>
  );
};

interface ContentEngagementChartProps {
  data: ContentEngagement[];
}

export const ContentEngagementChart: React.FC<ContentEngagementChartProps> = ({ data }) => {
  const pieData = data.map((item) => ({
    name: item.contentName,
    value: Math.round(item.views),
  }));

  const COLORS = ['#f97316', '#fb923c', '#fdba74', '#fed7aa', '#fecdd3'];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Content Engagement Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#f97316"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

interface PromotionTableProps {
  data: Promotion[];
}

export const PromotionTable: React.FC<PromotionTableProps> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm overflow-hidden">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Top Performing Promotions</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
              <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Promotion</th>
              <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">
                Views
              </th>
              <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">
                Avg View Time
              </th>
              <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">
                Engagement
              </th>
              <th className="text-center py-3 px-4 font-semibold text-slate-900 dark:text-white">Conversion</th>
              <th className="text-right py-3 px-4 font-semibold text-slate-900 dark:text-white">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {data.map((promotion, index) => (
              <tr
                key={promotion.id}
                className={`border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                  index === 0 ? 'bg-orange-50 dark:bg-orange-900/20' : ''
                }`}
              >
                <td className="py-3 px-4 text-slate-900 dark:text-white font-medium">{promotion.name}</td>
                <td className="text-center py-3 px-4 text-slate-600 dark:text-slate-400">{promotion.views}</td>
                <td className="text-center py-3 px-4 text-slate-600 dark:text-slate-400">
                  {promotion.avgViewTime.toFixed(1)}s
                </td>
                <td className="text-center py-3 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                    {(promotion.engagementRate * 100).toFixed(0)}%
                  </span>
                </td>
                <td className="text-center py-3 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    {(promotion.conversionRate * 100).toFixed(0)}%
                  </span>
                </td>
                <td className="text-right py-3 px-4 text-slate-900 dark:text-white font-semibold">
                  ${promotion.revenue.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

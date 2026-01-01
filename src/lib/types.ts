// Traffic data types
export interface TrafficDataPoint {
  timestamp: string;
  customerCount: number;
  location: string;
}

export interface HourlyTraffic {
  hour: string;
  count: number;
  previous: number;
}

export interface DailyTraffic {
  day: string;
  count: number;
  previous: number;
}

// Content engagement types
export interface ContentEngagement {
  contentId: string;
  contentName: string;
  views: number;
  avgViewTime: number;
  engagementRate: number;
  date: string;
}

export interface Promotion {
  id: string;
  name: string;
  views: number;
  avgViewTime: number;
  engagementRate: number;
  conversionRate: number;
  revenue: number;
}

// Heatmap data
export interface HeatmapData {
  hour: string;
  [day: string]: string | number;
}

// Dashboard metrics
export interface DashboardMetrics {
  totalTraffic: number;
  avgEngagementRate: number;
  avgDwellTime: number;
  totalRevenue: number;
  previousPeriodTraffic: number;
  previousPeriodRevenue: number;
}

// Date range
export type DateRange = "today" | "yesterday" | "7days" | "30days" | "custom";

export interface DateRangeValue {
  start: Date;
  end: Date;
  label: string;
}

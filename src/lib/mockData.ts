import {
  TrafficDataPoint,
  HourlyTraffic,
  DailyTraffic,
  ContentEngagement,
  Promotion,
  HeatmapData,
  DashboardMetrics,
} from "./types";

// Generate mock traffic data for the past 30 days
export const generateTrafficData = (): TrafficDataPoint[] => {
  const data: TrafficDataPoint[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    for (let hour = 9; hour <= 22; hour++) {
      for (let min = 0; min < 60; min += 15) {
        const timestamp = new Date(date);
        timestamp.setHours(hour, min, 0, 0);

        // Simulate realistic traffic patterns
        const baseCount = 20;
        const hourFactor = Math.sin(((hour - 12) / 12) * Math.PI) * 15 + 20;
        const randomVariation = Math.random() * 10 - 5;
        const count = Math.max(
          5,
          Math.floor(baseCount + hourFactor + randomVariation)
        );

        data.push({
          timestamp: timestamp.toISOString(),
          customerCount: count,
          location: "Main Dining",
        });
      }
    }
  }

  return data;
};

// Get hourly traffic summary
export const getHourlyTraffic = (data: TrafficDataPoint[]): HourlyTraffic[] => {
  const currentPeriod: Record<string, number> = {};
  const previousPeriod: Record<string, number> = {};
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const fourteenDaysAgo = new Date(today);
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

  data.forEach((point) => {
    const date = new Date(point.timestamp);
    const hour = String(date.getHours()).padStart(2, "0");

    if (date >= sevenDaysAgo) {
      currentPeriod[hour] = (currentPeriod[hour] || 0) + point.customerCount;
    } else if (date >= fourteenDaysAgo) {
      previousPeriod[hour] = (previousPeriod[hour] || 0) + point.customerCount;
    }
  });

  const hours = Array.from({ length: 14 }, (_, i) =>
    String(9 + i).padStart(2, "0")
  );

  return hours.map((hour) => ({
    hour: `${hour}:00`,
    count: Math.floor((currentPeriod[hour] || 0) / 7),
    previous: Math.floor((previousPeriod[hour] || 0) / 7),
  }));
};

// Get daily traffic for the week
export const getDailyTraffic = (data: TrafficDataPoint[]): DailyTraffic[] => {
  const currentWeek: Record<string, number> = {};
  const previousWeek: Record<string, number> = {};
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const fourteenDaysAgo = new Date(today);
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

  data.forEach((point) => {
    const date = new Date(point.timestamp);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayDate = date.toISOString().split("T")[0];

    if (date >= sevenDaysAgo) {
      currentWeek[dayDate] = (currentWeek[dayDate] || 0) + point.customerCount;
    } else if (date >= fourteenDaysAgo) {
      previousWeek[dayDate] =
        (previousWeek[dayDate] || 0) + point.customerCount;
    }
  });

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const sortedCurrentDates = Object.keys(currentWeek).sort();
  const sortedPreviousDates = Object.keys(previousWeek).sort();

  return sortedCurrentDates.slice(-7).map((date, index) => ({
    day: days[index],
    count: currentWeek[date],
    previous: previousWeek[sortedPreviousDates[index]] || 0,
  }));
};

// Mock content engagement data
export const getContentEngagement = (): ContentEngagement[] => {
  const contents = [
    { id: "burger-01", name: "BBQ Burger Special" },
    { id: "pizza-01", name: "Signature Pizza Promotion" },
    { id: "dessert-01", name: "Dessert Combo Deal" },
    { id: "drink-01", name: "Summer Beverage Collection" },
    { id: "salad-01", name: "Healthy Salad Bowl" },
  ];

  return contents.map((content) => ({
    contentId: content.id,
    contentName: content.name,
    views: Math.floor(Math.random() * 500) + 200,
    avgViewTime: Math.random() * 10 + 5,
    engagementRate: Math.random() * 0.4 + 0.4,
    date: new Date().toISOString().split("T")[0],
  }));
};

// Mock promotion data with sales correlation
export const getTopPromotions = (): Promotion[] => {
  return [
    {
      id: "1",
      name: "BBQ Burger Special",
      views: 542,
      avgViewTime: 8.5,
      engagementRate: 0.67,
      conversionRate: 0.28,
      revenue: 3420,
    },
    {
      id: "2",
      name: "Signature Pizza Promotion",
      views: 483,
      avgViewTime: 7.2,
      engagementRate: 0.62,
      conversionRate: 0.25,
      revenue: 2850,
    },
    {
      id: "3",
      name: "Dessert Combo Deal",
      views: 421,
      avgViewTime: 6.8,
      engagementRate: 0.58,
      conversionRate: 0.32,
      revenue: 2340,
    },
    {
      id: "4",
      name: "Summer Beverage Collection",
      views: 356,
      avgViewTime: 5.4,
      engagementRate: 0.51,
      conversionRate: 0.22,
      revenue: 1560,
    },
    {
      id: "5",
      name: "Healthy Salad Bowl",
      views: 298,
      avgViewTime: 6.1,
      engagementRate: 0.48,
      conversionRate: 0.19,
      revenue: 890,
    },
  ];
};

// Generate heatmap data (day vs hour)
export const generateHeatmapData = (): HeatmapData[] => {
  const hours = Array.from({ length: 14 }, (_, i) =>
    String(9 + i).padStart(2, "0")
  );
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return hours.map((hour) => {
    const row: HeatmapData = { hour: `${hour}:00` };
    days.forEach((day) => {
      // Peak hours: 12-1 PM and 6-7 PM
      const isPeakHour = parseInt(hour) === 12 || parseInt(hour) === 18;
      const isWeekend = day === "Saturday" || day === "Sunday";
      const baseValue = isPeakHour ? 60 : 30;
      const weekendBoost = isWeekend ? 15 : 0;
      row[day] = Math.floor(baseValue + weekendBoost + Math.random() * 20);
    });
    return row;
  });
};

// Calculate dashboard metrics
export const calculateMetrics = (
  trafficData: TrafficDataPoint[]
): DashboardMetrics => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const fourteenDaysAgo = new Date(today);
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

  let currentTraffic = 0;
  let previousTraffic = 0;

  trafficData.forEach((point) => {
    const date = new Date(point.timestamp);
    if (date >= sevenDaysAgo) {
      currentTraffic += point.customerCount;
    } else if (date >= fourteenDaysAgo) {
      previousTraffic += point.customerCount;
    }
  });

  const engagementData = getContentEngagement();
  const avgEngagementRate =
    engagementData.reduce((sum, item) => sum + item.engagementRate, 0) /
    engagementData.length;

  const promotions = getTopPromotions();
  const currentRevenue = promotions.reduce((sum, p) => sum + p.revenue, 0);
  const previousRevenue = Math.floor(currentRevenue * 0.85);

  return {
    totalTraffic: currentTraffic,
    avgEngagementRate: avgEngagementRate,
    avgDwellTime: 12.5,
    totalRevenue: currentRevenue,
    previousPeriodTraffic: previousTraffic,
    previousPeriodRevenue: previousRevenue,
  };
};

// All mock data
export const mockData = {
  trafficData: generateTrafficData(),
  contentEngagement: getContentEngagement(),
  topPromotions: getTopPromotions(),
  heatmapData: generateHeatmapData(),
};

// Note: mockData is no longer exported as a single object.
// Use individual functions (generateTrafficData, getContentEngagement, etc.) instead
// This ensures data generation happens client-side and avoids hydration mismatches.

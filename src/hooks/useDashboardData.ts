'use client';

import { useState, useCallback } from 'react';
import { DateRange, DateRangeValue } from '@/lib/types';

const getDateRange = (range: DateRange): DateRangeValue => {
  const today = new Date();
  const start = new Date();
  const end = new Date();

  switch (range) {
    case 'today':
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      return { start, end, label: 'Today' };
    case 'yesterday':
      start.setDate(today.getDate() - 1);
      start.setHours(0, 0, 0, 0);
      end.setDate(today.getDate() - 1);
      end.setHours(23, 59, 59, 999);
      return { start, end, label: 'Yesterday' };
    case '7days':
      start.setDate(today.getDate() - 6);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      return { start, end, label: 'Last 7 Days' };
    case '30days':
      start.setDate(today.getDate() - 29);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      return { start, end, label: 'Last 30 Days' };
    case 'custom':
      start.setDate(today.getDate() - 29);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      return { start, end, label: 'Custom Range' };
    default:
      return { start: new Date(), end: new Date(), label: 'Today' };
  }
};

export const useDateRange = () => {
  const [dateRange, setDateRange] = useState<DateRange>('7days');
  const [customRange, setCustomRange] = useState<{
    start: string;
    end: string;
  } | null>(null);

  const range = getDateRange(dateRange);

  const handleDateRangeChange = useCallback((newRange: DateRange) => {
    setDateRange(newRange);
    if (newRange !== 'custom') {
      setCustomRange(null);
    }
  }, []);

  const handleCustomRangeChange = useCallback(
    (start: string, end: string) => {
      setCustomRange({ start, end });
      setDateRange('custom');
    },
    []
  );

  return {
    dateRange,
    customRange,
    range,
    handleDateRangeChange,
    handleCustomRangeChange,
  };
};

export const useFilters = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedPromotion, setSelectedPromotion] = useState<string>('all');

  return {
    selectedLocation,
    setSelectedLocation,
    selectedPromotion,
    setSelectedPromotion,
  };
};

export const useComparison = () => {
  const [comparisonMode, setComparisonMode] = useState<boolean>(false);

  return {
    comparisonMode,
    setComparisonMode,
  };
};

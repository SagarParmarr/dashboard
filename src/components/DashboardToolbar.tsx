'use client';

import { Calendar, Filter, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from '@/lib/types';

interface DateRangeSelectorProps {
  selectedRange: DateRange;
  onRangeChange: (range: DateRange) => void;
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  selectedRange,
  onRangeChange,
}) => {
  const ranges: { value: DateRange; label: string }[] = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom' },
  ];

  const label = ranges.find(r => r.value === selectedRange)?.label || 'Select Range';

  return (
    <div className="flex items-center gap-2">
      <Calendar className="w-4 h-4 text-orange-600 dark:text-orange-400" />
      <div className="relative group">
        <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          {label}
          <ChevronDown className="w-4 h-4" />
        </button>
        
        <div className="absolute top-full left-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
          {ranges.map((range) => (
            <button
              key={range.value}
              onClick={() => onRangeChange(range.value)}
              className={`w-full text-left px-4 py-2 text-sm first:rounded-t-lg last:rounded-b-lg transition-colors ${
                selectedRange === range.value
                  ? 'bg-orange-600 text-white'
                  : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface FilterPanelProps {
  onLocationChange: (location: string) => void;
  onPromotionChange: (promotion: string) => void;
  selectedLocation: string;
  selectedPromotion: string;
  isMobile?: boolean;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  onLocationChange,
  onPromotionChange,
  selectedLocation,
  selectedPromotion,
  isMobile = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const locations = ['All Locations', 'Main Dining', 'Patio', 'Bar Area'];
  const promotions = ['All Promotions', 'BBQ Burger Special', 'Pizza Promotion', 'Dessert Deal'];

  if (isMobile) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <Filter className="w-4 h-4" />
          Filters
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-4 w-48 z-50">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => onLocationChange(e.target.value)}
                  className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Promotion</label>
                <select
                  value={selectedPromotion}
                  onChange={(e) => onPromotionChange(e.target.value)}
                  className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {promotions.map((promotion) => (
                    <option key={promotion} value={promotion}>{promotion}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full mt-2 px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        <h3 className="font-semibold text-slate-900 dark:text-white">Filters</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Location</label>
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Promotion</label>
          <select
            value={selectedPromotion}
            onChange={(e) => onPromotionChange(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {promotions.map((promotion) => (
              <option key={promotion} value={promotion}>
                {promotion}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

interface ToolbarProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  onLocationChange: (location: string) => void;
  onPromotionChange: (promotion: string) => void;
  selectedLocation: string;
  selectedPromotion: string;
  onExport: () => void;
}

export const DashboardToolbar: React.FC<ToolbarProps> = ({
  dateRange,
  onDateRangeChange,
  onLocationChange,
  onPromotionChange,
  selectedLocation,
  selectedPromotion,
  onExport,
}) => {
  const [showFilters, setShowFilters] = useState(true);

  return (
    <div className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="px-4 py-4 space-y-3 md:space-y-0">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            <DateRangeSelector selectedRange={dateRange} onRangeChange={onDateRangeChange} />
            
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">|</span>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? 'Hide' : 'Show'} Filters
              </button>
            </div>
          </div>

          <button
            onClick={onExport}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors text-sm whitespace-nowrap"
          >
            Export Report
          </button>
        </div>

        <div className="sm:hidden">
          <FilterPanel
            selectedLocation={selectedLocation}
            selectedPromotion={selectedPromotion}
            onLocationChange={onLocationChange}
            onPromotionChange={onPromotionChange}
            isMobile
          />
        </div>
      </div>

      {showFilters && (
        <div className="hidden sm:block border-t border-slate-200 dark:border-slate-800 px-4 py-4 bg-slate-50 dark:bg-slate-800/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FilterPanel
              selectedLocation={selectedLocation}
              selectedPromotion={selectedPromotion}
              onLocationChange={onLocationChange}
              onPromotionChange={onPromotionChange}
            />
            
            {(selectedLocation !== 'All Locations' || selectedPromotion !== 'All Promotions') && (
              <div className="bg-white dark:bg-slate-700 rounded-lg border border-blue-200 dark:border-blue-900 p-3">
                <p className="text-xs font-semibold text-blue-900 dark:text-blue-200 mb-2">Active Filters</p>
                <div className="space-y-1 text-xs text-blue-800 dark:text-blue-300">
                  {selectedLocation !== 'All Locations' && (
                    <p>📍 Location: <span className="font-medium">{selectedLocation}</span></p>
                  )}
                  {selectedPromotion !== 'All Promotions' && (
                    <p>📢 Promotion: <span className="font-medium">{selectedPromotion}</span></p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

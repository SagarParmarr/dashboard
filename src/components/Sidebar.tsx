'use client';

import { BarChart3, TrendingUp, Users, ShoppingCart, Settings, LogOut, Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

type SectionType = 'overview' | 'traffic' | 'engagement' | 'promotions';

interface SidebarProps {
  activeSection: SectionType;
  onSectionChange: (section: SectionType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggleDark } = useTheme();

  const menuItems: { id: SectionType; label: string; icon: typeof BarChart3 }[] = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'traffic', label: 'Traffic Analytics', icon: Users },
    { id: 'engagement', label: 'Content Engagement', icon: TrendingUp },
    { id: 'promotions', label: 'Top Promotions', icon: ShoppingCart },
  ];

  const handleSectionChange = (section: SectionType) => {
    onSectionChange(section);
    setMobileOpen(false); // Close mobile menu when section changes
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-orange-600 text-white p-2 rounded-lg"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? 'w-20' : 'w-64'
        } fixed lg:relative top-0 left-0 h-screen lg:h-auto bg-gradient-to-b from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 text-white transition-all duration-300 border-r border-slate-700 dark:border-slate-800 flex flex-col z-40 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-700 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center font-bold text-lg">
              F
            </div>
            {!collapsed && <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">FlawkTV</span>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-orange-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white dark:hover:bg-slate-700'
                }`}
                title={collapsed ? item.label : ''}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Dark Mode & Settings */}
        <div className="p-4 space-y-2 border-t border-slate-700 dark:border-slate-800">
          <button
            onClick={toggleDark}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-700 hover:text-white transition-all duration-200"
            title={collapsed ? (isDark ? 'Light Mode' : 'Dark Mode') : ''}
          >
            {isDark ? (
              <Sun className="w-5 h-5 flex-shrink-0" />
            ) : (
              <Moon className="w-5 h-5 flex-shrink-0" />
            )}
            {!collapsed && <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-700 hover:text-white transition-all duration-200"
            title={collapsed ? 'Settings' : ''}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Settings</span>}
          </button>

          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 rounded-lg hover:bg-slate-700 dark:hover:bg-slate-700 hover:text-white transition-all duration-200"
            title={collapsed ? 'Logout' : ''}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>

          {/* Toggle Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full p-4 text-slate-400 hover:text-white transition-colors border-t border-slate-700"
          >
            <span className="text-xs">{collapsed ? '→' : '←'}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

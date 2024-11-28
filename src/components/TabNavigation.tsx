import React from 'react';
import { Trophy, Swords, Clock } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: 'rankings', label: 'Rankings', icon: Trophy },
    { id: 'record', label: 'Submit Match Result', icon: Swords },
    { id: 'history', label: 'Match History', icon: Clock },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 w-full max-w-4xl">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-lg font-semibold transition-colors
            ${activeTab === id
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50'
            }
            text-sm sm:text-base whitespace-nowrap`}
        >
          <Icon className="h-5 w-5" />
          <span className="hidden sm:inline">{label}</span>
          <span className="sm:hidden">
            {label === 'Submit Match Result' ? 'Submit' : label}
          </span>
        </button>
      ))}
    </div>
  );
}
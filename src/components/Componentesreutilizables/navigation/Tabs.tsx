import React from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'line' | 'enclosed' | 'pill' | 'soft';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  alignment?: 'start' | 'center' | 'end';
  className?: string;
}

const variantStyles = {
  line: {
    container: 'border-b',
    tab: (isActive: boolean, colorScheme: string) => `
      border-b-2 border-transparent
      ${isActive ? `border-${colorScheme}-500 text-${colorScheme}-600` : 'text-gray-500 hover:text-gray-700'}
    `
  },
  enclosed: {
    container: 'border-b',
    tab: (isActive: boolean) => `
      border-t border-l border-r rounded-t-lg -mb-px
      ${isActive ? 'bg-white border-b-white' : 'bg-gray-50 hover:bg-gray-100'}
    `
  },
  pill: {
    container: '',
    tab: (isActive: boolean, colorScheme: string) => `
      rounded-full
      ${isActive ? `bg-${colorScheme}-500 text-white` : 'text-gray-500 hover:text-gray-700'}
    `
  },
  soft: {
    container: '',
    tab: (isActive: boolean, colorScheme: string) => `
      rounded-lg
      ${isActive ? `bg-${colorScheme}-50 text-${colorScheme}-700` : 'text-gray-500 hover:text-gray-700'}
    `
  }
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  variant = 'line',
  size = 'md',
  colorScheme = 'blue',
  alignment = 'start',
  className = ''
}) => {
  return (
    <div className={className}>
      <div className={`
        flex ${alignment === 'center' ? 'justify-center' : alignment === 'end' ? 'justify-end' : ''}
        ${variantStyles[variant].container}
      `}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              ${sizeStyles[size]}
              ${variantStyles[variant].tab(tab.id === activeTab, colorScheme)}
              font-medium transition-colors
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${colorScheme}-500
            `}
          >
            <div className="flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};
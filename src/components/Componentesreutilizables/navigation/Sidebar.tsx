import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { BaseNavProps, NavItem } from './types';

interface SidebarProps extends BaseNavProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const variantStyles = {
  light: 'bg-white border-gray-200',
  dark: 'bg-gray-900 text-white',
  transparent: 'bg-transparent',
  colored: {
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    red: 'bg-red-500 text-white',
    yellow: 'bg-yellow-500 text-white',
    gray: 'bg-gray-500 text-white'
  }
};

const sizeStyles = {
  sm: 'w-48',
  md: 'w-64',
  lg: 'w-72'
};

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  variant = 'light',
  size = 'md',
  colorScheme = 'blue',
  collapsed = false,
  onCollapse,
  header,
  footer,
  className = ''
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const bgStyle = variant === 'colored' ? variantStyles.colored[colorScheme] : variantStyles[variant];

  const toggleItem = (itemLabel: string) => {
    setExpandedItems(prev =>
      prev.includes(itemLabel)
        ? prev.filter(item => item !== itemLabel)
        : [...prev, itemLabel]
    );
  };

  const renderNavItem = (item: NavItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.label);

    return (
      <div key={item.label}>
        <a
          href={item.href}
          onClick={hasChildren ? (e) => {
            e.preventDefault();
            toggleItem(item.label);
          } : undefined}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-md
            ${variant === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}
            hover:bg-opacity-10 hover:bg-black transition-colors
            ${level > 0 ? 'ml-4' : ''}
          `}
        >
          {item.icon}
          {!collapsed && (
            <>
              <span>{item.label}</span>
              {hasChildren && (
                <ChevronRight className={`
                  ml-auto transition-transform
                  ${isExpanded ? 'transform rotate-90' : ''}
                `} />
              )}
            </>
          )}
        </a>
        {hasChildren && isExpanded && !collapsed && (
          <div className="ml-4">
            {item.children.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={`
      ${bgStyle}
      ${collapsed ? 'w-16' : sizeStyles[size]}
      h-screen flex flex-col border-r
      transition-all duration-300
      ${className}
    `}>
      {header && <div className="p-4">{header}</div>}
      
      <div className="flex-1 overflow-y-auto py-4">
        {items.map(item => renderNavItem(item))}
      </div>

      {footer && <div className="p-4 border-t">{footer}</div>}
    </aside>
  );
};
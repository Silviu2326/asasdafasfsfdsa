import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: 'simple' | 'contained' | 'separated';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  showHomeIcon?: boolean;
  separator?: React.ReactNode;
  className?: string;
}

const variantStyles = {
  simple: '',
  contained: 'px-4 py-2 bg-gray-50 rounded-lg',
  separated: (isLast: boolean) => `
    px-3 py-1
    ${!isLast && 'border-r border-gray-300'}
  `
};

const sizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  variant = 'simple',
  size = 'md',
  colorScheme = 'blue',
  showHomeIcon = true,
  separator = <ChevronRight className="w-4 h-4" />,
  className = ''
}) => {
  return (
    <nav className={`
      ${variant === 'contained' ? variantStyles.contained : ''}
      ${className}
    `}>
      <ol className={`
        flex items-center flex-wrap
        ${sizeStyles[size]}
      `}>
        {showHomeIcon && (
          <li className="flex items-center">
            <a
              href="/"
              className={`text-gray-500 hover:text-${colorScheme}-500 flex items-center`}
            >
              <Home className="w-4 h-4" />
            </a>
            <span className="mx-2 text-gray-400">{separator}</span>
          </li>
        )}
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={index}
              className={`
                flex items-center
                ${variant === 'separated' ? variantStyles.separated(isLast) : ''}
              `}
            >
              <a
                href={item.href}
                className={`
                  flex items-center gap-2
                  ${isLast ? `text-${colorScheme}-600 font-medium` : 'text-gray-500 hover:text-gray-700'}
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
              {!isLast && (
                <span className="mx-2 text-gray-400">{separator}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
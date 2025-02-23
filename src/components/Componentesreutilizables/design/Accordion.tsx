import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AccordionProps } from './types';

const variantStyles = {
  default: 'bg-white',
  elevated: 'bg-white shadow-lg',
  outlined: 'border border-gray-200',
  filled: 'bg-gray-50'
};

const sizeStyles = {
  sm: 'p-2 text-sm',
  md: 'p-3 text-base',
  lg: 'p-4 text-lg'
};

export const Accordion: React.FC<AccordionProps> = ({
  items,
  variant = 'default',
  size = 'md',
  defaultExpanded = [],
  allowMultiple = false,
  iconPosition = 'right',
  className = ''
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(defaultExpanded);

  const toggleItem = (itemId: string) => {
    if (allowMultiple) {
      setExpandedItems(prev =>
        prev.includes(itemId)
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setExpandedItems(prev =>
        prev.includes(itemId) ? [] : [itemId]
      );
    }
  };

  return (
    <div className={`
      rounded-lg overflow-hidden divide-y
      ${variantStyles[variant]}
      ${className}
    `}>
      {items.map((item) => {
        const isExpanded = expandedItems.includes(item.id);

        return (
          <div key={item.id}>
            <button
              onClick={() => toggleItem(item.id)}
              className={`
                w-full flex items-center justify-between
                ${sizeStyles[size]}
                hover:bg-gray-50
                focus:outline-none focus:ring-2 focus:ring-blue-500/20
              `}
            >
              <div className={`
                flex items-center gap-2
                ${iconPosition === 'right' ? 'flex-1' : ''}
              `}>
                {iconPosition === 'left' && item.icon}
                <span className="font-medium text-gray-900">{item.title}</span>
                {iconPosition === 'right' && (
                  <ChevronDown className={`
                    ml-auto transition-transform duration-200
                    ${isExpanded ? 'transform rotate-180' : ''}
                  `} />
                )}
              </div>
            </button>

            {isExpanded && (
              <div className={`
                ${sizeStyles[size]}
                border-t bg-gray-50/50
              `}>
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
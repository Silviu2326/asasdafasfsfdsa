import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BaseNavProps } from './types';

interface NavbarProps extends BaseNavProps {
  logo?: React.ReactNode;
  position?: 'fixed' | 'sticky' | 'relative';
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
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4'
};

export const Navbar: React.FC<NavbarProps> = ({
  items,
  variant = 'light',
  size = 'md',
  colorScheme = 'blue',
  position = 'relative',
  logo,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const bgStyle = variant === 'colored' ? variantStyles.colored[colorScheme] : variantStyles[variant];

  return (
    <nav className={`
      ${bgStyle}
      ${sizeStyles[size]}
      ${position === 'fixed' ? 'fixed top-0 left-0 right-0' : ''}
      ${position === 'sticky' ? 'sticky top-0' : ''}
      border-b z-50
      ${className}
    `}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {logo && <div className="flex-shrink-0">{logo}</div>}
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`
                  px-3 py-2 rounded-md text-sm font-medium
                  ${variant === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}
                  hover:bg-opacity-10 hover:bg-black transition-colors
                `}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </div>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md focus:outline-none"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-2">
            {items.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium
                  ${variant === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}
                  hover:bg-opacity-10 hover:bg-black
                `}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
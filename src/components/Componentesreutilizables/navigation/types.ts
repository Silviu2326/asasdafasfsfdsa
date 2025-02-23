export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: NavItem[];
}

export interface BaseNavProps {
  items: NavItem[];
  variant?: 'light' | 'dark' | 'transparent' | 'colored';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  className?: string;
}
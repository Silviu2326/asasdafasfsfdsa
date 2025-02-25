export interface BaseDesignProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  className?: string;
}

export interface CardProps extends BaseDesignProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  image?: string;
  imagePosition?: 'top' | 'bottom';
  isHoverable?: boolean;
  isClickable?: boolean;
}

export interface ModalProps extends BaseDesignProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  position?: 'center' | 'top' | 'bottom';
}

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export interface AccordionProps extends BaseDesignProps {
  items: AccordionItem[];
  defaultExpanded?: string[];
  allowMultiple?: boolean;
  iconPosition?: 'left' | 'right';
}

export interface DividerProps extends BaseDesignProps {
  orientation?: 'horizontal' | 'vertical';
  thickness?: 'thin' | 'medium' | 'thick';
  label?: string;
  labelPosition?: 'start' | 'center' | 'end';
}
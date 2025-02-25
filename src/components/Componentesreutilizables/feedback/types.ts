export interface BaseFeedbackProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  className?: string;
}

export interface AlertProps extends BaseFeedbackProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  isClosable?: boolean;
}

export interface ToastProps extends BaseFeedbackProps {
  message: string;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  onClose?: () => void;
}

export interface ProgressProps extends BaseFeedbackProps {
  value: number;
  max?: number;
  showValue?: boolean;
  animation?: 'none' | 'stripe' | 'pulse';
  thickness?: 'thin' | 'medium' | 'thick';
}

export interface SpinnerProps extends BaseFeedbackProps {
  label?: string;
  labelPlacement?: 'top' | 'right' | 'bottom' | 'left';
  animation?: 'border' | 'grow' | 'pulse' | 'dots';
}
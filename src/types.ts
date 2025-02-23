export interface DraggableItemProps {
  type: string;
  variant?: string;
  label: string;
  description: string;
}

export interface ComponentConfig {
  title?: string;
  action?: string;
  tableName?: string;
  columns?: number;
  rows?: number;
  headers?: string[];
  showBorder?: boolean;
  striped?: boolean;
}

export interface Component {
  id: string;
  type: 'button' | 'table';
  x: number;
  y: number;
  w: number;
  h: number;
  config: ComponentConfig;
}

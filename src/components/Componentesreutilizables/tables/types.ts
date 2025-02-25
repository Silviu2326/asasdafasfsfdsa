export interface Column {
  header: string;
  accessorKey: string;
  cell?: (props: any) => JSX.Element;
}

export interface TableData {
  [key: string]: any;
}

export interface BaseTableProps {
  data: TableData[];
  columns: Column[];
  variant?: 'default' | 'striped' | 'bordered' | 'compact';
  className?: string;
}
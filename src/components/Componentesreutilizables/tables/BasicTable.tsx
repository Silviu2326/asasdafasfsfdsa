import React from 'react';
import { BaseTableProps } from './types';

const variantStyles = {
  default: 'bg-white',
  striped: 'even:bg-gray-50',
  bordered: 'border-2 border-gray-200',
  compact: 'p-2'
};

export const BasicTable: React.FC<BaseTableProps> = ({
  data,
  columns,
  variant = 'default',
  className = ''
}) => {
  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessorKey}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={variantStyles[variant]}>
              {columns.map((column) => (
                <td
                  key={column.accessorKey}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
                  {column.cell ? column.cell(row) : row[column.accessorKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
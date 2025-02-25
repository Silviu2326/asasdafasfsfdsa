import React, { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { BaseTableProps } from './types';

interface SortableTableProps extends BaseTableProps {
  defaultSortField?: string;
  sortVariant?: 'arrows' | 'icon' | 'background';
}

export const SortableTable: React.FC<SortableTableProps> = ({
  data,
  columns,
  variant = 'default',
  defaultSortField,
  sortVariant = 'arrows',
  className = ''
}) => {
  const [sortField, setSortField] = useState(defaultSortField);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;
    return sortOrder === 'asc'
      ? a[sortField] > b[sortField] ? 1 : -1
      : a[sortField] < b[sortField] ? 1 : -1;
  });

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown size={16} />;
    return sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
  };

  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessorKey}
                onClick={() => handleSort(column.accessorKey)}
                className={`
                  px-6 py-3 text-left text-xs font-medium text-gray-500 
                  uppercase tracking-wider cursor-pointer
                  ${sortVariant === 'background' && sortField === column.accessorKey
                    ? 'bg-gray-100'
                    : ''
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  {column.header}
                  {sortVariant !== 'background' && getSortIcon(column.accessorKey)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
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
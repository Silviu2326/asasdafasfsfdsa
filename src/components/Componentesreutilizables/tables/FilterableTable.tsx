import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { BaseTableProps } from './types';

interface FilterableTableProps extends BaseTableProps {
  filterVariant?: 'inline' | 'top' | 'column';
  searchPlaceholder?: string;
}

export const FilterableTable: React.FC<FilterableTableProps> = ({
  data,
  columns,
  variant = 'default',
  filterVariant = 'top',
  searchPlaceholder = 'Search...',
  className = ''
}) => {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [globalFilter, setGlobalFilter] = useState('');

  const filteredData = useMemo(() => {
    return data.filter(row => {
      // Global filter
      if (globalFilter) {
        const matchesGlobal = Object.values(row).some(value =>
          String(value).toLowerCase().includes(globalFilter.toLowerCase())
        );
        if (!matchesGlobal) return false;
      }

      // Column filters
      return Object.entries(filters).every(([key, value]) =>
        String(row[key]).toLowerCase().includes(value.toLowerCase())
      );
    });
  }, [data, filters, globalFilter]);

  const renderFilters = () => {
    switch (filterVariant) {
      case 'inline':
        return null; // Filters will be rendered in header cells
      case 'column':
        return (
          <div className="mb-4 space-y-2">
            {columns.map(column => (
              <div key={column.accessorKey} className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  {column.header}:
                </label>
                <input
                  type="text"
                  value={filters[column.accessorKey] || ''}
                  onChange={e => setFilters(prev => ({
                    ...prev,
                    [column.accessorKey]: e.target.value
                  }))}
                  className="px-3 py-1 border rounded-md text-sm"
                  placeholder={`Filter ${column.header}`}
                />
              </div>
            ))}
          </div>
        );
      default: // top
        return (
          <div className="mb-4 relative">
            <input
              type="text"
              value={globalFilter}
              onChange={e => setGlobalFilter(e.target.value)}
              className="w-full px-4 py-2 pl-10 border rounded-lg"
              placeholder={searchPlaceholder}
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        );
    }
  };

  return (
    <div>
      {renderFilters()}
      <div className="overflow-x-auto">
        <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessorKey}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="space-y-2">
                    {column.header}
                    {filterVariant === 'inline' && (
                      <input
                        type="text"
                        value={filters[column.accessorKey] || ''}
                        onChange={e => setFilters(prev => ({
                          ...prev,
                          [column.accessorKey]: e.target.value
                        }))}
                        className="w-full px-2 py-1 text-sm border rounded"
                        placeholder={`Filter ${column.header}`}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((row, rowIndex) => (
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
    </div>
  );
};
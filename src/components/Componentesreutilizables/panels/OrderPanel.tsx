import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, FileSpreadsheet, FileText } from 'lucide-react';
import { FilterableTable } from '../tables/FilterableTable';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { SelectInput } from '../forms/SelectInput';
import { TextInput } from '../forms/TextInput';

interface Order {
  id: string;
  date: string;
  customer: string;
  status: string;
  total: number;
  paymentMethod: string;
}

interface OrderPanelProps {
  variant?: 'simple' | 'detailed';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  className?: string;
}

const sampleOrders: Order[] = Array.from({ length: 20 }, (_, i) => ({
  id: `ORD-${(i + 1).toString().padStart(4, '0')}`,
  date: new Date(2024, 0, i + 1).toLocaleDateString(),
  customer: `Cliente ${i + 1}`,
  status: ['Pendiente', 'Completado', 'Cancelado'][i % 3],
  total: Math.floor(Math.random() * 1000) + 100,
  paymentMethod: ['Tarjeta', 'Efectivo', 'Transferencia'][i % 3]
}));

const statusOptions = [
  { value: 'all', label: 'Todos los estados' },
  { value: 'Pendiente', label: 'Pendiente' },
  { value: 'Completado', label: 'Completado' },
  { value: 'Cancelado', label: 'Cancelado' }
];

const paymentOptions = [
  { value: 'all', label: 'Todos los métodos' },
  { value: 'Tarjeta', label: 'Tarjeta' },
  { value: 'Efectivo', label: 'Efectivo' },
  { value: 'Transferencia', label: 'Transferencia' }
];

export const OrderPanel: React.FC<OrderPanelProps> = ({
  variant = 'simple',
  size = 'md',
  colorScheme = 'blue',
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const filteredOrders = useMemo(() => {
    return sampleOrders.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      const matchesPayment = paymentFilter === 'all' || order.paymentMethod === paymentFilter;
      
      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [searchTerm, statusFilter, paymentFilter]);

  const exportData = (format: 'excel' | 'pdf') => {
    // Implementación real de exportación aquí
    console.log(`Exportando a ${format}...`);
  };

  const columns = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Fecha', accessorKey: 'date' },
    { header: 'Cliente', accessorKey: 'customer' },
    { header: 'Estado', accessorKey: 'status' },
    { header: 'Total', accessorKey: 'total', cell: (info: any) => `$${info.getValue()}` },
    { header: 'Método de Pago', accessorKey: 'paymentMethod' }
  ];

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-slate-200">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por ID o cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <SelectInput
              options={statusOptions}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-[180px]"
            />
            <SelectInput
              options={paymentOptions}
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="w-[180px]"
            />
          </div>
          <div className="flex gap-2">
            <PrimaryButton
              onClick={() => exportData('excel')}
              variant="outline"
              colorScheme={colorScheme}
              className="flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Excel
            </PrimaryButton>
            <PrimaryButton
              onClick={() => exportData('pdf')}
              variant="outline"
              colorScheme={colorScheme}
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              PDF
            </PrimaryButton>
          </div>
        </div>
      </div>

      <FilterableTable
        data={filteredOrders}
        columns={columns}
        variant={variant === 'simple' ? 'default' : 'bordered'}
        className="w-full"
      />
    </div>
  );
};
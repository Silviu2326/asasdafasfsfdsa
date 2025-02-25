import React, { useState, useMemo } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Calendar, ArrowUp, ArrowDown, Filter } from 'lucide-react';
import { Card } from '../design/Card';
import { Badge } from '../feedback/Badge';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { FilterableTable } from '../tables/FilterableTable';
import { SelectInput } from '../forms/SelectInput';

interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

interface FinancialDashboardProps {
  variant?: 'simple' | 'detailed';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  className?: string;
}

const generateSampleTransactions = (): Transaction[] => {
  const categories = ['Ventas', 'Servicios', 'Salarios', 'Materiales', 'Marketing', 'Operaciones'];
  return Array.from({ length: 20 }, (_, i) => ({
    id: `TRX-${(i + 1).toString().padStart(4, '0')}`,
    date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
    description: `Transacción ${i + 1}`,
    amount: Math.floor(Math.random() * 10000) + 100,
    category: categories[Math.floor(Math.random() * categories.length)],
    type: Math.random() > 0.4 ? 'income' : 'expense'
  }));
};

export const FinancialDashboard: React.FC<FinancialDashboardProps> = ({
  variant = 'simple',
  size = 'md',
  colorScheme = 'blue',
  className = ''
}) => {
  const [transactions] = useState<Transaction[]>(generateSampleTransactions());
  const [timeFilter, setTimeFilter] = useState('month');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      if (categoryFilter !== 'all' && transaction.category !== categoryFilter) {
        return false;
      }
      const now = new Date();
      const transactionDate = new Date(transaction.date);
      switch (timeFilter) {
        case 'week':
          return now.getTime() - transactionDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
        case 'month':
          return now.getMonth() === transactionDate.getMonth();
        case 'year':
          return now.getFullYear() === transactionDate.getFullYear();
        default:
          return true;
      }
    });
  }, [transactions, timeFilter, categoryFilter]);

  const calculateMetrics = () => {
    const income = filteredTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = filteredTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expenses;
    const previousPeriodBalance = balance * 0.8; // Simulación
    const growth = ((balance - previousPeriodBalance) / previousPeriodBalance) * 100;

    return { income, expenses, balance, growth };
  };

  const metrics = calculateMetrics();

  const columns = [
    {
      header: 'Fecha',
      accessorKey: 'date',
      cell: (info: any) => new Date(info.getValue()).toLocaleDateString()
    },
    { header: 'Descripción', accessorKey: 'description' },
    { header: 'Categoría', accessorKey: 'category' },
    {
      header: 'Monto',
      accessorKey: 'amount',
      cell: (info: any) => (
        <div className={`flex items-center gap-2 ${
          info.row.original.type === 'income' ? 'text-green-600' : 'text-red-600'
        }`}>
          {info.row.original.type === 'income' ? '+' : '-'}
          ${info.getValue().toLocaleString()}
        </div>
      )
    }
  ];

  const renderChart = () => {
    // Aquí iría la implementación del gráfico con una librería como Chart.js o Recharts
    return (
      <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
        <p className="text-slate-400">Gráfico de Ingresos y Egresos</p>
      </div>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="elevated" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Balance Total</p>
              <h3 className="text-2xl font-bold text-slate-800">
                ${metrics.balance.toLocaleString()}
              </h3>
              <div className={`flex items-center gap-1 text-sm ${
                metrics.growth >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {metrics.growth >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {Math.abs(metrics.growth).toFixed(1)}%
              </div>
            </div>
            <DollarSign className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
        <Card variant="elevated" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Ingresos</p>
              <h3 className="text-2xl font-bold text-green-600">
                ${metrics.income.toLocaleString()}
              </h3>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        <Card variant="elevated" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Gastos</p>
              <h3 className="text-2xl font-bold text-red-600">
                ${metrics.expenses.toLocaleString()}
              </h3>
            </div>
            <TrendingDown className="w-8 h-8 text-red-500" />
          </div>
        </Card>
        <Card variant="elevated" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Transacciones</p>
              <h3 className="text-2xl font-bold text-slate-800">
                {filteredTransactions.length}
              </h3>
            </div>
            <Calendar className="w-8 h-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {variant === 'detailed' && (
        <Card variant="elevated" className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Tendencia Financiera</h3>
          {renderChart()}
        </Card>
      )}

      <Card variant="elevated" className="p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Transacciones</h3>
          <div className="flex gap-4">
            <SelectInput
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              options={[
                { value: 'week', label: 'Esta Semana' },
                { value: 'month', label: 'Este Mes' },
                { value: 'year', label: 'Este Año' }
              ]}
              className="w-40"
            />
            <SelectInput
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              options={[
                { value: 'all', label: 'Todas las Categorías' },
                ...Array.from(new Set(transactions.map(t => t.category)))
                  .map(cat => ({ value: cat, label: cat }))
              ]}
              className="w-48"
            />
          </div>
        </div>

        <FilterableTable
          data={filteredTransactions}
          columns={columns}
          variant={variant === 'simple' ? 'default' : 'bordered'}
          className="w-full"
        />
      </Card>
    </div>
  );
};
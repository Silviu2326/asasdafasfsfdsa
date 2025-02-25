import React, { useState, useMemo } from 'react';
import { Calendar, TrendingUp, DollarSign, Users, Package, ArrowUp, ArrowDown } from 'lucide-react';
import { Card } from '../design/Card';
import { SelectInput } from '../forms/SelectInput';

interface SalesData {
  date: string;
  revenue: number;
  orders: number;
  customers: number;
  averageOrder: number;
}

interface KPICard {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

interface SalesDashboardProps {
  variant?: 'simple' | 'detailed';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  className?: string;
}

const generateSampleData = (days: number): SalesData[] => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toISOString().split('T')[0],
      revenue: Math.floor(Math.random() * 10000) + 5000,
      orders: Math.floor(Math.random() * 100) + 50,
      customers: Math.floor(Math.random() * 80) + 30,
      averageOrder: Math.floor(Math.random() * 200) + 100
    };
  }).reverse();
};

const timeRangeOptions = [
  { value: '7', label: 'Últimos 7 días' },
  { value: '30', label: 'Últimos 30 días' },
  { value: '90', label: 'Últimos 90 días' }
];

export const SalesDashboard: React.FC<SalesDashboardProps> = ({
  variant = 'simple',
  size = 'md',
  colorScheme = 'blue',
  className = ''
}) => {
  const [timeRange, setTimeRange] = useState('30');
  const salesData = useMemo(() => generateSampleData(parseInt(timeRange)), [timeRange]);

  const calculateChange = (current: number, previous: number) => {
    return ((current - previous) / previous) * 100;
  };

  const getKPICards = (): KPICard[] => {
    const currentPeriod = salesData.slice(-parseInt(timeRange));
    const previousPeriod = salesData.slice(-parseInt(timeRange) * 2, -parseInt(timeRange));

    const currentRevenue = currentPeriod.reduce((sum, day) => sum + day.revenue, 0);
    const previousRevenue = previousPeriod.reduce((sum, day) => sum + day.revenue, 0);
    const revenueChange = calculateChange(currentRevenue, previousRevenue);

    return [
      {
        title: 'Ingresos Totales',
        value: `$${currentRevenue.toLocaleString()}`,
        change: revenueChange,
        icon: <DollarSign className="w-6 h-6" />
      },
      {
        title: 'Pedidos',
        value: currentPeriod.reduce((sum, day) => sum + day.orders, 0),
        change: calculateChange(
          currentPeriod.reduce((sum, day) => sum + day.orders, 0),
          previousPeriod.reduce((sum, day) => sum + day.orders, 0)
        ),
        icon: <Package className="w-6 h-6" />
      },
      {
        title: 'Clientes',
        value: currentPeriod.reduce((sum, day) => sum + day.customers, 0),
        change: calculateChange(
          currentPeriod.reduce((sum, day) => sum + day.customers, 0),
          previousPeriod.reduce((sum, day) => sum + day.customers, 0)
        ),
        icon: <Users className="w-6 h-6" />
      },
      {
        title: 'Promedio por Pedido',
        value: `$${Math.floor(
          currentPeriod.reduce((sum, day) => sum + day.averageOrder, 0) / currentPeriod.length
        )}`,
        change: calculateChange(
          currentPeriod.reduce((sum, day) => sum + day.averageOrder, 0) / currentPeriod.length,
          previousPeriod.reduce((sum, day) => sum + day.averageOrder, 0) / previousPeriod.length
        ),
        icon: <TrendingUp className="w-6 h-6" />
      }
    ];
  };

  const renderKPICard = (kpi: KPICard) => (
    <Card
      variant="elevated"
      className="p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-600 mb-1">{kpi.title}</p>
          <h3 className="text-2xl font-bold text-slate-800">{kpi.value}</h3>
          <div className={`flex items-center gap-1 mt-2 ${
            kpi.change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {kpi.change >= 0 ? (
              <ArrowUp className="w-4 h-4" />
            ) : (
              <ArrowDown className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {Math.abs(kpi.change).toFixed(1)}%
            </span>
          </div>
        </div>
        <div className={`p-3 rounded-lg bg-${colorScheme}-50`}>
          {kpi.icon}
        </div>
      </div>
    </Card>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Dashboard de Ventas</h2>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-slate-400" />
          <SelectInput
            options={timeRangeOptions}
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-[180px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {getKPICards().map((kpi, index) => (
          <div key={index}>
            {renderKPICard(kpi)}
          </div>
        ))}
      </div>

      {variant === 'detailed' && (
        <Card variant="elevated" className="p-6">
          <div className="h-[300px] flex items-center justify-center text-slate-500">
            Área para gráfico de tendencias
          </div>
        </Card>
      )}
    </div>
  );
};
import React, { useState } from 'react';
import { CheckCircle, Clock, AlertTriangle, RotateCcw } from 'lucide-react';
import { Card } from '../design/Card';
import { Badge } from '../feedback/Badge';
import { Progress } from '../feedback/Progress';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { FilterableTable } from '../tables/FilterableTable';

interface ProductionOrder {
  id: string;
  product: string;
  quantity: number;
  progress: number;
  status: 'pending' | 'inProgress' | 'completed' | 'paused';
  startDate: Date;
  estimatedEnd: Date;
}

interface ProductionPanelProps {
  variant?: 'simple' | 'detailed';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  className?: string;
}

const generateSampleOrders = (): ProductionOrder[] => {
  return Array.from({ length: 8 }, (_, i) => ({
    id: `ORD-${(i + 1).toString().padStart(4, '0')}`,
    product: `Producto ${i + 1}`,
    quantity: Math.floor(Math.random() * 100) + 20,
    progress: Math.floor(Math.random() * 100),
    status: ['pending', 'inProgress', 'completed', 'paused'][i % 4] as ProductionOrder['status'],
    startDate: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000),
    estimatedEnd: new Date(Date.now() + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000)
  }));
};

const statusConfig = {
  pending: { label: 'Pendiente', color: 'yellow' },
  inProgress: { label: 'En Proceso', color: 'blue' },
  completed: { label: 'Completado', color: 'green' },
  paused: { label: 'Pausado', color: 'red' }
};

export const ProductionPanel: React.FC<ProductionPanelProps> = ({
  variant = 'simple',
  size = 'md',
  colorScheme = 'blue',
  className = ''
}) => {
  const [orders, setOrders] = useState<ProductionOrder[]>(generateSampleOrders());

  const updateOrderStatus = (orderId: string, newStatus: ProductionOrder['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getProductionStats = () => {
    const total = orders.length;
    const completed = orders.filter(o => o.status === 'completed').length;
    const inProgress = orders.filter(o => o.status === 'inProgress').length;
    const pending = orders.filter(o => o.status === 'pending').length;
    const paused = orders.filter(o => o.status === 'paused').length;
    
    return { total, completed, inProgress, pending, paused };
  };

  const columns = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Producto', accessorKey: 'product' },
    { header: 'Cantidad', accessorKey: 'quantity' },
    {
      header: 'Progreso',
      accessorKey: 'progress',
      cell: (info: any) => (
        <Progress
          value={info.getValue()}
          max={100}
          size="sm"
          variant={info.row.original.status === 'paused' ? 'warning' : 'info'}
          className="w-24"
        />
      )
    },
    {
      header: 'Estado',
      accessorKey: 'status',
      cell: (info: any) => (
        <Badge
          variant="subtle"
          colorScheme={statusConfig[info.getValue()].color}
        >
          {statusConfig[info.getValue()].label}
        </Badge>
      )
    },
    {
      header: 'Acciones',
      cell: (info: any) => (
        <div className="flex gap-2">
          {info.row.original.status !== 'completed' && (
            <PrimaryButton
              size="sm"
              variant="outline"
              colorScheme="green"
              onClick={() => updateOrderStatus(info.row.original.id, 'completed')}
            >
              <CheckCircle className="w-4 h-4" />
            </PrimaryButton>
          )}
          {info.row.original.status === 'paused' && (
            <PrimaryButton
              size="sm"
              variant="outline"
              colorScheme="blue"
              onClick={() => updateOrderStatus(info.row.original.id, 'inProgress')}
            >
              <RotateCcw className="w-4 h-4" />
            </PrimaryButton>
          )}
        </div>
      )
    }
  ];

  const stats = getProductionStats();

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="elevated" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">En Proceso</p>
              <h3 className="text-2xl font-bold text-blue-600">{stats.inProgress}</h3>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
        <Card variant="elevated" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pendientes</p>
              <h3 className="text-2xl font-bold text-yellow-600">{stats.pending}</h3>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </Card>
        <Card variant="elevated" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Completadas</p>
              <h3 className="text-2xl font-bold text-green-600">{stats.completed}</h3>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        <Card variant="elevated" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Pausadas</p>
              <h3 className="text-2xl font-bold text-red-600">{stats.paused}</h3>
            </div>
            <RotateCcw className="w-8 h-8 text-red-500" />
          </div>
        </Card>
      </div>

      {variant === 'detailed' && (
        <Card variant="elevated" className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Progreso General</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Órdenes Completadas</span>
              <span className="text-sm font-medium">
                {stats.completed} de {stats.total}
              </span>
            </div>
            <Progress
              value={(stats.completed / stats.total) * 100}
              max={100}
              size="lg"
              variant="info"
              className="w-full"
            />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">Eficiencia</p>
                <p className="text-xl font-bold text-slate-800">
                  {Math.round((stats.completed / stats.total) * 100)}%
                </p>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">Tiempo Promedio</p>
                <p className="text-xl font-bold text-slate-800">2.5h</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      <Card variant="elevated" className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Órdenes de Producción</h3>
          <Badge variant="subtle" colorScheme={colorScheme}>
            {orders.length} órdenes
          </Badge>
        </div>

        <FilterableTable
          data={orders}
          columns={columns}
          variant={variant === 'simple' ? 'default' : 'bordered'}
          className="w-full"
        />
      </Card>
    </div>
  );
};
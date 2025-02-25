import React, { useState, useMemo } from 'react';
import { Phone, Mail, FileText, Search, ExternalLink, Clock } from 'lucide-react';
import { Card } from '../design/Card';
import { Badge } from '../feedback/Badge';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { FilterableTable } from '../tables/FilterableTable';
import { Modal } from '../design/Modal';

interface Transaction {
  id: string;
  date: Date;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  products: string[];
}

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  rating: number;
  status: 'active' | 'inactive';
  transactions: Transaction[];
}

interface SupplierTableProps {
  variant?: 'simple' | 'detailed';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  className?: string;
}

const generateSampleSuppliers = (): Supplier[] => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `SUP-${(i + 1).toString().padStart(4, '0')}`,
    name: `Proveedor ${i + 1}`,
    email: `proveedor${i + 1}@ejemplo.com`,
    phone: `+34 ${Math.floor(Math.random() * 900000000) + 100000000}`,
    category: ['Electrónica', 'Textil', 'Alimentos', 'Materiales'][i % 4],
    rating: Math.floor(Math.random() * 5) + 1,
    status: Math.random() > 0.2 ? 'active' : 'inactive',
    transactions: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, j) => ({
      id: `TRX-${i}-${j}`,
      date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
      amount: Math.floor(Math.random() * 10000) + 1000,
      status: ['completed', 'pending', 'cancelled'][Math.floor(Math.random() * 3)] as 'completed' | 'pending' | 'cancelled',
      products: [`Producto ${j + 1}`, `Producto ${j + 2}`]
    }))
  }));
};

export const SupplierTable: React.FC<SupplierTableProps> = ({
  variant = 'simple',
  size = 'md',
  colorScheme = 'blue',
  className = ''
}) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(generateSampleSuppliers());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [suppliers, searchTerm]);

  const renderRating = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const columns = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Nombre', accessorKey: 'name' },
    {
      header: 'Contacto',
      cell: (info: any) => (
        <div className="flex items-center gap-2">
          <PrimaryButton
            size="sm"
            variant="outline"
            colorScheme={colorScheme}
            onClick={() => window.location.href = `mailto:${info.row.original.email}`}
          >
            <Mail className="w-4 h-4" />
          </PrimaryButton>
          <PrimaryButton
            size="sm"
            variant="outline"
            colorScheme={colorScheme}
            onClick={() => window.location.href = `tel:${info.row.original.phone}`}
          >
            <Phone className="w-4 h-4" />
          </PrimaryButton>
        </div>
      )
    },
    { header: 'Categoría', accessorKey: 'category' },
    {
      header: 'Valoración',
      accessorKey: 'rating',
      cell: (info: any) => (
        <span className="text-yellow-500">{renderRating(info.getValue())}</span>
      )
    },
    {
      header: 'Estado',
      accessorKey: 'status',
      cell: (info: any) => (
        <Badge
          variant="subtle"
          colorScheme={info.getValue() === 'active' ? 'green' : 'red'}
        >
          {info.getValue() === 'active' ? 'Activo' : 'Inactivo'}
        </Badge>
      )
    },
    {
      header: 'Acciones',
      cell: (info: any) => (
        <div className="flex gap-2">
          <PrimaryButton
            size="sm"
            variant="outline"
            colorScheme={colorScheme}
            onClick={() => {
              setSelectedSupplier(info.row.original);
              setShowHistory(true);
            }}
          >
            <Clock className="w-4 h-4" />
          </PrimaryButton>
          <PrimaryButton
            size="sm"
            variant="outline"
            colorScheme={colorScheme}
            onClick={() => window.open(`/supplier/${info.row.original.id}`, '_blank')}
          >
            <ExternalLink className="w-4 h-4" />
          </PrimaryButton>
        </div>
      )
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <Card variant="elevated" className="p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar proveedores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="subtle" colorScheme={colorScheme}>
              {filteredSuppliers.length} proveedores
            </Badge>
          </div>
        </div>

        <FilterableTable
          data={filteredSuppliers}
          columns={columns}
          variant={variant === 'simple' ? 'default' : 'bordered'}
          className="w-full"
        />
      </Card>

      <Modal
        isOpen={showHistory}
        onClose={() => {
          setShowHistory(false);
          setSelectedSupplier(null);
        }}
        title={`Historial de Compras - ${selectedSupplier?.name}`}
        size="lg"
      >
        {selectedSupplier && (
          <div className="space-y-4">
            {selectedSupplier.transactions.map((transaction) => (
              <Card
                key={transaction.id}
                variant="outline"
                className="p-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-slate-800">{transaction.id}</p>
                    <p className="text-sm text-slate-600">
                      {transaction.date.toLocaleDateString()}
                    </p>
                    <div className="mt-2">
                      <p className="text-sm text-slate-600">Productos:</p>
                      <ul className="list-disc list-inside text-sm text-slate-700">
                        {transaction.products.map((product, index) => (
                          <li key={index}>{product}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-800">
                      ${transaction.amount.toLocaleString()}
                    </p>
                    <Badge
                      variant="subtle"
                      colorScheme={
                        transaction.status === 'completed' ? 'green' :
                        transaction.status === 'pending' ? 'yellow' : 'red'
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};
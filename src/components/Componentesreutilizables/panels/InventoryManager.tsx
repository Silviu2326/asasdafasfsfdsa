import React, { useState, useMemo } from 'react';
import { Barcode, Package, AlertTriangle, Search, Plus } from 'lucide-react';
import { Card } from '../design/Card';
import { Badge } from '../feedback/Badge';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { TextInput } from '../forms/TextInput';
import { Alert } from '../feedback/Alert';
import { FilterableTable } from '../tables/FilterableTable';

interface Product {
  id: string;
  name: string;
  sku: string;
  stock: number;
  minStock: number;
  category: string;
  price: number;
  lastUpdated: Date;
}

interface InventoryManagerProps {
  variant?: 'simple' | 'detailed';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  className?: string;
}

const generateSampleProducts = (): Product[] => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `PRD-${(i + 1).toString().padStart(4, '0')}`,
    name: `Producto ${i + 1}`,
    sku: `SKU-${(i + 1).toString().padStart(6, '0')}`,
    stock: Math.floor(Math.random() * 100),
    minStock: 20,
    category: ['Electrónica', 'Ropa', 'Hogar'][i % 3],
    price: Math.floor(Math.random() * 1000) + 100,
    lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000)
  }));
};

export const InventoryManager: React.FC<InventoryManagerProps> = ({
  variant = 'simple',
  size = 'md',
  colorScheme = 'blue',
  className = ''
}) => {
  const [products, setProducts] = useState<Product[]>(generateSampleProducts());
  const [isScanning, setIsScanning] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const lowStockProducts = useMemo(() => {
    return products.filter(product => product.stock <= product.minStock);
  }, [products]);

  const handleScan = () => {
    setIsScanning(true);
    // Simulación de escaneo
    setTimeout(() => {
      setIsScanning(false);
      // Simular actualización de stock
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      updateStock(randomProduct.id, 1);
    }, 2000);
  };

  const updateStock = (productId: string, quantity: number) => {
    setProducts(products.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          stock: product.stock + quantity,
          lastUpdated: new Date()
        };
      }
      return product;
    }));
  };

  const columns = [
    { header: 'SKU', accessorKey: 'sku' },
    { header: 'Nombre', accessorKey: 'name' },
    { 
      header: 'Stock',
      accessorKey: 'stock',
      cell: (info: any) => (
        <div className="flex items-center gap-2">
          <span>{info.getValue()}</span>
          {info.row.original.stock <= info.row.original.minStock && (
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
          )}
        </div>
      )
    },
    { header: 'Categoría', accessorKey: 'category' },
    { 
      header: 'Precio',
      accessorKey: 'price',
      cell: (info: any) => `$${info.getValue().toFixed(2)}`
    },
    {
      header: 'Última Actualización',
      accessorKey: 'lastUpdated',
      cell: (info: any) => info.getValue().toLocaleDateString()
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-500" />
          Gestión de Inventario
        </h2>
        <Badge variant="outline" colorScheme={colorScheme}>
          {products.length} productos
        </Badge>
      </div>

      {lowStockProducts.length > 0 && (
        <Alert
          variant="warning"
          title="Stock Bajo"
          description={`${lowStockProducts.length} productos necesitan reposición`}
          className="border-l-4 border-l-yellow-500"
        />
      )}

      <Card variant="elevated" className="p-6">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <PrimaryButton
              onClick={handleScan}
              variant="outline"
              colorScheme={colorScheme}
              className="flex items-center gap-2"
              isLoading={isScanning}
              loadingText="Escaneando..."
            >
              <Barcode className="w-4 h-4" />
              Escanear QR
            </PrimaryButton>
            <PrimaryButton
              variant="solid"
              colorScheme={colorScheme}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Nuevo Producto
            </PrimaryButton>
          </div>
        </div>

        <FilterableTable
          data={products}
          columns={columns}
          variant={variant === 'simple' ? 'default' : 'bordered'}
          className="w-full"
        />
      </Card>
    </div>
  );
};
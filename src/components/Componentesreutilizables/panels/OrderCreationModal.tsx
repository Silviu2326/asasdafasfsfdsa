import React, { useState, useMemo } from 'react';
import { Search, ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { Modal } from '../design/Modal';
import { Card } from '../design/Card';
import { TextInput } from '../forms/TextInput';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { SelectInput } from '../forms/SelectInput';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface OrderCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'simple' | 'detailed';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  className?: string;
}

const sampleProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: `PRD-${(i + 1).toString().padStart(4, '0')}`,
  name: `Producto ${i + 1}`,
  price: Math.floor(Math.random() * 1000) + 100,
  stock: Math.floor(Math.random() * 50) + 10,
  category: ['Electrónica', 'Ropa', 'Hogar'][i % 3]
}));

export const OrderCreationModal: React.FC<OrderCreationModalProps> = ({
  isOpen,
  onClose,
  variant = 'simple',
  size = 'md',
  colorScheme = 'blue',
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const filteredProducts = useMemo(() => {
    return sampleProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const addProduct = (product: Product) => {
    const existingItem = selectedItems.find(item => item.product.id === product.id);
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setSelectedItems([...selectedItems, { product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setSelectedItems(selectedItems.map(item =>
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (productId: string) => {
    setSelectedItems(selectedItems.filter(item => item.product.id !== productId));
  };

  const calculateTotals = () => {
    const subtotal = selectedItems.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0
    );
    const tax = subtotal * 0.16; // 16% IVA
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Crear Nuevo Pedido"
      size="lg"
      className={className}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <TextInput
            label="Nombre del Cliente"
            value={customerData.name}
            onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
          />
          <TextInput
            label="Email"
            type="email"
            value={customerData.email}
            onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
          />
        </div>

        <Card variant="elevated" className="p-4">
          <div className="relative mb-4">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 max-h-[200px] overflow-y-auto mb-4">
            {filteredProducts.map(product => (
              <Card
                key={product.id}
                variant="outline"
                className="p-3 cursor-pointer hover:border-blue-500"
                onClick={() => addProduct(product)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-slate-800">{product.name}</h4>
                    <p className="text-sm text-slate-500">{product.category}</p>
                  </div>
                  <span className="font-semibold text-blue-600">
                    ${product.price}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">Items Seleccionados</h3>
          {selectedItems.map(item => (
            <div key={item.product.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">{item.product.name}</h4>
                <p className="text-sm text-slate-500">${item.product.price} c/u</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <PrimaryButton
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    <Minus className="w-4 h-4" />
                  </PrimaryButton>
                  <span className="w-12 text-center">{item.quantity}</span>
                  <PrimaryButton
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </PrimaryButton>
                </div>
                <PrimaryButton
                  size="sm"
                  variant="outline"
                  colorScheme="red"
                  onClick={() => removeItem(item.product.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </PrimaryButton>
              </div>
            </div>
          ))}
        </div>

        {variant === 'detailed' && (
          <TextInput
            label="Notas adicionales"
            multiline
            rows={3}
            placeholder="Instrucciones especiales para el pedido..."
          />
        )}

        <div className="border-t pt-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-medium">${calculateTotals().subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">IVA (16%)</span>
              <span className="font-medium">${calculateTotals().tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${calculateTotals().total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <PrimaryButton
              variant="outline"
              colorScheme={colorScheme}
              onClick={onClose}
            >
              Cancelar
            </PrimaryButton>
            <PrimaryButton
              variant="solid"
              colorScheme={colorScheme}
              className="flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Crear Pedido
            </PrimaryButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};
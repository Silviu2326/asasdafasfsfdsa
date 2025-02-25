import React, { useState, useMemo } from 'react';
import { Search, Plus, Minus, Trash2, FileText, Download, Calculator } from 'lucide-react';
import { Card } from '../design/Card';
import { Badge } from '../feedback/Badge';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { TextInput } from '../forms/TextInput';
import { SelectInput } from '../forms/SelectInput';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  unit: string;
}

interface QuotationItem {
  product: Product;
  quantity: number;
  discount: number;
}

interface QuotationModuleProps {
  variant?: 'simple' | 'detailed';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  className?: string;
}

const sampleProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
  id: `PRD-${(i + 1).toString().padStart(4, '0')}`,
  name: `Producto ${i + 1}`,
  price: Math.floor(Math.random() * 1000) + 100,
  description: `Descripción del producto ${i + 1}`,
  category: ['Electrónica', 'Materiales', 'Servicios'][i % 3],
  unit: ['unidad', 'kg', 'metro'][i % 3]
}));

export const QuotationModule: React.FC<QuotationModuleProps> = ({
  variant = 'simple',
  size = 'md',
  colorScheme = 'blue',
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<QuotationItem[]>([]);
  const [quotationInfo, setQuotationInfo] = useState({
    clientName: '',
    clientEmail: '',
    validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: ''
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
      setSelectedItems([...selectedItems, { product, quantity: 1, discount: 0 }]);
    }
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setSelectedItems(selectedItems.map(item =>
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const updateDiscount = (productId: string, discount: number) => {
    setSelectedItems(selectedItems.map(item =>
      item.product.id === productId ? { ...item, discount: Math.min(100, Math.max(0, discount)) } : item
    ));
  };

  const removeItem = (productId: string) => {
    setSelectedItems(selectedItems.filter(item => item.product.id !== productId));
  };

  const calculateTotals = () => {
    const subtotal = selectedItems.reduce((sum, item) => {
      const itemTotal = item.product.price * item.quantity;
      const discountAmount = itemTotal * (item.discount / 100);
      return sum + (itemTotal - discountAmount);
    }, 0);
    const tax = subtotal * 0.16; // 16% IVA
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const generatePDF = () => {
    // Implementación real de generación de PDF aquí
    console.log('Generando PDF de cotización...');
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <Card variant="elevated" className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <TextInput
            label="Nombre del Cliente"
            value={quotationInfo.clientName}
            onChange={(e) => setQuotationInfo({ ...quotationInfo, clientName: e.target.value })}
          />
          <TextInput
            label="Email del Cliente"
            type="email"
            value={quotationInfo.clientEmail}
            onChange={(e) => setQuotationInfo({ ...quotationInfo, clientEmail: e.target.value })}
          />
        </div>

        <div className="relative mb-6">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {filteredProducts.map(product => (
            <Card
              key={product.id}
              variant="outline"
              className="p-4 cursor-pointer hover:border-blue-500"
              onClick={() => addProduct(product)}
            >
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium text-slate-800">{product.name}</h4>
                  <p className="text-sm text-slate-500">{product.description}</p>
                  <span className="text-xs text-slate-400">
                    {product.category} - Por {product.unit}
                  </span>
                </div>
                <span className="font-semibold text-blue-600">
                  ${product.price}
                </span>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800">Items Seleccionados</h3>
          {selectedItems.map(item => (
            <Card key={item.product.id} variant="outline" className="p-4">
              <div className="flex flex-wrap gap-4 justify-between items-center">
                <div className="flex-1">
                  <h4 className="font-medium">{item.product.name}</h4>
                  <p className="text-sm text-slate-500">${item.product.price} por {item.product.unit}</p>
                </div>
                <div className="flex items-center gap-4">
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
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={item.discount}
                      onChange={(e) => updateDiscount(item.product.id, Number(e.target.value))}
                      className="w-16 px-2 py-1 border rounded"
                      min="0"
                      max="100"
                    />
                    <span className="text-sm text-slate-500">% desc.</span>
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
            </Card>
          ))}
        </div>

        {variant === 'detailed' && (
          <TextInput
            label="Notas adicionales"
            multiline
            rows={3}
            value={quotationInfo.notes}
            onChange={(e) => setQuotationInfo({ ...quotationInfo, notes: e.target.value })}
            className="mt-6"
          />
        )}

        <div className="border-t mt-6 pt-6">
          <div className="space-y-2 mb-6">
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

          <div className="flex justify-end gap-2">
            <PrimaryButton
              variant="outline"
              colorScheme={colorScheme}
              className="flex items-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              Vista Previa
            </PrimaryButton>
            <PrimaryButton
              variant="solid"
              colorScheme={colorScheme}
              className="flex items-center gap-2"
              onClick={generatePDF}
            >
              <Download className="w-4 h-4" />
              Generar PDF
            </PrimaryButton>
          </div>
        </div>
      </Card>
    </div>
  );
};
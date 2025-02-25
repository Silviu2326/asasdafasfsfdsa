import React, { useState } from 'react';
import { FileText, Printer, Download, Search } from 'lucide-react';
import { Modal } from '../design/Modal';
import { SelectInput } from '../forms/SelectInput';
import { TextInput } from '../forms/TextInput';
import { PrimaryButton } from '../buttons/PrimaryButton';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'simple' | 'detailed';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  className?: string;
}

interface InvoiceData {
  clientId: string;
  items: Array<{
    description: string;
    quantity: number;
    price: number;
  }>;
  date: string;
  dueDate: string;
  notes: string;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  variant = 'simple',
  size = 'md',
  colorScheme = 'blue',
  className = ''
}) => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    clientId: '',
    items: [{ description: '', quantity: 1, price: 0 }],
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: ''
  });

  const clients = [
    { value: '1', label: 'Juan Pérez' },
    { value: '2', label: 'María García' },
    { value: '3', label: 'Carlos López' }
  ];

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: '', quantity: 1, price: 0 }]
    });
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const calculateTotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generar Factura"
      size="lg"
      className={className}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <SelectInput
              label="Cliente"
              options={clients}
              value={invoiceData.clientId}
              onChange={(e) => setInvoiceData({ ...invoiceData, clientId: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              label="Fecha"
              type="date"
              value={invoiceData.date}
              onChange={(e) => setInvoiceData({ ...invoiceData, date: e.target.value })}
            />
            <TextInput
              label="Vencimiento"
              type="date"
              value={invoiceData.dueDate}
              onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-slate-800">Items</h3>
            <PrimaryButton
              onClick={addItem}
              variant="outline"
              size="sm"
              colorScheme={colorScheme}
            >
              Añadir Item
            </PrimaryButton>
          </div>

          {invoiceData.items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <TextInput
                  placeholder="Descripción"
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                />
              </div>
              <div className="col-span-3">
                <TextInput
                  type="number"
                  placeholder="Cantidad"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                />
              </div>
              <div className="col-span-3">
                <TextInput
                  type="number"
                  placeholder="Precio"
                  value={item.price}
                  onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
                />
              </div>
            </div>
          ))}
        </div>

        <TextInput
          label="Notas"
          multiline
          rows={3}
          value={invoiceData.notes}
          onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
        />

        {variant === 'detailed' && (
          <div className="border rounded-lg p-4 bg-slate-50">
            <h3 className="font-semibold text-slate-800 mb-4">Vista Previa</h3>
            <div className="h-[200px] flex items-center justify-center border rounded bg-white">
              Área para vista previa del PDF
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-lg font-semibold">
            Total: ${calculateTotal().toFixed(2)}
          </div>
          <div className="flex gap-2">
            <PrimaryButton
              variant="outline"
              colorScheme={colorScheme}
              className="flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Vista Previa
            </PrimaryButton>
            <PrimaryButton
              variant="solid"
              colorScheme={colorScheme}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Generar Factura
            </PrimaryButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};
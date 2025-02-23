import React, { useState } from 'react';
import { Model } from '../../types/backend';

interface ModelFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (model: Model) => void;
}

const ModelFormPopup: React.FC<ModelFormPopupProps> = ({ isOpen, onClose, onSubmit }) => {
  const [modelName, setModelName] = useState('');
  const [initialFields, setInitialFields] = useState([
    { name: 'id', type: 'string', required: true },
    { name: 'createdAt', type: 'date', required: true },
    { name: 'updatedAt', type: 'date', required: true },
  ]);
  const [modelOptions, setModelOptions] = useState({
    timestamps: true,
    softDelete: false,
    audit: false,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Crear Nuevo Modelo</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Modelo
            </label>
            <input
              type="text"
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: Product"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Campos Iniciales
            </label>
            {initialFields.map((field, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={field.name}
                  onChange={(e) => {
                    const newFields = [...initialFields];
                    newFields[index].name = e.target.value;
                    setInitialFields(newFields);
                  }}
                  className="flex-1 px-2 py-1 text-sm border rounded"
                  placeholder="Nombre del campo"
                />
                <select
                  value={field.type}
                  onChange={(e) => {
                    const newFields = [...initialFields];
                    newFields[index].type = e.target.value;
                    setInitialFields(newFields);
                  }}
                  className="px-2 py-1 text-sm border rounded"
                >
                  <option value="string">String</option>
                  <option value="text">Text</option>
                  <option value="integer">Integer</option>
                  <option value="decimal">Decimal</option>
                  <option value="boolean">Boolean</option>
                  <option value="date">Date</option>
                  <option value="uuid">UUID</option>
                  <option value="json">JSON</option>
                </select>
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) => {
                    const newFields = [...initialFields];
                    newFields[index].required = e.target.checked;
                    setInitialFields(newFields);
                  }}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <button
                  onClick={() => {
                    setInitialFields(initialFields.filter((_, i) => i !== index));
                  }}
                  className="text-red-500 hover:text-red-600"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                setInitialFields([...initialFields, { name: '', type: 'string', required: false }]);
              }}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              + Añadir Campo Inicial
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Opciones del Modelo
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={modelOptions.timestamps}
                  onChange={(e) => setModelOptions({ ...modelOptions, timestamps: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700">Incluir timestamps (createdAt, updatedAt)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={modelOptions.softDelete}
                  onChange={(e) => setModelOptions({ ...modelOptions, softDelete: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700">Habilitar borrado suave (deletedAt)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={modelOptions.audit}
                  onChange={(e) => setModelOptions({ ...modelOptions, audit: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700">Incluir campos de auditoría</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                if (modelName.trim()) {
                  const fields = [...initialFields];
                  if (modelOptions.timestamps) {
                    if (!fields.find(f => f.name === 'createdAt')) {
                      fields.push({ name: 'createdAt', type: 'date', required: true });
                    }
                    if (!fields.find(f => f.name === 'updatedAt')) {
                      fields.push({ name: 'updatedAt', type: 'date', required: true });
                    }
                  }
                  if (modelOptions.softDelete) {
                    fields.push({ name: 'deletedAt', type: 'date', required: false });
                  }
                  if (modelOptions.audit) {
                    fields.push(
                      { name: 'createdBy', type: 'string', required: true },
                      { name: 'updatedBy', type: 'string', required: true }
                    );
                  }
                  onSubmit({
                    name: modelName,
                    fields
                  });
                  setModelName('');
                  setInitialFields([
                    { name: 'id', type: 'string', required: true },
                    { name: 'createdAt', type: 'date', required: true },
                    { name: 'updatedAt', type: 'date', required: true },
                  ]);
                  setModelOptions({
                    timestamps: true,
                    softDelete: false,
                    audit: false,
                  });
                  onClose();
                }
              }}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Crear Modelo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelFormPopup;
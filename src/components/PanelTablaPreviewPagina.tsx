import React, { useState } from 'react';
import { X, Database, Save } from 'lucide-react';

interface PanelTablaPreviewPaginaProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: TableConfig) => void;
  initialConfig?: TableConfig;
}

interface TableConfig {
  columns: Array<{
    header: string;
    accessorKey: string;
    type: string;
  }>;
  features: {
    sortable: boolean;
    filterable: boolean;
    pagination: boolean;
    searchable: boolean;
  };
  pagination: {
    pageSize: number;
    variant: 'simple' | 'numbered';
  };
}

const PanelTablaPreviewPagina: React.FC<PanelTablaPreviewPaginaProps> = ({
  isOpen,
  onClose,
  onSave,
  initialConfig
}) => {
  const [config, setConfig] = useState<TableConfig>(initialConfig || {
    columns: [
      { header: 'ID', accessorKey: 'id', type: 'number' },
      { header: 'Nombre', accessorKey: 'name', type: 'text' }
    ],
    features: {
      sortable: true,
      filterable: true,
      pagination: true,
      searchable: true
    },
    pagination: {
      pageSize: 10,
      variant: 'numbered'
    }
  });

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-medium">Configuración de Tabla</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Columnas */}
          <div>
            <h3 className="text-sm font-medium mb-2">Columnas</h3>
            {config.columns.map((column, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={column.header}
                  onChange={(e) => {
                    const newColumns = [...config.columns];
                    newColumns[index].header = e.target.value;
                    setConfig({ ...config, columns: newColumns });
                  }}
                  placeholder="Header"
                  className="flex-1 px-2 py-1 border rounded"
                />
                <select
                  value={column.type}
                  onChange={(e) => {
                    const newColumns = [...config.columns];
                    newColumns[index].type = e.target.value;
                    setConfig({ ...config, columns: newColumns });
                  }}
                  className="px-2 py-1 border rounded"
                >
                  <option value="text">Texto</option>
                  <option value="number">Número</option>
                  <option value="date">Fecha</option>
                </select>
              </div>
            ))}
            <button
              onClick={() => {
                setConfig({
                  ...config,
                  columns: [...config.columns, { header: '', accessorKey: `col${config.columns.length}`, type: 'text' }]
                });
              }}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              + Añadir columna
            </button>
          </div>

          {/* Características */}
          <div>
            <h3 className="text-sm font-medium mb-2">Características</h3>
            <div className="space-y-2">
              {Object.entries(config.features).map(([key, value]) => (
                <label key={key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => {
                      setConfig({
                        ...config,
                        features: {
                          ...config.features,
                          [key]: e.target.checked
                        }
                      });
                    }}
                  />
                  <span className="text-sm">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Paginación */}
          {config.features.pagination && (
            <div>
              <h3 className="text-sm font-medium mb-2">Paginación</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm">Tamaño de página:</label>
                  <input
                    type="number"
                    value={config.pagination.pageSize}
                    onChange={(e) => {
                      setConfig({
                        ...config,
                        pagination: {
                          ...config.pagination,
                          pageSize: Number(e.target.value)
                        }
                      });
                    }}
                    className="w-20 px-2 py-1 border rounded"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm">Variante:</label>
                  <select
                    value={config.pagination.variant}
                    onChange={(e) => {
                      setConfig({
                        ...config,
                        pagination: {
                          ...config.pagination,
                          variant: e.target.value as 'simple' | 'numbered'
                        }
                      });
                    }}
                    className="px-2 py-1 border rounded"
                  >
                    <option value="simple">Simple</option>
                    <option value="numbered">Numerada</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleSave}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  );
};

export default PanelTablaPreviewPagina;
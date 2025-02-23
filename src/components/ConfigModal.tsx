import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Settings2 } from 'lucide-react';
import { useEditorStore } from '../store';

export const ConfigModal: React.FC = () => {
  const { 
    selectedComponent,
    tempConfig,
    isModalOpen,
    setTempConfig,
    saveTempConfig,
    cancelEdit
  } = useEditorStore();

  if (!isModalOpen || !selectedComponent || !tempConfig) return null;

  const [headers, setHeaders] = useState<string[]>([]);

  useEffect(() => {
    if (tempConfig.headers) {
      setHeaders(tempConfig.headers);
    } else if (tempConfig.columns) {
      setHeaders(Array(tempConfig.columns).fill(''));
    }
  }, [tempConfig]);

  const handleInputChange = (field: string, value: any) => {
    setTempConfig({
      ...tempConfig,
      [field]: value,
    });
  };

  const handleHeaderChange = (index: number, value: string) => {
    if (!tempConfig.headers) return;
    const newHeaders = [...headers];
    newHeaders[index] = value;
    setHeaders(newHeaders);
    handleInputChange('headers', newHeaders);
  };

  const handleColumnsChange = (columns: number) => {
    const newColumns = Math.max(1, Math.min(columns, 12));
    const newHeaders = Array(newColumns).fill('');
    headers.slice(0, newColumns).forEach((header, i) => {
      newHeaders[i] = header;
    });
    setHeaders(newHeaders);
    handleInputChange('columns', newColumns);
    handleInputChange('headers', newHeaders);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">
            Configurar {selectedComponent.type === 'button' ? 'Botón' : 'Tabla'}
          </h2>
          <button
            onClick={cancelEdit}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {selectedComponent.type === 'button' ? (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Título del Botón
                </label>
                <input
                  type="text"
                  value={tempConfig.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Ingrese el título del botón"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Acción
                </label>
                <select
                  value={tempConfig.action || ''}
                  onChange={(e) => handleInputChange('action', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Seleccionar acción</option>
                  <option value="alert">Mostrar alerta</option>
                  <option value="navigate">Navegar</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Nombre de la Tabla
                </label>
                <input
                  type="text"
                  value={tempConfig.tableName || ''}
                  onChange={(e) => handleInputChange('tableName', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Ingrese el nombre de la tabla"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Columnas
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleColumnsChange((tempConfig.columns || 1) - 1)}
                      className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={tempConfig.columns || 1}
                      onChange={(e) => handleColumnsChange(parseInt(e.target.value) || 1)}
                      className="w-20 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center"
                    />
                    <button
                      onClick={() => handleColumnsChange((tempConfig.columns || 1) + 1)}
                      className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">
                    Filas
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleInputChange('rows', Math.max(1, (tempConfig.rows || 1) - 1))}
                      className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={tempConfig.rows || 1}
                      onChange={(e) => handleInputChange('rows', parseInt(e.target.value) || 1)}
                      className="w-20 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center"
                    />
                    <button
                      onClick={() => handleInputChange('rows', (tempConfig.rows || 1) + 1)}
                      className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-700">
                  Encabezados
                </label>
                <div className="space-y-2">
                  {headers.map((header, index) => (
                    <input
                      key={index}
                      type="text"
                      value={header}
                      onChange={(e) => handleHeaderChange(index, e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-2"
                      placeholder={`Encabezado ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showBorder"
                    checked={tempConfig.showBorder ?? true}
                    onChange={(e) =>
                      handleInputChange('showBorder', e.target.checked)
                    }
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="showBorder"
                    className="text-sm font-medium text-slate-700"
                  >
                    Mostrar bordes
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="striped"
                    checked={tempConfig.striped ?? false}
                    onChange={(e) =>
                      handleInputChange('striped', e.target.checked)
                    }
                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="striped"
                    className="text-sm font-medium text-slate-700"
                  >
                    Filas alternadas
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200">
          <button
            onClick={cancelEdit}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={saveTempConfig}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { X, Component, Save } from 'lucide-react';

interface PanelBotonPreviewPaginaProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: ButtonConfig) => void;
  initialConfig?: ButtonConfig;
}

interface ButtonConfig {
  text: string;
  variant: 'primary' | 'secondary' | 'icon' | 'loading';
  size: 'sm' | 'md' | 'lg';
  icon?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  customStyles?: {
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: string;
    padding?: string;
  };
}

const PanelBotonPreviewPagina: React.FC<PanelBotonPreviewPaginaProps> = ({
  isOpen,
  onClose,
  onSave,
  initialConfig
}) => {
  const [config, setConfig] = useState<ButtonConfig>(initialConfig || {
    text: 'Botón',
    variant: 'primary',
    size: 'md',
    icon: '',
    isLoading: false,
    isDisabled: false,
    customStyles: {
      backgroundColor: '#3b82f6',
      textColor: '#ffffff',
      borderRadius: '0.375rem',
      padding: '0.5rem 1rem'
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
            <Component className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-medium">Configuración de Botón</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Texto</label>
            <input
              type="text"
              value={config.text}
              onChange={(e) => setConfig({ ...config, text: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Variante</label>
            <select
              value={config.variant}
              onChange={(e) => setConfig({ ...config, variant: e.target.value as ButtonConfig['variant'] })}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="icon">Icon</option>
              <option value="loading">Loading</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tamaño</label>
            <select
              value={config.size}
              onChange={(e) => setConfig({ ...config, size: e.target.value as ButtonConfig['size'] })}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="sm">Pequeño</option>
              <option value="md">Mediano</option>
              <option value="lg">Grande</option>
            </select>
          </div>

          {config.variant === 'icon' && (
            <div>
              <label className="block text-sm font-medium mb-1">Icono</label>
              <input
                type="text"
                value={config.icon}
                onChange={(e) => setConfig({ ...config, icon: e.target.value })}
                className="w-full px-3 py-2 border rounded"
                placeholder="search, home, settings, etc."
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.isLoading}
                onChange={(e) => setConfig({ ...config, isLoading: e.target.checked })}
              />
              <span className="text-sm">Mostrar loading</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={config.isDisabled}
                onChange={(e) => setConfig({ ...config, isDisabled: e.target.checked })}
              />
              <span className="text-sm">Deshabilitado</span>
            </label>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Estilos personalizados</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs mb-1">Color de fondo</label>
                <input
                  type="color"
                  value={config.customStyles?.backgroundColor}
                  onChange={(e) => setConfig({
                    ...config,
                    customStyles: { ...config.customStyles, backgroundColor: e.target.value }
                  })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Color de texto</label>
                <input
                  type="color"
                  value={config.customStyles?.textColor}
                  onChange={(e) => setConfig({
                    ...config,
                    customStyles: { ...config.customStyles, textColor: e.target.value }
                  })}
                  className="w-full"
                />
              </div>
            </div>
          </div>

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

export default PanelBotonPreviewPagina;
import React from 'react';
import { X } from 'lucide-react';
import { ComponentRegistry } from './ComponentRegistry';

interface ConfigurationPanelProps {
  component: any;
  registry: ComponentRegistry;
  onClose: () => void;
  onConfigUpdate: (newConfig: any) => void;
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  component,
  registry,
  onClose,
  onConfigUpdate,
}) => {
  if (!component) return null;

  const componentDef = registry.getComponentDefinition(component.type);
  if (!componentDef) return null;

  const handleConfigChange = (key: string | object, value?: any) => {
    if (typeof key === 'string') {
      // Si es una sola propiedad
      onConfigUpdate({
        ...component.config,
        [key]: value,
      });
    } else if (typeof key === 'object') {
      // Si son múltiples propiedades
      onConfigUpdate({
        ...component.config,
        ...key,
      });
    }
  };

  const renderButtonConfig = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Texto del botón
          </label>
          <input
            type="text"
            value={component.config.title || ''}
            onChange={(e) => {
              handleConfigChange({
                title: e.target.value,
                children: e.target.value
              });
            }}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Texto del botón"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Variante
          </label>
          <select
            value={component.config.variant || 'solid'}
            onChange={(e) => handleConfigChange('variant', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="solid">Sólido</option>
            <option value="outline">Contorno</option>
            <option value="ghost">Fantasma</option>
            <option value="link">Enlace</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Color
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['blue', 'green', 'red', 'yellow', 'gray', 'indigo'].map((color) => (
              <button
                key={color}
                onClick={() => handleConfigChange('colorScheme', color)}
                className={`
                  p-2 rounded-lg border transition-all
                  ${component.config.colorScheme === color
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 hover:border-indigo-300'
                  }
                `}
              >
                <div className={`w-full h-6 rounded bg-${color}-500 mb-1`} />
                <span className="text-xs font-medium capitalize">{color}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Tamaño
          </label>
          <select
            value={component.config.size || 'md'}
            onChange={(e) => handleConfigChange('size', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="sm">Pequeño</option>
            <option value="md">Mediano</option>
            <option value="lg">Grande</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Opciones adicionales
          </label>
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={component.config.isFullWidth || false}
                onChange={(e) => handleConfigChange('isFullWidth', e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-slate-600">Ancho completo</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={component.config.isDisabled || false}
                onChange={(e) => handleConfigChange('isDisabled', e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-slate-600">Deshabilitado</span>
            </label>
          </div>
        </div>
      </div>
    );
  };

  const renderSecondaryButtonConfig = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Texto del botón
          </label>
          <input
            type="text"
            value={component.config.children || ''}
            onChange={(e) => handleConfigChange('children', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Texto del botón secundario"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Estilo de borde
          </label>
          <select
            value={component.config.variant || 'outline'}
            onChange={(e) => handleConfigChange('variant', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="outline">Contorno</option>
            <option value="subtle">Sutil</option>
            <option value="link">Enlace</option>
            <option value="underline">Subrayado</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Esquema de color
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['slate', 'gray', 'zinc', 'neutral', 'stone', 'blue'].map((color) => (
              <button
                key={color}
                onClick={() => handleConfigChange('colorScheme', color)}
                className={`
                  p-2 rounded-lg border transition-all
                  ${component.config.colorScheme === color
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 hover:border-indigo-300'
                  }
                `}
              >
                <div className={`w-full h-6 rounded bg-${color}-500 mb-1`} />
                <span className="text-xs font-medium capitalize">{color}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Tamaño y espaciado
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-600 mb-1 block">
                Tamaño del botón
              </label>
              <select
                value={component.config.size || 'md'}
                onChange={(e) => handleConfigChange('size', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="xs">Compacto</option>
                <option value="sm">Pequeño</option>
                <option value="md">Normal</option>
                <option value="lg">Grande</option>
                <option value="xl">Extra grande</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-600 mb-1 block">
                Redondeo de esquinas
              </label>
              <select
                value={component.config.borderRadius || 'md'}
                onChange={(e) => handleConfigChange('borderRadius', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="none">Sin redondeo</option>
                <option value="sm">Sutil</option>
                <option value="md">Normal</option>
                <option value="lg">Grande</option>
                <option value="full">Completo</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Efectos y animaciones
          </label>
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={component.config.hasRippleEffect || false}
                onChange={(e) => handleConfigChange('hasRippleEffect', e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-slate-600">Efecto ripple al hacer clic</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={component.config.hasHoverEffect || false}
                onChange={(e) => handleConfigChange('hasHoverEffect', e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-slate-600">Efecto hover suave</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={component.config.hasShadow || false}
                onChange={(e) => handleConfigChange('hasShadow', e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-slate-600">Sombra elevada</span>
            </label>
          </div>
        </div>
      </div>
    );
  };

  const renderHeader1Config = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Título Principal
          </label>
          <input
            type="text"
            value={component.config.title || ''}
            onChange={(e) => handleConfigChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Ingrese el título principal"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Subtítulo
          </label>
          <input
            type="text"
            value={component.config.subtitle || ''}
            onChange={(e) => handleConfigChange('subtitle', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Ingrese el subtítulo (opcional)"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Variante
          </label>
          <select
            value={component.config.variant || 'withDivider'}
            onChange={(e) => handleConfigChange('variant', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="withDivider">Con Divisor</option>
            <option value="simple">Simple</option>
            <option value="centered">Centrado</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Tamaño
          </label>
          <select
            value={component.config.size || 'md'}
            onChange={(e) => handleConfigChange('size', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="sm">Pequeño</option>
            <option value="md">Mediano</option>
            <option value="lg">Grande</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Esquema de Color
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['blue', 'green', 'red', 'yellow', 'gray', 'indigo'].map((color) => (
              <button
                key={color}
                onClick={() => handleConfigChange('colorScheme', color)}
                className={`
                  p-2 rounded-lg border transition-all
                  ${component.config.colorScheme === color
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-slate-200 hover:border-indigo-300'
                  }
                `}
              >
                <div className={`w-full h-6 rounded bg-${color}-500 mb-1`} />
                <span className="text-xs font-medium capitalize">{color}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Clase CSS Personalizada
          </label>
          <input
            type="text"
            value={component.config.className || ''}
            onChange={(e) => handleConfigChange('className', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Ingrese clases CSS personalizadas"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Configuración
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-slate-500" />
        </button>
      </div>

      {component.type === 'button' && renderButtonConfig()}
      {component.type === 'secondaryButton' && renderSecondaryButtonConfig()}
      {component.type === 'header1' && renderHeader1Config()}
    </div>
  );
};

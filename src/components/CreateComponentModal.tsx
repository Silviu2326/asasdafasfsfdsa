import React, { useState } from 'react';
import { X, Code, Puzzle, Box, Layers, FileCode } from 'lucide-react';

interface CreateComponentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateComponent: (componentConfig: ComponentConfig, pageName: string) => void;
  pageName: string;
}

interface ComponentConfig {
  name: string;
  description: string;
  componentType: 'standalone' | 'reusable' | 'composite';
  layout: {
    type: 'single' | 'grid' | 'flex' | 'custom';
    columns?: number;
    gap?: number;
  };
  dataSource: {
    type: 'mock' | 'api';
    endpoint?: string;
    mockData?: boolean;
  };
  type: string;
  features: {
    props: boolean;
    state: boolean;
    styles: boolean;
    animation: boolean;
    reusableComponents: string[];
  };
  meta: {
    isShared: boolean;
    category: string;
    dependencies: string[];
  };
}

const CreateComponentModal: React.FC<CreateComponentModalProps> = ({
  isOpen,
  onClose,
  onCreateComponent,
  pageName
}) => {
  const [componentConfig, setComponentConfig] = useState<ComponentConfig>({
    name: '',
    description: '',
    componentType: 'standalone',
    type: 'functional',
    layout: {
      type: 'single',
      columns: 1,
      gap: 4
    },
    dataSource: {
      type: 'mock',
      mockData: true,
      endpoint: ''
    },
    features: {
      props: false,
      state: false,
      styles: false,
      animation: false,
      reusableComponents: []
    },
    meta: {
      isShared: false,
      category: 'ui',
      dependencies: []
    }
  });

  const [dependency, setDependency] = useState('');

  const componentTypes = [
    { id: 'functional', name: 'Functional Component', icon: Code },
    { id: 'container', name: 'Container Component', icon: Box },
    { id: 'presentation', name: 'Presentation Component', icon: Layers },
    { id: 'hoc', name: 'Higher-Order Component', icon: Puzzle },
    { id: 'custom', name: 'Custom Component', icon: FileCode }
  ];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (componentConfig.name.trim()) {
      onCreateComponent(componentConfig, pageName);
      setComponentConfig({
        name: '',
        description: '',
        componentType: 'standalone',
        type: 'functional',
        layout: {
          type: 'single',
          columns: 1,
          gap: 4
        },
        dataSource: {
          type: 'mock',
          mockData: true,
          endpoint: ''
        },
        features: {
          props: false,
          state: false,
          styles: false,
          animation: false,
          reusableComponents: []
        },
        meta: {
          isShared: false,
          category: 'ui',
          dependencies: []
        }
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Create Component for {pageName}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="componentName" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Componente
              </label>
              <input
                type="text"
                id="componentName"
                value={componentConfig.name}
                onChange={(e) => setComponentConfig({ ...componentConfig, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa el nombre del componente..."
              />
            </div>

            <div>
              <label htmlFor="componentDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                id="componentDescription"
                value={componentConfig.description}
                onChange={(e) => setComponentConfig({ ...componentConfig, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Describe el propósito del componente..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tipo de Componente
              </label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'reusable', name: 'Reutilizable', description: 'Componente con elementos reutilizables internos' },
                  { id: 'composite', name: 'Compuesto', description: 'Componente complejo con estructura personalizada' }
                ].map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setComponentConfig({ ...componentConfig, componentType: type.id as any })}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      componentConfig.componentType === type.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <div className="font-medium mb-1">{type.name}</div>
                    <div className="text-xs text-gray-500">{type.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Estructura del Layout
              </label>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {[
                  { id: 'single', name: 'Columna Única', icon: '▣' },
                  { id: 'grid', name: 'Cuadrícula', icon: '⊞' },
                  { id: 'flex', name: 'Flexible', icon: '⇲' },
                  { id: 'custom', name: 'Personalizado', icon: '⋮' }
                ].map(layout => (
                  <button
                    key={layout.id}
                    type="button"
                    onClick={() => setComponentConfig({
                      ...componentConfig,
                      layout: { 
                        ...componentConfig.layout || {},
                        type: layout.id as 'single' | 'grid' | 'flex' | 'custom'
                      }
                    })}
                    className={`p-4 border rounded-lg flex items-center gap-3 ${
                      componentConfig.layout?.type === layout.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-200'
                    }`}
                  >
                    <span className="text-xl">{layout.icon}</span>
                    <span>{layout.name}</span>
                  </button>
                ))}
              </div>
              {componentConfig.layout?.type === 'grid' && (
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-600 mb-1">Columnas</label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={componentConfig.layout.columns}
                      onChange={(e) => setComponentConfig({
                        ...componentConfig,
                        layout: { ...componentConfig.layout, columns: parseInt(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-600 mb-1">Espaciado (px)</label>
                    <input
                      type="number"
                      min="0"
                      value={componentConfig.layout.gap}
                      onChange={(e) => setComponentConfig({
                        ...componentConfig,
                        layout: { ...componentConfig.layout, gap: parseInt(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Fuente de Datos
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setComponentConfig({
                    ...componentConfig,
                    dataSource: { ...componentConfig.dataSource, type: 'mock', mockData: true }
                  })}
                  className={`p-4 border rounded-lg ${
                    componentConfig.dataSource.type === 'mock'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <div className="font-medium mb-1">Datos de Prueba</div>
                  <div className="text-xs text-gray-500">Usar datos de ejemplo para desarrollo</div>
                </button>
                <button
                  type="button"
                  onClick={() => setComponentConfig({
                    ...componentConfig,
                    dataSource: { ...componentConfig.dataSource, type: 'api', endpoint: '' }
                  })}
                  className={`p-4 border rounded-lg ${
                    componentConfig.dataSource.type === 'api'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-200'
                  }`}
                >
                  <div className="font-medium mb-1">Integración API</div>
                  <div className="text-xs text-gray-500">Conectar a un endpoint de API real</div>
                </button>
              </div>
              {componentConfig.dataSource.type === 'api' && (
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="URL del Endpoint API"
                    value={componentConfig.dataSource.endpoint || ''}
                    onChange={(e) => setComponentConfig({
                      ...componentConfig,
                      dataSource: { ...componentConfig.dataSource, endpoint: e.target.value }
                    })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Características
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={componentConfig.features.props}
                    onChange={(e) => setComponentConfig({
                      ...componentConfig,
                      features: { ...componentConfig.features, props: e.target.checked }
                    })}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Props Personalizados</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={componentConfig.features.state}
                    onChange={(e) => setComponentConfig({
                      ...componentConfig,
                      features: { ...componentConfig.features, state: e.target.checked }
                    })}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Estado Local</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={componentConfig.features.styles}
                    onChange={(e) => setComponentConfig({
                      ...componentConfig,
                      features: { ...componentConfig.features, styles: e.target.checked }
                    })}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Estilos Personalizados</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={componentConfig.features.animation}
                    onChange={(e) => setComponentConfig({
                      ...componentConfig,
                      features: { ...componentConfig.features, animation: e.target.checked }
                    })}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Animaciones</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Dependencias
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={dependency}
                  onChange={(e) => setDependency(e.target.value)}
                  placeholder="Agregar dependencia..."
                  className="flex-1 px-3 py-2 border rounded-md"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (dependency.trim()) {
                      setComponentConfig({
                        ...componentConfig,
                        meta: {
                          ...componentConfig.meta,
                          dependencies: [...componentConfig.meta.dependencies, dependency.trim()]
                        }
                      });
                      setDependency('');
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Agregar
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {componentConfig.meta.dependencies.map((dep, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm flex items-center gap-1"
                  >
                    {dep}
                    <button
                      type="button"
                      onClick={() => setComponentConfig({
                        ...componentConfig,
                        meta: {
                          ...componentConfig.meta,
                          dependencies: componentConfig.meta.dependencies.filter((_, i) => i !== index)
                        }
                      })}
                      className="hover:text-blue-900"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!componentConfig.name.trim()}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Crear Componente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateComponentModal;
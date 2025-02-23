import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ComponentConfig } from './types';
import { 
  Table, 
  Square,
  Search, 
  Filter, 
  SlidersHorizontal, 
  LayoutGrid, 
  List,
  ChevronDown,
  AlertCircle,
  Loader2,
  UserPlus,
  Settings,
  Database,
  Layout,
  Grid,
  Type,
  CheckSquare,
  Circle,
  ArrowUpDown,
  ListEnd,
  Loader,
  Menu,
  PanelLeft,
  ChevronRight,
  Bell,
  Timer,
  CreditCard,
  Maximize2,
  Minus
} from 'lucide-react';

export const sections = [
  {
    title: 'Tablas',
    components: [
      { id: 'basic-table', name: 'Tabla Básica', icon: Table },
      { id: 'sortable-table', name: 'Tabla Ordenable', icon: ArrowUpDown },
      { id: 'filterable-table', name: 'Tabla Filtrable', icon: Filter },
      { id: 'paginated-table', name: 'Tabla Paginada', icon: ListEnd }
    ]
  },
  {
    title: 'Botones',
    components: [
      { id: 'primary-button', name: 'Botón Primario', icon: Square },
      { id: 'secondary-button', name: 'Botón Secundario', icon: Square },
      { id: 'icon-button', name: 'Botón con Icono', icon: Square },
      { id: 'loading-button', name: 'Botón con Carga', icon: Loader }
    ]
  },
  {
    title: 'Formularios',
    components: [
      { id: 'text-input', name: 'Campo de Texto', icon: Type },
      { id: 'select-input', name: 'Campo Select', icon: List },
      { id: 'checkbox', name: 'Checkbox', icon: CheckSquare },
      { id: 'radio-group', name: 'Grupo Radio', icon: Circle }
    ]
  },
  {
    title: 'Navegación',
    components: [
      { id: 'navbar', name: 'Barra de Navegación', icon: Menu },
      { id: 'sidebar', name: 'Barra Lateral', icon: PanelLeft },
      { id: 'tabs', name: 'Pestañas', icon: LayoutGrid },
      { id: 'breadcrumbs', name: 'Migas de Pan', icon: ChevronRight }
    ]
  },
  {
    title: 'Feedback',
    components: [
      { id: 'alert', name: 'Alerta', icon: AlertCircle },
      { id: 'toast', name: 'Notificación Toast', icon: Bell },
      { id: 'progress', name: 'Barra de Progreso', icon: Timer },
      { id: 'spinner', name: 'Indicador de Carga', icon: Loader2 }
    ]
  },
  {
    title: 'Diseño',
    components: [
      { id: 'card', name: 'Tarjeta', icon: CreditCard },
      { id: 'modal', name: 'Ventana Modal', icon: Maximize2 },
      { id: 'accordion', name: 'Acordeón', icon: ChevronDown },
      { id: 'divider', name: 'Divisor', icon: Minus }
    ]
  }
];

interface ComponentFeaturesProps {
  componentConfig: ComponentConfig;
  setComponentConfig: (config: ComponentConfig) => void;
}

const ComponentFeatures: React.FC<ComponentFeaturesProps> = ({
  componentConfig,
  setComponentConfig,
}) => {
  const [selectedComponents, setSelectedComponents] = useState<string[]>(
    componentConfig.features.reusableComponents || []
  );
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleComponentClick = (componentId: string) => {
    setSelectedComponents((prev) =>
      prev.includes(componentId)
        ? prev.filter((id) => id !== componentId)
        : [...prev, componentId]
    );
  };

  useEffect(() => {
    setComponentConfig((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        reusableComponents: selectedComponents
      }
    }));
  }, [selectedComponents, setComponentConfig]);

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex justify-between items-center border-b pb-4">
        <h3 className="text-xl font-semibold text-gray-800">Componentes Reutilizables</h3>
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-all duration-200 ${
              viewMode === 'grid' 
                ? 'bg-white shadow text-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-all duration-200 ${
              viewMode === 'list' 
                ? 'bg-white shadow text-blue-600' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-4 -mr-4 space-y-8 my-6">
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <div className="flex items-center gap-3 px-1 sticky top-0 bg-white py-2">
              <h4 className="text-lg font-medium text-gray-700">{section.title}</h4>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>
            <div className={`
              ${viewMode === 'grid' 
                ? 'grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4' 
                : 'space-y-3'
              }
            `}>
              {section.components.map((component) => (
                <div
                  key={component.id}
                  onClick={() => handleComponentClick(component.id)}
                  className={`
                    relative group
                    ${viewMode === 'grid'
                      ? 'p-6'
                      : 'p-4 flex items-center gap-4'
                    }
                    rounded-xl border-2 cursor-pointer
                    transition-all duration-200 ease-in-out
                    hover:shadow-md
                    ${selectedComponents.includes(component.id)
                      ? 'border-blue-500 bg-blue-50/50 shadow-blue-100'
                      : 'border-gray-100 hover:border-gray-200 bg-white'
                    }
                  `}
                >
                  <div className={`
                    ${viewMode === 'grid'
                      ? 'flex flex-col items-center text-center gap-4'
                      : 'flex items-center gap-4 flex-1'
                    }
                  `}>
                    <div className={`
                      ${viewMode === 'grid' 
                        ? 'p-3 rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-colors' 
                        : ''
                      }
                    `}>
                      <component.icon className={`
                        transition-all duration-200
                        ${viewMode === 'grid' ? 'w-8 h-8' : 'w-5 h-5'}
                        ${selectedComponents.includes(component.id)
                          ? 'text-blue-500'
                          : 'text-gray-500 group-hover:text-gray-700'
                        }
                      `} />
                    </div>
                    <span className={`
                      font-medium transition-colors duration-200
                      ${selectedComponents.includes(component.id)
                        ? 'text-blue-700'
                        : 'text-gray-700 group-hover:text-gray-900'
                      }
                    `}>
                      {component.name}
                    </span>
                  </div>
                  {selectedComponents.includes(component.id) && (
                    <div className="absolute top-2 right-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedComponents.length > 0 && (
        <div className="border-t pt-4 mt-4">
          <div className="flex items-center gap-3 mb-3">
            <h4 className="text-sm font-medium text-gray-700">Componentes Seleccionados</h4>
            <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
              {selectedComponents.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedComponents.map((id) => {
              const component = sections
                .flatMap(section => section.components)
                .find(comp => comp.id === id);
              
              if (!component) return null;

              return (
                <div
                  key={id}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg group"
                >
                  <component.icon className="w-4 h-4" />
                  <span className="text-sm">{component.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleComponentClick(id);
                    }}
                    className="ml-1 p-0.5 rounded-full hover:bg-blue-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentFeatures;
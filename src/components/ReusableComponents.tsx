import React, { useState } from 'react';
import { 
  Table, 
  Square, // Replacing Button
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
  Layout
} from 'lucide-react';

// Update the icon in componentSections
const componentSections = [
  {
    title: 'Tablas',
    icon: <Table className="w-5 h-5" />,
    components: [
      { id: 'basic-table', name: 'Tabla Básica', icon: <Table className="w-4 h-4" />, description: 'Tabla simple con filas y columnas' },
      { id: 'paginated-table', name: 'Tabla con Paginación', icon: <Database className="w-4 h-4" />, description: 'Tabla con controles de paginación' },
      { id: 'filtered-table', name: 'Tabla con Filtros', icon: <Filter className="w-4 h-4" />, description: 'Tabla con filtros avanzados' },
      { id: 'sortable-table', name: 'Tabla con Ordenamiento', icon: <SlidersHorizontal className="w-4 h-4" />, description: 'Tabla con columnas ordenables' }
    ]
  },
  {
    title: 'Botones',
    icon: <Square className="w-5 h-5" />, // Updated icon
    components: [
      { id: 'primary-button', name: 'Botón Primario', icon: <Square className="w-4 h-4" />, description: 'Botón principal de acción' },
      { id: 'icon-button', name: 'Botón con Icono', icon: <Settings className="w-4 h-4" />, description: 'Botón con icono integrado' },
      { id: 'loading-button', name: 'Botón de Carga', icon: <Loader2 className="w-4 h-4" />, description: 'Botón con estado de carga' },
      { id: 'button-group', name: 'Grupo de Botones', icon: <Layout className="w-4 h-4" />, description: 'Conjunto de botones agrupados' }
    ]
  }
];

interface ReusableComponentsProps {
  onSelectComponent: (component: string) => void;
  selectedComponents: string[];
  onRemoveComponent: (component: string) => void;
}

const ReusableComponents: React.FC<ReusableComponentsProps> = ({
  onSelectComponent,
  selectedComponents,
  onRemoveComponent
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const filteredSections = componentSections.map(section => ({
    ...section,
    components: section.components.filter(comp => 
      comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.components.length > 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar componentes..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 border rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {filteredSections.map((section) => (
          <div key={section.title} className="border rounded-xl overflow-hidden">
            <button
              onClick={() => setActiveSection(activeSection === section.title ? null : section.title)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex items-center gap-3">
                {section.icon}
                <h4 className="font-medium">{section.title}</h4>
                <span className="text-sm text-gray-500">({section.components.length})</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${activeSection === section.title ? 'rotate-180' : ''}`} />
            </button>
            
            {activeSection === section.title && (
              <div className={`p-4 ${viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'space-y-3'}`}>
                {section.components.map((component) => (
                  <div
                    key={component.id}
                    className={`
                      p-3 border rounded-lg
                      hover:border-blue-200 hover:bg-blue-50 transition-colors
                      ${selectedComponents.includes(component.id) ? 'border-blue-500 bg-blue-50' : ''}
                    `}
                  >
                    <div className={`${viewMode === 'grid' ? 'w-full' : ''}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {component.icon}
                        <span className="font-medium">{component.name}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{component.description}</p>
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (selectedComponents.includes(component.id)) {
                            onRemoveComponent(component.id);
                          } else {
                            onSelectComponent(component.id);
                          }
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedComponents.includes(component.id)}
                          onChange={(e) => e.stopPropagation()}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReusableComponents;
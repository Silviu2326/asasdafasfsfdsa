import React from 'react';
import { FolderTree, File, Component, Plus, Layout, Globe, Shield, Database, Puzzle, Eye } from 'lucide-react';
import CreatePageModal from './CreatePageModal';
import CreateComponentModal from './CreateComponentModal';
import { PageConfig } from './CreatePageModal';
import { ComponentConfig } from './types';
import { sections } from './ComponentFeatures';
import PreviewPagina from './PreviewPagina';

interface EstructuraProyectoProps {
  onConfigChange: (config: ProjectStructureConfig) => void;
  config: ProjectStructureConfig;
}

interface StoredComponent {
  id: string;
  name: string;
  description?: string;
  componentType?: string;
  features?: {
    reusableComponents?: string[];
  };
  layoutComponente?: {
    lg: Array<{
      i: string;
      x: number;
      y: number;
      w: number;
      h: number;
    }>;
  };
  layout?: {
    type: 'single' | 'grid' | 'flex' | 'custom';
    columns?: number;
    gap?: string;
    padding?: string;
    margin?: string;
    maxWidth?: string;
    minHeight?: string;
    background?: string;
    border?: string;
    borderRadius?: string;
    shadow?: string;
  };
  styles?: {
    container?: {
      padding?: string;
      margin?: string;
      background?: string;
      border?: string;
      borderRadius?: string;
      shadow?: string;
    };
    content?: {
      padding?: string;
      margin?: string;
      background?: string;
      border?: string;
      borderRadius?: string;
      shadow?: string;
    };
  };
  data?: {
    source?: 'static' | 'api' | 'database';
    endpoint?: string;
    mockData?: boolean;
  };
}

interface PageComponents {
  [pageName: string]: StoredComponent[];
}

const EstructuraProyecto: React.FC<EstructuraProyectoProps> = ({ onConfigChange, config }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isCreateComponentModalOpen, setIsCreateComponentModalOpen] = React.useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [selectedPage, setSelectedPage] = React.useState('');
  const [selectedComponent, setSelectedComponent] = React.useState<StoredComponent | null>(null);
  const [createdPages, setCreatedPages] = React.useState<PageConfig[]>([]);
  const projectData = {
    name: "Estructura del Proyecto",
    layoutType: "Landing Page Plus (Hero + Features + Testimonials)",
    pages: {
      "adasd": {
        id: "adasd",
        name: "asdasda",
        path: "/adasd",
        layout: {
          type: "single",
          columns: 12,
          gap: "4",
        },
        components: [
          {
            id: "dasdasd",
            name: "asdasd",
            componentType: "reusable",
            features: {
              reusableComponents: [
                "basic-table",
                "sortable-table",
                "primary-button",
                "text-input",
                "navbar",
                "alert",
                "card"
              ]
            },
            layoutComponente: {
              lg: [
                {
                  i: "26ulnk2la-primary-button",
                  x: 0,
                  y: 0,
                  w: 4,
                  h: 3
                },
                {
                  i: "26ulnk2la-basic-table",
                  x: 0,
                  y: 3,
                  w: 12,
                  h: 4
                }
              ]
            },
            layout: {
              type: "single",
              columns: 12,
              gap: "4",
              padding: "4",
              margin: "4",
              maxWidth: "1200px"
            }
          }
        ]
      }
    }
  };

  const [pageComponents, setPageComponents] = React.useState<PageComponents>(projectData.pages);

  const handleCreateComponent = (componentConfig: ComponentConfig, pageName: string) => {
    const storedComponent: StoredComponent = {
      id: Math.random().toString(36).substr(2, 9),
      name: componentConfig.name,
      componentType: componentConfig.componentType,
      description: componentConfig.description,
      layout: componentConfig.layout,
      dataSource: componentConfig.dataSource,
      features: {
        reusableComponents: componentConfig.features.reusableComponents || []
      }
    };

    setPageComponents(prev => ({
      ...prev,
      [pageName]: [...(prev[pageName] || []), storedComponent]
    }));
    setIsCreateComponentModalOpen(false);
  };

  const handleUpdateComponent = (updatedComponent: StoredComponent) => {
    // Actualizar el componente en el estado
    const updatedComponents = pageComponents[selectedPage].map(comp => 
      comp.id === updatedComponent.id ? updatedComponent : comp
    );
    
    // Aquí actualizarías el componente en tu estado global o base de datos
    console.log('Componente actualizado:', updatedComponent);
    
    // Actualizar el estado local
    setPageComponents(prev => ({ ...prev, [selectedPage]: updatedComponents }));
    
    // Cerrar el preview
    setIsPreviewOpen(false);
  };

  const handlePreviewClick = (component: StoredComponent) => {
    setSelectedComponent(component);
    setIsPreviewOpen(true);
  };

  const ComponentCard: React.FC<{ component: StoredComponent; onSelect: () => void }> = ({
    component,
    onSelect,
  }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div
        onClick={onSelect}
        className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-400 cursor-pointer transition-colors"
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-900">{component.name}</h3>
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
            {component.componentType}
          </span>
        </div>
        
        {component.description && (
          <p className="text-sm text-gray-600 mb-3">{component.description}</p>
        )}

        {component.features?.reusableComponents && component.features.reusableComponents.length > 0 && (
          <div className="mb-3">
            <h4 className="text-xs font-medium text-gray-700 mb-1">Componentes Reutilizables:</h4>
            <div className="flex flex-wrap gap-1">
              {component.features.reusableComponents.map((type) => (
                <span
                  key={type}
                  className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}

        {component.layoutComponente && (
          <div className="mt-3 border-t pt-3">
            <h4 className="text-xs font-medium text-gray-700 mb-2">Layout del Componente:</h4>
            <div className="space-y-2">
              {component.layoutComponente.lg.map((item, index) => (
                <div key={item.i} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Componente {index + 1}</span>
                    <span className="text-gray-500">ID: {item.i}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div>
                      <span className="text-gray-500">Posición:</span>
                      <span className="ml-1">x:{item.x}, y:{item.y}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Tamaño:</span>
                      <span className="ml-1">{item.w}x{item.h}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {component.layout && (
          <div className="mt-3 border-t pt-3">
            <h4 className="text-xs font-medium text-gray-700 mb-2">Layout:</h4>
            <div className="space-y-2">
              <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Tipo de Layout:</span>
                  <span className="text-gray-500">{component.layout.type}</span>
                </div>
                {component.layout.columns && (
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div>
                      <span className="text-gray-500">Columnas:</span>
                      <span className="ml-1">{component.layout.columns}</span>
                    </div>
                  </div>
                )}
                {component.layout.gap && (
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div>
                      <span className="text-gray-500">Espacio entre elementos:</span>
                      <span className="ml-1">{component.layout.gap}</span>
                    </div>
                  </div>
                )}
                {component.layout.padding && (
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div>
                      <span className="text-gray-500">Relleno:</span>
                      <span className="ml-1">{component.layout.padding}</span>
                    </div>
                  </div>
                )}
                {component.layout.margin && (
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div>
                      <span className="text-gray-500">Margen:</span>
                      <span className="ml-1">{component.layout.margin}</span>
                    </div>
                  </div>
                )}
                {component.layout.maxWidth && (
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div>
                      <span className="text-gray-500">Ancho máximo:</span>
                      <span className="ml-1">{component.layout.maxWidth}</span>
                    </div>
                  </div>
                )}
                {component.layout.minHeight && (
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div>
                      <span className="text-gray-500">Altura mínima:</span>
                      <span className="ml-1">{component.layout.minHeight}</span>
                    </div>
                  </div>
                )}
                {component.layout.background && (
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div>
                      <span className="text-gray-500">Fondo:</span>
                      <span className="ml-1">{component.layout.background}</span>
                    </div>
                  </div>
                )}
                {component.layout.border && (
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div>
                      <span className="text-gray-500">Borde:</span>
                      <span className="ml-1">{component.layout.border}</span>
                    </div>
                  </div>
                )}
                {component.layout.borderRadius && (
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div>
                      <span className="text-gray-500">Radio de borde:</span>
                      <span className="ml-1">{component.layout.borderRadius}</span>
                    </div>
                  </div>
                )}
                {component.layout.shadow && (
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div>
                      <span className="text-gray-500">Sombra:</span>
                      <span className="ml-1">{component.layout.shadow}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Layout className="w-4 h-4" />
            <span>Click para editar</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FolderTree className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-700">Estructura del Proyecto</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Nueva Página
          </button>
          <button
            onClick={() => {
              setSelectedPage('');
              setIsCreateComponentModalOpen(true);
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200"
          >
            <Component className="w-4 h-4" />
            Nuevo Componente
          </button>
        </div>
      </div>

      <div className="border rounded-lg p-4 bg-gray-50">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Created Pages</h4>
        {createdPages.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No pages created yet</p>
        ) : (
          <div className="space-y-4">
            {createdPages.map((page) => (
              <div key={page.name} className="border rounded-lg p-4 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <File className="w-4 h-4 text-gray-500" />
                    <h3 className="text-sm font-medium text-gray-700">{page.name}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedPage(page.name);
                        setIsCreateComponentModalOpen(true);
                      }}
                      className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                    >
                      <Plus className="w-3 h-3" />
                      Add Component
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4 pl-6">
                  {page.description && (
                    <p className="text-sm text-gray-600">{page.description}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-md flex items-center gap-1">
                      <Layout className="w-3 h-3" />
                      {page.layout} Layout
                    </span>
                    
                    <span className="px-2 py-1 bg-gray-50 text-gray-700 rounded-md flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {page.routing.path}
                      {page.routing.isPrivate && (
                        <Shield className="w-3 h-3 text-blue-500" />
                      )}
                    </span>
                  </div>

                  {Object.entries(page.features).some(([_, enabled]) => enabled) && (
                    <div className="flex flex-wrap gap-1">
                      {page.features.authentication && (
                        <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px]">
                          Auth
                        </span>
                      )}
                      {page.features.api && (
                        <span className="px-1.5 py-0.5 bg-green-50 text-green-600 rounded text-[10px]">
                          API
                        </span>
                      )}
                      {page.features.database && (
                        <span className="px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded text-[10px]">
                          DB
                        </span>
                      )}
                      {page.features.seo && (
                        <span className="px-1.5 py-0.5 bg-orange-50 text-orange-600 rounded text-[10px]">
                          SEO
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {pageComponents[page.name]?.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <h5 className="text-xs font-medium text-gray-600 mb-2">Components</h5>
                    <div className="pl-4">
                      {pageComponents[page.name].map((component) => (
                        <ComponentCard
                          key={component.id}
                          component={component}
                          onSelect={() => handlePreviewClick(component)}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-2 text-xs text-gray-500">
                  <p>{page.description}</p>
                  <p>Path: {page.routing.path}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CreatePageModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreatePage={(pageConfig: PageConfig) => {
          setCreatedPages(prev => [...prev, pageConfig]);
          setPageComponents(prev => ({ ...prev, [pageConfig.name]: [] }));
        }}
      />

      <CreateComponentModal
        isOpen={isCreateComponentModalOpen}
        onClose={() => setIsCreateComponentModalOpen(false)}
        onCreateComponent={handleCreateComponent}
        pageName={selectedPage}
      />

      {selectedComponent && (
        <PreviewPagina
          isOpen={isPreviewOpen}
          onClose={() => {
            setIsPreviewOpen(false);
            setSelectedComponent(null);
          }}
          pageData={{
            name: selectedComponent.name,
            components: [
              selectedComponent,
              ...(selectedComponent.features?.reusableComponents || []).map(id => {
                // Buscar el componente reutilizable en todas las páginas
                const pages = config.pages || [];
                for (const page of pages) {
                  const found = page.components?.find(c => c.id === id);
                  if (found) return found;
                }
                return null;
              }).filter((comp): comp is StoredComponent => comp !== null)
            ]
          }}
          allComponents={Object.values(pageComponents).flat()}
          onUpdateComponent={handleUpdateComponent}
        />
      )}
    </div>
  );
};

export default EstructuraProyecto;
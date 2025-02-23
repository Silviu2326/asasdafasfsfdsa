import React, { useState, useEffect } from 'react';
import { X, Puzzle, Component, Layout, Database, Save, ZoomIn, ZoomOut, Grid, Eye, EyeOff, Move, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ComponentePreviewDiseño from './ComponentePreviewDiseño';
import { StoredComponent } from './types';
// Importar componentes reutilizables - Tablas
import { BasicTable } from './Componentesreutilizables/tables/BasicTable';
import { FilterableTable } from './Componentesreutilizables/tables/FilterableTable';
import { PaginatedTable } from './Componentesreutilizables/tables/PaginatedTable';
import { SortableTable } from './Componentesreutilizables/tables/SortableTable';
// Importar componentes reutilizables - Botones
import { IconButton } from './Componentesreutilizables/buttons/IconButton';
import { LoadingButton } from './Componentesreutilizables/buttons/LoadingButton';
import { PrimaryButton } from './Componentesreutilizables/buttons/PrimaryButton';
import { SecondaryButton } from './Componentesreutilizables/buttons/SecondaryButton';
import PanelTablaPreviewPagina from './PanelTablaPreviewPagina';
import PanelBotonPreviewPagina from './PanelBotonPreviewPagina';

interface PreviewPaginaProps {
  isOpen: boolean;
  onClose: () => void;
  pageData: {
    name: string;
    components?: StoredComponent[];
  };
  allComponents: StoredComponent[];
  onUpdateComponent: (component: StoredComponent) => void;
}

// Add missing type definitions
interface ButtonConfig {
  label?: string;
  variant?: string;
  size?: string;
  // Add other button configuration options as needed
}

interface TableConfig {
  columns?: any[];
  pagination?: boolean;
  sorting?: boolean;
  // Add other table configuration options as needed
}

// After imports
console.log('Button Components:', {
  IconButton,
  LoadingButton,
  PrimaryButton,
  SecondaryButton
});

const PreviewPagina: React.FC<PreviewPaginaProps> = ({ 
  isOpen, 
  onClose, 
  pageData, 
  allComponents, 
  onUpdateComponent 
}) => {
  const [previewComponents, setPreviewComponents] = useState<Array<{
    id: string;
    component: React.ReactNode;
    type: string;
    size: {
      width: string;
      height: string;
    };
    margin: {
      top: string;
      right: string;
      bottom: string;
      left: string;
    };
    gridPos: {
      x: number;
      y: number;
      w: number;
      h: number;
    };
  }>>([]);

  const [currentLayout, setCurrentLayout] = useState<any>(null);
  const [columns, setColumns] = useState(12);
  const [isTablePanelOpen, setIsTablePanelOpen] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [isButtonPanelOpen, setIsButtonPanelOpen] = useState(false);
  const [selectedButtonId, setSelectedButtonId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showGrid, setShowGrid] = useState(true);

  const handleButtonConfig = (componentId: string) => {
    setSelectedButtonId(componentId);
    setIsButtonPanelOpen(true);
  };

  const handleSaveButtonConfig = (config: ButtonConfig) => {
    if (selectedButtonId) {
      handleUpdateComponent(selectedButtonId, {
        buttonConfig: config
      });
    }
  };

  const handleTableConfig = (componentId: string) => {
    setSelectedTableId(componentId);
    setIsTablePanelOpen(true);
  };

  const handleSaveTableConfig = (config: TableConfig) => {
    if (selectedTableId) {
      handleUpdateComponent(selectedTableId, {
        tableConfig: config
      });
    }
  };

  const getReusableComponent = (type: string, props: any = {}) => {
    console.log('getReusableComponent - type:', type);
    console.log('getReusableComponent - props:', props);

    const exampleData = [
      { id: 1, name: 'Producto 1', price: 100, category: 'Electrónica' },
      { id: 2, name: 'Producto 2', price: 200, category: 'Ropa' },
      { id: 3, name: 'Producto 3', price: 150, category: 'Hogar' },
    ];

    const exampleColumns = [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'name', header: 'Nombre' },
      { accessorKey: 'price', header: 'Precio' },
      { accessorKey: 'category', header: 'Categoría' },
    ];

    const commonTableProps = {
      data: exampleData,
      columns: exampleColumns,
      ...props
    };

    const commonButtonProps = {
      onClick: () => console.log('Button clicked'),
      children: props.label || 'Botón de ejemplo',
      ...props
    };

    console.log('Common button props:', commonButtonProps);

    switch (type) {
      case 'icon-button':
        return <IconButton {...commonButtonProps} icon={<Search />} />;
      case 'loading-button':
        return <LoadingButton {...commonButtonProps} isLoading={false} />;
      case 'primary-button':
        return <PrimaryButton {...commonButtonProps} />;
      case 'secondary-button':
        return <SecondaryButton {...commonButtonProps} />;
      case 'basic-table':
        return <BasicTable {...commonTableProps} />;
      case 'filterable-table':
        return <FilterableTable {...commonTableProps} />;
      case 'paginated-table':
        return <PaginatedTable {...commonTableProps} />;
      case 'sortable-table':
        return <SortableTable {...commonTableProps} />;
      default:
        console.warn(`Unknown component type: ${type}`);
        return <div className="p-4 border border-red-300 rounded">Componente no encontrado: {type}</div>;
    }
  };

  const handleComponentClick = (componentId: string, component: StoredComponent) => {
    console.log('handleComponentClick - componentId:', componentId);
    console.log('handleComponentClick - component:', component);
    console.log('handleComponentClick - reusableComponents:', component.features?.reusableComponents);

    const defaultSize = {
      width: '100%',
      height: component.componentType?.includes('table') ? '400px' : 'auto'
    };

    if (component.features?.reusableComponents?.length === 1) {
      const reusableType = component.features.reusableComponents[0];
      const reusableComponent = getReusableComponent(reusableType);
      
      if (reusableComponent) {
        setPreviewComponents(prev => [...prev, {
          id: componentId,
          component: (
            <div className="p-4 bg-white rounded-lg">
              {reusableComponent}
            </div>
          ),
          type: reusableType,
          size: defaultSize,
          margin: { top: '0', right: '0', bottom: '0', left: '0' },
          gridPos: { x: 0, y: prev.length, w: 12, h: 2 }
        }]);
      }
      return;
    }

    const reusableComponents = component.features?.reusableComponents || [];
    const componentContent = reusableComponents.map(type => {
      const reusableComponent = getReusableComponent(type);
      if (reusableComponent) {
        return (
          <div key={type} className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-2">{type}</div>
            {reusableComponent}
          </div>
        );
      }
      return null;
    }).filter(Boolean);

    setPreviewComponents(prev => [...prev, {
      id: componentId,
      component: (
        <div className="p-4 bg-gray-50 rounded">
          <h3 className="text-sm font-medium mb-2">{component.name}</h3>
          {component.description && (
            <p className="text-xs text-gray-600 mb-4">{component.description}</p>
          )}
          {componentContent.length > 0 ? (
            <div className="space-y-4">
              {componentContent}
            </div>
          ) : (
            <div className="p-4 border border-dashed border-gray-300 rounded">
              <p className="text-sm text-gray-500 text-center">
                Vista previa del componente
              </p>
            </div>
          )}
        </div>
      ),
      type: component.componentType || 'custom',
      size: defaultSize,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      gridPos: { x: 0, y: prev.length, w: 12, h: 2 }
    }]);
  };

  const handleRemoveComponent = (id: string) => {
    setPreviewComponents(prev => prev.filter(comp => comp.id !== id));
  };

  const handleUpdateComponent = (id: string, updates: any) => {
    setPreviewComponents(prev =>
      prev.map(comp => (comp.id === id ? { ...comp, ...updates } : comp))
    );
  };

  const handleComponentConfig = (componentId: string) => {
    const component = previewComponents.find(comp => comp.id === componentId);
    if (component) {
      if (component.type.includes('table')) {
        handleTableConfig(componentId);
      } else if (component.type.includes('button')) {
        handleButtonConfig(componentId);
      }
    }
  };

  const handleSaveLayout = () => {
    if (!currentLayout || !pageData.components) return;
    
    console.log('Layout guardado:', JSON.stringify(currentLayout, null, 2));
    
    const updatedComponent = {
      ...pageData.components[0],
      layoutComponente: currentLayout,
      layout: {
        ...pageData.components[0]?.layout,
        columns: columns
      }
    };

    onUpdateComponent(updatedComponent);
    
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow-xl w-11/12 h-5/6 flex flex-col overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {pageData.name} - Vista Previa
                </h2>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleSaveLayout}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save size={18} />
                  <span>Guardar</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden">
              <ComponentePreviewDiseño
                components={previewComponents}
                onRemoveComponent={handleRemoveComponent}
                onUpdateComponent={handleUpdateComponent}
                onLayoutChange={(layout) => {
                  setCurrentLayout(layout.lg);
                }}
                columns={columns}
              />
            </div>
          </div>

          {/* Configuration Panels */}
          <AnimatePresence>
            {isTablePanelOpen && (
              <PanelTablaPreviewPagina
                onClose={() => setIsTablePanelOpen(false)}
                onSave={handleSaveTableConfig}
                componentId={selectedTableId}
              />
            )}
            {isButtonPanelOpen && (
              <PanelBotonPreviewPagina
                onClose={() => setIsButtonPanelOpen(false)}
                onSave={handleSaveButtonConfig}
                componentId={selectedButtonId}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreviewPagina;

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

          
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PreviewPagina;

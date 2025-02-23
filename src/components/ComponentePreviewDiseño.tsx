import React from 'react';
import { useDrop } from 'react-dnd';
import GridLayout from 'react-grid-layout';
import { useEditorStore } from '../store';
import { X } from 'lucide-react';
import 'react-grid-layout/css/styles.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ComponentsPanel } from './ComponentsPanel';
import { ConfigModal } from './ConfigModal';

const WorkArea: React.FC = () => {
  const { 
    components, 
    isEditMode,
    addComponent, 
    updateComponent, 
    removeComponent, 
    setSelectedComponent,
    setEditMode,
    setModalOpen
  } = useEditorStore();

  const gridColumns = Array.from({ length: 24 }, (_, i) => i + 1);

  const [, drop] = useDrop(() => ({
    accept: ['COMPONENT', 'BUTTON', 'TABLE'],
    drop: (item: { type: string }, monitor) => {
      const offset = monitor.getClientOffset();
      const containerRect = document.querySelector('.layout')?.getBoundingClientRect();
      
      if (offset && containerRect) {
        const scrollTop = document.querySelector('.layout')?.parentElement?.scrollTop || 0;
        const x = Math.floor((offset.x - containerRect.left) / (containerRect.width / 24));
        const y = Math.floor((offset.y - containerRect.top + scrollTop) / 30);
        
        let finalY = y;
        let collision;
        do {
          collision = components.some(comp => {
            const compBottom = comp.y + comp.h;
            const compRight = comp.x + comp.w;
            return (
              finalY < compBottom &&
              finalY + (item.type === 'table' ? 4 : 2) > comp.y &&
              x < compRight &&
              x + (item.type === 'table' ? 12 : 6) > comp.x
            );
          });
          if (collision) finalY++;
        } while (collision);

        const newComponent = {
          id: `${item.type}-${Date.now()}`,
          type: item.type.toLowerCase() as 'button' | 'table',
          x: Math.max(0, Math.min(x, 24 - (item.type === 'table' ? 12 : 6))),
          y: finalY,
          w: item.type === 'table' ? 12 : 6,
          h: item.type === 'table' ? 4 : 2,
          config: item.type === 'table' ? {
            tableName: 'Nueva Tabla',
            columns: 3,
            rows: 3,
            headers: ['Columna 1', 'Columna 2', 'Columna 3'],
            showBorder: true,
            striped: false
          } : {
            title: 'Nuevo Botón',
            action: ''
          },
        };

        addComponent(newComponent);
        return undefined;
      }
    },
  }), [components]);

  const onLayoutChange = (layout: any[]) => {
    layout.forEach((item) => {
      const component = components.find((c) => c.id === item.i);
      if (component) {
        updateComponent(item.i, {
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
        });
      }
    });
  };

  const handleRemoveComponent = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    removeComponent(id);
  };

  const handleComponentClick = (component: typeof components[0]) => {
    if (isEditMode) {
      setSelectedComponent(component);
      setModalOpen(true);
    }
  };

  const handleEditModeToggle = () => {
    setEditMode(!isEditMode);
  };

  const renderTable = (component: typeof components[0]) => {
    const { config } = component;
    const columns = config?.columns || 3;
    const rows = config?.rows || 3;
    const headers = config?.headers || Array(columns).fill('');
    const showBorder = config?.showBorder ?? true;
    const striped = config?.striped ?? false;

    return (
      <div className="w-full h-full overflow-auto">
        <table className={`w-full ${showBorder ? 'border-collapse border border-slate-200' : ''}`}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`p-2.5 text-left text-sm font-semibold text-slate-700 ${
                    showBorder ? 'border border-slate-200' : ''
                  } bg-slate-50`}
                >
                  {header || `Columna ${index + 1}`}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array(rows).fill(0).map((_, rowIndex) => (
              <tr
                key={rowIndex}
                className={`${
                  striped && rowIndex % 2 === 1 ? 'bg-slate-50' : ''
                }`}
              >
                {Array(columns).fill(0).map((_, colIndex) => (
                  <td
                    key={colIndex}
                    className={`p-2.5 text-sm text-slate-600 ${
                      showBorder ? 'border border-slate-200' : ''
                    }`}
                  >
                    Celda {rowIndex + 1}-{colIndex + 1}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div 
      ref={drop} 
      className="bg-slate-100 p-6 flex-1 overflow-hidden relative min-h-[600px] flex flex-col"
      style={{ height: 'calc(100vh - 120px)' }}
    >
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <button
          onClick={handleEditModeToggle}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            isEditMode
              ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
              : 'bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          {isEditMode ? 'Modo Edición' : 'Modo Arrastrar'}
        </button>
      </div>

      <div className="flex-1 overflow-auto relative min-h-0">
        <div className="absolute inset-0 grid grid-cols-24 gap-0 pointer-events-none">
          {gridColumns.map((col) => (
            <div
              key={col}
              className="h-full border-r border-slate-200 last:border-r-0"
            >
              <div className="h-6 bg-slate-50/80 backdrop-blur-sm border-b border-slate-200 text-xs text-slate-400 flex items-center justify-center font-medium">
                {col}
              </div>
            </div>
          ))}
        </div>

        <GridLayout
          className="layout"
          cols={24}
          rowHeight={30}
          width={window.innerWidth * 0.75}
          onLayoutChange={onLayoutChange}
          containerPadding={[0, 0]}
          margin={[8, 8]}
          isDroppable={true}
          useCSSTransforms={true}
          preventCollision={true}
          compactType={null}
          isDraggable={!isEditMode}
          isResizable={!isEditMode}
        >
          {components.map((component) => (
            <div
              key={component.id}
              data-grid={{
                x: component.x,
                y: component.y,
                w: component.w,
                h: component.h,
                isResizable: true,
                isDraggable: true,
              }}
              className={`group bg-white rounded-xl shadow-sm border relative transition-all duration-200 ${
                isEditMode 
                  ? 'cursor-pointer hover:border-indigo-400 hover:shadow-md hover:shadow-indigo-500/10'
                  : 'border-slate-200'
              }`}
              onClick={() => handleComponentClick(component)}
            >
              {!isEditMode && (
                <button
                  type="button"
                  onClick={(e) => handleRemoveComponent(e, component.id)}
                  className="absolute -top-2 -right-2 z-50 p-1.5 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 text-slate-400 hover:text-red-500 hover:bg-red-50 border border-slate-200 hover:border-red-200"
                >
                  <X size={14} />
                </button>
              )}
              <div className="p-4 h-full">
                {component.type === 'button' ? (
                  <button 
                    type="button"
                    className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg font-medium shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 transform hover:scale-105"
                    onClick={(e) => !isEditMode && e.stopPropagation()}
                  >
                    {component.config?.title || 'Botón'}
                  </button>
                ) : (
                  renderTable(component)
                )}
              </div>
            </div>
          ))}
        </GridLayout>
      </div>
    </div>
  );
};

const ComponentePreviewDiseño: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-slate-100">
        <div className="w-80 border-r border-slate-200 bg-white">
          <ComponentsPanel />
        </div>
        <WorkArea />
        <ConfigModal />
      </div>
    </DndProvider>
  );
};

export default ComponentePreviewDiseño;

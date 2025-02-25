import React from 'react';
import { useDrop } from 'react-dnd';
import GridLayout from 'react-grid-layout';
import { X, Settings2 } from 'lucide-react';
import { useEditorStore } from '../../store';
import { ComponentRegistry } from './ComponentRegistry';
import { ComponentSidebar } from './ComponentSidebar';

interface ComponentGridProps {
  registry: ComponentRegistry;
}

export const ComponentGrid: React.FC<ComponentGridProps> = ({ registry }) => {
  const {
    components,
    isEditMode,
    addComponent,
    updateComponent,
    removeComponent,
    setSelectedComponent,
    setEditMode,
    setModalOpen,
    selectedComponent,
  } = useEditorStore();

  const [, drop] = useDrop(() => ({
    accept: registry.getAcceptedTypes(),
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
          collision = components.some((comp) => {
            const compBottom = comp.y + comp.h;
            const compRight = comp.x + comp.w;
            return (
              finalY < compBottom &&
              finalY + 4 > comp.y &&
              x < compRight &&
              x + 12 > comp.x
            );
          });
          if (collision) finalY++;
        } while (collision);

        const componentDef = registry.getComponentDefinition(item.type);
        if (componentDef) {
          const newComponent = {
            id: `${item.type}-${Date.now()}`,
            type: item.type,
            x: Math.max(0, Math.min(x, 12)),
            y: finalY,
            w: componentDef.defaultSize.w,
            h: componentDef.defaultSize.h,
            config: { ...componentDef.defaultConfig },
          };

          addComponent(newComponent);
          setSelectedComponent(newComponent);
          setModalOpen(true);
        }
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

  const handleComponentClick = (component: typeof components[0]) => {
    if (!isEditMode) {
      setSelectedComponent(component);
      setModalOpen(true);
    }
  };

  const handleRemoveComponent = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    removeComponent(id);
  };

  const handleSaveComponents = () => {
    const componentsInfo = components.map((comp) => ({
      id: comp.id,
      type: comp.type,
      position: {
        x: comp.x,
        y: comp.y,
        width: comp.w,
        height: comp.h,
      },
    }));
    console.log(JSON.stringify(componentsInfo, null, 2));
  };

  return (
    <div
      ref={drop}
      className="bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8 flex-1 overflow-hidden relative min-h-[600px] flex flex-col"
      style={{
        height: 'calc(100vh - 120px)',
        backgroundImage: `
          radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.03) 0%, rgba(99, 102, 241, 0) 50%),
          radial-gradient(circle at 100% 100%, rgba(99, 102, 241, 0.03) 0%, rgba(99, 102, 241, 0) 50%),
          radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 100%)
        `,
      }}
    >
      <div className="flex items-center justify-between mb-8 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setEditMode(!isEditMode)}
            className={`
              px-7 py-3.5 rounded-2xl font-medium transition-all duration-300 
              flex items-center gap-3 text-sm
              transform hover:scale-[1.02] active:scale-[0.98]
              ${
                isEditMode
                  ? 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 text-white hover:from-indigo-600 hover:via-indigo-700 hover:to-indigo-800 shadow-xl shadow-indigo-500/20 hover:shadow-2xl hover:shadow-indigo-500/30'
                  : 'bg-gradient-to-r from-white to-slate-50 text-slate-700 hover:text-indigo-600 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 border border-white/80'
              }
            `}
          >
            {isEditMode ? (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Modo Edición
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
                Modo Arrastrar
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-1 gap-8 min-h-0">
        <div
          className="flex-1 overflow-auto relative min-h-0 rounded-3xl bg-white/80 backdrop-blur-xl shadow-2xl shadow-slate-200/50 border border-white"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 75%)',
          }}
        >
          <div className="absolute inset-0 grid grid-cols-24 gap-0 pointer-events-none">
            {Array.from({ length: 24 }, (_, i) => i + 1).map((col) => (
              <div
                key={col}
                className="h-full border-r border-slate-200/20 last:border-r-0"
              >
                <div className="h-12 bg-white/95 backdrop-blur-xl border-b border-slate-200/30 text-xs text-slate-500 flex items-center justify-center font-medium">
                  <span className="bg-slate-50/50 px-2 py-1 rounded-md">{col}</span>
                </div>
              </div>
            ))}
          </div>

          <GridLayout
            className="layout p-8"
            layout={components.map((comp) => ({
              i: comp.id,
              x: comp.x,
              y: comp.y,
              w: comp.w,
              h: comp.h,
              isResizable: isEditMode,
              isDraggable: isEditMode,
              minW: registry.getComponentDefinition(comp.type)?.minSize.w || 2,
              maxW: 24,
              minH: registry.getComponentDefinition(comp.type)?.minSize.h || 1,
              maxH: registry.getComponentDefinition(comp.type)?.maxSize.h || 12,
            }))}
            cols={24}
            rowHeight={30}
            width={1200}
            onLayoutChange={onLayoutChange}
            compactType={null}
            preventCollision={true}
            isResizable={isEditMode}
            isDraggable={isEditMode}
            resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
            margin={[20, 20]}
          >
            {components.map((component) => (
              <div
                key={component.id}
                className={`
                  group bg-white rounded-3xl transition-all duration-300 relative
                  ${
                    isEditMode
                      ? 'shadow-xl shadow-indigo-500/10 border-2 border-dashed border-slate-200 hover:border-indigo-400 cursor-move hover:shadow-2xl hover:shadow-indigo-500/20 transform hover:-translate-y-1'
                      : 'shadow-xl shadow-slate-200/50 border border-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transform hover:-translate-y-1 hover:bg-gradient-to-b hover:from-white hover:to-slate-50/50'
                  }
                `}
                onClick={() => handleComponentClick(component)}
              >
                {!isEditMode ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleComponentClick(component);
                    }}
                    className="
                      absolute -top-3 -right-3 z-50 p-3
                      bg-white rounded-2xl shadow-xl
                      opacity-0 group-hover:opacity-100
                      transition-all duration-300
                      text-slate-400 hover:text-indigo-500
                      hover:bg-gradient-to-r hover:from-indigo-50 hover:to-white
                      border border-slate-200 hover:border-indigo-200
                      transform group-hover:translate-y-0 translate-y-2
                      hover:scale-110 active:scale-95
                    "
                  >
                    <Settings2 size={16} />
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeComponent(component.id);
                    }}
                    className="
                      absolute -top-3 -right-3 z-50 p-3
                      bg-white rounded-2xl shadow-xl
                      opacity-0 group-hover:opacity-100
                      transition-all duration-300
                      text-slate-400 hover:text-red-500
                      hover:bg-gradient-to-r hover:from-red-50 hover:to-white
                      border border-slate-200 hover:border-red-200
                      transform group-hover:translate-y-0 translate-y-2
                      hover:scale-110 active:scale-95
                      cursor-pointer
                    "
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                  >
                    <X size={16} />
                  </button>
                )}
                <div className="p-6 h-full">
                  {registry.renderComponent(component)}
                </div>
              </div>
            ))}
          </GridLayout>
        </div>
        
        <div className="w-96 flex-shrink-0">
          <ComponentSidebar
            components={registry.getAllComponents()}
            registry={registry}
            selectedComponent={selectedComponent}
            onConfigUpdate={(newConfig) => {
              if (selectedComponent) {
                const updatedComponent = {
                  ...selectedComponent,
                  config: newConfig
                };
                updateComponent(selectedComponent.id, { config: newConfig });
                setSelectedComponent(updatedComponent);
              }
            }}
            onCloseConfig={() => {
              setSelectedComponent(null);
              setModalOpen(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

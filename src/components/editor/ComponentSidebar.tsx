import React from 'react';
import { useDrag } from 'react-dnd';
import { Sparkles } from 'lucide-react';
import { ComponentDefinition, ComponentRegistry } from './ComponentRegistry';
import { ConfigurationPanel } from './ConfigurationPanel';

interface ComponentSidebarProps {
  components: ComponentDefinition[];
  registry: ComponentRegistry;
  selectedComponent?: any;
  onConfigUpdate?: (newConfig: any) => void;
  onCloseConfig?: () => void;
}

export const ComponentSidebar: React.FC<ComponentSidebarProps> = ({ 
  components, 
  registry,
  selectedComponent,
  onConfigUpdate,
  onCloseConfig
}) => {
  const renderDraggableComponent = (component: ComponentDefinition) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: component.type,
      item: { type: component.type },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <div
        key={component.type}
        ref={drag}
        className={`flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white cursor-move transition-all duration-200 ${
          isDragging
            ? 'opacity-50 border-indigo-300 shadow-lg shadow-indigo-100'
            : 'hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-100'
        }`}
      >
        <Sparkles className="w-5 h-5 text-indigo-500" />
        <div>
          <span className="text-sm font-medium text-slate-700">
            {component.label}
          </span>
          <p className="text-xs text-slate-500 mt-0.5">
            {component.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {selectedComponent ? (
        <ConfigurationPanel
          component={selectedComponent}
          registry={registry}
          onClose={onCloseConfig!}
          onConfigUpdate={onConfigUpdate!}
        />
      ) : (
        <>
          <div className="p-6 border-b border-slate-200 flex-shrink-0">
            <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              Listado de componentes
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
            {components.map(renderDraggableComponent)}
          </div>
        </>
      )}
    </div>
  );
};

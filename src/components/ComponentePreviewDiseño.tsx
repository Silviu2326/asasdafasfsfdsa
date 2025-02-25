import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import 'react-grid-layout/css/styles.css';
import { ComponentSidebar } from './editor/ComponentSidebar';
import { ComponentGrid } from './editor/ComponentGrid';
import { ComponentRegistry } from './editor/ComponentRegistry';

const ComponentePreviewDiseño: React.FC = () => {
  const registry = new ComponentRegistry();
  const components = registry.getAllComponents();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-slate-100">
        <div className="w-80 border-r border-slate-200 bg-white">
          <ComponentSidebar components={components} />
        </div>
        <ComponentGrid registry={registry} />
      </div>
    </DndProvider>
  );
};

export default ComponentePreviewDiseño;

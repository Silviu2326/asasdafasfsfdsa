import React from 'react';
import { Component, Table, Square, Layout, AlertCircle, FormInput, Navigation, Settings, Loader2, Puzzle } from 'lucide-react';
import { Alert } from './Componentesreutilizables/feedback/Alert';
// Importar componentes de tablas
import { BasicTable } from './Componentesreutilizables/tables/BasicTable';
import { FilterableTable } from './Componentesreutilizables/tables/FilterableTable';
import { PaginatedTable } from './Componentesreutilizables/tables/PaginatedTable';
import { SortableTable } from './Componentesreutilizables/tables/SortableTable';
import { Column, TableData } from './Componentesreutilizables/tables/types';

// Importar componentes de navegación
import { Breadcrumbs } from './Componentesreutilizables/navigation/Breadcrumbs';
import { Navbar } from './Componentesreutilizables/navigation/Navbar';
import { Sidebar } from './Componentesreutilizables/navigation/Sidebar';
import { Tabs } from './Componentesreutilizables/navigation/Tabs';

// Importar componentes de formularios
import { Checkbox } from './Componentesreutilizables/forms/Checkbox';
import { RadioGroup } from './Componentesreutilizables/forms/RadioGroup';
import { SelectInput } from './Componentesreutilizables/forms/SelectInput';
import { TextInput } from './Componentesreutilizables/forms/TextInput';

interface ComponentType {
  id: string;
  name: string;
  componentType?: string;
  features?: {
    reusableComponents?: string[];
  };
}

interface VisualizacionDeComponentesProps {
  components?: ComponentType[];
  onComponentClick?: (componentId: string, component: React.ReactNode, type: string) => void;
}

// Datos de ejemplo para las tablas
const sampleData: TableData[] = [
  { id: 1, name: 'Ejemplo 1', type: 'Tipo A', status: 'Activo' },
  { id: 2, name: 'Ejemplo 2', type: 'Tipo B', status: 'Inactivo' },
  { id: 3, name: 'Ejemplo 3', type: 'Tipo A', status: 'Activo' },
];

const sampleColumns: Column[] = [
  { header: 'ID', accessorKey: 'id' },
  { header: 'Nombre', accessorKey: 'name' },
  { header: 'Tipo', accessorKey: 'type' },
  { header: 'Estado', accessorKey: 'status' },
];

// Datos de ejemplo para los componentes
const sampleNavItems = [
  { label: 'Inicio', href: '#' },
  { label: 'Productos', href: '#' },
  { label: 'Servicios', href: '#' },
  { label: 'Contacto', href: '#' }
];

const sampleFormOptions = [
  { value: 'option1', label: 'Opción 1' },
  { value: 'option2', label: 'Opción 2' },
  { value: 'option3', label: 'Opción 3' }
];

// Definición de las categorías y sus componentes
const componentCategories = {
  tables: {
    icon: Table,
    title: 'Tablas',
    type: 'table',
    components: [
      { 
        id: 'basic-table', 
        name: 'Tabla Básica',
        component: (props: any) => (
          <BasicTable
            data={sampleData}
            columns={sampleColumns}
            variant="striped"
            className="text-sm"
          />
        )
      },
      { 
        id: 'paginated-table', 
        name: 'Tabla con Paginación',
        component: (props: any) => (
          <PaginatedTable
            data={sampleData}
            columns={sampleColumns}
            variant="bordered"
            className="text-sm"
          />
        )
      },
      { 
        id: 'filtered-table', 
        name: 'Tabla con Filtros',
        component: (props: any) => (
          <FilterableTable
            data={sampleData}
            columns={sampleColumns}
            variant="default"
            className="text-sm"
          />
        )
      },
      { 
        id: 'sortable-table', 
        name: 'Tabla con Ordenamiento',
        component: (props: any) => (
          <SortableTable
            data={sampleData}
            columns={sampleColumns}
            variant="compact"
            className="text-sm"
          />
        )
      }
    ]
  },
  navigation: {
    icon: Navigation,
    title: 'Navegación',
    type: 'nav',
    components: [
      {
        id: 'breadcrumbs',
        name: 'Migas de Pan',
        component: (props: any) => (
          <Breadcrumbs
            items={[
              { label: 'Inicio', href: '#' },
              { label: 'Categoría', href: '#' },
              { label: 'Página Actual', href: '#' }
            ]}
          />
        )
      },
      {
        id: 'navbar',
        name: 'Barra de Navegación',
        component: (props: any) => (
          <Navbar
            brand="Mi App"
            items={sampleNavItems}
          />
        )
      },
      {
        id: 'tabs',
        name: 'Pestañas',
        component: (props: any) => (
          <Tabs
            tabs={[
              { id: 'tab1', label: 'Pestaña 1', content: 'Contenido 1' },
              { id: 'tab2', label: 'Pestaña 2', content: 'Contenido 2' },
              { id: 'tab3', label: 'Pestaña 3', content: 'Contenido 3' }
            ]}
          />
        )
      },
      {
        id: 'sidebar',
        name: 'Barra Lateral',
        component: (props: any) => (
          <Sidebar
            items={sampleNavItems}
          />
        )
      }
    ]
  },
  forms: {
    icon: FormInput,
    title: 'Formularios',
    type: 'form',
    components: [
      {
        id: 'text-input',
        name: 'Campo de Texto',
        component: (props: any) => (
          <div className="w-full max-w-sm">
            <TextInput
              label="Ejemplo de Campo"
              placeholder="Escribe algo..."
              onChange={(e) => console.log(e.target.value)}
            />
          </div>
        )
      },
      {
        id: 'select',
        name: 'Selector',
        component: (props: any) => (
          <div className="w-full max-w-sm">
            <SelectInput
              label="Selecciona una opción"
              options={sampleFormOptions}
              onChange={(value) => console.log(value)}
            />
          </div>
        )
      },
      {
        id: 'checkbox',
        name: 'Casilla de Verificación',
        component: (props: any) => (
          <div className="w-full max-w-sm">
            <Checkbox
              label="Acepto los términos y condiciones"
              onChange={(checked) => console.log(checked)}
            />
          </div>
        )
      },
      {
        id: 'radio-group',
        name: 'Grupo de Radio',
        component: (props: any) => (
          <div className="w-full max-w-sm">
            <RadioGroup
              label="Selecciona una opción"
              options={sampleFormOptions}
              onChange={(value) => console.log(value)}
            />
          </div>
        )
      }
    ]
  },
  buttons: {
    icon: Square,
    title: 'Botones',
    type: 'button',
    components: [
      { 
        id: 'primary-button', 
        name: 'Botón Primario',
        component: (props: any) => (
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Botón Primario
          </button>
        )
      },
      { 
        id: 'secondary-button', 
        name: 'Botón Secundario',
        component: (props: any) => (
          <button className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            Botón Secundario
          </button>
        )
      },
      { 
        id: 'icon-button', 
        name: 'Botón con Icono',
        component: (props: any) => (
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Configuración
          </button>
        )
      },
      { 
        id: 'loading-button', 
        name: 'Botón de Carga',
        component: (props: any) => (
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2" disabled>
            <Loader2 className="w-4 h-4 animate-spin" />
            Cargando...
          </button>
        )
      }
    ]
  },
  design: {
    icon: Layout,
    title: 'Diseño',
    type: 'card',
    components: [
      { 
        id: 'card', 
        name: 'Tarjeta',
        component: (props: any) => (
          <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Título de la Tarjeta</h3>
            <p className="text-gray-600">Este es un ejemplo de una tarjeta con contenido. Las tarjetas son útiles para mostrar información agrupada.</p>
          </div>
        )
      },
      { 
        id: 'container', 
        name: 'Contenedor',
        component: (props: any) => (
          <div className="p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center text-gray-500">Contenedor</div>
          </div>
        )
      },
      { 
        id: 'grid', 
        name: 'Cuadrícula',
        component: (props: any) => (
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="p-4 bg-gray-100 rounded-lg text-center text-gray-600">
                Item {item}
              </div>
            ))}
          </div>
        )
      }
    ]
  },
  feedback: {
    icon: AlertCircle,
    title: 'Feedback',
    type: 'alert',
    components: [
      { 
        id: 'alert', 
        name: 'Alerta',
        component: (props: any) => (
          <div className="space-y-4">
            <Alert
              title="Éxito"
              description="La operación se completó correctamente"
              variant="success"
              isClosable
            />
            <Alert
              title="Error"
              description="Ha ocurrido un error al procesar la solicitud"
              variant="error"
              isClosable
            />
            <Alert
              title="Información"
              description="Hay actualizaciones disponibles para tu sistema"
              variant="info"
              isClosable
            />
            <Alert
              title="Advertencia"
              description="Tu sesión expirará en 5 minutos"
              variant="warning"
              isClosable
            />
          </div>
        )
      },
      { id: 'toast', name: 'Notificación' },
      { id: 'progress', name: 'Progreso' }
    ]
  }
};

const VisualizacionDeComponentes: React.FC<VisualizacionDeComponentesProps> = ({ 
  components = [], // Valor por defecto
  onComponentClick 
}) => {
  // Función para obtener los componentes reutilizables usados
  const getUsedReusableComponents = () => {
    const usedComponents = new Set<string>();
    components.forEach(component => {
      // Añadir el ID del componente actual
      usedComponents.add(component.id);
      // Añadir los componentes reutilizables
      const reusableIds = component.features?.reusableComponents || [];
      reusableIds.forEach(id => usedComponents.add(id));
    });
    return usedComponents;
  };

  const usedComponents = getUsedReusableComponents();

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Component className="w-4 h-4 text-gray-500" />
        <h3 className="text-sm font-medium text-gray-700">
          Visualización de Componentes ({components.length})
        </h3>
      </div>

      <div className="space-y-6">
        {components.map((component) => (
          <div
            key={component.id}
            className="border rounded-lg p-4 bg-white hover:border-blue-400 cursor-pointer transition-colors"
            onClick={() => onComponentClick && onComponentClick(component.id, <div>{component.name}</div>, component.componentType || 'custom')}
          >
            <div className="flex items-center gap-2 mb-2">
              <Component className="w-3 h-3 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">{component.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded ${
                component.componentType === 'reusable' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
              }`}>
                {component.componentType || 'custom'}
              </span>
            </div>
            {component.features?.reusableComponents && component.features.reusableComponents.length > 0 && (
              <div className="mt-2 pl-5">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Puzzle className="w-3 h-3" />
                  <span>Includes: {component.features.reusableComponents.join(', ')}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisualizacionDeComponentes;

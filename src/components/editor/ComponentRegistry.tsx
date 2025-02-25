import React from 'react';
import { PrimaryButton } from '../Componentesreutilizables/buttons/PrimaryButton';
import { BasicTable } from '../Componentesreutilizables/tables/BasicTable';
import { TextInput } from '../Componentesreutilizables/forms/TextInput';
import { Navbar } from '../Componentesreutilizables/navigation/Navbar';
import { Home, User, Settings } from 'lucide-react';
import { SecondaryButton } from '../Componentesreutilizables/buttons/SecondaryButton';
import { IconButton } from '../Componentesreutilizables/buttons/IconButton';
import { LoadingButton } from '../Componentesreutilizables/buttons/LoadingButton';
import { Accordion } from '../Componentesreutilizables/design/Accordion';
import { Card } from '../Componentesreutilizables/design/Card';
import { Divider } from '../Componentesreutilizables/design/Divider';
import { Modal } from '../Componentesreutilizables/design/Modal';
import { Breadcrumbs } from '../Componentesreutilizables/navigation/Breadcrumbs';

import { FileText } from 'lucide-react'; // Add 
import { Plus } from 'lucide-react'; // Add this for a default icon
import { Alert } from '../Componentesreutilizables/feedback/Alert';
import { Progress } from '../Componentesreutilizables/feedback/Progress';
import { Toast } from '../Componentesreutilizables/feedback/Toast';
import { Spinner } from '../Componentesreutilizables/feedback/Spinner';
import { Checkbox } from '../Componentesreutilizables/forms/Checkbox';
import { RadioGroup } from '../Componentesreutilizables/forms/RadioGroup';
import { SelectInput } from '../Componentesreutilizables/forms/SelectInput';
import { Sidebar } from '../Componentesreutilizables/navigation/Sidebar';
import { Tabs } from '../Componentesreutilizables/navigation/Tabs';
import { PaginatedTable } from '../Componentesreutilizables/tables/PaginatedTable';
import { SortableTable } from '../Componentesreutilizables/tables/SortableTable';
import { FilterableTable } from '../Componentesreutilizables/tables/FilterableTable';
import { Header1 } from '../Componentesreutilizables/design/Header1';
import { OrderPanel } from '../Componentesreutilizables/panels/OrderPanel';
import { SalesDashboard } from '../Componentesreutilizables/panels/SalesDashboard';
import { AppointmentCalendar } from '../Componentesreutilizables/panels/AppointmentCalendar';

export interface ComponentDefinition {
  type: string;
  label: string;
  description: string;
  defaultSize: { w: number; h: number };
  minSize: { w: number; h: number };
  maxSize: { w: number; h: number };
  defaultConfig: any;
  component: React.FC<any>;
}

export class ComponentRegistry {
  private components: Map<string, ComponentDefinition>;

  constructor() {
    this.components = new Map();
    this.registerDefaultComponents();
  }

  private registerDefaultComponents() {
    this.registerComponent({
      type: 'button',
      label: 'Botón',
      description: 'Botón interactivo personalizable',
      defaultSize: { w: 4, h: 2 },
      minSize: { w: 2, h: 1 },
      maxSize: { w: 24, h: 4 },
      defaultConfig: {
        title: 'Nuevo Botón',
        variant: 'solid',
        colorScheme: 'indigo',
        children: 'Nuevo Botón'
      },
      component: PrimaryButton,
    });

    this.registerComponent({
      type: 'secondaryButton',
      label: 'Botón Secundario',
      description: 'Botón secundario interactivo personalizable',
      defaultSize: { w: 4, h: 2 },
      minSize: { w: 2, h: 1 },
      maxSize: { w: 24, h: 4 },
      defaultConfig: {
        variant: 'outline',
        colorScheme: 'blue',
        size: 'md',
        children: 'Botón Secundario'
      },
      component: SecondaryButton,
    });

    this.registerComponent({
      type: 'iconButton',
      label: 'Botón con Icono',
      description: 'Botón interactivo con icono personalizable',
      defaultSize: { w: 4, h: 2 },
      minSize: { w: 2, h: 1 },
      maxSize: { w: 24, h: 4 },
      defaultConfig: {
        icon: <Plus className="w-5 h-5" />,
        label: 'Nuevo',
        placement: 'left',
        variant: 'solid',
        colorScheme: 'blue',
        size: 'md'
      },
      component: IconButton,
    });
    this.registerComponent({
      type: 'loadingButton',
      label: 'Botón de Carga',
      description: 'Botón con estado de carga y texto personalizable',
      defaultSize: { w: 6, h: 2 },
      minSize: { w: 4, h: 1 },
      maxSize: { w: 24, h: 4 },
      defaultConfig: {
        children: 'Cargar',
        loadingText: 'Cargando...',
        isLoading: false,
        spinnerPlacement: 'left',
        variant: 'solid',
        colorScheme: 'blue',
        size: 'md'
      },
      component: LoadingButton,
    });
    this.registerComponent({
      type: 'header1',
      label: 'Encabezado 1',
      description: 'Encabezado personalizable con múltiples variantes',
      defaultSize: { w: 24, h: 4 },
      minSize: { w: 12, h: 2 },
      maxSize: { w: 24, h: 8 },
      defaultConfig: {
        title: 'Título Principal',
        subtitle: 'Subtítulo descriptivo opcional',
        variant: 'withDivider',
        size: 'md',
        colorScheme: 'blue',
        className: ''
      },
      component: Header1,
    });

    this.registerComponent({
      type: 'appointmentCalendar',
      label: 'Calendario de Citas',
      description: 'Calendario interactivo para gestión de citas',
      defaultSize: { w: 24, h: 20 },
      minSize: { w: 12, h: 12 },
      maxSize: { w: 24, h: 24 },
      defaultConfig: {
        variant: 'detailed',
        size: 'md',
        colorScheme: 'blue',
        className: ''
      },
      component: AppointmentCalendar,
    });
    this.registerComponent({
      type: 'salesDashboard',
      label: 'Dashboard de Ventas',
      description: 'Panel de métricas de ventas con KPIs y gráficos',
      defaultSize: { w: 24, h: 20 },
      minSize: { w: 12, h: 12 },
      maxSize: { w: 24, h: 24 },
      defaultConfig: {
        variant: 'detailed',
        size: 'md',
        colorScheme: 'blue',
        className: ''
      },
      component: SalesDashboard,
    });
    this.registerComponent({
      type: 'orderPanel',
      label: 'Panel de Pedidos',
      description: 'Panel de gestión de pedidos con tabla, filtros y exportación',
      defaultSize: { w: 24, h: 16 },
      minSize: { w: 12, h: 8 },
      maxSize: { w: 24, h: 24 },
      defaultConfig: {
        variant: 'detailed',
        size: 'md',
        colorScheme: 'blue',
        className: ''
      },
      component: OrderPanel,
    });

    this.registerComponent({
      type: 'accordion',
      label: 'Acordeón',
      description: 'Componente acordeón expandible',
      defaultSize: { w: 12, h: 8 },
      minSize: { w: 6, h: 4 },
      maxSize: { w: 24, h: 16 },
      defaultConfig: {
        items: [
          {
            id: '1',
            title: 'Sección 1',
            content: 'Contenido de la sección 1',
            icon: <FileText className="w-4 h-4" />
          },
          {
            id: '2',
            title: 'Sección 2',
            content: 'Contenido de la sección 2',
            icon: <FileText className="w-4 h-4" />
          }
        ],
        variant: 'default',
        size: 'md',
        defaultExpanded: ['1'],
        allowMultiple: true,
        iconPosition: 'right',
        className: 'border border-slate-200'
      },
      component: Accordion,
    });
    this.registerComponent({
      type: 'card',
      label: 'Tarjeta',
      description: 'Contenedor tipo tarjeta personalizable',
      defaultSize: { w: 8, h: 10 },
      minSize: { w: 4, h: 4 },
      maxSize: { w: 24, h: 24 },
      defaultConfig: {
        variant: 'elevated',
        size: 'md',
        header: 'Encabezado de la Tarjeta',
        children: 'Contenido de la tarjeta. Aquí puedes agregar cualquier contenido.',
        footer: 'Pie de la tarjeta',
        image: 'https://via.placeholder.com/400x200',
        imagePosition: 'top',
        isHoverable: true,
        isClickable: false,
        className: ''
      },
      component: Card,
    });

    this.registerComponent({
      type: 'divider',
      label: 'Divisor',
      description: 'Línea divisoria personalizable',
      defaultSize: { w: 24, h: 1 },
      minSize: { w: 4, h: 1 },
      maxSize: { w: 24, h: 2 },
      defaultConfig: {
        variant: 'default',
        orientation: 'horizontal',
        thickness: 'medium',
        label: 'Sección',
        labelPosition: 'center',
        className: ''
      },
      component: Divider,
    });

    this.registerComponent({
      type: 'modal',
      label: 'Ventana Modal',
      description: 'Ventana emergente personalizable',
      defaultSize: { w: 12, h: 8 },
      minSize: { w: 8, h: 6 },
      maxSize: { w: 24, h: 16 },
      defaultConfig: {
        isOpen: true,
        onClose: () => {},
        title: 'Título del Modal',
        description: 'Descripción o subtítulo del modal',
        children: 'Contenido del modal. Aquí puedes agregar cualquier contenido.',
        variant: 'elevated',
        size: 'md',
        position: 'center',
        closeOnOverlayClick: true,
        closeOnEsc: true,
        className: ''
      },
      component: Modal,
    });
    this.registerComponent({
      type: 'alert',
      label: 'Alerta',
      description: 'Componente de alerta informativa',
      defaultSize: { w: 12, h: 3 },
      minSize: { w: 6, h: 2 },
      maxSize: { w: 24, h: 6 },
      defaultConfig: {
        title: 'Título de la Alerta',
        description: 'Descripción detallada de la alerta',
        variant: 'info',
        size: 'md',
        isClosable: true,
        onClose: () => {},
        className: ''
      },
      component: Alert,
    });

    this.registerComponent({
      type: 'progress',
      label: 'Barra de Progreso',
      description: 'Indicador de progreso personalizable',
      defaultSize: { w: 12, h: 2 },
      minSize: { w: 4, h: 1 },
      maxSize: { w: 24, h: 4 },
      defaultConfig: {
        value: 60,
        max: 100,
        variant: 'info',
        size: 'md',
        showValue: true,
        animation: 'stripe',
        thickness: 'medium',
        className: ''
      },
      component: Progress,
    });
    this.registerComponent({
      type: 'toast',
      label: 'Notificación Toast',
      description: 'Notificación emergente temporal',
      defaultSize: { w: 12, h: 3 },
      minSize: { w: 8, h: 2 },
      maxSize: { w: 24, h: 6 },
      defaultConfig: {
        message: 'Mensaje de notificación',
        variant: 'info',
        size: 'md',
        position: 'top-right',
        duration: 3000,
        onClose: () => {},
        className: ''
      },
      component: Toast,
    });

    this.registerComponent({
      type: 'spinner',
      label: 'Indicador de Carga',
      description: 'Indicador de carga animado',
      defaultSize: { w: 4, h: 2 },
      minSize: { w: 2, h: 2 },
      maxSize: { w: 8, h: 4 },
      defaultConfig: {
        label: 'Cargando...',
        variant: 'info',
        size: 'md',
        labelPlacement: 'right',
        animation: 'border',
        className: ''
      },
      component: Spinner,
    });
    this.registerComponent({
      type: 'checkbox',
      label: 'Casilla de Verificación',
      description: 'Casilla de verificación personalizable',
      defaultSize: { w: 8, h: 2 },
      minSize: { w: 4, h: 2 },
      maxSize: { w: 24, h: 4 },
      defaultConfig: {
        label: 'Opción',
        description: 'Descripción de la opción',
        variant: 'basic',
        size: 'md',
        isChecked: false,
        isIndeterminate: false,
        isDisabled: false,
        className: ''
      },
      component: Checkbox,
    });

    this.registerComponent({
      type: 'radioGroup',
      label: 'Grupo de Radio',
      description: 'Grupo de opciones tipo radio',
      defaultSize: { w: 8, h: 6 },
      minSize: { w: 6, h: 4 },
      maxSize: { w: 24, h: 12 },
      defaultConfig: {
        name: 'radioGroup',
        options: [
          { value: 'option1', label: 'Opción 1', description: 'Descripción de la opción 1' },
          { value: 'option2', label: 'Opción 2', description: 'Descripción de la opción 2' },
          { value: 'option3', label: 'Opción 3', description: 'Descripción de la opción 3' }
        ],
        value: 'option1',
        variant: 'basic',
        size: 'md',
        direction: 'vertical',
        isDisabled: false
      },
      component: RadioGroup,
    });
    this.registerComponent({
      type: 'select',
      label: 'Campo de Selección',
      description: 'Lista desplegable de opciones',
      defaultSize: { w: 8, h: 3 },
      minSize: { w: 4, h: 2 },
      maxSize: { w: 24, h: 6 },
      defaultConfig: {
        label: 'Selecciona una opción',
        options: [
          { value: 'option1', label: 'Opción 1' },
          { value: 'option2', label: 'Opción 2' },
          { value: 'option3', label: 'Opción 3' }
        ],
        variant: 'outline',
        size: 'md',
        isFullWidth: true,
        isRequired: false,
        isDisabled: false,
        helperText: 'Selecciona una de las opciones disponibles',
        className: 'h-full'
      },
      component: SelectInput,
    });

    this.registerComponent({
      type: 'textinput',
      label: 'Campo de Texto',
      description: 'Campo de entrada de texto personalizable',
      defaultSize: { w: 8, h: 3 },
      minSize: { w: 4, h: 2 },
      maxSize: { w: 24, h: 6 },
      defaultConfig: {
        label: 'Nuevo Campo',
        placeholder: 'Escribe aquí...',
        variant: 'outline',
        size: 'md',
        isFullWidth: true,
        helperText: 'Campo de texto personalizable',
        className: 'h-full'
      },
      component: TextInput,
    });
    this.registerComponent({
      type: 'breadcrumbs',
      label: 'Migas de Pan',
      description: 'Navegación jerárquica tipo migas de pan',
      defaultSize: { w: 24, h: 2 },
      minSize: { w: 12, h: 1 },
      maxSize: { w: 24, h: 4 },
      defaultConfig: {
        items: [
          { label: 'Inicio', href: '/', icon: null },
          { label: 'Categoría', href: '/categoria', icon: <FileText className="w-4 h-4" /> },
          { label: 'Subcategoría', href: '/categoria/subcategoria', icon: null }
        ],
        variant: 'contained',
        size: 'md',
        colorScheme: 'blue',
        showHomeIcon: true,
        className: ''
      },
      component: Breadcrumbs,
    });

    this.registerComponent({
      type: 'navbar',
      label: 'Barra de Navegación',
      description: 'Barra de navegación responsive con menú móvil',
      defaultSize: { w: 24, h: 4 },
      minSize: { w: 12, h: 3 },
      maxSize: { w: 24, h: 6 },
      defaultConfig: {
        variant: 'light',
        size: 'md',
        colorScheme: 'blue',
        position: 'relative',
        items: [
          {
            label: 'Inicio',
            href: '#',
            icon: <Home className="w-4 h-4" />
          },
          {
            label: 'Perfil',
            href: '#',
            icon: <User className="w-4 h-4" />
          },
          {
            label: 'Configuración',
            href: '#',
            icon: <Settings className="w-4 h-4" />
          }
        ],
        className: 'rounded-lg shadow-sm'
      },
      component: Navbar,
    });
    this.registerComponent({
      type: 'sidebar',
      label: 'Barra Lateral',
      description: 'Menú lateral de navegación',
      defaultSize: { w: 12, h: 24 },
      minSize: { w: 8, h: 12 },
      maxSize: { w: 16, h: 24 },
      defaultConfig: {
        items: [
          {
            label: 'Inicio',
            href: '#',
            icon: <Home className="w-4 h-4" />,
            children: [
              { label: 'Dashboard', href: '#', icon: <FileText className="w-4 h-4" /> },
              { label: 'Análisis', href: '#', icon: <FileText className="w-4 h-4" /> }
            ]
          },
          {
            label: 'Perfil',
            href: '#',
            icon: <User className="w-4 h-4" />
          },
          {
            label: 'Configuración',
            href: '#',
            icon: <Settings className="w-4 h-4" />
          }
        ],
        variant: 'light',
        size: 'md',
        colorScheme: 'blue',
        collapsed: false,
        className: ''
      },
      component: Sidebar,
    });

    this.registerComponent({
      type: 'tabs',
      label: 'Pestañas',
      description: 'Navegación por pestañas',
      defaultSize: { w: 24, h: 12 },
      minSize: { w: 12, h: 6 },
      maxSize: { w: 24, h: 24 },
      defaultConfig: {
        tabs: [
          { id: 'tab1', label: 'Pestaña 1', icon: <FileText className="w-4 h-4" />, content: 'Contenido de la pestaña 1' },
          { id: 'tab2', label: 'Pestaña 2', icon: <FileText className="w-4 h-4" />, content: 'Contenido de la pestaña 2' },
          { id: 'tab3', label: 'Pestaña 3', icon: <FileText className="w-4 h-4" />, content: 'Contenido de la pestaña 3' }
        ],
        activeTab: 'tab1',
        onChange: (tabId: string) => {},
        variant: 'line',
        size: 'md',
        colorScheme: 'blue',
        alignment: 'start',
        className: ''
      },
      component: Tabs,
    });
    this.registerComponent({
      type: 'paginatedTable',
      label: 'Tabla Paginada',
      description: 'Tabla con paginación integrada',
      defaultSize: { w: 24, h: 12 },
      minSize: { w: 12, h: 6 },
      maxSize: { w: 24, h: 24 },
      defaultConfig: {
        data: Array.from({ length: 25 }, (_, i) => ({
          id: i + 1,
          name: `Item ${i + 1}`,
          category: `Category ${(i % 5) + 1}`,
          status: i % 2 === 0 ? 'Active' : 'Inactive'
        })),
        columns: [
          { header: 'ID', accessorKey: 'id' },
          { header: 'Name', accessorKey: 'name' },
          { header: 'Category', accessorKey: 'category' },
          { header: 'Status', accessorKey: 'status' }
        ],
        pageSize: 10,
        paginationVariant: 'numbered',
        variant: 'default',
        className: 'border border-slate-200'
      },
      component: PaginatedTable,
    });

    this.registerComponent({
      type: 'sortableTable',
      label: 'Tabla Ordenable',
      description: 'Tabla con ordenamiento por columnas',
      defaultSize: { w: 24, h: 12 },
      minSize: { w: 12, h: 6 },
      maxSize: { w: 24, h: 24 },
      defaultConfig: {
        data: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          name: `Item ${i + 1}`,
          value: Math.floor(Math.random() * 100),
          date: new Date(2024, 0, i + 1).toLocaleDateString()
        })),
        columns: [
          { header: 'ID', accessorKey: 'id' },
          { header: 'Name', accessorKey: 'name' },
          { header: 'Value', accessorKey: 'value' },
          { header: 'Date', accessorKey: 'date' }
        ],
        defaultSortField: 'id',
        sortVariant: 'arrows',
        variant: 'default',
        className: 'border border-slate-200'
      },
      component: SortableTable,
    });

    this.registerComponent({
      type: 'filterableTable',
      label: 'Tabla Filtrable',
      description: 'Tabla con filtros por columna',
      defaultSize: { w: 24, h: 12 },
      minSize: { w: 12, h: 6 },
      maxSize: { w: 24, h: 24 },
      defaultConfig: {
        data: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          name: `Item ${i + 1}`,
          category: `Category ${(i % 3) + 1}`,
          status: i % 2 === 0 ? 'Active' : 'Inactive'
        })),
        columns: [
          { header: 'ID', accessorKey: 'id' },
          { header: 'Name', accessorKey: 'name' },
          { header: 'Category', accessorKey: 'category' },
          { header: 'Status', accessorKey: 'status' }
        ],
        filterVariant: 'top',
        searchPlaceholder: 'Buscar...',
        variant: 'default',
        className: 'border border-slate-200'
      },
      component: FilterableTable,
    });

   
    this.registerComponent({
      type: 'table',
      label: 'Tabla',
      description: 'Tabla de datos personalizable',
      defaultSize: { w: 12, h: 6 },
      minSize: { w: 6, h: 2 },
      maxSize: { w: 24, h: 12 },
      defaultConfig: {
        data: [
          { column1: 'Dato 1-1', column2: 'Dato 1-2', column3: 'Dato 1-3' },
          { column1: 'Dato 2-1', column2: 'Dato 2-2', column3: 'Dato 2-3' },
        ],
        columns: [
          { header: 'Columna 1', accessorKey: 'column1' },
          { header: 'Columna 2', accessorKey: 'column2' },
          { header: 'Columna 3', accessorKey: 'column3' },
        ],
        variant: 'default',
        className: 'border border-slate-200'
      },
      component: BasicTable,
    });
  }

  registerComponent(definition: ComponentDefinition) {
    this.components.set(definition.type, definition);
  }

  getComponentDefinition(type: string): ComponentDefinition | undefined {
    return this.components.get(type);
  }

  getAcceptedTypes(): string[] {
    return Array.from(this.components.keys());
  }

  getAllComponents(): ComponentDefinition[] {
    return Array.from(this.components.values());
  }

  renderComponent(componentData: { type: string; config: any }) {
    const definition = this.getComponentDefinition(componentData.type);
    if (!definition) {
      console.error(`No component registered for type: ${componentData.type}`);
      return null;
    }

    const Component = definition.component;
    if (componentData.type === 'button') {
      return (
        <Component 
          {...componentData.config} 
          children={componentData.config.children || componentData.config.title || 'Botón'}
        />
      );
    }
    return <Component {...componentData.config} />;
  }
}

import React, { useState, useMemo } from 'react';
import { DraggableItem } from './DraggableItem';
import { Search, ChevronDown, ChevronRight, X, Sparkles } from 'lucide-react';

export const ComponentsPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSections, setExpandedSections] = useState({
    tables: true,
    buttons: true,
    cards: true,
    forms: true,
    nav: true
  });

  const components = {
    tables: [
      { type: 'table' as const, variant: 'default', label: 'Tabla Básica', description: 'Tabla con datos básicos' },
      { type: 'table' as const, variant: 'users', label: 'Tabla de Usuarios', description: 'Lista de usuarios con avatares' },
      { type: 'table' as const, variant: 'products', label: 'Tabla de Productos', description: 'Catálogo de productos con imágenes' },
      { type: 'table' as const, variant: 'analytics', label: 'Tabla de Análisis', description: 'Datos estadísticos con gráficos' },
      { type: 'table' as const, variant: 'tasks', label: 'Tabla de Tareas', description: 'Lista de tareas con estado' }
    ],
    buttons: [
      { type: 'button' as const, variant: 'primary', label: 'Botón Primario', description: 'Acción principal' },
      { type: 'button' as const, variant: 'secondary', label: 'Botón Secundario', description: 'Acción secundaria' },
      { type: 'button' as const, variant: 'danger', label: 'Botón de Peligro', description: 'Acciones destructivas' },
      { type: 'button' as const, variant: 'success', label: 'Botón de Éxito', description: 'Confirmar acciones' },
      { type: 'button' as const, variant: 'icon', label: 'Botón con Icono', description: 'Acciones con icono' }
    ],
    cards: [
      { type: 'card' as const, variant: 'basic', label: 'Tarjeta Simple', description: 'Tarjeta con título y contenido' },
      { type: 'card' as const, variant: 'image', label: 'Tarjeta con Imagen', description: 'Tarjeta con imagen destacada' },
      { type: 'card' as const, variant: 'profile', label: 'Tarjeta de Perfil', description: 'Información de usuario con avatar' },
      { type: 'card' as const, variant: 'stats', label: 'Tarjeta de Estadísticas', description: 'Métricas y datos numéricos' },
      { type: 'card' as const, variant: 'pricing', label: 'Tarjeta de Precios', description: 'Planes y características' }
    ],
    forms: [
      { type: 'form' as const, variant: 'login', label: 'Formulario de Login', description: 'Acceso de usuarios' },
      { type: 'form' as const, variant: 'register', label: 'Formulario de Registro', description: 'Registro de nuevos usuarios' },
      { type: 'form' as const, variant: 'contact', label: 'Formulario de Contacto', description: 'Formulario para mensajes' },
      { type: 'form' as const, variant: 'search', label: 'Formulario de Búsqueda', description: 'Búsqueda avanzada' },
      { type: 'form' as const, variant: 'settings', label: 'Formulario de Ajustes', description: 'Configuración de preferencias' }
    ],
    nav: [
      { type: 'nav' as const, variant: 'header', label: 'Barra de Navegación', description: 'Navegación principal' },
      { type: 'nav' as const, variant: 'sidebar', label: 'Menú Lateral', description: 'Navegación vertical' },
      { type: 'nav' as const, variant: 'tabs', label: 'Pestañas', description: 'Navegación por tabs' },
      { type: 'nav' as const, variant: 'breadcrumb', label: 'Migas de Pan', description: 'Navegación jerárquica' },
      { type: 'nav' as const, variant: 'stepper', label: 'Pasos', description: 'Navegación por pasos' }
    ]
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const filteredSections = useMemo(() => {
    if (!searchTerm) return components;

    const normalizedSearch = searchTerm.toLowerCase();
    
    const matchesSearch = (item: typeof components.tables[0]) => {
      return (
        item.type.toLowerCase().includes(normalizedSearch) ||
        item.label.toLowerCase().includes(normalizedSearch) ||
        item.description.toLowerCase().includes(normalizedSearch)
      );
    };

    return Object.fromEntries(
      Object.entries(components).map(([key, items]) => [
        key,
        items.filter(matchesSearch)
      ])
    );
  }, [searchTerm]);

  const hasResults = Object.values(filteredSections).some(section => section.length > 0);

  const renderSection = (key: keyof typeof components, items: typeof components.tables) => {
    if (items.length === 0) return null;

    return (
      <div key={key} className="space-y-2">
        <button
          onClick={() => toggleSection(key)}
          className="w-full flex items-center justify-between text-left text-sm font-medium text-slate-700 bg-slate-50 p-3 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <span className="capitalize flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            {key} {searchTerm && `(${items.length})`}
          </span>
          {expandedSections[key] ? (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronRight className="h-4 w-4 text-slate-400" />
          )}
        </button>
        
        {expandedSections[key] && (
          <div className="space-y-2 pl-2">
            {items.map((item) => (
              <DraggableItem
                key={`${key}-${item.type}-${item.variant}`}
                type={item.type}
                variant={item.variant}
                label={item.label}
                description={item.description}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white h-full flex flex-col max-h-screen">
      <div className="p-6 border-b border-slate-200 flex-shrink-0">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          Componentes
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar componentes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
          <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
        {!hasResults && searchTerm && (
          <div className="text-center py-8 text-slate-500">
            <p>No se encontraron componentes que coincidan con "{searchTerm}"</p>
          </div>
        )}

        {Object.entries(filteredSections).map(([key, items]) => 
          renderSection(key as keyof typeof components, items)
        )}
      </div>
    </div>
  );
};

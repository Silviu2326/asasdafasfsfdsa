import React from 'react';
import * as LucideIcons from 'lucide-react';
import ThemeSection from './sidebar/ThemeSection';
import TabsSection from './sidebar/TabsSection';

export interface SidebarTab {
  id: string;
  icon: string;
  label: string;
  color?: string;
  isActive?: boolean;
  badge?: string;
}

export interface SidebarConfig {
  enabled: boolean;
  position: 'left' | 'right';
  style: 'fixed' | 'floating' | 'mini';
  features: {
    collapsible: boolean;
    userProfile: boolean;
    search: boolean;
    notifications: boolean;
  };
  theme: {
    dark: boolean;
    glassmorphism: boolean;
    innerShadow: boolean;
    borderRadius: number;
    backgroundOpacity: number;
    colors: {
      background: string;
      text: string;
      primary: string;
      secondary: string;
      border: string;
      hover: string;
      active: string;
    };
  };
  tabs: SidebarTab[];
}

interface FormSidebarProps {
  onConfigChange: (config: SidebarConfig) => void;
  config: SidebarConfig;
}

const FormSidebar: React.FC<FormSidebarProps> = ({ onConfigChange, config }) => {
  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Panel de Configuración */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <LucideIcons.Menu className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Barra Lateral</h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Habilitar Barra Lateral</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.enabled}
                onChange={() => onConfigChange({ ...config, enabled: !config.enabled })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {config.enabled && (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Posición</label>
                  <div className="flex gap-4">
                    <button
                      className={`flex-1 py-2 px-4 rounded-lg border ${
                        config.position === 'left'
                          ? 'bg-blue-50 border-blue-200 text-blue-700'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => onConfigChange({ ...config, position: 'left' })}
                    >
                      Izquierda
                    </button>
                    <button
                      className={`flex-1 py-2 px-4 rounded-lg border ${
                        config.position === 'right'
                          ? 'bg-blue-50 border-blue-200 text-blue-700'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                      onClick={() => onConfigChange({ ...config, position: 'right' })}
                    >
                      Derecha
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estilo</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['fixed', 'floating', 'mini'].map((style) => (
                      <button
                        key={style}
                        className={`py-2 px-3 rounded-lg border ${
                          config.style === style
                            ? 'bg-blue-50 border-blue-200 text-blue-700'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => onConfigChange({ ...config, style: style as any })}
                      >
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <TabsSection config={config} onConfigChange={onConfigChange} />

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Características</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(config.features).map(([key, value]) => (
                      <div key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`feature-${key}`}
                          checked={value}
                          onChange={() => onConfigChange({
                            ...config,
                            features: {
                              ...config.features,
                              [key]: !value,
                            },
                          })}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300"
                        />
                        <label htmlFor={`feature-${key}`} className="ml-2 text-sm text-gray-700 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <ThemeSection config={config} onConfigChange={onConfigChange} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Vista Previa */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Vista Previa</h3>
        <div className="relative h-[500px] border rounded-lg overflow-hidden">
          {/* Contenedor principal que simula una página */}
          <div className="w-full h-full bg-gray-50 flex">
            {/* Barra lateral */}
            {config.enabled && (
              <div
                className={`
                  ${config.style === 'mini' ? 'w-16' : 'w-64'}
                  ${config.style === 'floating' ? 'mt-4 ml-4 rounded-xl' : ''}
                  h-full flex flex-col
                  ${config.style === 'floating' ? 'shadow-xl' : 'shadow-md'}
                  transition-all duration-300
                `}
                style={{
                  backgroundColor: `${config.theme.colors.background}${Math.round(config.theme.backgroundOpacity * 2.55).toString(16).padStart(2, '0')}`,
                  color: config.theme.colors.text,
                  borderRadius: `${config.theme.borderRadius}px`,
                  backdropFilter: config.theme.glassmorphism ? 'blur(10px)' : 'none',
                  boxShadow: config.theme.innerShadow ? 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)' : ''
                }}
              >
                {/* Cabecera de la barra lateral */}
                {config.features.search && (
                  <div className="p-4">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ backgroundColor: `${config.theme.colors.hover}20` }}>
                      <input
                        type="text"
                        placeholder="Buscar..."
                        className="bg-transparent border-none focus:outline-none text-sm w-full"
                        style={{ color: config.theme.colors.text }}
                      />
                    </div>
                  </div>
                )}

                {/* Menú de navegación */}
                <nav className="flex-1 overflow-y-auto">
                  <div className="px-3 py-2">
                    {config.tabs.map((tab) => (
                      <div
                        key={tab.id}
                        className={`
                          flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer mb-1
                          transition-colors relative
                        `}
                        style={{
                          backgroundColor: tab.isActive ? `${tab.color}20` : 'transparent',
                          color: tab.isActive ? tab.color : config.theme.colors.text
                        }}
                      >
                        {React.createElement(
                          LucideIcons[tab.icon as keyof typeof LucideIcons],
                          {
                            size: 20,
                            color: tab.isActive ? tab.color : config.theme.colors.text
                          }
                        )}
                        {config.style !== 'mini' && (
                          <>
                            <span className="text-sm">{tab.label}</span>
                            {tab.badge && (
                              <span
                                className="absolute right-2 px-2 py-0.5 rounded-full text-xs"
                                style={{
                                  backgroundColor: tab.color,
                                  color: '#fff'
                                }}
                              >
                                {tab.badge}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </nav>

                {/* Perfil de usuario */}
                {config.features.userProfile && (
                  <div
                    className="p-4 border-t"
                    style={{ borderColor: config.theme.colors.border }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: config.theme.colors.primary }}
                      >
                        <span className="text-white text-sm">JD</span>
                      </div>
                      {config.style !== 'mini' && (
                        <div>
                          <div className="text-sm font-medium">John Doe</div>
                          <div className="text-xs opacity-60">john@example.com</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Contenido principal (simulado) */}
            <div className="flex-1 p-6">
              <div className="h-32 bg-white rounded-lg shadow-sm mb-4"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-white rounded-lg shadow-sm"></div>
                <div className="h-24 bg-white rounded-lg shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSidebar;
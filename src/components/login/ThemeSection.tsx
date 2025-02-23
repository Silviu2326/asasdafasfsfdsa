import React from 'react';
import { ChromePicker } from 'react-color';
import { LoginConfig } from '../FormLogin';

interface ThemeSectionProps {
  config: LoginConfig;
  onConfigChange: (config: LoginConfig) => void;
}

const ThemeSection: React.FC<ThemeSectionProps> = ({ config, onConfigChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Tema</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(config.theme.colors).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <label className="block text-sm text-gray-600 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <ChromePicker
              color={value}
              onChange={(color) => {
                onConfigChange({
                  ...config,
                  theme: {
                    ...config.theme,
                    colors: {
                      ...config.theme.colors,
                      [key]: color.hex
                    }
                  }
                });
              }}
              className="!w-full"
            />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-2">Opacidad del Fondo</label>
          <input
            type="range"
            min="0"
            max="100"
            value={config.theme.backgroundOpacity}
            onChange={(e) => onConfigChange({
              ...config,
              theme: {
                ...config.theme,
                backgroundOpacity: parseInt(e.target.value)
              }
            })}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0%</span>
            <span>{config.theme.backgroundOpacity}%</span>
            <span>100%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">Radio de Bordes</label>
          <input
            type="range"
            min="0"
            max="20"
            value={config.theme.borderRadius}
            onChange={(e) => onConfigChange({
              ...config,
              theme: {
                ...config.theme,
                borderRadius: parseInt(e.target.value)
              }
            })}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0px</span>
            <span>{config.theme.borderRadius}px</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Efecto Cristal</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.theme.glassmorphism}
                onChange={() => onConfigChange({
                  ...config,
                  theme: { ...config.theme, glassmorphism: !config.theme.glassmorphism }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Sombra Interior</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.theme.innerShadow}
                onChange={() => onConfigChange({
                  ...config,
                  theme: { ...config.theme, innerShadow: !config.theme.innerShadow }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Animaciones</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.theme.animations}
                onChange={() => onConfigChange({
                  ...config,
                  theme: { ...config.theme, animations: !config.theme.animations }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-2">Imagen de Fondo</label>
          <input
            type="text"
            value={config.theme.backgroundImage || ''}
            onChange={(e) => onConfigChange({
              ...config,
              theme: {
                ...config.theme,
                backgroundImage: e.target.value
              }
            })}
            placeholder="URL de la imagen (opcional)"
            className="w-full px-3 py-2 border rounded-lg text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeSection;
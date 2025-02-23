import React from 'react';
import ColorPicker from './ColorPicker';

interface StyleConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  animation: {
    duration: string;
    easing: string;
  };
  shadow: {
    none: string;
    sm: string;
    md: string;
    lg: string;
  };
}

interface FormEstilosProps {
  styles: StyleConfig;
  onStyleChange: (category: keyof StyleConfig, key: string, value: string) => void;
  font: string;
  onFontChange: (font: string) => void;
}

const FormEstilos: React.FC<FormEstilosProps> = ({
  styles,
  onStyleChange,
  font,
  onFontChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Paleta de Colores
        </h3>
        <div className="space-y-6">
          {Object.entries(styles.colors).map(([key, value]) => (
            <div key={key} className="group">
              <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                <span className="capitalize">{key}</span>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-md group-hover:bg-gray-200 transition-colors">
                  {value}
                </span>
              </label>
              <div className="ring-1 ring-gray-200 rounded-lg p-3 transition-shadow hover:ring-2 hover:ring-blue-200">
                <ColorPicker
                  value={value}
                  onChange={(color) => onStyleChange('colors', key, color)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">
          Espaciado
        </h3>
        <div className="space-y-4">
          {Object.entries(styles.spacing).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <label className="flex items-center justify-between text-sm font-medium text-gray-700">
                <span className="capitalize">Espaciado {key.toUpperCase()}</span>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-md">
                  {value}
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={parseInt(value)}
                onChange={(e) => onStyleChange('spacing', key, `${e.target.value}px`)}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">
          Bordes
        </h3>
        <div className="space-y-4">
          {Object.entries(styles.borderRadius).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <label className="flex items-center justify-between text-sm font-medium text-gray-700">
                <span className="capitalize">Radio {key}</span>
                <span className="text-xs px-2 py-1 bg-gray-100 rounded-md">
                  {value}
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={parseInt(value)}
                onChange={(e) => onStyleChange('borderRadius', key, `${e.target.value}px`)}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">
          Animaciones
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Duración
            </label>
            <select
              value={styles.animation.duration}
              onChange={(e) => onStyleChange('animation', 'duration', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="150ms">Rápida (150ms)</option>
              <option value="300ms">Normal (300ms)</option>
              <option value="500ms">Lenta (500ms)</option>
              <option value="1000ms">Muy lenta (1000ms)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Animación
            </label>
            <select
              value={styles.animation.easing}
              onChange={(e) => onStyleChange('animation', 'easing', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="ease">Suave</option>
              <option value="linear">Lineal</option>
              <option value="ease-in">Entrada suave</option>
              <option value="ease-out">Salida suave</option>
              <option value="ease-in-out">Entrada y salida suave</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">
          Sombras
        </h3>
        <div className="space-y-4">
          {Object.entries(styles.shadow).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <input
                type="radio"
                id={`shadow-${key}`}
                name="shadow"
                checked={value === styles.shadow.md}
                onChange={() => onStyleChange('shadow', 'md', value)}
                className="text-blue-600"
              />
              <label
                htmlFor={`shadow-${key}`}
                className="text-sm font-medium text-gray-700 capitalize"
              >
                {key === 'none' ? 'Sin sombra' : `Sombra ${key.toUpperCase()}`}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">
          Tipografía
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fuente Principal
          </label>
          <select 
            className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all cursor-pointer hover:border-gray-400"
            value={font}
            onChange={(e) => onFontChange(e.target.value)}
            style={{ fontFamily: font }}
          >
            <option style={{ fontFamily: 'Inter' }}>Inter</option>
            <option style={{ fontFamily: 'Roboto' }}>Roboto</option>
            <option style={{ fontFamily: 'Open Sans' }}>Open Sans</option>
            <option style={{ fontFamily: 'Montserrat' }}>Montserrat</option>
            <option style={{ fontFamily: 'Poppins' }}>Poppins</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FormEstilos;
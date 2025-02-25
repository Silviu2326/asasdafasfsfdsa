import React from 'react';
import { LoginConfig, SocialProvider } from '../FormLogin';
import IconPicker from '../sidebar/IconPicker';

interface SocialSectionProps {
  config: LoginConfig;
  onConfigChange: (config: LoginConfig) => void;
}

const SocialSection: React.FC<SocialSectionProps> = ({ config, onConfigChange }) => {
  const addProvider = () => {
    const newProvider: SocialProvider = {
      id: Date.now().toString(),
      name: 'New Provider',
      icon: 'User',
      color: '#000000',
      enabled: true
    };
    onConfigChange({
      ...config,
      socialProviders: [...config.socialProviders, newProvider]
    });
  };

  const updateProvider = (index: number, updates: Partial<SocialProvider>) => {
    const newProviders = [...config.socialProviders];
    newProviders[index] = { ...newProviders[index], ...updates };
    onConfigChange({
      ...config,
      socialProviders: newProviders
    });
  };

  const removeProvider = (id: string) => {
    onConfigChange({
      ...config,
      socialProviders: config.socialProviders.filter(provider => provider.id !== id)
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Proveedores Sociales</h3>
        <button
          onClick={addProvider}
          className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
        >
          + Añadir Proveedor
        </button>
      </div>

      <div className="space-y-2">
        {config.socialProviders.map((provider, index) => (
          <div
            key={provider.id}
            className="flex items-center gap-3 p-3 border rounded-lg"
          >
            <IconPicker
              selectedIcon={provider.icon}
              onIconSelect={(icon) => updateProvider(index, { icon })}
            />
            <input
              type="text"
              value={provider.name}
              onChange={(e) => updateProvider(index, { name: e.target.value })}
              className="flex-1 px-2 py-1 border rounded text-sm"
              placeholder="Nombre del proveedor"
            />
            <input
              type="color"
              value={provider.color}
              onChange={(e) => updateProvider(index, { color: e.target.value })}
              className="w-8 h-8 rounded cursor-pointer"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={provider.enabled}
                onChange={(e) => updateProvider(index, { enabled: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded border-gray-300"
              />
              <span className="text-sm text-gray-600">Activo</span>
            </label>
            <button
              onClick={() => removeProvider(provider.id)}
              className="p-1 text-red-500 hover:bg-red-50 rounded"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialSection;
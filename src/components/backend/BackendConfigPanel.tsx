import React from 'react';
import { Database } from 'lucide-react';
import { BackendConfig } from '../../types/backend';
import ModelConfig from './ModelConfig';
import ControllerConfig from './ControllerConfig';
import RouteConfig from './RouteConfig';

interface BackendConfigPanelProps {
  config: BackendConfig;
  setConfig: (config: BackendConfig) => void;
}

const BackendConfigPanel: React.FC<BackendConfigPanelProps> = ({ config, setConfig }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Database className="w-8 h-8 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Backend y Base de Datos</h2>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Base de Datos
            </label>
            <select
              value={config.database}
              onChange={(e) => setConfig({ ...config, database: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="postgresql">PostgreSQL</option>
              <option value="mongodb">MongoDB</option>
              <option value="mysql">MySQL</option>
            </select>
          </div>

          <ModelConfig 
            models={config.models} 
            onChange={(models) => setConfig({ ...config, models })} 
          />

          <ControllerConfig 
            controllers={config.controllers || []} 
            onChange={(controllers) => setConfig({ ...config, controllers })} 
          />

          <RouteConfig 
            routes={config.routes} 
            onChange={(routes) => setConfig({ ...config, routes })} 
            controllers={config.controllers || []}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Características
            </label>
            <div className="space-y-2">
              {Object.entries(config.features).map(([key, value]) => (
                <div
                  key={key}
                  className={`
                    flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all
                    ${value ? 'bg-blue-50 border-blue-200' : 'border-gray-200 hover:bg-gray-50'}
                  `}
                  onClick={() => setConfig({
                    ...config,
                    features: {
                      ...config.features,
                      [key]: !value,
                    },
                  })}
                >
                  <span className="text-sm text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => {}}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackendConfigPanel;
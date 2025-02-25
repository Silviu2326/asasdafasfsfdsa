import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import { Database, FolderTree } from 'lucide-react';
import BackendConfigPanel from '../components/backend/BackendConfigPanel';

interface Model {
  name: string;
  fields: {
    name: string;
    type: string;
    required: boolean;
  }[];
}

interface Route {
  path: string;
  method: string;
  controller: string;
  action: string;
}

interface BackendConfig {
  database: string;
  models: Model[];
  routes: Route[];
  features: {
    authentication: boolean;
    restApi: boolean;
    graphql: boolean;
    swagger: boolean;
    websockets: boolean;
  };
}

const Backend = () => {
  const [config, setConfig] = useState<BackendConfig>({
    database: 'postgresql',
    models: [
      {
        name: 'User',
        fields: [
          { name: 'username', type: 'string', required: true },
          { name: 'email', type: 'string', required: true },
          { name: 'password', type: 'string', required: true },
          { name: 'createdAt', type: 'date', required: true },
        ],
      },
      {
        name: 'Product',
        fields: [
          { name: 'name', type: 'string', required: true },
          { name: 'description', type: 'text', required: false },
          { name: 'price', type: 'decimal', required: true },
          { name: 'stock', type: 'integer', required: true },
        ],
      },
    ],
    routes: [
      { path: '/auth/login', method: 'POST', controller: 'AuthController', action: 'login' },
      { path: '/auth/register', method: 'POST', controller: 'AuthController', action: 'register' },
      { path: '/products', method: 'GET', controller: 'ProductController', action: 'index' },
      { path: '/products/:id', method: 'GET', controller: 'ProductController', action: 'show' },
    ],
    features: {
      authentication: true,
      restApi: true,
      graphql: false,
      swagger: true,
      websockets: false,
    },
  });

  const addModel = () => {
    setConfig({
      ...config,
      models: [
        ...config.models,
        {
          name: 'NewModel',
          fields: [{ name: 'name', type: 'string', required: true }],
        },
      ],
    });
  };

  const addRoute = () => {
    setConfig({
      ...config,
      routes: [
        ...config.routes,
        { path: '/new-route', method: 'GET', controller: 'NewController', action: 'index' },
      ],
    });
  };

  return (
    <PageContainer title="Configuración del Backend" prevPage="/structure" step={4}>
      <div className="grid grid-cols-2 gap-6">
        <BackendConfigPanel config={config} setConfig={setConfig} />
        
        {/* Vista Previa de la Estructura */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <FolderTree className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Vista Previa de la Estructura</h3>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50 font-mono text-sm">
            <pre className="whitespace-pre-wrap">
{`📁 src/
  📁 models/
${config.models.map(model => `    📄 ${model.name}.ts`).join('\n')}
  
  📁 controllers/
${config.models.map(model => `    📄 ${model.name}Controller.ts`).join('\n')}
${config.features.authentication ? '    📄 AuthController.ts\n' : ''}
  
  📁 routes/
    📄 index.ts
${config.models.map(model => `    📄 ${model.name.toLowerCase()}.routes.ts`).join('\n')}
${config.features.authentication ? '    📄 auth.routes.ts\n' : ''}
  
  📁 middleware/
    📄 errorHandler.ts
${config.features.authentication ? '    📄 auth.middleware.ts\n' : ''}
  
  📁 config/
    📄 database.ts
    📄 server.ts
${config.features.swagger ? '    📄 swagger.ts\n' : ''}
${config.features.graphql ? '    📄 graphql.ts\n' : ''}
  
  📁 types/
    📄 index.ts
${config.models.map(model => `    📄 ${model.name}.types.ts`).join('\n')}
  
  📁 services/
${config.models.map(model => `    📄 ${model.name}.service.ts`).join('\n')}
${config.features.authentication ? '    📄 auth.service.ts\n' : ''}

  📁 utils/
    📄 validation.ts
    📄 helpers.ts
${config.features.websockets ? '    📄 websocket.ts\n' : ''}`}
</pre>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Modelos Definidos</h4>
              <div className="space-y-2">
                {config.models.map((model, index) => (
                  <div key={index} className="border rounded-lg p-3 bg-gray-50">
                    <div className="font-medium text-sm text-gray-700 mb-1">{model.name}</div>
                    <div className="space-y-1">
                      {model.fields.map((field, fieldIndex) => (
                        <div key={fieldIndex} className="text-sm text-gray-600 flex items-center gap-2">
                          <span>{field.name}:</span>
                          <span className="text-blue-600">{field.type}</span>
                          {field.required && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-1.5 rounded">required</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Rutas API</h4>
              <div className="space-y-1">
                {config.routes.map((route, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <span className={`
                      px-2 py-0.5 rounded text-xs font-medium
                      ${route.method === 'GET' ? 'bg-green-100 text-green-700' : ''}
                      ${route.method === 'POST' ? 'bg-blue-100 text-blue-700' : ''}
                      ${route.method === 'PUT' ? 'bg-yellow-100 text-yellow-700' : ''}
                      ${route.method === 'DELETE' ? 'bg-red-100 text-red-700' : ''}
                    `}>
                      {route.method}
                    </span>
                    <span className="text-gray-600">{route.path}</span>
                    <span className="text-gray-400">→</span>
                    <span className="text-gray-700">{route.controller}.{route.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Backend;
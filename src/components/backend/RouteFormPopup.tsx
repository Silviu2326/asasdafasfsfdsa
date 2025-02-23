import React, { useState } from 'react';
import { Route } from '../../types/backend';

interface RouteFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (route: Route) => void;
  controllers: { name: string; actions: string[] }[];
}

const RouteFormPopup: React.FC<RouteFormPopupProps> = ({ isOpen, onClose, onSubmit, controllers }) => {
  const [route, setRoute] = useState<Route>({
    path: '',
    method: 'GET',
    controller: '',
    action: '',
    options: {
      middleware: [],
      auth: false,
      rateLimit: false,
      cache: false,
      validation: false,
      docs: {
        summary: '',
        description: '',
        tags: []
      }
    }
  });

  const [newTag, setNewTag] = useState('');
  const [newMiddleware, setNewMiddleware] = useState('');

  const availableMiddleware = [
    'auth', 'cors', 'rateLimit', 'cache', 'validation', 'logging'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Crear Nueva Ruta</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Método HTTP
              </label>
              <select
                value={route.method}
                onChange={(e) => setRoute({ ...route, method: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="PATCH">PATCH</option>
                <option value="DELETE">DELETE</option>
                <option value="OPTIONS">OPTIONS</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ruta
              </label>
              <input
                type="text"
                value={route.path}
                onChange={(e) => setRoute({ ...route, path: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="/api/resource"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Controlador
              </label>
              <select
                value={route.controller}
                onChange={(e) => setRoute({ ...route, controller: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar controlador</option>
                {controllers.map(ctrl => (
                  <option key={ctrl.name} value={ctrl.name}>{ctrl.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Acción
              </label>
              <select
                value={route.action}
                onChange={(e) => setRoute({ ...route, action: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar acción</option>
                {controllers.find(c => c.name === route.controller)?.actions.map(action => (
                  <option key={action} value={action}>{action}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Opciones de la Ruta</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={route.options?.auth}
                    onChange={(e) => setRoute({
                      ...route,
                      options: { ...route.options, auth: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-700">Requiere Autenticación</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={route.options?.rateLimit}
                    onChange={(e) => setRoute({
                      ...route,
                      options: { ...route.options, rateLimit: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-700">Rate Limiting</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={route.options?.cache}
                    onChange={(e) => setRoute({
                      ...route,
                      options: { ...route.options, cache: e.target.checked }
                    })}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-700">Habilitar Caché</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Middleware
                </label>
                <div className="flex gap-2 mb-2">
                  <select
                    value={newMiddleware}
                    onChange={(e) => setNewMiddleware(e.target.value)}
                    className="flex-1 px-2 py-1 text-sm border rounded"
                  >
                    <option value="">Seleccionar middleware</option>
                    {availableMiddleware.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      if (newMiddleware && !route.options?.middleware?.includes(newMiddleware)) {
                        setRoute({
                          ...route,
                          options: {
                            ...route.options,
                            middleware: [...(route.options?.middleware || []), newMiddleware]
                          }
                        });
                        setNewMiddleware('');
                      }
                    }}
                    className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                  >
                    +
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {route.options?.middleware?.map((m, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 rounded">
                      {m}
                      <button
                        onClick={() => {
                          const newMiddleware = route.options?.middleware?.filter((_, idx) => idx !== i);
                          setRoute({
                            ...route,
                            options: { ...route.options, middleware: newMiddleware }
                          });
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Documentación API</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resumen
                </label>
                <input
                  type="text"
                  value={route.options?.docs?.summary || ''}
                  onChange={(e) => setRoute({
                    ...route,
                    options: {
                      ...route.options,
                      docs: { ...(route.options?.docs || {}), summary: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 text-sm border rounded-md"
                  placeholder="Breve descripción de la ruta"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={route.options?.docs?.description || ''}
                  onChange={(e) => setRoute({
                    ...route,
                    options: {
                      ...route.options,
                      docs: { ...(route.options?.docs || {}), description: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 text-sm border rounded-md"
                  rows={3}
                  placeholder="Descripción detallada de la ruta"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm border rounded-md"
                    placeholder="Añadir tag"
                  />
                  <button
                    onClick={() => {
                      if (newTag && !route.options?.docs?.tags?.includes(newTag)) {
                        setRoute({
                          ...route,
                          options: {
                            ...route.options,
                            docs: {
                              ...(route.options?.docs || {}),
                              tags: [...(route.options?.docs?.tags || []), newTag]
                            }
                          }
                        });
                        setNewTag('');
                      }
                    }}
                    className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                  >
                    Añadir
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {route.options?.docs?.tags?.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 rounded">
                      {tag}
                      <button
                        onClick={() => {
                          const newTags = route.options?.docs?.tags?.filter((_, idx) => idx !== i);
                          setRoute({
                            ...route,
                            options: {
                              ...route.options,
                              docs: { ...(route.options?.docs || {}), tags: newTags }
                            }
                          });
                        }}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                if (route.path && route.controller && route.action) {
                  onSubmit(route);
                  setRoute({
                    path: '',
                    method: 'GET',
                    controller: '',
                    action: '',
                    options: {
                      middleware: [],
                      auth: false,
                      rateLimit: false,
                      cache: false,
                      validation: false,
                      docs: {
                        summary: '',
                        description: '',
                        tags: []
                      }
                    }
                  });
                  onClose();
                }
              }}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Crear Ruta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteFormPopup;
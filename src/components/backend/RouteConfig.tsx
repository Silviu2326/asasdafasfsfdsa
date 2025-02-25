import React, { useState } from 'react';
import { Route } from '../../types/backend';
import RouteFormPopup from './RouteFormPopup';

interface RouteConfigProps {
  routes: Route[];
  onChange: (routes: Route[]) => void;
  controllers: { name: string; actions: string[] }[];
}

const RouteConfig: React.FC<RouteConfigProps> = ({ routes, onChange, controllers }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const addRoute = (newRoute: Route) => {
    onChange([...routes, newRoute]);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Rutas
        </label>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
        >
          + Añadir Ruta
        </button>
      </div>

      <RouteFormPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={addRoute}
        controllers={controllers}
      />

      {/* Rest of your existing code for rendering routes */}
      <div className="space-y-2">
        {routes.map((route, index) => (
          <div key={index} className="flex items-center gap-2 border rounded-lg p-3">
            <select
              value={route.method}
              onChange={(e) => {
                const newRoutes = [...routes];
                newRoutes[index].method = e.target.value;
                onChange(newRoutes);
              }}
              className="px-2 py-1 text-sm border rounded bg-gray-50"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
            <input
              type="text"
              value={route.path}
              onChange={(e) => {
                const newRoutes = [...routes];
                newRoutes[index].path = e.target.value;
                onChange(newRoutes);
              }}
              className="flex-1 px-2 py-1 text-sm border rounded"
              placeholder="/ruta"
            />
            <input
              type="text"
              value={route.controller}
              onChange={(e) => {
                const newRoutes = [...routes];
                newRoutes[index].controller = e.target.value;
                onChange(newRoutes);
              }}
              className="px-2 py-1 text-sm border rounded"
              placeholder="Controlador"
            />
            <input
              type="text"
              value={route.action}
              onChange={(e) => {
                const newRoutes = [...routes];
                newRoutes[index].action = e.target.value;
                onChange(newRoutes);
              }}
              className="px-2 py-1 text-sm border rounded"
              placeholder="Acción"
            />
            <button
              onClick={() => {
                const newRoutes = routes.filter((_, i) => i !== index);
                onChange(newRoutes);
              }}
              className="text-red-500 hover:text-red-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteConfig;
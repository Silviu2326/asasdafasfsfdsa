import React, { useState } from 'react';
import { Controller } from '../../types/backend';

interface ControllerFormPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (controller: Controller) => void;
}

const ControllerFormPopup: React.FC<ControllerFormPopupProps> = ({ isOpen, onClose, onSubmit }) => {
  const [controllerName, setControllerName] = useState('');
  const defaultActions = ['index', 'show', 'create', 'update', 'delete'];
  const [selectedActions, setSelectedActions] = useState(defaultActions);
  const [controllerOptions, setControllerOptions] = useState({
    authentication: false,
    validation: false,
    caching: false,
    logging: false,
    apiDocs: true,
  });

  const actionTemplates = {
    index: { method: 'GET', path: '/', description: 'List all resources' },
    show: { method: 'GET', path: '/:id', description: 'Get a single resource' },
    create: { method: 'POST', path: '/', description: 'Create a new resource' },
    update: { method: 'PUT', path: '/:id', description: 'Update a resource' },
    delete: { method: 'DELETE', path: '/:id', description: 'Delete a resource' },
    search: { method: 'GET', path: '/search', description: 'Search resources' },
    export: { method: 'GET', path: '/export', description: 'Export resources' },
    import: { method: 'POST', path: '/import', description: 'Import resources' },
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Controller</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Controller Name
            </label>
            <input
              type="text"
              value={controllerName}
              onChange={(e) => setControllerName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: UserController"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Actions
            </label>
            <div className="space-y-2 border rounded-md p-3">
              {Object.entries(actionTemplates).map(([action, details]) => (
                <label key={action} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedActions.includes(action)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedActions([...selectedActions, action]);
                      } else {
                        setSelectedActions(selectedActions.filter(a => a !== action));
                      }
                    }}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700 flex-1">{action}</span>
                  <span className="text-xs text-gray-500">{details.method}</span>
                  <span className="text-xs text-gray-500">{details.path}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Controller Options
            </label>
            <div className="space-y-2 border rounded-md p-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={controllerOptions.authentication}
                  onChange={(e) => setControllerOptions({ ...controllerOptions, authentication: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700">Require Authentication</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={controllerOptions.validation}
                  onChange={(e) => setControllerOptions({ ...controllerOptions, validation: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700">Include Request Validation</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={controllerOptions.caching}
                  onChange={(e) => setControllerOptions({ ...controllerOptions, caching: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700">Enable Response Caching</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={controllerOptions.logging}
                  onChange={(e) => setControllerOptions({ ...controllerOptions, logging: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700">Enable Action Logging</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={controllerOptions.apiDocs}
                  onChange={(e) => setControllerOptions({ ...controllerOptions, apiDocs: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700">Generate API Documentation</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (controllerName.trim() && selectedActions.length > 0) {
                  onSubmit({
                    name: controllerName,
                    actions: selectedActions,
                    options: controllerOptions
                  });
                  setControllerName('');
                  setSelectedActions(defaultActions);
                  setControllerOptions({
                    authentication: false,
                    validation: false,
                    caching: false,
                    logging: false,
                    apiDocs: true,
                  });
                  onClose();
                }
              }}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Controller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControllerFormPopup;
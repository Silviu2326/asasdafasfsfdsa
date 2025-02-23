import React, { useState } from 'react';
import { Controller } from '../../types/backend';
import ControllerFormPopup from './ControllerFormPopup';

interface ControllerConfigProps {
  controllers: Controller[];
  onChange: (controllers: Controller[]) => void;
}

const ControllerConfig: React.FC<ControllerConfigProps> = ({ controllers, onChange }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const addController = (newController: Controller) => {
    onChange([...controllers, newController]);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Controllers
        </label>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
        >
          + Add Controller
        </button>
      </div>

      <ControllerFormPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={addController}
      />

      <div className="space-y-3">
        {controllers.map((controller, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={controller.name}
                  onChange={(e) => {
                    const newControllers = [...controllers];
                    newControllers[index].name = e.target.value;
                    onChange(newControllers);
                  }}
                  className="text-sm font-medium px-2 py-1 border-b border-transparent focus:border-blue-500 focus:outline-none"
                />
                <span className="text-xs text-gray-500">({controller.actions.length} actions)</span>
              </div>
              <div className="flex items-center gap-2">
                {controller.options?.authentication && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Auth</span>
                )}
                {controller.options?.validation && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Valid</span>
                )}
                {controller.options?.caching && (
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Cache</span>
                )}
                <button
                  onClick={() => {
                    const newControllers = controllers.filter((_, i) => i !== index);
                    onChange(newControllers);
                  }}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {controller.actions.map((action, actionIndex) => (
                <div key={actionIndex} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={action}
                    onChange={(e) => {
                      const newControllers = [...controllers];
                      newControllers[index].actions[actionIndex] = e.target.value;
                      onChange(newControllers);
                    }}
                    className="flex-1 px-2 py-1 text-sm border rounded"
                    placeholder="Action name"
                  />
                  <select
                    className="px-2 py-1 text-sm border rounded bg-gray-50"
                    onChange={(e) => {
                      const newControllers = [...controllers];
                      newControllers[index].actions[actionIndex] = e.target.value;
                      onChange(newControllers);
                    }}
                  >
                    <option value="">Custom Action</option>
                    <option value="index">index</option>
                    <option value="show">show</option>
                    <option value="create">create</option>
                    <option value="update">update</option>
                    <option value="delete">delete</option>
                    <option value="search">search</option>
                    <option value="export">export</option>
                    <option value="import">import</option>
                  </select>
                  <button
                    onClick={() => {
                      const newControllers = [...controllers];
                      newControllers[index].actions = controller.actions.filter((_, i) => i !== actionIndex);
                      onChange(newControllers);
                    }}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const newControllers = [...controllers];
                    newControllers[index].actions.push('newAction');
                    onChange(newControllers);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  + Add Action
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControllerConfig;
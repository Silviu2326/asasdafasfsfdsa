import React, { useState } from 'react';
import { Model } from '../../types/backend';
import ModelFormPopup from './ModelFormPopup';

interface ModelConfigProps {
  models: Model[];
  onChange: (models: Model[]) => void;
}

const ModelConfig: React.FC<ModelConfigProps> = ({ models, onChange }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const addModel = (newModel: Model) => {
    onChange([...models, newModel]);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Modelos
        </label>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="text-sm px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
        >
          + Añadir Modelo
        </button>
      </div>
      
      <ModelFormPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={addModel}
      />

      {/* Rest of the existing code remains the same */}
      <div className="space-y-3">
        {models.map((model, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={model.name}
                  onChange={(e) => {
                    const newModels = [...models];
                    newModels[index].name = e.target.value;
                    onChange(newModels);
                  }}
                  className="text-sm font-medium px-2 py-1 border-b border-transparent focus:border-blue-500 focus:outline-none"
                />
                <span className="text-xs text-gray-500">({model.fields.length} campos)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const newModels = [...models];
                    newModels[index].fields.push({
                      name: 'timestamp',
                      type: 'date',
                      required: true
                    });
                    onChange(newModels);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700"
                  title="Añadir timestamp"
                >
                  + Timestamp
                </button>
                <button
                  onClick={() => {
                    const newModels = models.filter((_, i) => i !== index);
                    onChange(newModels);
                  }}
                  className="text-red-500 hover:text-red-600 text-sm"
                >
                  Eliminar
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {model.fields.map((field, fieldIndex) => (
                <div key={fieldIndex} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={field.name}
                    onChange={(e) => {
                      const newModels = [...models];
                      newModels[index].fields[fieldIndex].name = e.target.value;
                      onChange(newModels);
                    }}
                    className="flex-1 px-2 py-1 text-sm border rounded"
                    placeholder="Nombre del campo"
                  />
                  <select
                    value={field.type}
                    onChange={(e) => {
                      const newModels = [...models];
                      newModels[index].fields[fieldIndex].type = e.target.value;
                      onChange(newModels);
                    }}
                    className="px-2 py-1 text-sm border rounded"
                  >
                    <optgroup label="Básicos">
                      <option value="string">String</option>
                      <option value="text">Text</option>
                      <option value="integer">Integer</option>
                      <option value="decimal">Decimal</option>
                      <option value="boolean">Boolean</option>
                      <option value="date">Date</option>
                    </optgroup>
                    <optgroup label="Avanzados">
                      <option value="uuid">UUID</option>
                      <option value="json">JSON</option>
                      <option value="array">Array</option>
                      <option value="object">Object</option>
                      <option value="enum">Enum</option>
                    </optgroup>
                    <optgroup label="Relaciones">
                      <option value="reference">Reference</option>
                      <option value="hasMany">Has Many</option>
                      <option value="belongsTo">Belongs To</option>
                    </optgroup>
                  </select>
                  <div className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={field.required}
                      onChange={(e) => {
                        const newModels = [...models];
                        newModels[index].fields[fieldIndex].required = e.target.checked;
                        onChange(newModels);
                      }}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-500">Req.</span>
                  </div>
                  <button
                    onClick={() => {
                      const newModels = [...models];
                      newModels[index].fields = model.fields.filter((_, i) => i !== fieldIndex);
                      onChange(newModels);
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const newModels = [...models];
                    newModels[index].fields.push({
                      name: '',
                      type: 'string',
                      required: false,
                    });
                    onChange(newModels);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  + Añadir Campo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelConfig;
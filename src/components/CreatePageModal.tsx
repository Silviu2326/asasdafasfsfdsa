import React, { useState } from 'react';
import { X, Layout, Cpu, FileCode, Shield, Globe, Database, Users } from 'lucide-react';

interface CreatePageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePage: (pageConfig: PageConfig) => void;
}

export interface PageConfig {
  name: string;
  description: string;
  layout: string;
  features: {
    authentication: boolean;
    api: boolean;
    database: boolean;
    seo: boolean;
  };
  routing: {
    path: string;
    isPrivate: boolean;
  };
  components?: string[];
  meta?: {
    title: string;
    description: string;
    keywords: string[];
  };
}

const CreatePageModal: React.FC<CreatePageModalProps> = ({ isOpen, onClose, onCreatePage }) => {
  const [step, setStep] = useState(1);
  const [pageConfig, setPageConfig] = useState<PageConfig>({
    name: '',
    description: '',
    layout: 'default',
    features: {
      authentication: false,
      api: false,
      database: false,
      seo: false,
    },
    routing: {
      path: '',
      isPrivate: false,
    },
    components: [],
    meta: {
      title: '',
      description: '',
      keywords: []
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      onCreatePage(pageConfig);
      onClose();
      setStep(1);
      setPageConfig({
        name: '',
        description: '',
        layout: 'default',
        features: {
          authentication: false,
          api: false,
          database: false,
          seo: false,
        },
        routing: {
          path: '',
          isPrivate: false,
        },
        components: [],
        meta: {
          title: '',
          description: '',
          keywords: []
        }
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Página
              </label>
              <input
                type="text"
                value={pageConfig.name}
                onChange={(e) => {
                  const name = e.target.value;
                  setPageConfig(prev => ({
                    ...prev,
                    name,
                    routing: {
                      ...prev.routing,
                      path: `/${name.toLowerCase().replace(/\s+/g, '-')}`
                    },
                    meta: {
                      ...prev.meta,
                      title: name
                    }
                  }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Dashboard, Users, Products..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={pageConfig.description}
                onChange={(e) => {
                  const description = e.target.value;
                  setPageConfig(prev => ({
                    ...prev,
                    description,
                    meta: {
                      ...prev.meta,
                      description
                    }
                  }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Describe el propósito de esta página..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Layout
              </label>
              <select
                value={pageConfig.layout}
                onChange={(e) => setPageConfig(prev => ({ ...prev, layout: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="default">Default Layout</option>
                <option value="dashboard">Dashboard Layout</option>
                <option value="auth">Authentication Layout</option>
                <option value="landing">Landing Page Layout</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Características de la Página</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <label className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        checked={pageConfig.features.authentication}
                        onChange={(e) => setPageConfig(prev => ({
                          ...prev,
                          features: { ...prev.features, authentication: e.target.checked }
                        }))}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium">Autenticación</span>
                    </label>
                    <p className="text-xs text-gray-500">Requiere inicio de sesión</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4 flex items-start gap-3">
                  <Globe className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <label className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        checked={pageConfig.features.api}
                        onChange={(e) => setPageConfig(prev => ({
                          ...prev,
                          features: { ...prev.features, api: e.target.checked }
                        }))}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium">API Integration</span>
                    </label>
                    <p className="text-xs text-gray-500">Conecta con servicios externos</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4 flex items-start gap-3">
                  <Database className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <label className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        checked={pageConfig.features.database}
                        onChange={(e) => setPageConfig(prev => ({
                          ...prev,
                          features: { ...prev.features, database: e.target.checked }
                        }))}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium">Base de Datos</span>
                    </label>
                    <p className="text-xs text-gray-500">Almacena datos localmente</p>
                  </div>
                </div>

                <div className="border rounded-lg p-4 flex items-start gap-3">
                  <FileCode className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <label className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        checked={pageConfig.features.seo}
                        onChange={(e) => setPageConfig(prev => ({
                          ...prev,
                          features: { ...prev.features, seo: e.target.checked }
                        }))}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium">SEO</span>
                    </label>
                    <p className="text-xs text-gray-500">Optimización para buscadores</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-4">Configuración de Ruta</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Ruta URL
                  </label>
                  <input
                    type="text"
                    value={pageConfig.routing.path}
                    onChange={(e) => setPageConfig(prev => ({
                      ...prev,
                      routing: { ...prev.routing, path: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="/ruta-de-pagina"
                  />
                </div>

                <div className="flex items-start">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={pageConfig.routing.isPrivate}
                      onChange={(e) => setPageConfig(prev => ({
                        ...prev,
                        routing: { ...prev.routing, isPrivate: e.target.checked }
                      }))}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-600">Ruta Privada</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Create Page</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Step {step} of 2</span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {renderStep()}
          
          <div className="flex justify-between mt-6 pt-4 border-t">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Back
              </button>
            )}
            <div className="flex gap-3 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {step === 2 ? 'Create Page' : 'Next'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePageModal;
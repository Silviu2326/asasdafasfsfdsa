import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import { Settings } from 'lucide-react';

interface ProjectConfigData {
  projectName: string;
  description: string;
  framework: string;
  language: string;
  backend: string;
}

const ProjectConfig = () => {
  const [configData, setConfigData] = useState<ProjectConfigData>({
    projectName: '',
    description: '',
    framework: 'vite + React',
    language: 'TypeScript',
    backend: 'Node.js + Express'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setConfigData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = async () => {
    try {
      localStorage.setItem('projectConfig', JSON.stringify(configData));
      
      const response = await fetch('http://localhost:8000/generate-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(configData)
      });

      if (!response.ok) {
        throw new Error('Failed to generate project');
      }

      const result = await response.json();
      console.log('Project generated:', result);
      
      // Navigate after successful API call
      window.location.href = '/styling';
      
    } catch (error) {
      console.error('Error generating project:', error);
      alert('Error generating project. Please try again.');
    }
  };

  return (
    <PageContainer
      title="Configuración del Proyecto"
      nextPage="/styling"
      step={1}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Settings className="w-8 h-8 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Configuración Inicial</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Nombre del Proyecto
            </label>
            <input
              type="text"
              name="projectName"
              value={configData.projectName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mi Proyecto Web"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Descripción del Proyecto
            </label>
            <textarea
              name="description"
              value={configData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
              placeholder="Describe tu proyecto..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Framework
            </label>
            <select
              name="framework"
              value={configData.framework}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>vite + React</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Lenguaje
            </label>
            <select
              name="language"
              value={configData.language}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>TypeScript</option>
              <option>JavaScript</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Backend
            </label>
            <select
              name="backend"
              value={configData.backend}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Node.js + Express</option>
              <option>Python + FastAPI</option>
            </select>
          </div>
          <div className="mt-8 flex justify-end">
          <button
            onClick={handleNextStep}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Generar Proyecto y Continuar
          </button>
        </div>

        </div>
      </div>
    </PageContainer>
  );
};

export default ProjectConfig;
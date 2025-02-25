import React, { useState, useEffect } from 'react';
import PageContainer from '../components/PageContainer';
import VistaPreview from '../components/VistaPreview';
import FormEstilos from '../components/FormEstilos';
import { Palette } from 'lucide-react';

interface StyleConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  animation: {
    duration: string;
    easing: string;
  };
  shadow: {
    none: string;
    sm: string;
    md: string;
    lg: string;
  };
}

const Styling = () => {
  const [styles, setStyles] = useState<StyleConfig>({
    colors: {
      primary: '#3b82f6',
      secondary: '#64748b',
      accent: '#8b5cf6',
      background: '#ffffff',
      text: '#1f2937',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    borderRadius: {
      none: '0px',
      sm: '4px',
      md: '8px',
      lg: '16px',
      full: '9999px',
    },
    animation: {
      duration: '300ms',
      easing: 'ease-in-out',
    },
    shadow: {
      none: 'none',
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    },
  });
  const [font, setFont] = useState('Inter');
  const [projects, setProjects] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('');

  // Add this useEffect to fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8000/list-projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data.projects);
        if (data.projects.length > 0) {
          setSelectedProject(data.projects[0]);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  // Keep only one useEffect for fetching projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8000/list-projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data.projects);
        if (data.projects.length > 0) {
          setSelectedProject(data.projects[0]);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []); // Empty dependency array as we only want to fetch once

  // Keep the CSS variables useEffect separate
  useEffect(() => {
    // Update CSS variables
    Object.entries(styles.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });

    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8000/list-projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data.projects);
        if (data.projects.length > 0) {
          setSelectedProject(data.projects[0]);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [styles, font]);

  // Modify handleSubmit to include the project name
  const handleSubmit = async () => {
    try {
      if (!selectedProject) {
        alert('Please select a project first');
        return;
      }

      const styleConfig = {
        ...styles,
        font: font,
        projectName: selectedProject
      };

      const response = await fetch('http://localhost:8000/generate-styles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(styleConfig)
      });

      if (!response.ok) {
        throw new Error('Failed to generate styles');
      }

      const result = await response.json();
      console.log('Styles generated:', result);
      
      // Navigate to next step
      window.location.href = '/structure';
      
    } catch (error) {
      console.error('Error generating styles:', error);
      alert('Error generating styles. Please try again.');
    }
  };

  const handleStyleChange = (category: keyof StyleConfig, key: string, value: string) => {
    setStyles(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8000/list-projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data.projects);
        if (data.projects.length > 0) {
          setSelectedProject(data.projects[0]);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [styles, font]);

  return (
    <PageContainer
      title="Estilos y Diseño"
      prevPage="/project-config"
      nextPage="/structure"
      step={2}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Palette className="w-8 h-8 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Configuración de Estilos</h2>
        </div>

        {/* Add project selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Project
          </label>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project} value={project}>
                {project}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <FormEstilos
            styles={styles}
            onStyleChange={handleStyleChange}
            font={font}
            onFontChange={setFont}
          />
          <VistaPreview styles={styles} font={font} />
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Generar Estilos y Continuar
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

export default Styling;
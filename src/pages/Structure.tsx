import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import { LayoutGrid } from 'lucide-react';
import FormLogin, { LoginConfig } from '../components/FormLogin';
import FormSidebar, { SidebarConfig } from '../components/FormSidebar';
import EstructuraProyecto, { ProjectStructureConfig } from '../components/EstructuraProyecto';

const Structure = () => {
  const [loginConfig, setLoginConfig] = useState<LoginConfig>({
    enabled: false,
    title: "Iniciar Sesión",
    subtitle: "Bienvenido de nuevo",
    fields: [
      {
        id: "1",
        type: "email",
        label: "Correo electrónico",
        placeholder: "ejemplo@correo.com",
        icon: "Mail",
        required: true,
        validation: {
          pattern: "^[^@]+@[^@]+\\.[a-zA-Z]{ 2,}$",
          customMessage: "Por favor ingresa un correo electrónico válido"
        }
      },
      {
        id: "2",
        type: "password",
        label: "Contraseña",
        placeholder: "••••••••",
        icon: "Lock",
        required: true,
        validation: {
          minLength: 8,
          customMessage: "La contraseña debe tener al menos 8 caracteres"
        }
      }
    ],
    features: {
      registration: true,
      passwordReset: true,
      rememberMe: true,
      socialLogin: true,
      emailVerification: false,
      twoFactorAuth: false
    },
    validation: {
      passwordMinLength: 8,
      requireSpecialChar: true,
      requireNumber: true,
      requireUppercase: true,
      requireLowercase: true
    },
    theme: {
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      primaryColor: '#3b82f6',
      errorColor: '#ef4444',
      successColor: '#10b981',
      borderRadius: 8,
      glassmorphism: false
    },
    socialProviders: [
      { id: '1', name: 'Google', icon: 'Google', color: '#ea4335', enabled: true },
      { id: '2', name: 'Facebook', icon: 'Facebook', color: '#1877f2', enabled: true },
      { id: '3', name: 'Twitter', icon: 'Twitter', color: '#1da1f2', enabled: true },
      { id: '4', name: 'Github', icon: 'Github', color: '#333333', enabled: true }
    ],
    messages: {
      loginButton: "Iniciar Sesión",
      registerButton: "Registrarse",
      forgotPassword: "¿Olvidaste tu contraseña?",
      rememberMe: "Recordarme",
      orContinueWith: "O continuar con",
      noAccount: "¿No tienes una cuenta?",
      hasAccount: "¿Ya tienes una cuenta?"
    }
  });

  const [sidebarConfig, setSidebarConfig] = useState<SidebarConfig>({
    enabled: false,
    position: 'left',
    style: 'fixed',
    features: {
      collapsible: true,
      userProfile: true,
      search: true,
      notifications: false,
    },
    theme: {
      dark: false,
      glassmorphism: false,
      innerShadow: false,
      borderRadius: 8,
      backgroundOpacity: 100,
      colors: {
        background: '#ffffff',
        text: '#1f2937',
        primary: '#3b82f6',
        secondary: '#64748b',
        border: '#e5e7eb',
        hover: '#f3f4f6',
        active: '#3b82f6'
      }
    },
    tabs: [
      { id: '1', icon: 'Home', label: 'Inicio', color: '#3b82f6', isActive: true },
      { id: '2', icon: 'Users', label: 'Usuarios', color: '#10b981' },
      { id: '3', icon: 'ShoppingCart', label: 'Productos', color: '#f59e0b' },
      { id: '4', icon: 'Settings', label: 'Configuración', color: '#6366f1' }
    ]
  });

  const [projectConfig, setProjectConfig] = useState<ProjectStructureConfig>({
    features: {
      components: true,
      pages: true,
      layouts: true,
      hooks: true,
      utils: true,
      services: true,
      assets: true,
      types: true,
      constants: true,
      contexts: true,
      styles: true,
      tests: true,
    },
    organization: {
      atomic: false,
      featureBased: true,
      routeBased: false,
    },
    conventions: {
      typescript: true,
      storybook: false,
      eslint: true,
      prettier: true,
      husky: false,
    },
  });

  const [selectedLayout, setSelectedLayout] = useState<string>('Corporate Classic (Header + Mega Menu + Content + Footer)');

  const handleSubmit = async () => {
    try {
      // Get project name from localStorage or similar storage
      const projectName = localStorage.getItem('projectName') || '';
      
      if (!projectName) {
        alert('Project name not found. Please go back to project configuration.');
        return;
      }

      const structureConfig = {
        projectName,
        loginConfig,
        sidebarConfig,
        projectConfig,
        layoutType: selectedLayout
      };

      const response = await fetch('http://localhost:8000/generate-structure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(structureConfig)
      });

      if (!response.ok) {
        throw new Error('Failed to generate structure');
      }

      const result = await response.json();
      console.log('Structure generated:', result);
      
      // Navigate to next step
      window.location.href = '/backend';
      
    } catch (error) {
      console.error('Error generating structure:', error);
      alert('Error generating structure. Please try again.');
    }
  };

  return (
    <PageContainer
      title="Estructura de la Aplicación"
      prevPage="/styling"
      nextPage="/backend"
      step={3}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <LayoutGrid className="w-8 h-8 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">Estructura del Proyecto</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Layout
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              {/* Layouts Corporativos */}
              <option>Corporate Classic (Header + Mega Menu + Content + Footer)</option>
              <option>Enterprise Portal (Top Bar + Header + Sidebar + Content)</option>
              <option>Business Dashboard (Compact Header + Sidebar + Multi-Panel)</option>
              <option>Analytics Hub (Top Nav + Side Nav + Data Grid)</option>
              <option>Admin Console (Header + Collapsible Sidebar + Tabbed Content)</option>

              {/* Layouts E-commerce */}
              <option>E-commerce Standard (Header + Categories + Products Grid)</option>
              <option>Marketplace (Search Bar + Filters + Product Cards)</option>
              <option>Shopping Portal (Categories Bar + Products + Cart Sidebar)</option>
              <option>Digital Store (Hero Banner + Featured + Products List)</option>
              <option>Auction Site (Timer Bar + Grid + Bidding Sidebar)</option>

              {/* Layouts Social Media */}
              <option>Social Feed (Stories Bar + Posts Feed + Suggestions)</option>
              <option>Community Platform (Header + Timeline + Activity Sidebar)</option>
              <option>Social Network (Top Bar + News Feed + Chat Panel)</option>
              <option>Media Sharing (Gallery Grid + Navigation + Upload)</option>
              <option>Forum Layout (Categories + Threads + User Panel)</option>

              {/* Layouts Contenido */}
              <option>Blog Magazine (Featured + Articles Grid + Sidebar)</option>
              <option>Content Portal (Navigation + Articles + Related)</option>
              <option>News Site (Breaking Bar + News Grid + Trending)</option>
              <option>Documentation (Search + Content + Navigation Tree)</option>
              <option>Knowledge Base (Categories + Articles + Quick Links)</option>

              {/* Layouts Aplicaciones */}
              <option>App Dashboard (Mini Sidebar + Workspace + Widgets)</option>
              <option>Project Management (Kanban Board + Task Panel)</option>
              <option>Mail Client (Folders + Mail List + Reading Pane)</option>
              <option>Chat Application (Contacts + Chat + Profile)</option>
              <option>Calendar App (Mini Calendar + Schedule Grid)</option>

              {/* Layouts Modernos */}
              <option>Modern SaaS (Floating Nav + Sections + CTA)</option>
              <option>Creative Portfolio (Full Screen + Project Grid)</option>
              <option>Landing Page Plus (Hero + Features + Testimonials)</option>
              <option>Startup Pitch (One Page + Animated Sections)</option>
              <option>Interactive Story (Full Screen + Side Navigation)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <EstructuraProyecto
            config={projectConfig}
            onConfigChange={setProjectConfig}
          />
          
          <FormLogin
            config={loginConfig}
            onConfigChange={setLoginConfig}
          />
          
          <FormSidebar
            config={sidebarConfig}
            onConfigChange={setSidebarConfig}
          />
        </div>
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Generar Estructura y Continuar
          </button>
        </div>

      </div>
    </PageContainer>
  );
};

export default Structure;
import React, { useState } from 'react';
import { UserPlus, Mail, Lock, Key, User, Phone, Github, ToggleLeft as Google, Facebook, Twitter, Plus, Trash2, Edit3, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react';

interface FormLoginProps {
  onConfigChange: (config: LoginConfig) => void;
  config: LoginConfig;
}

export interface LoginField {
  id: string;
  type: 'text' | 'email' | 'password' | 'tel' | 'number';
  label: string;
  placeholder: string;
  icon: string;
  required: boolean;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    customMessage?: string;
  };
}

export interface SocialProvider {
  id: string;
  name: string;
  icon: string;
  color: string;
  enabled: boolean;
}

export interface LoginConfig {
  enabled: boolean;
  title: string;
  subtitle?: string;
  logo?: string;
  fields: LoginField[];
  features: {
    registration: boolean;
    passwordReset: boolean;
    rememberMe: boolean;
    socialLogin: boolean;
    emailVerification: boolean;
    twoFactorAuth: boolean;
  };
  validation: {
    passwordMinLength: number;
    requireSpecialChar: boolean;
    requireNumber: boolean;
    requireUppercase: boolean;
    requireLowercase: boolean;
  };
  theme: {
    backgroundColor: string;
    textColor: string;
    primaryColor: string;
    errorColor: string;
    successColor: string;
    borderRadius: number;
    glassmorphism: boolean;
  };
  socialProviders: SocialProvider[];
  messages: {
    loginButton: string;
    registerButton: string;
    forgotPassword: string;
    rememberMe: string;
    orContinueWith: string;
    noAccount: string;
    hasAccount: string;
  };
}

const iconOptions = {
  User,
  Mail,
  Lock,
  Key,
  Phone,
  Github,
  Google,
  Facebook,
  Twitter
};

const FormLogin: React.FC<FormLoginProps> = ({ onConfigChange, config }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [newField, setNewField] = useState<Partial<LoginField>>({
    type: 'text',
    icon: 'User'
  });
  const [showIconPicker, setShowIconPicker] = useState(false);

  const addField = () => {
    if (newField.label && newField.type && newField.icon) {
      const field: LoginField = {
        id: Date.now().toString(),
        type: newField.type || 'text',
        label: newField.label || '',
        placeholder: newField.placeholder || '',
        icon: newField.icon || 'User',
        required: newField.required || false,
        validation: newField.validation
      };
      onConfigChange({
        ...config,
        fields: [...config.fields, field]
      });
      setNewField({
        type: 'text',
        icon: 'User'
      });
    }
  };

  const removeField = (id: string) => {
    onConfigChange({
      ...config,
      fields: config.fields.filter(field => field.id !== id)
    });
  };

  const moveField = (index: number, direction: 'up' | 'down') => {
    const newFields = [...config.fields];
    if (direction === 'up' && index > 0) {
      [newFields[index], newFields[index - 1]] = [newFields[index - 1], newFields[index]];
    } else if (direction === 'down' && index < newFields.length - 1) {
      [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
    }
    onConfigChange({ ...config, fields: newFields });
  };

  const updateField = (index: number, updates: Partial<LoginField>) => {
    const newFields = [...config.fields];
    newFields[index] = { ...newFields[index], ...updates };
    onConfigChange({ ...config, fields: newFields });
  };

  const toggleSocialProvider = (id: string) => {
    const newProviders = config.socialProviders.map(provider => 
      provider.id === id ? { ...provider, enabled: !provider.enabled } : provider
    );
    onConfigChange({ ...config, socialProviders: newProviders });
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Panel de Configuración */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <UserPlus className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Autenticación</h3>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Habilitar Autenticación</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.enabled}
                onChange={() => onConfigChange({ ...config, enabled: !config.enabled })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {config.enabled && (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Textos del Formulario
                  </label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={config.title}
                      onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
                      placeholder="Título del formulario"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      value={config.subtitle || ''}
                      onChange={(e) => onConfigChange({ ...config, subtitle: e.target.value })}
                      placeholder="Subtítulo (opcional)"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                    <input
                      type="text"
                      value={config.logo || ''}
                      onChange={(e) => onConfigChange({ ...config, logo: e.target.value })}
                      placeholder="URL del logo (opcional)"
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Campos del Formulario
                  </label>
                  <div className="space-y-3">
                    {/* Añadir nuevo campo */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newField.label || ''}
                        onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                        placeholder="Etiqueta del campo"
                        className="flex-1 px-3 py-2 border rounded-lg text-sm"
                      />
                      <select
                        value={newField.type}
                        onChange={(e) => setNewField({ ...newField, type: e.target.value as any })}
                        className="px-3 py-2 border rounded-lg text-sm"
                      >
                        <option value="text">Texto</option>
                        <option value="email">Email</option>
                        <option value="password">Contraseña</option>
                        <option value="tel">Teléfono</option>
                        <option value="number">Número</option>
                      </select>
                      <div className="relative">
                        <button
                          onClick={() => setShowIconPicker(!showIconPicker)}
                          className="px-3 py-2 border rounded-lg text-sm bg-gray-50 hover:bg-gray-100"
                        >
                          <div className="flex items-center gap-2">
                            {React.createElement(iconOptions[newField.icon as keyof typeof iconOptions], { size: 16 })}
                            <ChevronDown size={16} />
                          </div>
                        </button>
                        {showIconPicker && (
                          <div className="absolute z-10 mt-1 w-48 p-2 bg-white border rounded-lg shadow-lg grid grid-cols-4 gap-1">
                            {Object.entries(iconOptions).map(([name, Icon]) => (
                              <button
                                key={name}
                                onClick={() => {
                                  setNewField({ ...newField, icon: name });
                                  setShowIconPicker(false);
                                }}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                                title={name}
                              >
                                <Icon size={16} />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={addField}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Lista de campos */}
                    <div className="space-y-2">
                      {config.fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="flex items-center gap-2 p-2 border rounded-lg bg-gray-50"
                        >
                          <div className="flex-1 flex items-center gap-2">
                            {React.createElement(iconOptions[field.icon as keyof typeof iconOptions], { size: 16 })}
                            <span>{field.label}</span>
                            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                              {field.type}
                            </span>
                          </div>
                          <input
                            type="checkbox"
                            checked={field.required}
                            onChange={(e) => updateField(index, { required: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300"
                          />
                          <button
                            onClick={() => moveField(index, 'up')}
                            disabled={index === 0}
                            className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
                          >
                            <ChevronUp size={16} />
                          </button>
                          <button
                            onClick={() => moveField(index, 'down')}
                            disabled={index === config.fields.length - 1}
                            className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
                          >
                            <ChevronDown size={16} />
                          </button>
                          <button
                            onClick={() => removeField(field.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proveedores Sociales
                  </label>
                  <div className="space-y-2">
                    {config.socialProviders.map((provider) => (
                      <div
                        key={provider.id}
                        className={`
                          flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all
                          ${provider.enabled ? 'bg-blue-50 border-blue-200' : 'border-gray-200 hover:bg-gray-50'}
                        `}
                        onClick={() => toggleSocialProvider(provider.id)}
                      >
                        <div className="flex items-center gap-2">
                          {React.createElement(iconOptions[provider.icon as keyof typeof iconOptions], {
                            size: 20,
                            style: { color: provider.color }
                          })}
                          <span className="text-sm text-gray-700">{provider.name}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={provider.enabled}
                          onChange={() => {}}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Características
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(config.features).map(([key, value]) => (
                      <div
                        key={key}
                        className={`
                          flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all
                          ${value ? 'bg-blue-50 border-blue-200' : 'border-gray-200 hover:bg-gray-50'}
                        `}
                        onClick={() => onConfigChange({
                          ...config,
                          features: {
                            ...config.features,
                            [key]: !value,
                          },
                        })}
                      >
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => {}}
                          className="w-4 h-4 text-blue-600 rounded border-gray-300"
                        />
                        <label className="text-sm text-gray-700 capitalize cursor-pointer">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Validación de Contraseña
                  </label>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Longitud mínima: {config.validation.passwordMinLength} caracteres
                      </label>
                      <input
                        type="range"
                        min="6"
                        max="32"
                        value={config.validation.passwordMinLength}
                        onChange={(e) => onConfigChange({
                          ...config,
                          validation: {
                            ...config.validation,
                            passwordMinLength: parseInt(e.target.value),
                          },
                        })}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>6</span>
                        <span>32</span>
                      </div>
                    </div>
                    {Object.entries(config.validation)
                      .filter(([key]) => key !== 'passwordMinLength')
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className={`
                            flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all
                            ${value ? 'bg-blue-50 border-blue-200' : 'border-gray-200 hover:bg-gray-50'}
                          `}
                          onClick={() => onConfigChange({
                            ...config,
                            validation: {
                              ...config.validation,
                              [key]: !value,
                            },
                          })}
                        >
                          <span className="text-sm text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={() => {}}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300"
                          />
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tema
                  </label>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Color de Fondo</label>
                        <input
                          type="color"
                          value={config.theme.backgroundColor}
                          onChange={(e) => onConfigChange({
                            ...config,
                            theme: { ...config.theme, backgroundColor: e.target.value },
                          })}
                          className="w-full h-8 rounded cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Color de Texto</label>
                        <input
                          type="color"
                          value={config.theme.textColor}
                          onChange={(e) => onConfigChange({
                            ...config,
                            theme: { ...config.theme, textColor: e.target.value },
                          })}
                          className="w-full h-8 rounded cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Color Primario</label>
                        <input
                          type="color"
                          value={config.theme.primaryColor}
                          onChange={(e) => onConfigChange({
                            ...config,
                            theme: { ...config.theme, primaryColor: e.target.value },
                          })}
                          className="w-full h-8 rounded cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Color de Error</label>
                        <input
                          type="color"
                          value={config.theme.errorColor}
                          onChange={(e) => onConfigChange({
                            ...config,
                            theme: { ...config.theme, errorColor: e.target.value },
                          })}
                          className="w-full h-8 rounded cursor-pointer"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Radio de Bordes</label>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        value={config.theme.borderRadius}
                        onChange={(e) => onConfigChange({
                          ...config,
                          theme: { ...config.theme, borderRadius: parseInt(e.target.value) },
                        })}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0px</span>
                        <span>{config.theme.borderRadius}px</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Efecto Cristal</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.theme.glassmorphism}
                          onChange={() => onConfigChange({
                            ...config,
                            theme: { ...config.theme, glassmorphism: !config.theme.glassmorphism },
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensajes
                  </label>
                  <div className="space-y-3">
                    {Object.entries(config.messages).map(([key, value]) => (
                      <div key={key}>
                        <label className="block text-xs text-gray-600 mb-1 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => onConfigChange({
                            ...config,
                            messages: {
                              ...config.messages,
                              [key]: e.target.value,
                            },
                          })}
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Vista Previa */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Vista Previa</h3>
        <div className="relative h-[500px] border rounded-lg overflow-hidden bg-gray-50 p-6">
          {config.enabled ? (
            <div className="max-w-md mx-auto">
              {/* Formulario de Login */}
              <div
                className="rounded-xl shadow-lg p-6"
                style={{
                  backgroundColor: config.theme.glassmorphism
                    ? `${config.theme.backgroundColor}CC`
                    : config.theme.backgroundColor,
                  color: config.theme.textColor,
                  borderRadius: `${config.theme.borderRadius}px`,
                  backdropFilter: config.theme.glassmorphism ? 'blur(10px)' : 'none',
                }}
              >
                {config.logo && (
                  <div className="flex justify-center mb-6">
                    <img src={config.logo} alt="Logo" className="h-12" />
                  </div>
                )}
                <h2 className="text-2xl font-bold mb-2 text-center" style={{ color: config.theme.textColor }}>
                  {config.title}
                </h2>
                {config.subtitle && (
                  <p className="text-center mb-6 opacity-80" style={{ color: config.theme.textColor }}>
                    {config.subtitle}
                  </p>
                )}
                <form className="space-y-4">
                  {config.fields.map((field, index) => (
                    <div key={field.id}>
                      <label className="block text-sm font-medium mb-1" style={{ color: config.theme.textColor }}>
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {React.createElement(iconOptions[field.icon as keyof typeof iconOptions], {
                            className: "h-5 w-5 opacity-60",
                            style: { color: config.theme.textColor }
                          })}
                        </div>
                        <div className="relative">
                          <input
                            type={field.type === 'password' && showPassword ? 'text' : field.type}
                            className="block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors"
                            placeholder={field.placeholder}
                            style={{
                              backgroundColor: `${config.theme.backgroundColor}CC`,
                              color: config.theme.textColor,
                              borderColor: `${config.theme.textColor}20`,
                              borderRadius: `${config.theme.borderRadius}px`,
                            }}
                          />
                          {field.type === 'password' && (
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5 opacity-60" style={{ color: config.theme.textColor }} />
                              ) : (
                                <Eye className="h-5 w-5 opacity-60" style={{ color: config.theme.textColor }} />
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {config.features.rememberMe && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300"
                          style={{ 
                            borderColor: `${config.theme.textColor}20`,
                            accentColor: config.theme.primaryColor
                          }}
                        />
                        <label className="ml-2 block text-sm" style={{ color: config.theme.textColor }}>
                          {config.messages.rememberMe}
                        </label>
                      </div>
                      {config.features.passwordReset && (
                        <div className="text-sm">
                          <a
                            href="#"
                            style={{ color: config.theme.primaryColor }}
                            className="hover:opacity-80"
                          >
                            {config.messages.forgotPassword}
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:opacity-90 transition-opacity"
                    style={{
                      backgroundColor: config.theme.primaryColor,
                      borderRadius: `${config.theme.borderRadius}px`,
                    }}
                  >
                    {config.messages.loginButton}
                  </button>

                  {config.features.socialLogin && config.socialProviders.some(p => p.enabled) && (
                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t" style={{ borderColor: `${config.theme.textColor}20` }} />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2" style={{ 
                            backgroundColor: config.theme.backgroundColor,
                            color: config.theme.textColor,
                            opacity: 0.8
                          }}>
                            {config.messages.orContinueWith}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-4 gap-3">
                        {config.socialProviders
                          .filter(provider => provider.enabled)
                          .map((provider) => (
                            <button
                              key={provider.id}
                              type="button"
                              style={{ backgroundColor: provider.color }}
                              className="p-2 rounded-lg flex justify-center items-center text-white hover:opacity-90 transition-opacity"
                            >
                              {React.createElement(iconOptions[provider.icon as keyof typeof iconOptions], {
                                className: "w-5 h-5"
                              })}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}

                  {config.features.registration && (
                    <p className="mt-4 text-center text-sm" style={{ color: config.theme.textColor }}>
                      {config.messages.noAccount}{' '}
                      <a
                        href="#"
                        style={{ color: config.theme.primaryColor }}
                        className="font-medium hover:opacity-80"
                      >
                        {config.messages.registerButton}
                      </a>
                    </p>
                  )}
                </form>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500 text-center">
                Habilita la autenticación para ver la vista previa
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
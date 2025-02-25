import React, { useState } from 'react';
import { Plus, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';
import { SidebarConfig, SidebarTab } from '../FormSidebar';
import IconPicker from './IconPicker';

interface TabsSectionProps {
  config: SidebarConfig;
  onConfigChange: (config: SidebarConfig) => void;
}

const TabsSection: React.FC<TabsSectionProps> = ({ config, onConfigChange }) => {
  const [newTab, setNewTab] = useState<Partial<SidebarTab>>({
    icon: 'Home',
    label: '',
    color: config.theme.colors.primary
  });

  const addTab = () => {
    if (newTab.label && newTab.icon) {
      const tab: SidebarTab = {
        id: Date.now().toString(),
        icon: newTab.icon,
        label: newTab.label,
        color: newTab.color || config.theme.colors.primary,
        isActive: false,
        badge: newTab.badge
      };
      onConfigChange({
        ...config,
        tabs: [...config.tabs, tab]
      });
      setNewTab({ icon: 'Home', label: '', color: config.theme.colors.primary });
    }
  };

  const moveTab = (index: number, direction: 'up' | 'down') => {
    const newTabs = [...config.tabs];
    if (direction === 'up' && index > 0) {
      [newTabs[index], newTabs[index - 1]] = [newTabs[index - 1], newTabs[index]];
    } else if (direction === 'down' && index < newTabs.length - 1) {
      [newTabs[index], newTabs[index + 1]] = [newTabs[index + 1], newTabs[index]];
    }
    onConfigChange({ ...config, tabs: newTabs });
  };

  const removeTab = (id: string) => {
    onConfigChange({
      ...config,
      tabs: config.tabs.filter(tab => tab.id !== id)
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Pestañas</h3>
      
      <div className="space-y-3">
        {/* Añadir nueva pestaña */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newTab.label}
            onChange={(e) => setNewTab({ ...newTab, label: e.target.value })}
            placeholder="Nombre de la pestaña"
            className="flex-1 px-3 py-2 border rounded-lg text-sm"
          />
          <IconPicker
            selectedIcon={newTab.icon || 'Home'}
            onIconSelect={(icon) => setNewTab({ ...newTab, icon })}
          />
          <input
            type="text"
            value={newTab.badge}
            onChange={(e) => setNewTab({ ...newTab, badge: e.target.value })}
            placeholder="Badge"
            className="w-20 px-3 py-2 border rounded-lg text-sm"
          />
          <button
            onClick={addTab}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Lista de pestañas */}
        <div className="space-y-2">
          {config.tabs.map((tab, index) => (
            <div
              key={tab.id}
              className="flex items-center gap-2 p-2 border rounded-lg bg-gray-50"
            >
              <div className="flex-1 flex items-center gap-2">
                <IconPicker
                  selectedIcon={tab.icon}
                  onIconSelect={(icon) => {
                    const newTabs = [...config.tabs];
                    newTabs[index] = { ...tab, icon };
                    onConfigChange({ ...config, tabs: newTabs });
                  }}
                />
                <input
                  type="text"
                  value={tab.label}
                  onChange={(e) => {
                    const newTabs = [...config.tabs];
                    newTabs[index] = { ...tab, label: e.target.value };
                    onConfigChange({ ...config, tabs: newTabs });
                  }}
                  className="flex-1 px-2 py-1 border rounded text-sm"
                />
                <input
                  type="text"
                  value={tab.badge || ''}
                  onChange={(e) => {
                    const newTabs = [...config.tabs];
                    newTabs[index] = { ...tab, badge: e.target.value };
                    onConfigChange({ ...config, tabs: newTabs });
                  }}
                  placeholder="Badge"
                  className="w-20 px-2 py-1 border rounded text-sm"
                />
              </div>
              <input
                type="color"
                value={tab.color}
                onChange={(e) => {
                  const newTabs = [...config.tabs];
                  newTabs[index] = { ...tab, color: e.target.value };
                  onConfigChange({ ...config, tabs: newTabs });
                }}
                className="w-8 h-8 rounded cursor-pointer"
              />
              <button
                onClick={() => moveTab(index, 'up')}
                disabled={index === 0}
                className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronUp size={16} />
              </button>
              <button
                onClick={() => moveTab(index, 'down')}
                disabled={index === config.tabs.length - 1}
                className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
              >
                <ChevronDown size={16} />
              </button>
              <button
                onClick={() => removeTab(tab.id)}
                className="p-1 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabsSection;
import { create } from 'zustand';

interface Component {
  id: string;
  type: 'button' | 'table';
  x: number;
  y: number;
  w: number;
  h: number;
  config: {
    title?: string;
    action?: string;
    tableName?: string;
    columns?: number;
    rows?: number;
    headers?: string[];
    showBorder?: boolean;
    striped?: boolean;
  };
}

interface EditorStore {
  components: Component[];
  selectedComponent: Component | null;
  tempConfig: Component['config'] | null;
  isEditMode: boolean;
  isModalOpen: boolean;
  addComponent: (component: Component) => void;
  updateComponent: (id: string, updates: Partial<Component>) => void;
  removeComponent: (id: string) => void;
  setSelectedComponent: (component: Component | null) => void;
  setEditMode: (isEditMode: boolean) => void;
  setModalOpen: (isOpen: boolean) => void;
  setTempConfig: (config: Component['config'] | null) => void;
  saveTempConfig: () => void;
  cancelEdit: () => void;
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  components: [],
  selectedComponent: null,
  tempConfig: null,
  isEditMode: false,
  isModalOpen: false,
  addComponent: (component) =>
    set((state) => ({ components: [...state.components, component] })),
  updateComponent: (id, updates) =>
    set((state) => ({
      components: state.components.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    })),
  removeComponent: (id) =>
    set((state) => ({
      components: state.components.filter((c) => c.id !== id),
    })),
  setSelectedComponent: (component) => {
    set((state) => ({ 
      selectedComponent: component,
      tempConfig: component ? { ...component.config } : null
    }));
  },
  setEditMode: (isEditMode) => set(() => ({ isEditMode })),
  setModalOpen: (isOpen) => {
    if (!isOpen) {
      set(() => ({ 
        selectedComponent: null,
        tempConfig: null,
        isModalOpen: false 
      }));
    } else {
      set(() => ({ isModalOpen: true }));
    }
  },
  setTempConfig: (config) => set(() => ({ tempConfig: config })),
  saveTempConfig: () => {
    const { selectedComponent, tempConfig } = get();
    if (selectedComponent && tempConfig) {
      get().updateComponent(selectedComponent.id, { config: tempConfig });
      get().setModalOpen(false);
    }
  },
  cancelEdit: () => {
    set(() => ({
      selectedComponent: null,
      tempConfig: null,
      isModalOpen: false
    }));
  }
}));

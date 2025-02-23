export interface ComponentConfig {
  name: string;
  description: string;
  componentType: 'standalone' | 'reusable' | 'composite';
  layout: {
    type: 'single' | 'grid' | 'flex' | 'custom';
    columns?: number;
    gap?: number;
  };
  dataSource: {
    type: 'mock' | 'api';
    endpoint?: string;
    mockData?: boolean;
  };
  type: string;
  features: {
    props: boolean;
    state: boolean;
    styles: boolean;
    animation: boolean;
    reusableComponents?: string[];
  };
  meta: {
    isShared: boolean;
    category: string;
    dependencies: string[];
  };
}
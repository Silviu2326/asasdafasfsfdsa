import json
import os

class SidebarGenerator:
    def __init__(self):
        self.template = '''
import React, { useState } from 'react';
import { {icons} } from 'lucide-react';

interface SidebarProps {{
    enabled: boolean;
    position: 'left' | 'right';
    style: 'fixed' | 'absolute';
    features: {{
        collapsible: boolean;
        userProfile: boolean;
        search: boolean;
        notifications: boolean;
    }};
    theme: {{
        dark: boolean;
        glassmorphism: boolean;
        innerShadow: boolean;
        borderRadius: number;
        backgroundOpacity: number;
        colors: {{
            background: string;
            text: string;
            primary: string;
            secondary: string;
            border: string;
            hover: string;
            active: string;
        }};
    }};
    tabs: Array<{{
        id: string;
        icon: string;
        label: string;
        isActive?: boolean;
        badge?: string;
        color?: string;
    }}>;
}}

const Sidebar: React.FC<SidebarProps> = ({{
    enabled,
    position,
    style,
    features,
    theme,
    tabs
}}) => {{
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState(tabs.find(tab => tab.isActive)?.id || tabs[0]?.id);

    const sidebarStyles = {{
        position: style,
        [position]: 0,
        top: 0,
        bottom: 0,
        width: isCollapsed ? '64px' : '240px',
        backgroundColor: theme.colors.background,
        opacity: theme.backgroundOpacity,
        borderRadius: `${{theme.borderRadius}}px`,
        borderRight: position === 'left' ? `1px solid ${{theme.colors.border}}` : undefined,
        borderLeft: position === 'right' ? `1px solid ${{theme.colors.border}}` : undefined,
        boxShadow: theme.innerShadow ? 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)' : undefined,
        backdropFilter: theme.glassmorphism ? 'blur(8px)' : undefined,
        transition: 'width 0.3s ease',
        display: enabled ? 'flex' : 'none',
        flexDirection: 'column',
        color: theme.colors.text
    }} as const;

    if (!enabled) return null;

    return (
        <aside style={sidebarStyles}>
            {/* Header Section */}
            <div className="p-4 border-b border-gray-200">
                {features.collapsible && (
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 rounded hover:bg-gray-100"
                        style={{{ color: theme.colors.primary }}}
                    >
                        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
                    </button>
                )}
            </div>

            {/* User Profile Section */}
            {features.userProfile && !isCollapsed && (
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200" />
                        <div>
                            <h3 className="font-medium">John Doe</h3>
                            <p className="text-sm" style={{{ color: theme.colors.secondary }}}>Admin</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Search Section */}
            {features.search && !isCollapsed && (
                <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={16} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 rounded-md"
                            style={{{ 
                                backgroundColor: theme.colors.hover,
                                border: `1px solid ${{theme.colors.border}}`,
                            }}}
                        />
                    </div>
                </div>
            )}

            {/* Navigation Tabs */}
            <nav className="flex-1 overflow-y-auto p-2">
                {tabs.map((tab) => {{
                    const Icon = {icons}[tab.icon];
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center space-x-3 p-3 rounded-md mb-1 ${{isCollapsed ? 'justify-center' : ''}}`}
                            style={{{ 
                                backgroundColor: isActive ? theme.colors.active : 'transparent',
                                color: tab.color || (isActive ? theme.colors.primary : theme.colors.text),
                            }}}
                        >
                            {Icon && <Icon size={20} />}
                            {!isCollapsed && (
                                <>
                                    <span className="flex-1 text-left">{tab.label}</span>
                                    {tab.badge && (
                                        <span
                                            className="px-2 py-1 text-xs rounded-full"
                                            style={{{ 
                                                backgroundColor: theme.colors.primary,
                                                color: '#ffffff'
                                            }}}
                                        >
                                            {tab.badge}
                                        </span>
                                    )}
                                </>
                            )}
                        </button>
                    );
                }})}
            </nav>

            {/* Notifications Section */}
            {features.notifications && (
                <div className="p-4 border-t border-gray-200">
                    <button
                        className="w-full flex items-center justify-center p-2 rounded-md"
                        style={{{ backgroundColor: theme.colors.hover }}}
                    >
                        <Bell size={20} />
                        {!isCollapsed && <span className="ml-2">Notifications</span>}
                    </button>
                </div>
            )}
        </aside>
    );
}};

export default Sidebar;
'''

    def generate_sidebar_component(self, config):
        """Generate the sidebar component based on the configuration."""
        # Extract unique icons from tabs
        icons = set(tab['icon'] for tab in config['tabs'])
        icons.update(['ChevronLeft', 'ChevronRight', 'Search', 'Bell'])  # Add default icons
        icons_import = ', '.join(sorted(icons))

        # Generate the component code
        code = self.template.replace('{icons}', icons_import)
        return code

    def save_component(self, project_path, code):
        """Save the generated sidebar component."""
        components_dir = os.path.join(project_path, 'src', 'components', 'sidebar')
        os.makedirs(components_dir, exist_ok=True)

        file_path = os.path.join(components_dir, 'Sidebar.tsx')
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(code)

        return file_path

def main(config_json):
    """Main function to generate the sidebar component."""
    try:
        config = json.loads(config_json) if isinstance(config_json, str) else config_json
        generator = SidebarGenerator()
        code = generator.generate_sidebar_component(config)
        
        # Save the component
        file_path = generator.save_component(
            'c:/Users/usuario/Downloads/project-bolt-sb1-rqbh4gta/project',
            code
        )
        
        return {
            'status': 'success',
            'file_path': file_path
        }
    except Exception as e:
        print(f"Error generating sidebar component: {str(e)}")
        return {
            'status': 'error',
            'message': str(e)
        }

if __name__ == '__main__':
    # Example configuration
    example_config = {
        "enabled": True,
        "position": "left",
        "style": "fixed",
        "features": {
            "collapsible": True,
            "userProfile": True,
            "search": True,
            "notifications": True
        },
        "theme": {
            "dark": False,
            "glassmorphism": False,
            "innerShadow": True,
            "borderRadius": 8,
            "backgroundOpacity": 1,
            "colors": {
                "background": "#ffffff",
                "text": "#1f2937",
                "primary": "#3b82f6",
                "secondary": "#64748b",
                "border": "#e5e7eb",
                "hover": "#f3f4f6",
                "active": "#dbeafe"
            }
        },
        "tabs": [
            {
                "id": "dashboard",
                "icon": "Home",
                "label": "Dashboard",
                "isActive": True
            }
        ]
    }
    
    result = main(example_config)
    print(json.dumps(result, indent=2))

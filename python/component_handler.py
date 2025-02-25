import json
import os

class ComponentHandler:
    def __init__(self):
        self.component_defaults = {
            'layout': {
                'type': 'single',
                'columns': 12,
                'gap': '4',
                'padding': '4',
                'margin': '4',
                'maxWidth': '1200px'
            }
        }
        
        self.reusable_components = [
            'basic-table',
            'sortable-table',
            'primary-button',
            'text-input',
            'navbar',
            'alert',
            'card'
        ]

        self.component_templates = {
            'reusable': '''
import React from 'react';
import { {imports} } from '../components/reusable';

interface {name}Props {{
    // Add props here
}}

const {name}: React.FC<{name}Props> = () => {{
    return (
        <div className="grid grid-cols-{columns} gap-{gap} p-{padding} m-{margin} max-w-{maxWidth}">
            {components}
        </div>
    );
}};

export default {name};
'''
        }

    def generate_component_code(self, component):
        """Generate React component code."""
        if component['componentType'] == 'reusable':
            template = self.component_templates['reusable']
            layout = component.get('layout', {})
            features = component.get('features', {})
            
            # Generate imports
            imports = ', '.join(
                comp.replace('-', '').capitalize() 
                for comp in features.get('reusableComponents', [])
            )
            
            # Generate component instances
            layout_items = component.get('layoutComponente', {}).get('lg', [])
            components = []
            for item in layout_items:
                comp_name = item['i'].split('-')[-1].replace('-', '').capitalize()
                components.append(
                    f'<{comp_name} className="col-span-{item["w"]} row-span-{item["h"]}" />'
                )
            
            # Replace placeholders
            code = template.replace('{name}', component['name'].capitalize())
            code = code.replace('{imports}', imports)
            code = code.replace('{columns}', str(layout.get('columns', 12)))
            code = code.replace('{gap}', str(layout.get('gap', 4)))
            code = code.replace('{padding}', str(layout.get('padding', 4)))
            code = code.replace('{margin}', str(layout.get('margin', 4)))
            code = code.replace('{maxWidth}', layout.get('maxWidth', '1200px').replace('px', ''))
            code = code.replace('{components}', '\n            '.join(components))
            
            return code
        return None

    def save_component(self, project_path, component):
        """Save the component to a file."""
        components_dir = os.path.join(project_path, 'src', 'components', 'generated')
        os.makedirs(components_dir, exist_ok=True)
        
        file_name = f"{component['name'].lower().replace(' ', '-')}.tsx"
        file_path = os.path.join(components_dir, file_name)
        
        code = self.generate_component_code(component)
        if code:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(code)
            return file_path
        return None

    def process_component_config(self, component):
        """Process individual component configuration."""
        try:
            component_type = self.validate_component_type(component.get('componentType'))
            
            processed_component = {
                'id': component.get('id'),
                'name': component.get('name'),
                'componentType': component_type,
                'layout': self.process_component_layout(component.get('layout')),
                'layoutComponente': self.process_layout_component(component.get('layoutComponente'))
            }
            
            if component_type == 'reusable':
                features = component.get('features', {})
                reusable_components = features.get('reusableComponents', [])
                processed_component['features'] = {
                    'reusableComponents': self.validate_reusable_components(reusable_components)
                }
            
            # Generate and save component
            component_path = self.save_component(
                'c:/Users/usuario/Downloads/project-bolt-sb1-rqbh4gta/project',
                processed_component
            )
            if component_path:
                processed_component['component_path'] = component_path
            
            return processed_component
        except Exception as e:
            print(f"Error processing component: {str(e)}")
            return None
    
    def process_components_config(self, config):
        """Process all components from the project configuration."""
        processed_components = []
        
        for page_data in config.get('pages', {}).values():
            for component in page_data.get('components', []):
                processed_component = self.process_component_config(component)
                if processed_component:
                    processed_components.append(processed_component)
        
        return processed_components

def main(config_json):
    """Main function to handle component processing."""
    try:
        config = json.loads(config_json) if isinstance(config_json, str) else config_json
        handler = ComponentHandler()
        processed_components = handler.process_components_config(config)
        return processed_components
    except Exception as e:
        print(f"Error processing component configuration: {str(e)}")
        return None

if __name__ == '__main__':
    # Example usage
    example_config = {
        "pages": {
            "home": {
                "components": [
                    {
                        "id": "example-component",
                        "name": "Example Component",
                        "componentType": "reusable",
                        "features": {
                            "reusableComponents": ["basic-table", "primary-button"]
                        },
                        "layoutComponente": {
                            "lg": [
                                {
                                    "i": "example-button",
                                    "x": 0,
                                    "y": 0,
                                    "w": 4,
                                    "h": 3
                                }
                            ]
                        }
                    }
                ]
            }
        }
    }
    result = main(example_config)
    print(json.dumps(result, indent=2))
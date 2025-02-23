import json
import os

class PageHandler:
    def __init__(self):
        self.page_defaults = {
            'layout': {
                'type': 'single',
                'columns': 12,
                'gap': '4',
                'padding': '4',
                'margin': '4',
                'maxWidth': '1200px'
            }
        }
        
        self.component_templates = {
            'reusable': '''
import React from 'react';
import { {components} } from '../components';
import GridLayout from 'react-grid-layout';

const {name} = () => {
    const layout = {layoutConfig};

    return (
        <div style={{
            padding: '{padding}px',
            margin: '{margin}px',
            maxWidth: '{maxWidth}',
        }}>
            <GridLayout
                className="layout"
                layout={layout.lg}
                cols={columns}
                rowHeight={30}
                width={1200}
                margin={[parseInt({gap}), parseInt({gap})]}
            >
                {components_jsx}
            </GridLayout>
        </div>
    );
};

export default {name};
'''
        }

    def generate_component_imports(self, components):
        """Generate import statements for reusable components."""
        return ', '.join(comp.replace('-', '') for comp in components)

    def generate_components_jsx(self, layout_config):
        """Generate JSX for each component in the layout."""
        components_jsx = []
        for item in layout_config.get('lg', []):
            component_id = item['i'].split('-')[-1].replace('-', '')
            components_jsx.append(
                f'<div key="{item["i"]}">\n'
                f'    <{component_id.replace("-", "")} />\n'
                f'</div>'
            )
        return '\n                '.join(components_jsx)

    def generate_react_component(self, page_data):
        """Generate React component code for a page."""
        for component in page_data.get('components', []):
            if component['componentType'] == 'reusable':
                template = self.component_templates['reusable']
                
                # Get component features and layout
                features = component.get('features', {})
                layout = component.get('layout', {})
                layout_component = component.get('layoutComponente', {})
                
                # Replace placeholders
                code = template.replace('{name}', component['name'].capitalize())
                code = code.replace('{components}', self.generate_component_imports(features['reusableComponents']))
                code = code.replace('{layoutConfig}', json.dumps(layout_component))
                code = code.replace('{padding}', str(layout.get('padding', '4')))
                code = code.replace('{margin}', str(layout.get('margin', '4')))
                code = code.replace('{maxWidth}', layout.get('maxWidth', '1200px'))
                code = code.replace('{columns}', str(layout.get('columns', 12)))
                code = code.replace('{gap}', str(layout.get('gap', '4')))
                code = code.replace('{components_jsx}', self.generate_components_jsx(layout_component))
                
                return code
        return None

    def save_component(self, project_path, page_id, code):
        """Save the generated component to a file."""
        components_dir = os.path.join(project_path, 'src', 'pages')
        os.makedirs(components_dir, exist_ok=True)
        
        file_path = os.path.join(components_dir, f"{page_id}.tsx")
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(code)
        
        return file_path

    def process_page_config(self, page_id, page_data):
        """Process individual page configuration and generate component."""
        processed_page = {
            'id': page_id,
            'name': page_data.get('name', ''),
            'path': self.validate_page_path(page_data.get('path', f'/{page_id}')),
            'layout': self.process_page_layout(page_data.get('layout')),
            'components': page_data.get('components', [])
        }
        
        # Generate React component
        react_code = self.generate_react_component(page_data)
        if react_code:
            component_path = self.save_component(
                'c:/Users/usuario/Downloads/project-bolt-sb1-rqbh4gta/project',
                page_id,
                react_code
            )
            processed_page['component_path'] = component_path
        
        return processed_page
    
    def process_pages_config(self, config):
        """Process all pages from the project configuration."""
        pages = config.get('pages', {})
        processed_pages = {}
        
        for page_id, page_data in pages.items():
            processed_pages[page_id] = self.process_page_config(page_id, page_data)
        
        return processed_pages

def main(config_json):
    """Main function to handle page processing."""
    try:
        config = json.loads(config_json) if isinstance(config_json, str) else config_json
        handler = PageHandler()
        processed_pages = handler.process_pages_config(config)
        return processed_pages
    except Exception as e:
        print(f"Error processing page configuration: {str(e)}")
        return None

if __name__ == '__main__':
    # Example usage
    example_config = {
        "pages": {
            "home": {
                "name": "Home Page",
                "path": "/home",
                "layout": {
                    "type": "single",
                    "columns": 12,
                    "gap": "4"
                },
                "components": []
            }
        }
    }
    result = main(example_config)
    print(json.dumps(result, indent=2))
import json
import os

def generate_css_variables(style_config, project_name):
    try:
        css_content = ":root {\n"
        
        # Validate required keys
        required_keys = ['colors', 'spacing', 'borderRadius', 'animation', 'shadow', 'font']
        for key in required_keys:
            if key not in style_config:
                raise ValueError(f"Missing required key: {key}")
        
        # Process colors
        for color_name, color_value in style_config['colors'].items():
            css_content += f"    --color-{color_name}: {color_value};\n"
        
        # Process spacing
        for space_name, space_value in style_config['spacing'].items():
            css_content += f"    --spacing-{space_name}: {space_value};\n"
        
        # Process border radius
        for radius_name, radius_value in style_config['borderRadius'].items():
            css_content += f"    --radius-{radius_name}: {radius_value};\n"
        
        # Process animation
        css_content += f"    --animation-duration: {style_config['animation']['duration']};\n"
        css_content += f"    --animation-easing: {style_config['animation']['easing']};\n"
        
        # Process shadows
        for shadow_name, shadow_value in style_config['shadow'].items():
            css_content += f"    --shadow-{shadow_name}: {shadow_value};\n"
        
        # Add font family variable
        css_content += f"    --font-primary: {style_config.get('font', 'Inter')};\n"
        
        css_content += "}\n\n"
        
        # Add utility classes
        css_content += "/* Utility classes */\n"
        css_content += ".text-primary { color: var(--color-primary); }\n"
        css_content += ".bg-primary { background-color: var(--color-primary); }\n"
        css_content += ".font-primary { font-family: var(--font-primary); }\n"
        
        return css_content
    except Exception as e:
        raise Exception(f"Error generating CSS variables for project {project_name}: {str(e)}")

def save_css_file(css_content, project_name):
    try:
        # Sanitize project name to ensure valid path
        project_name = project_name.replace(':', '').replace('\\', '').replace('/', '')
        
        # Define the output path using the project name
        current_dir = os.path.dirname(os.path.abspath(__file__))
        frontend_dir = os.path.join(current_dir, f"generated_{project_name}_frontend")
        output_path = os.path.join(frontend_dir, "src", "styles", "variables.css")
        
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(css_content)
        print(f"CSS file generated successfully at: {output_path}")
        return output_path
    except Exception as e:
        raise Exception(f"Error saving CSS file: {str(e)}")

def main(style_config, project_name):
    # Generate CSS content
    css_content = generate_css_variables(style_config, project_name)
    
    # Save the CSS file
    return save_css_file(css_content, project_name)

if __name__ == '__main__':
    # Example style configuration (this would come from FormEstilos.tsx)
    example_style_config = {
        'colors': {
            'primary': '#3b82f6',
            'secondary': '#64748b',
            'accent': '#8b5cf6',
            'background': '#ffffff',
            'text': '#1f2937',
            'success': '#10b981',
            'warning': '#f59e0b',
            'error': '#ef4444',
            'info': '#3b82f6'
        },
        'spacing': {
            'xs': '4px',
            'sm': '8px',
            'md': '16px',
            'lg': '24px',
            'xl': '32px'
        },
        'borderRadius': {
            'none': '0px',
            'sm': '4px',
            'md': '8px',
            'lg': '16px',
            'full': '9999px'
        },
        'animation': {
            'duration': '300ms',
            'easing': 'ease-in-out'
        },
        'shadow': {
            'none': 'none',
            'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        },
        'font': 'Inter'
    }
    
    main(example_style_config)
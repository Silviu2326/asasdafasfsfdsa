import json
import os

class RouteGenerator:
    def __init__(self):
        self.template = '''
// routes/index.js
import express from 'express';
import { {controllers} } from '../controllers';
import { validateRequest } from '../middleware/validator';

const router = express.Router();

{routes}

export default router;
'''

        self.route_template = '''
// {controller} Routes
{routes_block}'''

        self.controller_template = '''
// controllers/{name}Controller.js
import { {name}Model } from '../models';

export const {name}Controller = {{
    // Get all {name}s
    index: async (req, res) => {{
        try {{
            const items = await {name}Model.find();
            res.json({{ success: true, data: items }});
        }} catch (error) {{
            res.status(500).json({{ success: false, error: error.message }});
        }}
    }},

    // Create new {name}
    create: async (req, res) => {{
        try {{
            const item = new {name}Model(req.body);
            await item.save();
            res.status(201).json({{ success: true, data: item }});
        }} catch (error) {{
            res.status(400).json({{ success: false, error: error.message }});
        }}
    }},

    // Get {name} by ID
    show: async (req, res) => {{
        try {{
            const item = await {name}Model.findById(req.params.id);
            if (!item) {{
                return res.status(404).json({{ success: false, error: '{name} not found' }});
            }}
            res.json({{ success: true, data: item }});
        }} catch (error) {{
            res.status(500).json({{ success: false, error: error.message }});
        }}
    }},

    // Update {name}
    update: async (req, res) => {{
        try {{
            const item = await {name}Model.findByIdAndUpdate(
                req.params.id,
                req.body,
                {{ new: true }}
            );
            if (!item) {{
                return res.status(404).json({{ success: false, error: '{name} not found' }});
            }}
            res.json({{ success: true, data: item }});
        }} catch (error) {{
            res.status(400).json({{ success: false, error: error.message }});
        }}
    }},

    // Delete {name}
    delete: async (req, res) => {{
        try {{
            const item = await {name}Model.findByIdAndDelete(req.params.id);
            if (!item) {{
                return res.status(404).json({{ success: false, error: '{name} not found' }});
            }}
            res.json({{ success: true, data: item }});
        }} catch (error) {{
            res.status(500).json({{ success: false, error: error.message }});
        }}
    }},

    // Search {name}s
    search: async (req, res) => {{
        try {{
            const query = req.body.query || {{}};
            const items = await {name}Model.find(query);
            res.json({{ success: true, data: items }});
        }} catch (error) {{
            res.status(400).json({{ success: false, error: error.message }});
        }}
    }},

    // Export {name}s
    export: async (req, res) => {{
        try {{
            const items = await {name}Model.find();
            res.json({{ success: true, data: items }});
        }} catch (error) {{
            res.status(500).json({{ success: false, error: error.message }});
        }}
    }}
}};
'''

        self.model_template = '''
// models/{name}Model.js
import mongoose from 'mongoose';

const {name}Schema = new mongoose.Schema({{
    // Add your schema fields here
    name: {{
        type: String,
        required: true
    }},
    // Add more fields as needed
}}, {{
    timestamps: true
}});

export const {name}Model = mongoose.model('{name}', {name}Schema);
'''

    def generate_route(self, route):
        """Generate a single route based on the configuration."""
        method = route['method'].lower()
        return f"router.{method}('{route['path']}', {route['controller']}.{route['action']});\n"

    def generate_routes(self, config):
        """Generate all routes based on the configuration."""
        # Group routes by controller
        controllers = {}
        for route in config['routes']:
            controller = route['controller']
            if controller not in controllers:
                controllers[controller] = []
            controllers[controller].append(route)

        # Generate routes for each controller
        routes_code = []
        for controller, routes in controllers.items():
            routes_block = ''.join(self.generate_route(route) for route in routes)
            routes_code.append(self.route_template.format(
                controller=controller,
                routes_block=routes_block
            ))

        # Get unique controller names
        controller_names = sorted(controllers.keys())
        controllers_import = ', '.join(controller_names)

        # Generate the final code
        code = self.template.format(
            controllers=controllers_import,
            routes='\n'.join(routes_code)
        )

        return code, controller_names

    def generate_controller(self, name):
        """Generate a controller file."""
        # Remove 'Controller' suffix if present
        base_name = name.replace('Controller', '')
        return self.controller_template.format(name=base_name)

    def generate_model(self, name):
        """Generate a model file."""
        # Remove 'Controller' suffix if present
        base_name = name.replace('Controller', '')
        return self.model_template.format(name=base_name)

    def save_files(self, project_path, routes_code, controller_names):
        """Save all generated files."""
        # Create necessary directories
        dirs = ['routes', 'controllers', 'models', 'middleware']
        for dir_name in dirs:
            os.makedirs(os.path.join(project_path, 'src', dir_name), exist_ok=True)

        # Save routes file
        routes_path = os.path.join(project_path, 'src', 'routes', 'index.js')
        with open(routes_path, 'w', encoding='utf-8') as f:
            f.write(routes_code)

        # Save controllers and models
        for controller_name in controller_names:
            # Generate and save controller
            controller_code = self.generate_controller(controller_name)
            controller_path = os.path.join(
                project_path, 'src', 'controllers',
                f'{controller_name}.js'
            )
            with open(controller_path, 'w', encoding='utf-8') as f:
                f.write(controller_code)

            # Generate and save model
            model_code = self.generate_model(controller_name)
            model_path = os.path.join(
                project_path, 'src', 'models',
                f'{controller_name.replace("Controller", "Model")}.js'
            )
            with open(model_path, 'w', encoding='utf-8') as f:
                f.write(model_code)

        # Create validator middleware
        validator_code = '''
// middleware/validator.js
export const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            schema.validateSync(req.body);
            next();
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    };
};
'''
        validator_path = os.path.join(project_path, 'src', 'middleware', 'validator.js')
        with open(validator_path, 'w', encoding='utf-8') as f:
            f.write(validator_code)

        return {
            'routes_file': routes_path,
            'controllers': [f'{name}.js' for name in controller_names],
            'models': [f'{name.replace("Controller", "Model")}.js' for name in controller_names],
            'middleware': ['validator.js']
        }

def main(config_json):
    """Main function to generate the routes and related files."""
    try:
        config = json.loads(config_json) if isinstance(config_json, str) else config_json
        generator = RouteGenerator()
        
        # Generate routes code and get controller names
        routes_code, controller_names = generator.generate_routes(config)
        
        # Save all files
        files = generator.save_files(
            'c:/Users/usuario/Downloads/project-bolt-sb1-rqbh4gta/project',
            routes_code,
            controller_names
        )
        
        return {
            'status': 'success',
            'files': files
        }
    except Exception as e:
        print(f"Error generating routes: {str(e)}")
        return {
            'status': 'error',
            'message': str(e)
        }

if __name__ == '__main__':
    # Example configuration
    example_config = {
        "routes": [
            {
                "method": "GET",
                "path": "/api/usuarios",
                "controller": "UsuarioController",
                "action": "index"
            }
        ]
    }
    
    result = main(example_config)
    print(json.dumps(result, indent=2))
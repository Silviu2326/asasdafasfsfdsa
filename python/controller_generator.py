import json
import os

class ControllerGenerator:
    def __init__(self):
        self.template = '''
// Generated Types
interface PaginationOptions {{
    page?: number;
    limit?: number;
    sort?: {{ [key: string]: 1 | -1 }};
}}

interface QueryOptions {{
    filter?: any;
    pagination?: PaginationOptions;
}}

interface ServiceResponse<T> {{
    success: boolean;
    data?: T;
    error?: string;
    meta?: {{
        total?: number;
        page?: number;
        totalPages?: number;
    }};
}}

// Base Controller Template
class BaseController {{
    protected model: any;
    protected cacheService?: any;

    constructor(model: any, options: {{ caching?: boolean }} = {{}}) {{
        this.model = model;
        if (options.caching) {{
            // Initialize caching service if needed
            // this.cacheService = new CacheService();
        }}
    }}

    protected async paginate(query: any, options: PaginationOptions) {{
        const page = options.page || 1;
        const limit = options.limit || 10;
        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            query.skip(skip).limit(limit),
            this.model.countDocuments(query.getQuery())
        ]);

        return {{
            data,
            meta: {{
                total,
                page,
                totalPages: Math.ceil(total / limit)
            }}
        }};
    }}

    protected handleError(error: any): ServiceResponse<any> {{
        console.error('Controller Error:', error);
        return {{
            success: false,
            error: error.message || 'Internal server error'
        }};
    }}
}}

// Controller Implementation Template
{controller_implementations}

// Export controllers
export {{
    {exports}
}};
'''

        self.controller_template = '''
class {name} extends BaseController {{
    constructor() {{
        super({model_name}, {{ caching: {caching} }});
    }}

    {actions}
}}
'''

        self.action_templates = {{
            'index': '''
    async index(options: QueryOptions = {{}}): Promise<ServiceResponse<any[]>> {{
        try {{
            const query = this.model.find(options.filter || {{}});
            
            if (options.pagination) {{
                const result = await this.paginate(query, options.pagination);
                return {{ success: true, ...result }};
            }}

            const data = await query;
            return {{ success: true, data }};
        }} catch (error) {{
            return this.handleError(error);
        }}
    }}
''',
            'show': '''
    async show(id: string): Promise<ServiceResponse<any>> {{
        try {{
            const data = await this.model.findById(id);
            if (!data) {{
                return {{ success: false, error: 'Resource not found' }};
            }}
            return {{ success: true, data }};
        }} catch (error) {{
            return this.handleError(error);
        }}
    }}
''',
            'create': '''
    async create(data: any): Promise<ServiceResponse<any>> {{
        try {{
            const newItem = await this.model.create(data);
            return {{ success: true, data: newItem }};
        }} catch (error) {{
            return this.handleError(error);
        }}
    }}
''',
            'update': '''
    async update(id: string, data: any): Promise<ServiceResponse<any>> {{
        try {{
            const updated = await this.model.findByIdAndUpdate(
                id,
                data,
                {{ new: true }}
            );
            if (!updated) {{
                return {{ success: false, error: 'Resource not found' }};
            }}
            return {{ success: true, data: updated }};
        }} catch (error) {{
            return this.handleError(error);
        }}
    }}
''',
            'delete': '''
    async delete(id: string): Promise<ServiceResponse<any>> {{
        try {{
            const deleted = await this.model.findByIdAndDelete(id);
            if (!deleted) {{
                return {{ success: false, error: 'Resource not found' }};
            }}
            return {{ success: true, data: deleted }};
        }} catch (error) {{
            return this.handleError(error);
        }}
    }}
''',
            'search': '''
    async search(query: string): Promise<ServiceResponse<any[]>> {{
        try {{
            const data = await this.model.find({{
                $text: {{ $search: query }}
            }});
            return {{ success: true, data }};
        }} catch (error) {{
            return this.handleError(error);
        }}
    }}
''',
            'export': '''
    async export(): Promise<ServiceResponse<any[]>> {{
        try {{
            const data = await this.model.find({{}});
            // Implement export logic here (e.g., CSV, Excel)
            return {{ success: true, data }};
        }} catch (error) {{
            return this.handleError(error);
        }}
    }}
''',
            'login': '''
    async login(credentials: {{ email: string; password: string }}): Promise<ServiceResponse<any>> {{
        try {{
            const user = await this.model.findOne({{ email: credentials.email }});
            if (!user) {{
                return {{ success: false, error: 'Invalid credentials' }};
            }}
            // Implement password verification and token generation
            return {{ success: true, data: {{ user, token: 'generated-token' }} }};
        }} catch (error) {{
            return this.handleError(error);
        }}
    }}
''',
            'logout': '''
    async logout(token: string): Promise<ServiceResponse<void>> {{
        try {{
            // Implement token invalidation logic
            return {{ success: true }};
        }} catch (error) {{
            return this.handleError(error);
        }}
    }}
'''
        }}

    def generate_controller(self, controller_config):
        """Generate a controller based on the configuration."""
        actions = []
        for action in controller_config['actions']:
            if action in self.action_templates:
                actions.append(self.action_templates[action])

        model_name = controller_config['name'].replace('Controller', '')
        
        controller = self.controller_template.format(
            name=controller_config['name'],
            model_name=model_name,
            caching=str(controller_config['options'].get('caching', False)).lower(),
            actions=''.join(actions)
        )
        
        return controller

    def generate_controllers(self, config):
        """Generate all controllers based on the configuration."""
        implementations = []
        exports = []
        
        for controller in config['controllers']:
            implementations.append(self.generate_controller(controller))
            exports.append(controller['name'])
        
        code = self.template.format(
            controller_implementations='\n'.join(implementations),
            exports=', '.join(exports)
        )
        
        return code

    def save_controllers(self, project_path, code):
        """Save the generated controllers."""
        controllers_dir = os.path.join(project_path, 'src', 'controllers')
        os.makedirs(controllers_dir, exist_ok=True)

        file_path = os.path.join(controllers_dir, 'controllers.ts')
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(code)

        return file_path

def main(config_json):
    """Main function to generate the controllers."""
    try:
        config = json.loads(config_json) if isinstance(config_json, str) else config_json
        generator = ControllerGenerator()
        code = generator.generate_controllers(config)
        
        # Save the controllers
        file_path = generator.save_controllers(
            'c:/Users/usuario/Downloads/project-bolt-sb1-rqbh4gta/project',
            code
        )
        
        return {
            'status': 'success',
            'file_path': file_path
        }
    except Exception as e:
        print(f"Error generating controllers: {str(e)}")
        return {
            'status': 'error',
            'message': str(e)
        }

if __name__ == '__main__':
    # Example configuration
    example_config = {
        "controllers": [
            {
                "name": "UserController",
                "actions": ["index", "show", "create", "update", "delete"],
                "options": {
                    "authentication": True,
                    "validation": True,
                    "caching": True
                }
            }
        ]
    }
    
    result = main(example_config)
    print(json.dumps(result, indent=2))
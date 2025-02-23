import json
import os
from typing import Dict, Any

class LoginGenerator:
    def __init__(self):
        self.template = '''
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { {icons} } from 'lucide-react';

interface LoginConfig {{
    enabled: boolean;
    title: string;
    subtitle: string;
    logo: string;
    fields: Array<{{
        id: string;
        type: string;
        label: string;
        placeholder: string;
        icon: string;
        required: boolean;
        validation?: {{
            pattern?: string;
            customMessage?: string;
            minLength?: number;
            maxLength?: number;
        }};
    }}>;
    features: {{
        registration: boolean;
        passwordReset: boolean;
        rememberMe: boolean;
        socialLogin: boolean;
        emailVerification: boolean;
        twoFactorAuth: boolean;
    }};
    validation: {{
        passwordMinLength: number;
        requireSpecialChar: boolean;
        requireNumber: boolean;
        requireUppercase: boolean;
        requireLowercase: boolean;
    }};
    theme: {{
        backgroundColor: string;
        textColor: string;
        primaryColor: string;
        errorColor: string;
        successColor: string;
        borderRadius: number;
        glassmorphism: boolean;
    }};
    socialProviders: Array<{{
        id: string;
        name: string;
        icon: string;
        color: string;
        enabled: boolean;
    }}>;
    messages: {{
        loginButton: string;
        registerButton: string;
        forgotPassword: string;
        rememberMe: string;
        orContinueWith: string;
        noAccount: string;
        hasAccount: string;
    }};
}}

interface LoginFormData {{
    email: string;
    password: string;
    rememberMe?: boolean;
}}

const LoginForm: React.FC<{{ config: LoginConfig }}> = ({ config }) => {{
    const {{ register, handleSubmit, formState: {{ errors }} }} = useForm<LoginFormData>();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: LoginFormData) => {{
        setIsLoading(true);
        try {{
            // Handle login logic here
            console.log('Login data:', data);
        }} catch (error) {{
            console.error('Login error:', error);
        }} finally {{
            setIsLoading(false);
        }}
    }};

    const getValidationRules = (field: any) => {{
        const rules: any = {{
            required: field.required ? 'Este campo es requerido' : false,
        }};

        if (field.validation) {{
            if (field.validation.pattern) {{
                rules.pattern = {{
                    value: new RegExp(field.validation.pattern),
                    message: field.validation.customMessage || 'Formato inválido'
                }};
            }}
            if (field.validation.minLength) {{
                rules.minLength = {{
                    value: field.validation.minLength,
                    message: `Mínimo ${{field.validation.minLength}} caracteres`
                }};
            }}
            if (field.validation.maxLength) {{
                rules.maxLength = {{
                    value: field.validation.maxLength,
                    message: `Máximo ${{field.validation.maxLength}} caracteres`
                }};
            }}
        }}

        return rules;
    }};

    return (
        <div 
            className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
            style={{
                backgroundColor: config.theme.backgroundColor,
                color: config.theme.textColor
            }}
        >
            <div className={{
                'max-w-md w-full space-y-8 p-8 rounded-lg',
                [config.theme.glassmorphism ? 'bg-white/30 backdrop-blur-lg' : 'bg-white shadow-lg']: true
            }}>
                {{config.logo && (
                    <div className="flex justify-center">
                        <img
                            className="h-12 w-auto"
                            src={{config.logo}}
                            alt="Logo"
                        />
                    </div>
                )}}

                <div className="text-center">
                    <h2 className="text-3xl font-bold" style={{{{ color: config.theme.textColor }}}}>
                        {{config.title}}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {{config.subtitle}}
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={{handleSubmit(onSubmit)}}>
                    {{config.fields.map((field) => {{
                        const Icon = (icons as any)[field.icon];
                        return (
                            <div key={{field.id}}>
                                <label 
                                    htmlFor={{field.id}} 
                                    className="block text-sm font-medium"
                                    style={{{{ color: config.theme.textColor }}}}
                                >
                                    {{field.label}}
                                </label>
                                <div className="mt-1 relative">
                                    {{Icon && (
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Icon className="h-5 w-5 text-gray-400" />
                                        </div>
                                    )}}
                                    <input
                                        id={{field.id}}
                                        type={{field.type}}
                                        placeholder={{field.placeholder}}
                                        className={{
                                            'block w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
                                            errors[field.id as keyof LoginFormData] ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-primary-500'
                                        }}
                                        style={{{{ borderRadius: `${{config.theme.borderRadius}}px` }}}}
                                        {{...register(field.id as keyof LoginFormData, getValidationRules(field))}}
                                    />
                                </div>
                                {{errors[field.id as keyof LoginFormData] && (
                                    <p className="mt-2 text-sm" style={{{{ color: config.theme.errorColor }}}}>
                                        {{errors[field.id as keyof LoginFormData]?.message}}
                                    </p>
                                )}}
                            </div>
                        );
                    }})}}                    

                    {{config.features.rememberMe && (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300"
                                    {{...register('rememberMe')}}
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    {{config.messages.rememberMe}}
                                </label>
                            </div>

                            {{config.features.passwordReset && (
                                <div className="text-sm">
                                    <a 
                                        href="#" 
                                        className="font-medium hover:opacity-80"
                                        style={{{{ color: config.theme.primaryColor }}}}
                                    >
                                        {{config.messages.forgotPassword}}
                                    </a>
                                </div>
                            )}}
                        </div>
                    )}}

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
                            style={{{{ 
                                backgroundColor: config.theme.primaryColor,
                                borderRadius: `${{config.theme.borderRadius}}px`
                            }}}}
                            disabled={{isLoading}}
                        >
                            {{isLoading ? 'Cargando...' : config.messages.loginButton}}
                        </button>
                    </div>

                    {{config.features.socialLogin && config.socialProviders.some(p => p.enabled) && (
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        {{config.messages.orContinueWith}}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">
                                {{config.socialProviders
                                    .filter(provider => provider.enabled)
                                    .map(provider => {{
                                        const ProviderIcon = (icons as any)[provider.icon];
                                        return (
                                            <button
                                                key={{provider.id}}
                                                type="button"
                                                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                                style={{{{ borderRadius: `${{config.theme.borderRadius}}px` }}}}
                                            >
                                                {{ProviderIcon && (
                                                    <ProviderIcon 
                                                        className="h-5 w-5" 
                                                        style={{{{ color: provider.color }}}}
                                                    />
                                                )}}
                                            </button>
                                        );
                                    }}
                                )}}
                            </div>
                        </div>
                    )}}

                    {{config.features.registration && (
                        <div className="text-sm text-center mt-6">
                            <span className="text-gray-600">{{config.messages.noAccount}} </span>
                            <a 
                                href="#" 
                                className="font-medium hover:opacity-80"
                                style={{{{ color: config.theme.primaryColor }}}}
                            >
                                {{config.messages.registerButton}}
                            </a>
                        </div>
                    )}}
                </form>
            </div>
        </div>
    );
}};

export default LoginForm;
'''

    def generate_login_component(self, config: Dict[str, Any], output_dir: str) -> str:
        """Generate the React login component based on the configuration."""
        # Create the components directory if it doesn't exist
        components_dir = os.path.join(output_dir, 'src', 'components', 'login')
        os.makedirs(components_dir, exist_ok=True)

        # Get all unique icons used in the configuration
        icons = set()
        for field in config['fields']:
            if 'icon' in field:
                icons.add(field['icon'])
        for provider in config['socialProviders']:
            if provider['enabled'] and 'icon' in provider:
                icons.add(provider['icon'])

        # Replace the icons placeholder in the template
        code = self.template.replace('{icons}', ', '.join(sorted(icons)))

        # Save the component
        output_path = os.path.join(components_dir, 'LoginForm.tsx')
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(code)

        return output_path

def main(config_json: str, project_path: str) -> str:
    """Main function to generate the login component."""
    try:
        # Parse the configuration
        config = json.loads(config_json) if isinstance(config_json, str) else config_json

        # Generate the login component
        generator = LoginGenerator()
        component_path = generator.generate_login_component(config, project_path)

        return component_path
    except Exception as e:
        print(f"Error generating login component: {str(e)}")
        return ""

if __name__ == '__main__':
    # Example configuration
    example_config = {
        "enabled": True,
        "title": "Bienvenido de nuevo",
        "subtitle": "Ingresa tus credenciales para continuar",
        "logo": "/images/logo.png",
        "fields": [
            {
                "id": "email",
                "type": "email",
                "label": "Correo electrónico",
                "placeholder": "ejemplo@correo.com",
                "icon": "Mail",
                "required": True,
                "validation": {
                    "pattern": "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
                    "customMessage": "Por favor ingresa un correo válido"
                }
            }
        ]
    }
    result = main(example_config, 'c:/Users/usuario/Downloads/project-bolt-sb1-rqbh4gta/project')
    print(f"Login component generated at: {result}")

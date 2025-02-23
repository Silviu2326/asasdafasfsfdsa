from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime
import os
import shutil
import json  # Add this at the top of the file with other imports

class ProjectFeatures(BaseModel):
    components: bool
    pages: bool
    layouts: bool
    hooks: bool
    utils: bool
    services: bool
    assets: bool
    types: bool
    constants: bool
    contexts: bool
    styles: bool
    tests: bool

class ProjectOrganization(BaseModel):
    atomic: bool
    featureBased: bool
    routeBased: bool

class ProjectConventions(BaseModel):
    typescript: bool
    storybook: bool
    eslint: bool
    prettier: bool
    husky: bool

class ProjectStructure(BaseModel):
    features: ProjectFeatures
    organization: ProjectOrganization
    conventions: ProjectConventions

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None
    framework: str
    language: str
    backend_type: str
    layout_type: str = "default"
    structure: ProjectStructure = ProjectStructure(
        features=ProjectFeatures(
            components=True,
            pages=True,
            layouts=True,
            hooks=True,
            utils=True,
            services=True,
            assets=True,
            types=True,
            constants=True,
            contexts=True,
            styles=True,
            tests=True
        ),
        organization=ProjectOrganization(
            atomic=True,
            featureBased=False,
            routeBased=False
        ),
        conventions=ProjectConventions(
            typescript=True,
            storybook=False,
            eslint=True,
            prettier=True,
            husky=False
        )
    )

class ProjectCreate(ProjectBase):
    pass

# Add this function to convert from simple JSON to ProjectCreate
def convert_simple_config(config: dict) -> ProjectCreate:
    return ProjectCreate(
        name=config["projectName"],
        description=config["description"],
        framework=config["framework"].split(" + ")[1].lower(),
        language=config["language"].lower(),
        backend_type=config["backend"].split(" + ")[0].lower(),
        layout_type="default",
        structure=ProjectStructure(
            features=ProjectFeatures(
                components=True,
                pages=True,
                layouts=True,
                hooks=True,
                utils=True,
                services=True,
                assets=True,
                types=True,
                constants=True,
                contexts=True,
                styles=True,
                tests=True
            ),
            organization=ProjectOrganization(
                atomic=True,
                featureBased=False,
                routeBased=False
            ),
            conventions=ProjectConventions(
                typescript=True,
                storybook=False,
                eslint=True,
                prettier=True,
                husky=False
            )
        )
    )

# Modify the main function to use the converter
async def main(config_json):
    """Main function to handle project creation."""
    try:
        config = json.loads(config_json) if isinstance(config_json, str) else config_json
        project_create = convert_simple_config(config)
        service = ProjectService()
        project = await service.create_project(project_create)
        return project
    except Exception as e:
        print(f"Error processing project configuration: {str(e)}")
        return None

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ProjectGenerator:
    def __init__(self, project: ProjectCreate):
        self.project = project
        self.frontend_dir = f"generated_{project.name}_frontend"
        self.backend_dir = f"generated_{project.name}_backend"

    def create_frontend_structure(self):
        # Create Vite + React project
        os.system(f'npm create vite@latest {self.frontend_dir} -- --template react-ts')
        
        # Navigate to frontend directory and install dependencies
        os.chdir(self.frontend_dir)
        os.system('npm install')
        os.system('npm install react-router-dom @tanstack/react-query')
        
        # Create additional directories in src
        src_dir = 'src'
        directories = [
            "components", "pages", "layouts", "hooks", 
            "utils", "services", "assets", "types",
            "constants", "contexts", "styles", "tests"
        ]
        for dir_name in directories:
            os.makedirs(os.path.join(src_dir, dir_name), exist_ok=True)
        
        # Return to original directory
        os.chdir('..')

    def create_backend_structure(self):
        # Create backend directory and initialize npm
        os.makedirs(self.backend_dir, exist_ok=True)
        os.chdir(self.backend_dir)
        
        # Initialize npm project
        os.system('npm init -y')
        
        # Install dependencies
        os.system('npm install express cors dotenv')
        os.system('npm install --save-dev nodemon @types/express @types/node typescript')
        
        # Create backend directories
        directories = [
            "src/controllers",
            "src/models",
            "src/routes",
            "src/middleware",
            "src/utils",
            "src/config",
            "src/services",
            "tests"
        ]
        for dir_name in directories:
            os.makedirs(dir_name, exist_ok=True)
        
        # Create basic Express server file
        with open('src/index.js', 'w') as f:
            f.write('''const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
''')
        
        # Return to original directory
        os.chdir('..')

    def create_frontend_config(self):
        package_json = {
            "name": f"{self.project.name}-frontend",
            "version": "0.1.0",
            "private": True,
            "scripts": {
                "dev": "vite",
                "build": "tsc && vite build",
                "preview": "vite preview"
            },
            "dependencies": {
                "react": "^18.2.0",
                "react-dom": "^18.2.0",
                "react-router-dom": "^6.15.0",
                "@tanstack/react-query": "^4.32.6"
            },
            "devDependencies": {
                "@types/react": "^18.2.15",
                "@types/react-dom": "^18.2.7",
                "@vitejs/plugin-react": "^4.0.3",
                "typescript": "^5.0.2",
                "vite": "^4.4.5"
            }
        }
        
        with open(os.path.join(self.frontend_dir, "package.json"), "w") as f:
            json.dump(package_json, f, indent=2)

    def create_backend_config(self):
        package_json = {
            "name": f"{self.project.name}-backend",
            "version": "1.0.0",
            "main": "src/index.js",
            "scripts": {
                "start": "node src/index.js",
                "dev": "nodemon src/index.js"
            },
            "dependencies": {
                "express": "^4.18.2",
                "cors": "^2.8.5",
                "dotenv": "^16.3.1"
            },
            "devDependencies": {
                "nodemon": "^3.0.1",
                "@types/express": "^4.17.17",
                "@types/node": "^20.5.0",
                "typescript": "^5.1.6"
            }
        }
        
        with open(os.path.join(self.backend_dir, "package.json"), "w") as f:
            json.dump(package_json, f, indent=2)

    def generate_project(self):
        # Generate frontend
        self.create_frontend_structure()
        self.create_frontend_config()
        
        # Generate backend
        self.create_backend_structure()
        self.create_backend_config()
        
        return {
            "message": f"Project {self.project.name} generated successfully",
            "frontend_dir": self.frontend_dir,
            "backend_dir": self.backend_dir
        }

class ProjectService:
    @staticmethod
    async def create_project(project: ProjectCreate) -> Project:
        # Generate project files
        generator = ProjectGenerator(project)
        generator.generate_project()

        # Create project record
        return Project(
            id=1,
            name=project.name,
            description=project.description,
            framework=project.framework,
            language=project.language,
            backend_type=project.backend_type,
            layout_type=project.layout_type,
            structure=project.structure,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

    @staticmethod
    async def get_project(project_id: int) -> Optional[Project]:
        return None

    @staticmethod
    async def list_projects() -> List[Project]:
        return []

    @staticmethod
    async def update_project(project_id: int, project_data: ProjectBase) -> Optional[Project]:
        return None

    @staticmethod
    async def delete_project(project_id: int) -> bool:
        return True
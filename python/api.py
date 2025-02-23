from fastapi import FastAPI, HTTPException
from creacionproyecto import convert_simple_config, ProjectService
from style_generator import generate_css_variables, save_css_file
import uvicorn
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
import json
from login_generator import LoginGenerator
from component_handler import ComponentHandler
from page_handler import PageHandler

app = FastAPI(title="Project Generator API")

# Add CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProjectRequest(BaseModel):
    projectName: str
    description: str
    framework: str
    language: str
    backend: str

@app.post("/generate-project")
async def generate_project(project_request: ProjectRequest):
    try:
        # Convert the simple request to our internal project format
        project_config = convert_simple_config(project_request.dict())
        
        # Create the project using our service
        service = ProjectService()
        project = await service.create_project(project_config)
        
        return {
            "status": "success",
            "message": f"Project {project_request.projectName} generated successfully",
            "project": {
                "name": project.name,
                "frontend_path": f"generated_{project.name}_frontend",
                "backend_path": f"generated_{project.name}_backend"
            }
        }
    except Exception as e:
        # Log the full error details
        import traceback
        error_details = traceback.format_exc()
        print(f"Error details: {error_details}")
        raise HTTPException(
            status_code=500, 
            detail=f"Internal server error: {str(e)}\n{error_details}"
        )

class StyleConfig(BaseModel):
    colors: dict
    spacing: dict
    borderRadius: dict
    animation: dict
    shadow: dict
    font: str
    projectName: str  # Add this field to match what frontend is sending
@app.post("/generate-styles")
async def generate_styles(style_config: StyleConfig):
    try:
        # Extract project name from the request
        project_name = style_config.projectName
        style_dict = style_config.dict()
        
        # Remove projectName from the dict before passing to generate_css_variables
        style_dict.pop('projectName', None)
        
        # Generate CSS content with project name
        css_content = generate_css_variables(style_dict, project_name)
        
        # Define the output path using the project name
        frontend_dir = os.path.join(os.getcwd(), f"generated_{project_name}_frontend")
        output_path = os.path.join(frontend_dir, "src", "styles", "variables.css")
        
        # Ensure the styles directory exists
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Save the CSS file
        save_css_file(css_content, output_path)
        from pydantic import BaseModel
        
        class StructureConfig(BaseModel):
            projectName: str
            loginConfig: dict
            sidebarConfig: dict
            projectConfig: dict
            layoutType: str
        
        @app.post("/generate-structure")
        async def generate_structure(structure_config: StructureConfig):
            try:
                project_name = structure_config.projectName
                frontend_dir = os.path.join(os.getcwd(), f"generated_{project_name}_frontend")
                        
                # Generate login component if enabled
                if structure_config.loginConfig["enabled"]:
                    login_generator = LoginGenerator()
                    login_path = login_generator.generate_login_component(
                        structure_config.loginConfig,
                        frontend_dir
                    )
                    print(f"Login component generated at: {login_path}")
        
                # Generate components
                component_handler = ComponentHandler()
                components_config = {
                    "pages": {
                        "main": {
                            "components": [
                                # Add your component configurations here based on the layout type
                                {
                                    "id": "main-layout",
                                    "name": structure_config.layoutType,
                                    "componentType": "reusable",
                                    "features": {
                                        "reusableComponents": ["navbar", "sidebar", "content"]
                                    },
                                    "layoutComponente": {
                                        "lg": [
                                            # Layout configuration will be based on the selected layout type
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                }
                processed_components = component_handler.process_components_config(components_config)
        
                # Generate pages
                page_handler = PageHandler()
                pages_config = {
                    "pages": {
                        "main": {
                            "name": "Main Layout",
                            "path": "/",
                            "layout": {
                                "type": "single",
                                "columns": 12,
                                "gap": "4"
                            },
                            "components": processed_components
                        }
                    }
                }
                processed_pages = page_handler.process_pages_config(pages_config)
        
                return {
                    "status": "success",
                    "message": "Structure generated successfully",
                    "project": {
                        "name": project_name,
                        "frontend_path": frontend_dir,
                        "components": processed_components,
                        "pages": processed_pages
                    }
                }
            except Exception as e:
                import traceback
                error_details = traceback.format_exc()
                print(f"Error details: {error_details}")
                raise HTTPException(
                    status_code=500, 
                    detail=f"Internal server error: {str(e)}\n{error_details}"
                )
@app.get("/list-projects")
async def list_projects():
    try:
        # Get the path to the python directory
        current_dir = os.path.dirname(os.path.abspath(__file__))
        
        # List all directories that start with "generated_" and end with "_frontend"
        projects = [
            d.replace("generated_", "").replace("_frontend", "")
            for d in os.listdir(current_dir)
            if os.path.isdir(os.path.join(current_dir, d))
            and d.startswith("generated_")
            and d.endswith("_frontend")
        ]
        
        return {"projects": projects}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
if __name__ == "__main__":
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
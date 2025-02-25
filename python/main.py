from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
from typing import List
from creacionproyecto import Project, ProjectCreate, ProjectService
import os

# Load environment variables
load_dotenv()

# Create FastAPI app instance
app = FastAPI(
    title="Project Bolt API",
    description="API for Project Bolt application",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/")
async def read_root():
    return {"message": "Welcome to Project Bolt API"}

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Project endpoints
@app.post("/projects/", response_model=Project)
async def create_project(project: ProjectCreate):
    return await ProjectService.create_project(project)

@app.get("/projects/", response_model=List[Project])
async def list_projects():
    return await ProjectService.list_projects()

@app.get("/projects/{project_id}", response_model=Project)
async def get_project(project_id: int):
    project = await ProjectService.get_project(project_id)
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@app.put("/projects/{project_id}", response_model=Project)
async def update_project(project_id: int, project: ProjectCreate):
    updated_project = await ProjectService.update_project(project_id, project)
    if updated_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return updated_project

@app.delete("/projects/{project_id}")
async def delete_project(project_id: int):
    deleted = await ProjectService.delete_project(project_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
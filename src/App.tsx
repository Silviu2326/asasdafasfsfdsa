import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProjectConfig from './pages/ProjectConfig';
import Styling from './pages/Styling';
import Structure from './pages/Structure';
import Backend from './pages/Backend';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Routes>
          <Route path="/project-config" element={<ProjectConfig />} />
          <Route path="/styling" element={<Styling />} />
          <Route path="/structure" element={<Structure />} />
          <Route path="/backend" element={<Backend />} />
          <Route path="*" element={<Navigate to="/project-config" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
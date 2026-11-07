import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './src/components/layout/Layout';
import Home from './src/pages/Home';
import About from './src/pages/About';
import Skills from './src/pages/Skills';
import Projects from './src/pages/Projects';
import ProjectDetail from './src/pages/ProjectDetail';
import Experience from './src/pages/Experience';
import Contact from './src/pages/Contact';
import NotFound from './src/pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="skills" element={<Skills />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="experience" element={<Experience />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

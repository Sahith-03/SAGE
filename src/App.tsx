import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import TeamPage from './pages/TeamPage';
import BlogsPage from './pages/BlogsPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import PageLoader from './components/PageLoader';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <PageLoader onComplete={() => setLoading(false)} />}
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="blogs" element={<BlogsPage />} />
            <Route path="blogs/:id" element={<BlogPostPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="careers" element={<CareersPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;

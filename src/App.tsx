import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Generate } from './pages/Generate';
import { History } from './pages/History';
import { Settings } from './pages/Settings';
import { Restricted } from './pages/Restricted';
import { Suggestions } from './pages/Suggestions';
import { Templates } from './pages/Templates';
import { Translated } from './pages/Translated';
import { BlogProvider } from './context/BlogContext';
import './App.css';

function App() {
  return (
    <BlogProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/generate" element={<Generate />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/restricted" element={<Restricted />} />
              <Route path="/suggestions" element={<Suggestions />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/translated" element={<Translated />} />
            </Routes>
          </main>
        </div>
      </Router>
    </BlogProvider>
  );
}

export default App;
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import DashboardPage from './pages/DashboardPage';
import EventsPage from './pages/EventsPage';
import HelpPage from './pages/HelpPage';
import FaqPage from './pages/Faq';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/events" element={<EventsPage />} />
          <Route path="/help" element={<HelpPage />} >
              <Route path="faq" element={<FaqPage />} >
          </Route>
        </Route>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

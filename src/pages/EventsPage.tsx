import React from 'react';
import Header from '../components/header/Header';
import './pages.scss';

const EventsPage: React.FC = () => {
  return (
    <div className="page-container">
      <Header />
      <div className="page-content">
        <h1>Events Page</h1>
      </div>
    </div>
  );
};

export default EventsPage;
import React from 'react';
import Header from '../components/header/Header';
import './pages.scss';

const HelpPage: React.FC = () => {
  return (
    <div className="page-container">
      <Header />
      <div className="page-content">
        <h1>Help Page</h1>
      </div>
    </div>
  );
};

export default HelpPage;
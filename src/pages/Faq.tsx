import React from 'react';
import Header from '../components/header/Header';
import './pages.scss';

const FaqPage: React.FC = () => {
  return (
    <div className="page-container">
      <Header />
      <div className="page-content">
        <h1>FAQ Page</h1>
      </div>
    </div>
  );
};

export default FaqPage;
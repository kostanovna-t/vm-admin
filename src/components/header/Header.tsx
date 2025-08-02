import React, { useState } from 'react';
import Logo from '../../assets/logo.svg';
import Account from './Account';
import './Header.scss';
import Menu from './Menu';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-logo">
          <Logo />
        </div>
        <Menu isOpen={isMenuOpen} onClose={closeMenu} />
        <Account />
      </div>
    </header>
  );
};

export default Header;
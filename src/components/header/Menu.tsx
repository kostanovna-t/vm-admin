import React, { useState } from 'react';
import './Menu.scss';
import { MENU_ITEMS, MenuItem } from '../../constants/menu';
import { NavLink } from "react-router-dom";

interface MenuProps {
  isOpen: boolean;
  onClose?: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleLinkClick = (): void => {
    if (onClose) {
      onClose();
    }
    setOpenSubmenu(null);
  };

  const handleSubmenuToggle = (href: string): void => {
    setOpenSubmenu(openSubmenu === href ? null : href);
  };

  const isActivePage = (href: string): boolean => {
    return window.location.pathname === href;
  };

  const renderMenuItem = (item: MenuItem): React.JSX.Element => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isSubmenuOpen = openSubmenu === item.href;
    const isActive = isActivePage(item.href);

    return (
      <li key={item.href} className="menu-item">
        {hasSubmenu ? (
          <div className="menu-item-with-submenu">
            <NavLink
              to={item.href}
              className={`menu-link submenu-trigger ${isActive ? 'active' : ''}`}
              onClick={() => handleSubmenuToggle(item.href)}
              aria-expanded={isSubmenuOpen}
            >
              {item.label}
              <svg
                className={`submenu-arrow ${isSubmenuOpen ? 'open' : ''}`}
                width="12"
                height="6"
                viewBox="0 0 12 6"
                fill="none"
              >
                <path d="M1 1L6 5L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </NavLink>
            {hasSubmenu && item.submenu && (
              <ul className={`submenu ${isSubmenuOpen ? 'open' : ''}`}>
                {item.submenu.map((subItem) => (
                  <li key={subItem.href} className="submenu-item">
                    <NavLink
                      to={subItem.href}
                      className={`submenu-link ${isActivePage(subItem.href) ? 'active' : ''}`}
                      onClick={handleLinkClick}
                    >
                      {subItem.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <NavLink
            to={item.href}
            className={`menu-link ${isActive ? 'active' : ''}`}
            onClick={handleLinkClick}
          >
            {item.label}
          </NavLink>
        )}
      </li>
    );
  };

  return (
    <nav className={`header-menu ${isOpen ? 'open' : ''}`}>
      <ul className="menu-list">
        {MENU_ITEMS.map(renderMenuItem)}
      </ul>
    </nav>
  );
};

export default Menu;

import React from 'react';

const MenuButton = ({ onClick }) => {
  return (
    <button className="menu-button" onClick={onClick}>
      <div className="menu-button-icon">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span className="menu-button-text">Menu</span>
    </button>
  );
};

export default MenuButton;

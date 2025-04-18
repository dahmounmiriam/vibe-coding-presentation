import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const MenuOverlay = ({ isOpen, onClose, onSelectSection, currentSection }) => {
  const menuRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const { language } = useLanguage();

  // Get section titles from translations based on current language
  const sectionTitles = translations.sections[language];

  const menuItems = [
    { id: 0, title: sectionTitles[0], icon: '🚀', color: '#6e56cf' },
    { id: 1, title: sectionTitles[1], icon: '🧬', color: '#ff4d4d' },
    { id: 2, title: sectionTitles[2], icon: '🧠', color: '#4d4dff' },
    { id: 3, title: sectionTitles[3], icon: '✨', color: '#00c6ff' },
    { id: 4, title: sectionTitles[4], icon: '🔍', color: '#ff9d00' },
    { id: 5, title: sectionTitles[5], icon: '🛠️', color: '#00cf9d' },
    { id: 6, title: sectionTitles[6], icon: '💻', color: '#cf56cf' },
    { id: 7, title: sectionTitles[7], icon: '🔮', color: '#56cfcf' },
    { id: 8, title: sectionTitles[8], icon: '🤖', color: '#ff6b6b' },
    { id: 9, title: sectionTitles[9], icon: '📊', color: '#4ecdc4' },
    { id: 10, title: sectionTitles[10], icon: '📖', color: '#ffd166' }
  ];

  useEffect(() => {
    if (isOpen && menuRef.current) {
      // Animate menu opening
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );

      // Animate menu items
      gsap.fromTo(
        '.menu-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out'
        }
      );
    }
  }, [isOpen]);

  const handleSelectSection = (sectionId) => {
    onSelectSection(sectionId);
    onClose();
  };

  const handleMouseEnter = (itemId) => {
    setHoveredItem(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  if (!isOpen) return null;

  return (
    <div className="menu-overlay">
      <div className="menu-container" ref={menuRef}>
        <div className="menu-header">
          <h2>{translations.ui.menu.title[language]}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="menu-items">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className={`menu-item ${currentSection === item.id ? 'active' : ''}`}
              onClick={() => handleSelectSection(item.id)}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
              style={{
                borderColor: currentSection === item.id ? item.color : 'transparent',
                background: hoveredItem === item.id || currentSection === item.id
                  ? `linear-gradient(90deg, rgba(0,0,0,0.3), ${item.color}33)`
                  : 'transparent'
              }}
            >
              <div className="menu-item-icon" style={{ backgroundColor: item.color }}>
                {item.icon}
              </div>
              <div className="menu-item-content">
                <h3>{item.title}</h3>
              </div>
              {currentSection === item.id && (
                <div className="current-indicator">
                  <span>{translations.ui.controls.current[language]}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="menu-footer">
          <p>Navigate through the presentation by selecting a section</p>
        </div>
      </div>
    </div>
  );
};

export default MenuOverlay;

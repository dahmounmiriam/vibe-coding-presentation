import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const BiographyButton = ({ onShowBiography }) => {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="biography-button"
      onClick={onShowBiography}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Show Biography"
    >
      <span className="biography-icon">📖</span>
      <span className="biography-text">
        {translations.ui.biography[language]}
      </span>
      {isHovered && (
        <span className="biography-tooltip">
          {translations.bibliography.karpathy.name[language]}
        </span>
      )}
    </button>
  );
};

export default BiographyButton;

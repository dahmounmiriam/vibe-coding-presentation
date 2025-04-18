import React, { useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import { gsap } from 'gsap';

const BiographyModal = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const modalRef = useRef(null);
  
  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Animate modal opening
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="biography-modal" 
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-button" onClick={onClose}>×</button>
        
        <h2>{translations.bibliography.title[language]}</h2>
        
        <div className="bio-card modal-bio-card">
          <div className="bio-image-container">
            <div className="placeholder-image">
              <div className="placeholder-initials">AK</div>
            </div>
          </div>
          <div className="bio-content">
            <h3>{translations.bibliography.karpathy.name[language]}</h3>
            <h4>{translations.bibliography.karpathy.title[language]}</h4>
            
            <p className="bio-text">
              {translations.bibliography.karpathy.bio[language]}
            </p>
            
            <div className="bio-achievements">
              <h5>Achievements</h5>
              <ul>
                {translations.bibliography.karpathy.achievements[language].map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>
            
            <blockquote className="bio-quote">
              {translations.bibliography.karpathy.quote[language]}
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiographyModal;

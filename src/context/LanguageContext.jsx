import React, { createContext, useState, useContext } from 'react';

// Create the language context
const LanguageContext = createContext();

// Available languages
export const languages = {
  EN: 'English',
  FR: 'Français',
  AR: 'العربية'
};

// Language provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('EN');

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

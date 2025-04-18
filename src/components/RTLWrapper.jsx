import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Component to handle RTL direction for Arabic language
const RTLWrapper = ({ children }) => {
  const { language } = useLanguage();
  
  useEffect(() => {
    // Set the dir attribute on the html element based on language
    if (language === 'AR') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.body.classList.add('rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.body.classList.remove('rtl');
    }
  }, [language]);

  return <>{children}</>;
};

export default RTLWrapper;

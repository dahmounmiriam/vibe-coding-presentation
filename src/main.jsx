import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './MenuOverlay.css'
import './MenuButton.css'
import './LanguageSelector.css'
import './BiographyButton.css'
import { LanguageProvider } from './context/LanguageContext'
import RTLWrapper from './components/RTLWrapper'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <RTLWrapper>
        <App />
      </RTLWrapper>
    </LanguageProvider>
  </React.StrictMode>,
)

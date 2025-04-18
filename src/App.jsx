import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { gsap } from 'gsap';
import Scene from './components/Scene';
import PresentationContent from './components/PresentationContent';
import MenuButton from './components/MenuButton';
import MenuOverlay from './components/MenuOverlay';
import LanguageSelector from './components/LanguageSelector';
import BiographyButton from './components/BiographyButton';
import BiographyModal from './components/BiographyModal';
import { useLanguage } from './context/LanguageContext';
import { translations } from './translations';

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [biographyOpen, setBiographyOpen] = useState(false);
  const progressRef = useRef(null);
  const { language } = useLanguage();

  // Get section titles from translations based on current language
  const sections = translations.sections[language];

  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${(currentSection / (sections.length - 1)) * 100}%`,
        duration: 0.5,
        ease: 'power2.out'
      });
    }

    const handleKeyDown = (e) => {
      if (menuOpen) {
        if (e.key === 'Escape') {
          setMenuOpen(false);
        }
        return;
      }

      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSection();
      } else if (e.key === 'ArrowLeft') {
        prevSection();
      } else if (e.key === 'c') {
        setShowControls(prev => !prev);
      } else if (e.key === 'm') {
        setMenuOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, menuOpen]);

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const handleSelectSection = (sectionId) => {
    setCurrentSection(sectionId);
  };

  return (
    <>
      <div className="progress-bar" ref={progressRef}></div>
      {!menuOpen && (
        <div className="section-indicator">
          {currentSection + 1}/{sections.length}: {sections[currentSection]}
        </div>
      )}

      <LanguageSelector />
      <BiographyButton onShowBiography={() => setBiographyOpen(true)} />
      <MenuButton onClick={toggleMenu} />

      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 15, 30]} />

        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <Scene currentSection={currentSection} />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.5}
        />

        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>

      <PresentationContent currentSection={currentSection} />

      {showControls && !menuOpen && (
        <div className="controls">
          <button onClick={prevSection} disabled={currentSection === 0}>
            {translations.ui.controls.previous[language]}
          </button>
          <button onClick={nextSection} disabled={currentSection === sections.length - 1}>
            {translations.ui.controls.next[language]}
          </button>
        </div>
      )}

      <MenuOverlay
        isOpen={menuOpen}
        onClose={toggleMenu}
        onSelectSection={handleSelectSection}
        currentSection={currentSection}
      />

      <BiographyModal
        isOpen={biographyOpen}
        onClose={() => setBiographyOpen(false)}
      />
    </>
  );
}

export default App;

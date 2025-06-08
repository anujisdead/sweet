import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import AuthModal from './AuthModal';

const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.text};
  position: relative;
  overflow: hidden;
  transition: ${props => props.theme.transition};
`;

const Header = styled.header`
  display: flex;
  justify-content: flex-end;
  padding: 2rem;
  gap: 2rem;
  z-index: 2;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: ${props => props.theme.transition};

  &:hover {
    color: ${props => props.theme.buttonHover};
  }
`;

const ThemeToggle = styled(motion.button)`
  position: fixed;
  top: 2rem;
  left: 2rem;
  background: none;
  border: none;
  color: ${props => props.theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 3;
  transition: ${props => props.theme.transition};

  &:hover {
    color: ${props => props.theme.buttonHover};
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 2rem;
  z-index: 2;
`;

const Synopsis = styled.div`
  max-width: 600px;
  text-align: center;
  font-size: 1.2rem;
  line-height: 1.6;
  margin-top: 2rem;
  color: ${props => props.theme.secondary};
`;

const SweetHeading = styled.h1`
  font-family: 'Courier New', monospace;
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
`;

const RollingTitles = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
`;

const Title = styled(motion.div)`
  font-size: 28pt;
  font-family: 'Courier New', monospace;
  color: ${props => props.theme.titleColor};
  white-space: nowrap;
  position: absolute;
  letter-spacing: 4px;
  text-transform: uppercase;
  font-weight: 600;
  width: 100%;
  text-align: center;
  padding: 0 2rem;
`;

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme, isDark, toggleTheme } = useTheme();
  const [currentTitle, setCurrentTitle] = useState(0);

  const titles = [
    "In the world of cinema, every frame tells a story...",
    "Where creativity meets technology, magic happens...",
    "From script to screen, we bring your vision to life...",
    "Collaborate, create, and celebrate the art of filmmaking...",
    "Every project is a journey, every story is unique...",
    "Where dreams transform into moving pictures...",
    "Capturing moments that last forever...",
    "The future of filmmaking is here...",
    "Your story deserves to be told...",
    "Innovation meets imagination..."
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 3500);
    return () => clearTimeout(timer);
  }, [currentTitle, titles.length]);

  const handleAuthClick = (mode) => {
    setActiveTab(mode);
    setIsModalOpen(true);
  };

  return (
    <AuthContainer theme={theme}>
      <ThemeToggle
        theme={theme}
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDark ? '☀️' : '🌙'}
      </ThemeToggle>

      <Header>
        <NavButton theme={theme} onClick={() => handleAuthClick('login')}>Login</NavButton>
        <NavButton theme={theme} onClick={() => handleAuthClick('signup')}>Sign Up</NavButton>
      </Header>

      <MainContent>
        <SweetHeading>{'{sweet}.'}</SweetHeading>
      </MainContent>

      <RollingTitles>
        <AnimatePresence mode="wait">
          <Title
            key={currentTitle}
            theme={theme}
            initial={{ y: '100vh', opacity: 0 }}
            animate={{ y: '0vh', opacity: 0.9 }}
            exit={{ y: '-100vh', opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            {titles[currentTitle]}
          </Title>
        </AnimatePresence>
      </RollingTitles>

      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialMode={activeTab}
      />
    </AuthContainer>
  );
};

export default AuthPage; 
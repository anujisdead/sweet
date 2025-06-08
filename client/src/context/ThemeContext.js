import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  dark: {
    background: '#000000',
    text: '#ffffff',
    primary: '#ffd700',
    secondary: 'rgba(255, 255, 255, 0.8)',
    titleColor: 'rgba(255, 255, 255, 0.5)',
    buttonHover: '#ffd700',
    transition: 'all 0.3s ease',
    font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
  },
  light: {
    background: '#ffffff',
    text: '#000000',
    primary: '#1a1a1a',
    secondary: 'rgba(0, 0, 0, 0.8)',
    titleColor: 'rgba(0, 0, 0, 0.4)',
    buttonHover: '#1a1a1a',
    transition: 'all 0.3s ease',
    font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  const theme = isDark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext); 
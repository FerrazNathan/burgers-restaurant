// ThemeSwitcher.tsx
import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const ThemeSwitcher: React.FC = () => {
  const { theme, updateTheme } = useTheme();

  // Função para alternar entre temas: light, dark e contrast
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'contrast' : 'light';
    updateTheme(newTheme);
  };

  return (
    <button onClick={toggleTheme}>
      Mudar para o tema {theme === 'light' ? 'dark' : theme === 'dark' ? 'contrast' : 'light'}
    </button>
  );
};

export { ThemeSwitcher };

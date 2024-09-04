import React, { useState } from 'react';
import { useTheme } from '../../../../hooks/useTheme';
import { IoContrastSharp } from "react-icons/io5";
import { CiSun } from 'react-icons/ci';
import { FaRegMoon } from 'react-icons/fa';
import { Switch } from '../Switch/Switch'

import * as S from './styles';

const ThemeSwitcher: React.FC = () => {
  const { theme, updateTheme } = useTheme();
  const [previousTheme, setPreviousTheme] = useState<'light' | 'dark'>('light'); // Para armazenar o tema anterior quando estiver em modo contraste
  const themeDarkMode = theme === 'dark';
  const themeContrast = theme === 'contrast';
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  // Função para alternar para o modo de contraste ou voltar ao tema anterior
  const toggleContrastTheme = () => {
    if (themeContrast) {
      updateTheme(previousTheme); // Volta ao tema anterior (light ou dark)
    } else {
      setPreviousTheme(theme as 'light' | 'dark'); // Salva o tema atual antes de mudar para contraste
      updateTheme('contrast'); // Muda para o tema de contraste
    }
  };

  // Função para alternar entre temas light e dark
  const toggleLightDarkTheme = () => {
    const newTheme = themeDarkMode ? 'light' : 'dark';
    updateTheme(newTheme);
  };

  // Muda o tema para 'light'
  const switchToLight = () => {
    if (theme !== 'light') {
      updateTheme('light');
    }
  };

  // Muda o tema para 'dark'
  const switchToDark = () => {
    if (theme !== 'dark') {
      updateTheme('dark');
    }
  };

  return (
    <S.ContainerComponent contrast={themeContrast}>
      <S.ButtonChangeTheme 
        contrast={themeContrast}
        onClick={toggleContrastTheme}
      >
        <IoContrastSharp size={18} />
      </S.ButtonChangeTheme>

      <S.Divider> | </S.Divider>

      <S.ButtonChangeTheme 
        contrast={themeContrast}
        onClick={switchToLight}
      >
        <CiSun size={24} />
      </S.ButtonChangeTheme>

      <Switch
        active={themeDarkMode}
        contrast={themeContrast}
        onChangeSwitch={toggleLightDarkTheme}
      />

      <S.ButtonChangeTheme 
        contrast={themeContrast}
        onClick={switchToDark}
      >
        <FaRegMoon size={20} />
      </S.ButtonChangeTheme>
    </S.ContainerComponent>
  );
};

export { ThemeSwitcher };

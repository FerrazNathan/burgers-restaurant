import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Loading } from '../index';
import { themes } from '../../../configs/themes';
import { ThemeProvider } from 'styled-components';

describe('Componente Loading', () => {
  test('Renderiza o componente Loading corretamente', () => {
    render(
      <ThemeProvider theme={themes.light}>
        <Loading />
      </ThemeProvider>
    );
    expect(screen.getByTestId('componente-loading')).toBeInTheDocument();
  });

  test('Verifica se o componente Loading recebeu uma descrição', () => {
    const description = 'Loading, please wait...';
    render(
      <ThemeProvider theme={themes.light}>
        <Loading description={description} />
      </ThemeProvider>
    );
    expect(screen.getByText(description)).toBeInTheDocument();
  });

});

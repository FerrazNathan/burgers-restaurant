import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Loading } from '../index';

describe('Componente Loading', () => {
  test('Renderiza o componente Loading corretamente', () => {
    render(<Loading />);
    expect(screen.getByTestId('componente-loading')).toBeInTheDocument();
  });

  test('Verifica se o componente Loading recebeu uma descrição', () => {
    const description = 'Loading, please wait...';
    render(<Loading description={description} />);
    expect(screen.getByText(description)).toBeInTheDocument();
  });

});

import React from 'react';
import { render, screen } from '@testing-library/react';

import { ContactList } from '../index';
import { themes } from '../../../configs/themes';
import { ThemeProvider } from 'styled-components';

describe('ContactList Component', () => {

  test('Renderiza o título corretamente', () => {
    render(
      <ThemeProvider theme={themes.light}>
        <ContactList />
      </ThemeProvider>
    );
  
    const title = screen.getByTestId('title-section');
  
    expect(title).toBeInTheDocument();
  });
  
  test('Renderiza os ícones corretamente', () => {
    render(
      <ThemeProvider theme={themes.light}>
        <ContactList />
      </ThemeProvider>
    );

    const whatsAppIcon = screen.getByTestId('social-media-item-Whatsapp');
    const telefoneIcon = screen.getByTestId('social-media-item-Telefone');
    const emailIcon = screen.getByTestId('social-media-item-Email');
    const celularIcon = screen.getByTestId('social-media-item-Celular');
    const directIcon = screen.getByTestId('social-media-item-Direct');
    const messengerIcon = screen.getByTestId('social-media-item-Messenger');

    expect(whatsAppIcon).toBeInTheDocument();
    expect(telefoneIcon).toBeInTheDocument();
    expect(emailIcon).toBeInTheDocument();
    expect(celularIcon).toBeInTheDocument();
    expect(directIcon).toBeInTheDocument();
    expect(messengerIcon).toBeInTheDocument();
  });
});

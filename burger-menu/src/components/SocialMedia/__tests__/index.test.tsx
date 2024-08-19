import React from 'react';
import { render, screen } from '@testing-library/react';

import { SocialMedia } from '../index';
import { themes } from '../../../configs/themes';
import { ThemeProvider } from 'styled-components';

describe('SocialMedia Component', () => {

  test('Renderiza o título corretamente', () => {
    render(
      <ThemeProvider theme={themes.light}>
        <SocialMedia />
      </ThemeProvider>
    );
  
    const title = screen.getByTestId('title-section');
  
    expect(title).toBeInTheDocument();
  });
  
  test('Renderiza os ícones corretamente', () => {
    render(
      <ThemeProvider theme={themes.light}>
        <SocialMedia />
      </ThemeProvider>
    );

    const instagramIcon = screen.getByTestId('social-media-item-Instagram');
    const linkedinIcon = screen.getByTestId('social-media-item-Linkedin');
    const facebookIcon = screen.getByTestId('social-media-item-Facebook');
    const youtubeIcon = screen.getByTestId('social-media-item-Youtube');
    const githubIcon = screen.getByTestId('social-media-item-Github');
    const twitterIcon = screen.getByTestId('social-media-item-Twitter');

    expect(instagramIcon).toBeInTheDocument();
    expect(linkedinIcon).toBeInTheDocument();
    expect(facebookIcon).toBeInTheDocument();
    expect(youtubeIcon).toBeInTheDocument();
    expect(githubIcon).toBeInTheDocument();
    expect(twitterIcon).toBeInTheDocument();
  });
});

import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';

import { MenuCategories } from '../index';
import { themes } from '../../../configs/themes';
import { ThemeProvider } from 'styled-components';
import { MockResponse } from '../../../__mocks__/mockResponse';

type DispatchExts = ThunkDispatch<{}, undefined, Action>;

const middlewares = [thunk];
const mockStore = configureMockStore<{}, DispatchExts>([]);

const initialState = {};

let store: MockStoreEnhanced<{}, DispatchExts>;

beforeEach(() => {
  store = mockStore(initialState);
});

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    };
  },
}));

describe('MenuCategories Component', () => {
  test('Renderiza corretamente as imagens e botões do menu de categorias', async () => {
    const menuItemsCategoriesProps = MockResponse.categories.map((item) => item.category);
    const menuItemsImagesProps = MockResponse.categories.map((item) => item.image);
  
    const { getAllByTestId } = render(
      <ThemeProvider theme={themes.light}>
        <Provider store={store}>
          <MenuCategories itemsMenu={MockResponse} />
        </Provider>
      </ThemeProvider>
    );
  
    await waitFor(() => {
      const menuCategoriesImages = getAllByTestId('menu-categories-image');
      const menuCategoriesButtons = getAllByTestId('menu-categories-button');
  
      expect(menuCategoriesImages.length).toBe(menuItemsImagesProps.length);
      menuCategoriesImages.forEach((img, index) => {
        const expectedSrc = encodeURIComponent(menuItemsImagesProps[index]);
        expect(img.getAttribute('src')).toContain(`/_next/image?url=${expectedSrc}`);
      });
  
      expect(menuCategoriesButtons.length).toBe(menuItemsCategoriesProps.length);
      menuCategoriesButtons.forEach((btn, index) => {
        expect(btn).toHaveTextContent(menuItemsCategoriesProps[index]);
      });
    });
  });
  
  test('Renderiza corretamente os accordions', async () => {
    const { getAllByTestId } = render(
      <ThemeProvider theme={themes.light}>
        <Provider store={store}>
          <MenuCategories itemsMenu={MockResponse} />
        </Provider>
      </ThemeProvider>
    );
  
    await waitFor(() => {
      const accordions = getAllByTestId(/^accordion-\d+$/);
      expect(accordions.length).toBe(MockResponse.categories.length);
    });
  });  

  test('Renderiza corretamente os detalhes do accordion', async () => {
    const { getAllByTestId } = render(
      <ThemeProvider theme={themes.light}>
        <Provider store={store}>
          <MenuCategories itemsMenu={MockResponse} />
        </Provider>
      </ThemeProvider>
    );

    await waitFor(() => {
      const accordionDetails = getAllByTestId(/accordion-details-/);
      const allItems = MockResponse.categories.flatMap((item) => item.products.map((product) => product.name));
      expect(accordionDetails.length).toBe(allItems.length);
    });
  });

  test('Expande e recolhe os accordions corretamente', async () => {
    const { getAllByTestId } = render(
      <ThemeProvider theme={themes.light}>
        <Provider store={store}>
          <MenuCategories itemsMenu={MockResponse} />
        </Provider>
      </ThemeProvider>
    );
  
    const accordionButtons = getAllByTestId('menu-categories-button');
  
    fireEvent.click(accordionButtons[0]);
  
    waitFor(() => {
      const accordion = screen.getByTestId('accordion-0');
      expect(accordion).toHaveAttribute('aria-expanded', 'true');
    });
  
    fireEvent.click(accordionButtons[1]);
  
    waitFor(() => {
      const accordionCollapsed = screen.getByTestId('accordion-0');
      expect(accordionCollapsed).toHaveAttribute('aria-expanded', 'false');
    });
  
    waitFor(() => {
      const accordionExpanded = screen.getByTestId('accordion-1');
      expect(accordionExpanded).toHaveAttribute('aria-expanded', 'true');
    });
  });
  
  test('Abre o Modal ao clicar nos detalhes do accordion', async () => {
    const { getAllByTestId } = render(
      <ThemeProvider theme={themes.light}>
        <Provider store={store}>
          <MenuCategories itemsMenu={MockResponse} />
        </Provider>
      </ThemeProvider>
    );

    await waitFor(() => {
      const accordionDetails = getAllByTestId(/accordion-details-/);

      fireEvent.click(accordionDetails[0]);
      const modalOverlay = screen.getByTestId('modal-overlay');
      expect(modalOverlay).toBeInTheDocument();

      const modalContent = screen.getByTestId('modal-content');
      expect(modalContent).toBeInTheDocument();
    });
  });

  test('Fecha o Modal ao clicar no botão de fechar', async () => {
    const { getAllByTestId } = render(
      <ThemeProvider theme={themes.light}>
        <Provider store={store}>
          <MenuCategories itemsMenu={MockResponse} />
        </Provider>
      </ThemeProvider>
    );

    await waitFor(() => {
      const accordionDetails = getAllByTestId(/accordion-details-/);

      fireEvent.click(accordionDetails[0]);
      const closeButton = screen.getByTestId('close-button');
      expect(closeButton).toBeInTheDocument();

      fireEvent.click(closeButton);
      const modalOverlay = screen.queryByTestId('modal-overlay');
      expect(modalOverlay).not.toBeInTheDocument();
    });
  });
});

import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { MenuCategories } from '../index';
import { MockMenuCategories } from '../Mock/MenuCategories';

type DispatchExts = ThunkDispatch<{}, undefined, Action>;

const middlewares = [thunk];
const mockStore = configureMockStore<{}, DispatchExts>([]);

const initialState = {};

let store: MockStoreEnhanced<{}, DispatchExts>;

beforeEach(() => {
  store = mockStore(initialState);
});

describe('MenuCategories Component', () => {
  test('Renderiza corretamente as imagens e botões do menu de categorias', async () => {
    const menuItemsCategoriesProps = MockMenuCategories.map((item) => item.name);
    const menuItemsImagesProps = MockMenuCategories.map((item) => item.images[0].image);

    const { getAllByTestId } = render(
      <Provider store={store}>
        <MenuCategories itemsMenu={MockMenuCategories} />
      </Provider>
    );

    waitFor(() => {
      const menuCategoriesImages = getAllByTestId('menu-categories-image');
      const menuCategoriesButtons = getAllByTestId('menu-categories-button');

      expect(menuCategoriesImages.length).toBe(menuItemsImagesProps.length);
      menuCategoriesImages.forEach((img, index) => {
        expect(img).toHaveAttribute('src', menuItemsImagesProps[index]);
      });

      expect(menuCategoriesButtons.length).toBe(menuItemsCategoriesProps.length);
      menuCategoriesButtons.forEach((btn, index) => {
        expect(btn).toHaveTextContent(menuItemsCategoriesProps[index]);
      });
    });
  });

  test('Renderiza corretamente os accordions', async () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <MenuCategories itemsMenu={MockMenuCategories} />
      </Provider>
    );

    waitFor(() => {
      const accordions = getAllByTestId(/accordion-/);
      expect(accordions.length).toBe(MockMenuCategories.length);
    });
  });

  test('Renderiza corretamente os detalhes do accordion', async () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <MenuCategories itemsMenu={MockMenuCategories} />
      </Provider>
    );

    await waitFor(() => {
      const accordionDetails = getAllByTestId(/accordion-details-/);
      const allItems = MockMenuCategories.flatMap((item) => item.items);
      expect(accordionDetails.length).toBe(allItems.length);
    });
  });

  test('Usa imagem padrão quando não há imagem disponível', async () => {
    const mockDataWithoutImage = [
      {
        ...MockMenuCategories[0],
        items: [
          {
            ...MockMenuCategories[0].items[0],
            images: [],
          },
        ],
      },
    ];

    const { getByTestId } = render(
      <Provider store={store}>
        <MenuCategories itemsMenu={mockDataWithoutImage} />
      </Provider>
    );

    waitFor(() => {
      const defaultImage = getByTestId('image-details-0');
      expect(defaultImage).toHaveAttribute('src', '/imageDefault.png');
    });
  });

  test('Expande e recolhe os accordions corretamente', async () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <MenuCategories itemsMenu={MockMenuCategories} />
      </Provider>
    );

    waitFor(() => {
      const accordionButtons = getAllByTestId('menu-categories-button');

      fireEvent.click(accordionButtons[0]);
      const accordion = screen.getByTestId('accordion-0');
      expect(accordion).toHaveAttribute('aria-expanded', 'true');

      fireEvent.click(accordionButtons[1]);
      const accordionCollapsed = screen.getByTestId('accordion-0');
      expect(accordionCollapsed).toHaveAttribute('aria-expanded', 'false');
    });
  });

  test('Abre o Modal ao clicar nos detalhes do accordion', async () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <MenuCategories itemsMenu={MockMenuCategories} />
      </Provider>
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
      <Provider store={store}>
        <MenuCategories itemsMenu={MockMenuCategories} />
      </Provider>
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


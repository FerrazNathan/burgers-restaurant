import React from "react";
import '@testing-library/jest-dom'
import { useRouter } from 'next/router';
import { render, fireEvent } from '@testing-library/react'

import { Header } from "../index";
import { HeaderData } from "../HeaderData";
import { themes } from '../../../configs/themes';
import { ThemeProvider } from 'styled-components';
import { store } from '../../../store/store';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../../store/cartSlice';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe("Header Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/',
      push: jest.fn(),
    });
  });

  test("Renderiza corretamente o container principal do header", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.light}> 
        <Provider store={store}>
          <Header activePage="Menu" />
        </Provider>
      </ThemeProvider>
    );
    const headerContainer = getByTestId("HeaderContainer");

    expect(headerContainer).toBeInTheDocument();
  });

  test("Verifica se o menu é renderizado corretamente com base nos dados", () => {
    const { getAllByTestId } = render(
      <ThemeProvider theme={themes.light}> 
        <Provider store={store}>
          <Header activePage="Menu" />
        </Provider>
      </ThemeProvider>
    );
    const menuItems = getAllByTestId("menu-item");

    expect(menuItems.length).toEqual(HeaderData.length);

    menuItems.forEach((menuItem: any, index: number) => {
      expect(menuItem).toHaveTextContent(HeaderData[index].page);
    });
  });

  test("Verifica se a imagem do logotipo é renderizada corretamente", () => {
    const { getByAltText } = render(
      <ThemeProvider theme={themes.light}> 
        <Provider store={store}>
          <Header activePage="Menu" />
        </Provider>
      </ThemeProvider>
    );
    const logoImage = getByAltText("Imagem do logotipo do restaurante");

    expect(logoImage).toBeInTheDocument();
  });

  test("Verifica se totalQuantity maior que 0 é exibido corretamente", () => {
    const mockStore = configureStore({
      reducer: { cart: cartReducer },
      preloadedState: {
        cart: {
          totalQuantity: 3,
        },
      },
    });

    const { getByTestId } = render(
      <ThemeProvider theme={themes.light}>
        <Provider store={mockStore}>
          <Header activePage="Menu" />
        </Provider>
      </ThemeProvider>
    );

    const cartQuantity = getByTestId("total-quantity");
    expect(cartQuantity).toHaveTextContent("3");
  });

  test("Verifica o clique no ícone do carrinho e navegação para /cart", () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/',
      push: pushMock,
    });

    const mockStore = configureStore({
      reducer: { cart: cartReducer },
      preloadedState: {
        cart: {
          totalQuantity: 3,
        },
      },
    });

    const { getByTestId } = render(
      <ThemeProvider theme={themes.light}>
        <Provider store={mockStore}>
          <Header activePage="Menu" />
        </Provider>
      </ThemeProvider>
    );

    const cartIcon = getByTestId("cart-icon");
    fireEvent.click(cartIcon);

    expect(pushMock).toHaveBeenCalledWith('/cart');
  });
});

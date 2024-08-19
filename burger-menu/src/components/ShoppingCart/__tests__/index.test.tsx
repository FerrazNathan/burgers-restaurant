import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';

import { ShoppingCart } from '../index';
import { themes } from '../../../configs/themes';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} from '../../../store/cartSlice';

const mockItems = [
  { id: 1, name: 'Item A', price: 10.0, quantity: 2 },
  { id: 2, name: 'Item B', price: 15.0, quantity: 1 },
];

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ShoppingCart Component', () => {
  beforeEach(() => {
    store.dispatch(clearCart());
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/',
      push: jest.fn(),
    });
  });

  test('Renderiza o carrinho vazio inicialmente', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={themes.light}>
        <Provider store={store}>
          <ShoppingCart />
        </Provider>
      </ThemeProvider>
    );

    const emptyCartMessage = getByTestId('container-cart');
    expect(emptyCartMessage).toBeInTheDocument();
  });
});

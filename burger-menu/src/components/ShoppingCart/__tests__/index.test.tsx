import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ShoppingCart } from '../index';
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

describe('ShoppingCart Component', () => {
  beforeEach(() => {
    store.dispatch(clearCart());
  });

  test('Renderiza o carrinho vazio inicialmente', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ShoppingCart />
      </Provider>
    );

    const emptyCartMessage = getByText('Carrinho');
    expect(emptyCartMessage).toBeInTheDocument();
  });
});

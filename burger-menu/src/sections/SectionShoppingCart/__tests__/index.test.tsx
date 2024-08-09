import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MockMenuCategories } from '../../MenuCategories/Mock/MenuCategories'
import { Menu } from '../index';
import { useRouter } from 'next/router';

// Mock do estado do Redux
const mockStore = configureMockStore();
const initialState = { cart: { totalQuantity: 3 } };

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Menu Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
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
    });
  });

  test('Não renderiza o componente ShoppingCart quando totalQuantity é 0', () => {
    const store = mockStore({ cart: { totalQuantity: 0 } });

    const { queryByTestId } = render(
      <Provider store={store}>
        <Menu itemsMenu={MockMenuCategories} />
      </Provider>
    );

    const shoppingCartComponent = queryByTestId('shopping-cart');

    expect(shoppingCartComponent).toBeNull();
  });
});

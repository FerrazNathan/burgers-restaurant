import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MockMenuCategories } from '../../MenuCategories/Mock/MenuCategories'
import { Menu } from '../index';

// Mock do estado do Redux
const mockStore = configureMockStore();
const initialState = { cart: { totalQuantity: 3 } };

describe('Menu Component', () => {
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

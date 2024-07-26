import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definição do tipo CartItem
interface CartItem {
  id: string; // ID do produto da API
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

// Estado inicial do carrinho
interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

// Criação do slice do carrinho
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Adiciona um item ao carrinho ou atualiza a quantidade se o item já existir
    addItem(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);

      if (existingItemIndex >= 0) {
        // Atualiza a quantidade e o preço total
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        // Adiciona um novo item ao carrinho
        state.items.push(newItem);
      }

      // Atualiza a quantidade total e o preço total
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    // Remove um item do carrinho
    removeItem(state, action: PayloadAction<string>) {
      const id = action.payload;
      const itemToRemove = state.items.find(item => item.id === id);

      if (itemToRemove) {
        state.items = state.items.filter(item => item.id !== id);
        state.totalQuantity -= itemToRemove.quantity;
        state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
      }
    },

    // Aumenta a quantidade de um item no carrinho
    increaseItemQuantity(state, action: PayloadAction<string>) {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += item.price;
      }
    },

    // Diminui a quantidade de um item no carrinho
    decreaseItemQuantity(state, action: PayloadAction<string>) {
      const id = action.payload;
      const item = state.items.find(item => item.id === id);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          state.totalQuantity -= 1;
          state.totalPrice -= item.price;
        } else {
          // Remove o item se a quantidade for 1
          state.items = state.items.filter(item => item.id !== id);
          state.totalQuantity -= 1;
          state.totalPrice -= item.price;
        }
      }
    },

    // Limpa todos os itens do carrinho
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

// Exporta as ações para serem usadas nos componentes
export const { addItem, removeItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;

// Exporta o reducer para ser usado na store
export default cartSlice.reducer;

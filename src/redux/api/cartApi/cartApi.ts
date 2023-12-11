import {
  cartAmountInfo,
  cartItemsInfo,
  getcartAmountInfo,
  getcartItemsInfo,
} from '@/services/auth.service';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define the item type for the cart
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  subtotal?: number;
  image: string; // Add an 'image' property to store the image URL
}

// const cartItemsString = localStorage.getItem('cartItems');
// const cartTotalAmount = localStorage.getItem('totalAmount');

// const cartItems = cartItemsString !== null ? JSON.parse(cartItemsString) : [];
// const totalAmount = cartTotalAmount !== null ? JSON.parse(cartTotalAmount) : 0;

interface CartState {
  items: CartItem[];
  totalSum: number; // Add a property to store the total sum
}

const initialState: CartState = {
  items: getcartItemsInfo(),
  totalSum: getcartAmountInfo(), // Initialize total sum as 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { id, name, price, quantity, image } = action.payload; // Include 'image' property
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.subtotal = existingItem.quantity * price;
      } else {
        state.items.push({
          id,
          name,
          price,
          quantity,
          subtotal: price * quantity,
          image, // Include the image URL here
        });
      }

      // Update the total sum
      state.totalSum = state.items.reduce(
        (total, item) => total + (item.subtotal || 0),
        0
      );
      // localStorage.setItem(
      //   'cartItems',
      //   JSON.stringify(state.items.map((item) => item))
      // );
      cartItemsInfo(
        'cartItems',
        JSON.stringify(state.items.map((item) => item))
      );

      // localStorage.setItem('totalAmount', JSON.stringify(state.totalSum));

      cartAmountInfo('totalAmount', JSON.stringify(state.totalSum));
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.subtotal = quantity * existingItem.price;
      }

      // Update the total sum
      state.totalSum = state.items.reduce(
        (total, item) => total + (item.subtotal || 0),
        0
      );
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === itemId);

      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
        // Update the total sum
        state.totalSum = state.items.reduce(
          (total, item) => total + (item.subtotal || 0),
          0
        );
      }
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

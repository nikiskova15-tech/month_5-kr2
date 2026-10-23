import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useShopStore = create(
  persist(
    (set) => ({
      favorites: [],
      cart: [],

      toggleFavorite: (product) =>
        set((state) => ({
          favorites: state.favorites.some((item) => item.id === product.id)
            ? state.favorites.filter((item) => item.id !== product.id)
            : [...state.favorites, product],
        })),

      addToCart: (product) =>
        set((state) => ({
          cart: state.cart.some((item) => item.id === product.id)
            ? state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              )
            : [...state.cart, { ...product, quantity: 1 }],
        })),

      changeQuantity: (id, delta) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? { ...item, quantity: Math.max(1, item.quantity + delta) }
              : item,
          ),
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
    }),
    {
      name: 'forme-shop-state',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
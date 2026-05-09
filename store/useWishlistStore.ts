import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, WishlistItem } from '@/types'

interface WishlistStore {
  items: WishlistItem[]
  isOpen: boolean
  
  // Actions
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  toggleItem: (product: Product) => void
  clearWishlist: () => void
  toggleWishlist: () => void
  openWishlist: () => void
  closeWishlist: () => void
  
  // Computed
  getItemCount: () => number
  isInWishlist: (productId: string) => boolean
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product) => {
        const { items } = get()
        const exists = items.some(item => item.product.id === product.id)
        
        if (!exists) {
          set({
            items: [...items, { 
              product, 
              addedAt: new Date().toISOString() 
            }]
          })
        }
      },

      removeItem: (productId) => {
        const { items } = get()
        set({
          items: items.filter(item => item.product.id !== productId)
        })
      },

      toggleItem: (product) => {
        const { isInWishlist, addItem, removeItem } = get()
        
        if (isInWishlist(product.id)) {
          removeItem(product.id)
        } else {
          addItem(product)
        }
      },

      clearWishlist: () => set({ items: [] }),

      toggleWishlist: () => set(state => ({ isOpen: !state.isOpen })),
      openWishlist: () => set({ isOpen: true }),
      closeWishlist: () => set({ isOpen: false }),

      getItemCount: () => {
        const { items } = get()
        return items.length
      },

      isInWishlist: (productId) => {
        const { items } = get()
        return items.some(item => item.product.id === productId)
      },
    }),
    {
      name: 'bowpaw-wishlist',
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
)


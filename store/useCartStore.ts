import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, ProductVariant, CartItem } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  
  // Actions
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void
  removeItem: (productId: string, variantId?: string) => void
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  
  // Computed
  getItemCount: () => number
  getSubtotal: () => number
  getTax: () => number
  getShipping: () => number
  getTotal: () => number
  isInCart: (productId: string, variantId?: string) => boolean
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, variant) => {
        const { items } = get()
        const existingItemIndex = items.findIndex(
          item => item.product.id === product.id && 
          (variant ? item.variant?.id === variant.id : !item.variant)
        )

        if (existingItemIndex > -1) {
          // Update quantity if item exists
          const newItems = [...items]
          newItems[existingItemIndex].quantity += quantity
          set({ items: newItems })
        } else {
          // Add new item
          set({
            items: [...items, { product, quantity, variant }]
          })
        }
        
        // Open cart sidebar when adding
        set({ isOpen: true })
      },

      removeItem: (productId, variantId) => {
        const { items } = get()
        set({
          items: items.filter(item => 
            !(item.product.id === productId && 
              (variantId ? item.variant?.id === variantId : !item.variant))
          )
        })
      },

      updateQuantity: (productId, quantity, variantId) => {
        const { items } = get()
        if (quantity <= 0) {
          get().removeItem(productId, variantId)
          return
        }

        set({
          items: items.map(item => {
            if (item.product.id === productId && 
                (variantId ? item.variant?.id === variantId : !item.variant)) {
              return { ...item, quantity }
            }
            return item
          })
        })
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getItemCount: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        const { items } = get()
        return items.reduce((total, item) => {
          const price = item.variant?.price || item.product.price
          return total + (price * item.quantity)
        }, 0)
      },

      getTax: () => {
        return get().getSubtotal() * 0.08 // 8% tax
      },

      getShipping: () => {
        const subtotal = get().getSubtotal()
        return subtotal >= 50 ? 0 : 5.99 // Free shipping over $50
      },

      getTotal: () => {
        return get().getSubtotal() + get().getTax() + get().getShipping()
      },

      isInCart: (productId, variantId) => {
        const { items } = get()
        return items.some(item => 
          item.product.id === productId && 
          (variantId ? item.variant?.id === variantId : !item.variant)
        )
      },
    }),
    {
      name: 'bowpaw-cart',
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
)


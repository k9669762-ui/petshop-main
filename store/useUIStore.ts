import { create } from 'zustand'

interface QuickViewProduct {
  id: string
}

interface UIStore {
  // Mobile menu
  isMobileMenuOpen: boolean
  toggleMobileMenu: () => void
  openMobileMenu: () => void
  closeMobileMenu: () => void
  
  // Search
  isSearchOpen: boolean
  toggleSearch: () => void
  openSearch: () => void
  closeSearch: () => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  
  // Quick view modal
  quickViewProduct: QuickViewProduct | null
  openQuickView: (productId: string) => void
  closeQuickView: () => void
  
  // Newsletter popup
  isNewsletterOpen: boolean
  showNewsletter: () => void
  hideNewsletter: () => void
  hasSeenNewsletter: boolean
  setHasSeenNewsletter: () => void
  
  // Recent purchase popup
  isRecentPurchaseOpen: boolean
  recentPurchaseProduct: { name: string; location: string } | null
  showRecentPurchase: (product: { name: string; location: string }) => void
  hideRecentPurchase: () => void
  
  // Loading states
  isPageLoading: boolean
  setPageLoading: (loading: boolean) => void
  
  // Scroll direction for header
  scrollDirection: 'up' | 'down'
  setScrollDirection: (direction: 'up' | 'down') => void
  
  // View mode for shop page
  viewMode: 'grid' | 'list'
  setViewMode: (mode: 'grid' | 'list') => void
}

export const useUIStore = create<UIStore>((set) => ({
  // Mobile menu
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set(state => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  
  // Search
  isSearchOpen: false,
  toggleSearch: () => set(state => ({ isSearchOpen: !state.isSearchOpen })),
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  // Quick view modal
  quickViewProduct: null,
  openQuickView: (productId) => set({ quickViewProduct: { id: productId } }),
  closeQuickView: () => set({ quickViewProduct: null }),
  
  // Newsletter popup
  isNewsletterOpen: false,
  showNewsletter: () => set({ isNewsletterOpen: true }),
  hideNewsletter: () => set({ isNewsletterOpen: false }),
  hasSeenNewsletter: false,
  setHasSeenNewsletter: () => set({ hasSeenNewsletter: true }),
  
  // Recent purchase popup
  isRecentPurchaseOpen: false,
  recentPurchaseProduct: null,
  showRecentPurchase: (product) => set({ 
    isRecentPurchaseOpen: true, 
    recentPurchaseProduct: product 
  }),
  hideRecentPurchase: () => set({ 
    isRecentPurchaseOpen: false, 
    recentPurchaseProduct: null 
  }),
  
  // Loading states
  isPageLoading: false,
  setPageLoading: (loading) => set({ isPageLoading: loading }),
  
  // Scroll direction
  scrollDirection: 'up',
  setScrollDirection: (direction) => set({ scrollDirection: direction }),
  
  // View mode
  viewMode: 'grid',
  setViewMode: (mode) => set({ viewMode: mode }),
}))


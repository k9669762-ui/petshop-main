import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  firebaseSignIn,
  firebaseRegister,
  firebaseSignOut,
  getUserProfile,
  updateUserProfile,
  createOrderInDB,
  getUserOrders,
  getAllOrdersFromDB,
  getAllUsersFromDB,
  updateOrderStatusInDB,
  saveCartToDB,
  getAllCartsFromDB,
  updateCurrentUserPassword,
} from '@/lib/firebaseService'
import { isAdminEmail } from '@/lib/authConfig'

export type UserRole = 'guest' | 'user' | 'owner' | 'admin'
export type AccountStatus = 'active' | 'inactive' | 'suspended'

export interface UserAddress {
  addressLine1: string
  addressLine2?: string
  area: string
  city: string
  district: string
  pincode: string
  state: 'Tamil Nadu'
  country: 'India'
}

export interface User {
  id: string
  name: string
  email?: string
  mobile: string
  avatar?: string
  role: UserRole
  status: AccountStatus
  address?: UserAddress
  createdAt: string
}

export interface UserCart {
  userId: string
  userName: string
  userEmail: string
  items: {
    productId: string
    productName: string
    productImage: string
    price: number
    quantity: number
    variant?: string
  }[]
  total: number
  updatedAt: string
}

export interface Order {
  id: string
  userId: string
  userName: string
  userEmail: string
  userPhone: string
  items: {
    productId: string
    productName: string
    productImage: string
    price: number
    quantity: number
    variant?: string
  }[]
  subtotal: number
  shipping: number
  tax: number
  total: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: UserAddress
  paymentMethod: string
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  createdAt: string
  updatedAt: string
}

interface OTPSession {
  mobile: string
  otp: string
  expiresAt: number
  verified: boolean
}

interface AuthState {
  currentUser: User | null
  isAuthenticated: boolean
  users: User[]
  userCarts: UserCart[]
  orders: Order[]
  otpSession: OTPSession | null

  // Auth actions
  sendOTP: (mobile: string) => { success: boolean; message: string; otp?: string }
  verifyOTP: (mobile: string, otp: string) => { success: boolean; message: string }
  loginWithMobileOTP: (mobile: string) => { success: boolean; message: string }
  loginWithPassword: (emailOrMobile: string, password: string) => Promise<{ success: boolean; message: string }>
  register: (userData: {
    name: string; mobile: string; email?: string; password?: string; address: UserAddress
  }) => { success: boolean; message: string }
  registerWithPassword: (userData: {
    name: string; mobile: string; email: string; password: string; district: string
  }) => Promise<{ success: boolean; message: string }>
  logout: () => Promise<void>
  switchAccount: (userId: string) => void

  // Admin actions
  getAllUserCarts: () => UserCart[]
  getAllOrders: () => Order[]
  getUserOrders: (userId: string) => Order[]
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>
  fetchAdminData: () => Promise<void>

  // User actions
  updateUserCart: (cart: UserCart) => void
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Order>
  getMyOrders: () => Order[]
  fetchMyOrders: () => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<void>
  updatePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>
}

// ── Owner hardcoded credentials (Firebase Auth handles password) ──────
function syncCookie(isAuthenticated: boolean, user: User | null) {
  if (typeof document === 'undefined') return
  try {
    if (!isAuthenticated || !user) {
      document.cookie = 'bowpaw-auth=; path=/; max-age=0'
      return
    }
    const value = encodeURIComponent(JSON.stringify({
      state: { isAuthenticated, currentUser: { id: user.id, role: user.role, email: user.email } },
    }))
    document.cookie = `bowpaw-auth=${value}; path=/; max-age=86400; SameSite=Lax`
  } catch {}
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,
      users: [],
      userCarts: [],
      orders: [],
      otpSession: null,

      // ── OTP (kept for compatibility) ────────────────────────────────
      sendOTP: (mobile) => {
        const mobileRegex = /^[6-9]\d{9}$/
        if (!mobileRegex.test(mobile)) {
          return { success: false, message: 'Please enter a valid 10-digit mobile number' }
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const expiresAt = Date.now() + 5 * 60 * 1000
        set({ otpSession: { mobile, otp, expiresAt, verified: false } })
        return { success: true, message: `OTP sent to ${mobile}. Demo OTP: ${otp}`, otp }
      },

      verifyOTP: (mobile, otp) => {
        const { otpSession } = get()
        if (!otpSession) return { success: false, message: 'No OTP session found.' }
        if (otpSession.mobile !== mobile) return { success: false, message: 'Mobile number mismatch' }
        if (Date.now() > otpSession.expiresAt) {
          set({ otpSession: null })
          return { success: false, message: 'OTP has expired.' }
        }
        if (otpSession.otp !== otp) return { success: false, message: 'Invalid OTP.' }
        set({ otpSession: { ...otpSession, verified: true } })
        return { success: true, message: 'OTP verified successfully!' }
      },

      loginWithMobileOTP: (mobile) => {
        const { otpSession, users } = get()
        if (!otpSession?.verified || otpSession.mobile !== mobile) {
          return { success: false, message: 'Please verify OTP first' }
        }
        const user = users.find(u => u.mobile === mobile)
        if (!user) return { success: false, message: 'No account found with this mobile number.' }
        if (user.status !== 'active') return { success: false, message: 'Account not active.' }
        set({ currentUser: user, isAuthenticated: true, otpSession: null })
        syncCookie(true, user)
        return { success: true, message: 'Login successful!' }
      },

      // ── Firebase login ──────────────────────────────────────────────
      loginWithPassword: async (emailOrMobile, password) => {
        try {
          // Determine if input is email or mobile
          const isEmail = emailOrMobile.includes('@')
          let email = emailOrMobile.trim().toLowerCase()

          if (!isEmail) {
            // Find email by mobile from cached users
            const { users } = get()
            const found = users.find(u => u.mobile === emailOrMobile.replace(/\D/g, ''))
            if (!found?.email) {
              return { success: false, message: 'No account found with this mobile number' }
            }
            email = found.email
          }

          const user = await firebaseSignIn(email, password)
          if (!user) return { success: false, message: 'Account not found in database' }
          if (user.status !== 'active') return { success: false, message: 'Account is not active' }

          set({ currentUser: user, isAuthenticated: true })
          syncCookie(true, user)
          return { success: true, message: 'Login successful!' }
        } catch (err: any) {
          const code = err?.code ?? ''
          if (code === 'auth/user-not-found' || code === 'auth/invalid-credential') {
            return { success: false, message: 'No account found with this email/mobile' }
          }
          if (code === 'auth/wrong-password') {
            return { success: false, message: 'Invalid password' }
          }
          if (code === 'auth/too-many-requests') {
            return { success: false, message: 'Too many attempts. Please try again later.' }
          }
          if (code === 'auth/operation-not-allowed') {
            return { success: false, message: 'Email/password sign-in is not enabled. Please contact support.' }
          }
          if (code === 'auth/network-request-failed') {
            return { success: false, message: 'Network error. Please check your connection.' }
          }
          console.error('Login error:', code, err?.message)
          return { success: false, message: err?.message ?? 'Login failed. Please try again.' }
        }
      },

      // ── Firebase register ───────────────────────────────────────────
      register: () => {
        return { success: false, message: 'Use registerWithPassword instead' }
      },

      registerWithPassword: async (userData) => {
        const mobile = userData.mobile.replace(/\D/g, '')
        const email = userData.email.trim().toLowerCase()

        if (!userData.name.trim()) return { success: false, message: 'Please enter your full name' }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { success: false, message: 'Please enter a valid email address' }
        if (!/^[6-9]\d{9}$/.test(mobile)) return { success: false, message: 'Please enter a valid 10-digit mobile number' }
        if (userData.password.length < 6) return { success: false, message: 'Password must be at least 6 characters' }
        if (isAdminEmail(email)) return { success: false, message: 'This email is not available for registration' }

        try {
          const newUser = await firebaseRegister(email, userData.password, userData.name.trim(), mobile, userData.district)
          set(state => ({
            users: [...state.users, newUser],
            currentUser: newUser,
            isAuthenticated: true,
          }))
          syncCookie(true, newUser)
          return { success: true, message: 'Registration successful!' }
        } catch (err: any) {
          const code = err?.code ?? ''
          if (code === 'auth/email-already-in-use') return { success: false, message: 'Email already registered' }
          if (code === 'auth/operation-not-allowed') return { success: false, message: 'Email/password sign-in is not enabled. Please contact support.' }
          if (code === 'auth/weak-password') return { success: false, message: 'Password is too weak. Use at least 6 characters.' }
          if (code === 'auth/invalid-api-key') return { success: false, message: 'Firebase configuration error. Please contact support.' }
          if (code === 'auth/network-request-failed') return { success: false, message: 'Network error. Please check your connection.' }
          console.error('Register error:', code, err?.message)
          return { success: false, message: err?.message ?? 'Registration failed. Please try again.' }
        }
      },

      // ── Firebase logout ─────────────────────────────────────────────
      logout: async () => {
        await firebaseSignOut()
        set({ currentUser: null, isAuthenticated: false, otpSession: null, orders: [] })
        syncCookie(false, null)
      },

      switchAccount: (userId) => {
        const { currentUser, users } = get()
        if (currentUser?.role !== 'owner') return
        const user = users.find(u => u.id === userId)
        if (user) set({ currentUser: user })
      },

      // ── Admin: fetch all data from Firestore ────────────────────────
      fetchAdminData: async () => {
        const { currentUser } = get()
        if (currentUser?.role !== 'owner') return
        try {
          const [orders, users, carts] = await Promise.all([
            getAllOrdersFromDB(),
            getAllUsersFromDB(),
            getAllCartsFromDB(),
          ])
          set({ orders, users, userCarts: carts })
        } catch (err: any) {
          console.error('Unable to load admin data:', err?.code ?? err?.message ?? err)
          set({ orders: [], users: [], userCarts: [] })
        }
      },

      getAllUserCarts: () => {
        const { currentUser, userCarts } = get()
        if (currentUser?.role === 'owner') return userCarts
        return []
      },

      getAllOrders: () => {
        const { currentUser, orders } = get()
        if (currentUser?.role === 'owner') return orders
        return []
      },

      getUserOrders: (userId) => get().orders.filter(o => o.userId === userId),

      updateOrderStatus: async (orderId, status) => {
        const { currentUser } = get()
        if (currentUser?.role !== 'owner') return
        try {
          await updateOrderStatusInDB(orderId, status)
          set(state => ({
            orders: state.orders.map(o =>
              o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o
            ),
          }))
        } catch (err: any) {
          console.error('Unable to update order status:', err?.code ?? err?.message ?? err)
        }
      },

      // ── User: cart ──────────────────────────────────────────────────
      updateUserCart: (cart) => {
        saveCartToDB(cart).catch(() => {})
        set(state => {
          const idx = state.userCarts.findIndex(c => c.userId === cart.userId)
          if (idx >= 0) {
            const updated = [...state.userCarts]
            updated[idx] = cart
            return { userCarts: updated }
          }
          return { userCarts: [...state.userCarts, cart] }
        })
      },

      // ── User: orders ────────────────────────────────────────────────
      createOrder: async (orderData) => {
        const id = await createOrderInDB(orderData)
        const newOrder: Order = {
          ...orderData,
          id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set(state => ({ orders: [...state.orders, newOrder] }))
        return newOrder
      },

      getMyOrders: () => {
        const { currentUser, orders } = get()
        if (!currentUser) return []
        return orders.filter(o => o.userId === currentUser.id)
      },

      fetchMyOrders: async () => {
        const { currentUser } = get()
        if (!currentUser) return
        try {
          const orders = await getUserOrders(currentUser.id)
          set(state => ({
            orders: [
              ...state.orders.filter(o => o.userId !== currentUser.id),
              ...orders,
            ],
          }))
        } catch (err: any) {
          console.error('Unable to load user orders:', err?.code ?? err?.message ?? err)
        }
      },

      // ── User: profile ───────────────────────────────────────────────
      updateProfile: async (updates) => {
        const { currentUser } = get()
        if (!currentUser) return
        await updateUserProfile(currentUser.id, updates)
        set(state => ({
          currentUser: { ...currentUser, ...updates },
          users: state.users.map(u => u.id === currentUser.id ? { ...u, ...updates } : u),
        }))
      },

      updatePassword: async (_currentPassword, newPassword) => {
        try {
          if (newPassword.length < 6) {
            return { success: false, message: 'New password must be at least 6 characters' }
          }

          await updateCurrentUserPassword(newPassword)
          return { success: true, message: 'Password updated successfully' }
        } catch (err: any) {
          if (err?.code === 'auth/requires-recent-login') {
            return { success: false, message: 'Please sign out and sign in again before changing your password.' }
          }

          return { success: false, message: err?.message ?? 'Unable to update password right now.' }
        }
      },
    }),
    {
      name: 'bowpaw-auth',
      partialize: (state) => ({
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return
        syncCookie(state.isAuthenticated, state.currentUser ?? null)
      },
    }
  )
)

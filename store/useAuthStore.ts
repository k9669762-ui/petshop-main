import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
  passwords: Record<string, string>
  userCarts: UserCart[]
  orders: Order[]
  otpSession: OTPSession | null
  
  // Auth actions
  sendOTP: (mobile: string) => { success: boolean; message: string; otp?: string }
  verifyOTP: (mobile: string, otp: string) => { success: boolean; message: string }
  loginWithMobileOTP: (mobile: string) => { success: boolean; message: string }
  loginWithPassword: (emailOrMobile: string, password: string) => { success: boolean; message: string }
  register: (userData: {
    name: string
    mobile: string
    email?: string
    password?: string
    address: UserAddress
  }) => { success: boolean; message: string }
  registerWithPassword: (userData: {
    name: string
    mobile: string
    email: string
    password: string
    district: string
  }) => { success: boolean; message: string }
  logout: () => void
  switchAccount: (userId: string) => void
  
  // Admin actions
  getAllUserCarts: () => UserCart[]
  getAllOrders: () => Order[]
  getUserOrders: (userId: string) => Order[]
  updateOrderStatus: (orderId: string, status: Order['status']) => void
  
  // User actions
  updateUserCart: (cart: UserCart) => void
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Order
  getMyOrders: () => Order[]
  updateProfile: (updates: Partial<User>) => void
}

// Demo users with passwords (in real app, use proper auth)
const demoUsers: (User & { password?: string })[] = [
  {
    id: 'admin-001',
    name: 'Admin BowPaw',
    email: 'admin@bowpaw.com',
    mobile: '9876543210',
    role: 'admin',
    status: 'active',
    password: 'admin123',
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'owner-001',
    name: 'Rajesh Kumar',
    email: 'owner@bowpaw.com',
    mobile: '9876543211',
    role: 'owner',
    status: 'active',
    password: 'owner123',
    address: {
      addressLine1: '45, Anna Salai',
      area: 'T. Nagar',
      city: 'Chennai',
      district: 'Chennai',
      pincode: '600017',
      state: 'Tamil Nadu',
      country: 'India',
    },
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-001',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    mobile: '9876543212',
    role: 'user',
    status: 'active',
    password: 'user123',
    address: {
      addressLine1: '123, South Street',
      area: 'Palayamkottai',
      city: 'Tirunelveli',
      district: 'Tirunelveli',
      pincode: '627002',
      state: 'Tamil Nadu',
      country: 'India',
    },
    createdAt: '2024-06-15T00:00:00Z',
  },
  {
    id: 'user-002',
    name: 'Amit Patel',
    email: 'amit@example.com',
    mobile: '9876543213',
    role: 'user',
    status: 'active',
    password: 'user123',
    address: {
      addressLine1: '456, Gandhi Road',
      area: 'RS Puram',
      city: 'Coimbatore',
      district: 'Coimbatore',
      pincode: '641002',
      state: 'Tamil Nadu',
      country: 'India',
    },
    createdAt: '2024-07-20T00:00:00Z',
  },
  {
    id: 'user-003',
    name: 'Sneha Reddy',
    email: 'sneha@example.com',
    mobile: '9876543214',
    role: 'user',
    status: 'active',
    password: 'user123',
    address: {
      addressLine1: '789, Main Road',
      area: 'Srirangam',
      city: 'Tiruchirappalli',
      district: 'Tiruchirappalli',
      pincode: '620006',
      state: 'Tamil Nadu',
      country: 'India',
    },
    createdAt: '2024-08-10T00:00:00Z',
  },
  {
    id: 'user-004',
    name: 'Karthik Murugan',
    mobile: '9988776655',
    role: 'user',
    status: 'active',
    password: 'user123',
    address: {
      addressLine1: '12, Temple Street',
      area: 'Town Area',
      city: 'Madurai',
      district: 'Madurai',
      pincode: '625001',
      state: 'Tamil Nadu',
      country: 'India',
    },
    createdAt: '2024-09-01T00:00:00Z',
  },
]

// Demo orders
const demoOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: 'user-001',
    userName: 'Priya Sharma',
    userEmail: 'priya@example.com',
    userPhone: '+91 9876543212',
    items: [
      { productId: '1', productName: 'Premium Dog Food', productImage: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=100', price: 2499, quantity: 2 },
      { productId: '5', productName: 'Dog Chew Toy', productImage: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=100', price: 399, quantity: 1 },
    ],
    subtotal: 5397,
    shipping: 99,
    tax: 486,
    total: 5982,
    status: 'delivered',
    shippingAddress: {
      addressLine1: '123, South Street',
      area: 'Palayamkottai',
      city: 'Tirunelveli',
      district: 'Tirunelveli',
      pincode: '627002',
      state: 'Tamil Nadu',
      country: 'India',
    },
    paymentMethod: 'UPI',
    paymentStatus: 'paid',
    createdAt: '2024-11-15T10:30:00Z',
    updatedAt: '2024-11-18T14:00:00Z',
  },
  {
    id: 'ORD-002',
    userId: 'user-002',
    userName: 'Amit Patel',
    userEmail: 'amit@example.com',
    userPhone: '+91 9876543213',
    items: [
      { productId: '3', productName: 'Cat Scratching Post', productImage: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=100', price: 1899, quantity: 1 },
    ],
    subtotal: 1899,
    shipping: 149,
    tax: 171,
    total: 2219,
    status: 'shipped',
    shippingAddress: {
      addressLine1: '456, Gandhi Road',
      area: 'RS Puram',
      city: 'Coimbatore',
      district: 'Coimbatore',
      pincode: '641002',
      state: 'Tamil Nadu',
      country: 'India',
    },
    paymentMethod: 'COD',
    paymentStatus: 'pending',
    createdAt: '2024-11-25T15:45:00Z',
    updatedAt: '2024-11-27T09:00:00Z',
  },
  {
    id: 'ORD-003',
    userId: 'user-003',
    userName: 'Sneha Reddy',
    userEmail: 'sneha@example.com',
    userPhone: '+91 9876543214',
    items: [
      { productId: '2', productName: 'Cozy Pet Bed', productImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=100', price: 3299, quantity: 1 },
      { productId: '8', productName: 'Pet Grooming Kit', productImage: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=100', price: 1299, quantity: 1 },
    ],
    subtotal: 4598,
    shipping: 0,
    tax: 414,
    total: 5012,
    status: 'processing',
    shippingAddress: {
      addressLine1: '789, Main Road',
      area: 'Srirangam',
      city: 'Tiruchirappalli',
      district: 'Tiruchirappalli',
      pincode: '620006',
      state: 'Tamil Nadu',
      country: 'India',
    },
    paymentMethod: 'Card',
    paymentStatus: 'paid',
    createdAt: '2024-11-28T11:20:00Z',
    updatedAt: '2024-11-28T11:20:00Z',
  },
  {
    id: 'ORD-004',
    userId: 'user-001',
    userName: 'Priya Sharma',
    userEmail: 'priya@example.com',
    userPhone: '+91 9876543212',
    items: [
      { productId: '10', productName: 'Automatic Pet Feeder', productImage: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=100', price: 4999, quantity: 1 },
    ],
    subtotal: 4999,
    shipping: 0,
    tax: 450,
    total: 5449,
    status: 'pending',
    shippingAddress: {
      addressLine1: '123, South Street',
      area: 'Palayamkottai',
      city: 'Tirunelveli',
      district: 'Tirunelveli',
      pincode: '627002',
      state: 'Tamil Nadu',
      country: 'India',
    },
    paymentMethod: 'UPI',
    paymentStatus: 'pending',
    createdAt: '2024-12-01T09:00:00Z',
    updatedAt: '2024-12-01T09:00:00Z',
  },
]

// Demo user carts
const demoUserCarts: UserCart[] = [
  {
    userId: 'user-001',
    userName: 'Priya Sharma',
    userEmail: 'priya@example.com',
    items: [
      { productId: '15', productName: 'Dog Collar Premium', productImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100', price: 799, quantity: 2 },
    ],
    total: 1598,
    updatedAt: '2024-12-01T08:30:00Z',
  },
  {
    userId: 'user-002',
    userName: 'Amit Patel',
    userEmail: 'amit@example.com',
    items: [
      { productId: '7', productName: 'Cat Food Premium', productImage: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=100', price: 1899, quantity: 1 },
      { productId: '12', productName: 'Cat Toy Set', productImage: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=100', price: 599, quantity: 3 },
    ],
    total: 3696,
    updatedAt: '2024-12-01T10:15:00Z',
  },
  {
    userId: 'user-003',
    userName: 'Sneha Reddy',
    userEmail: 'sneha@example.com',
    items: [
      { productId: '20', productName: 'Pet Carrier Bag', productImage: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=100', price: 2499, quantity: 1 },
    ],
    total: 2499,
    updatedAt: '2024-11-30T16:45:00Z',
  },
]

// Store passwords separately (in real app, this would be hashed in DB)
const userPasswords: Record<string, string> = {
  'admin-001': 'admin123',
  'owner-001': 'owner123',
  'user-001': 'user123',
  'user-002': 'user123',
  'user-003': 'user123',
  'user-004': 'user123',
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      isAuthenticated: false,
      users: demoUsers.map(({ password, ...user }) => user),
      passwords: userPasswords,
      userCarts: demoUserCarts,
      orders: demoOrders,
      otpSession: null,

      sendOTP: (mobile) => {
        // Validate mobile number
        const mobileRegex = /^[6-9]\d{9}$/
        if (!mobileRegex.test(mobile)) {
          return { success: false, message: 'Please enter a valid 10-digit mobile number' }
        }

        // Generate 6-digit OTP (in real app, send via SMS)
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const expiresAt = Date.now() + 5 * 60 * 1000 // 5 minutes

        set({
          otpSession: {
            mobile,
            otp,
            expiresAt,
            verified: false,
          },
        })

        // For demo, return OTP (in real app, send via SMS)
        return { 
          success: true, 
          message: `OTP sent to ${mobile}. Demo OTP: ${otp}`,
          otp // Remove this in production
        }
      },

      verifyOTP: (mobile, otp) => {
        const { otpSession } = get()

        if (!otpSession) {
          return { success: false, message: 'No OTP session found. Please request a new OTP.' }
        }

        if (otpSession.mobile !== mobile) {
          return { success: false, message: 'Mobile number mismatch' }
        }

        if (Date.now() > otpSession.expiresAt) {
          set({ otpSession: null })
          return { success: false, message: 'OTP has expired. Please request a new one.' }
        }

        if (otpSession.otp !== otp) {
          return { success: false, message: 'Invalid OTP. Please try again.' }
        }

        set({
          otpSession: { ...otpSession, verified: true },
        })

        return { success: true, message: 'OTP verified successfully!' }
      },

      loginWithMobileOTP: (mobile) => {
        const { otpSession, users } = get()

        if (!otpSession || !otpSession.verified || otpSession.mobile !== mobile) {
          return { success: false, message: 'Please verify OTP first' }
        }

        // Find user by mobile
        const user = users.find(u => u.mobile === mobile)

        if (!user) {
          return { success: false, message: 'No account found with this mobile number. Please register.' }
        }

        if (user.status !== 'active') {
          return { success: false, message: 'Your account is not active. Please contact support.' }
        }

        set({ 
          currentUser: user, 
          isAuthenticated: true,
          otpSession: null,
        })

        return { success: true, message: 'Login successful!' }
      },

      loginWithPassword: (emailOrMobile, password) => {
        const { users, passwords } = get()
        const identifier = emailOrMobile.trim().toLowerCase()
        const mobileIdentifier = emailOrMobile.replace(/\D/g, '')

        // Find user by email or mobile
        const user = users.find(u => 
          u.email?.toLowerCase() === identifier || u.mobile === mobileIdentifier
        )

        if (!user) {
          return { success: false, message: 'No account found with this email/mobile' }
        }

        if (user.status !== 'active') {
          return { success: false, message: 'Your account is not active. Please contact support.' }
        }

        // Check password
        const storedPassword = passwords[user.id] ?? userPasswords[user.id]
        if (!storedPassword || storedPassword !== password) {
          return { success: false, message: 'Invalid password' }
        }

        set({ currentUser: user, isAuthenticated: true })

        return { success: true, message: 'Login successful!' }
      },

      register: (userData) => {
        const { users, otpSession } = get()

        // Validate OTP verification
        if (!otpSession || !otpSession.verified || otpSession.mobile !== userData.mobile) {
          return { success: false, message: 'Please verify your mobile number with OTP first' }
        }

        // Check if mobile already exists
        if (users.some(u => u.mobile === userData.mobile)) {
          return { success: false, message: 'Mobile number already registered' }
        }

        // Check if email already exists (if provided)
        if (userData.email && users.some(u => u.email === userData.email)) {
          return { success: false, message: 'Email already registered' }
        }

        // Create new user
        const newUser: User = {
          id: `user-${Date.now()}`,
          name: userData.name,
          mobile: userData.mobile,
          email: userData.email,
          role: 'user',
          status: 'active',
          address: userData.address,
          createdAt: new Date().toISOString(),
        }

        // Store password if provided
        if (userData.password) {
          userPasswords[newUser.id] = userData.password
        }

        set(state => ({
          users: [...state.users, newUser],
          passwords: userData.password
            ? { ...state.passwords, [newUser.id]: userData.password }
            : state.passwords,
          currentUser: newUser,
          isAuthenticated: true,
          otpSession: null,
        }))

        return { success: true, message: 'Registration successful! Welcome to BowPaw!' }
      },

      registerWithPassword: (userData) => {
        const { users } = get()
        const mobile = userData.mobile.replace(/\D/g, '')
        const email = userData.email.trim().toLowerCase()

        if (!userData.name.trim()) {
          return { success: false, message: 'Please enter your full name' }
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return { success: false, message: 'Please enter a valid email address' }
        }

        if (!/^[6-9]\d{9}$/.test(mobile)) {
          return { success: false, message: 'Please enter a valid 10-digit mobile number' }
        }

        if (userData.password.length < 6) {
          return { success: false, message: 'Password must be at least 6 characters' }
        }

        if (users.some((user) => user.email?.toLowerCase() === email)) {
          return { success: false, message: 'Email already registered' }
        }

        if (users.some((user) => user.mobile === mobile)) {
          return { success: false, message: 'Mobile number already registered' }
        }

        const newUser: User = {
          id: `user-${Date.now()}`,
          name: userData.name.trim(),
          email,
          mobile,
          role: 'user',
          status: 'active',
          address: {
            addressLine1: '',
            area: '',
            city: '',
            district: userData.district,
            pincode: '',
            state: 'Tamil Nadu',
            country: 'India',
          },
          createdAt: new Date().toISOString(),
        }

        userPasswords[newUser.id] = userData.password

        set((state) => ({
          users: [...state.users, newUser],
          passwords: { ...state.passwords, [newUser.id]: userData.password },
          currentUser: newUser,
          isAuthenticated: true,
          otpSession: null,
        }))

        return { success: true, message: 'Registration successful!' }
      },

      logout: () => {
        set({ currentUser: null, isAuthenticated: false, otpSession: null })
      },

      switchAccount: (userId) => {
        const { currentUser } = get()
        if (currentUser?.role !== 'admin' && currentUser?.role !== 'owner') {
          return
        }
        
        const user = get().users.find(u => u.id === userId)
        if (user) {
          set({ currentUser: user })
        }
      },

      getAllUserCarts: () => {
        const { currentUser } = get()
        if (currentUser?.role === 'admin' || currentUser?.role === 'owner') {
          return get().userCarts
        }
        return []
      },

      getAllOrders: () => {
        const { currentUser } = get()
        if (currentUser?.role === 'admin' || currentUser?.role === 'owner') {
          return get().orders
        }
        return []
      },

      getUserOrders: (userId) => {
        return get().orders.filter(order => order.userId === userId)
      },

      updateOrderStatus: (orderId, status) => {
        const { currentUser } = get()
        if (currentUser?.role !== 'admin' && currentUser?.role !== 'owner') {
          return
        }
        
        set(state => ({
          orders: state.orders.map(order =>
            order.id === orderId
              ? { ...order, status, updatedAt: new Date().toISOString() }
              : order
          ),
        }))
      },

      updateUserCart: (cart) => {
        set(state => {
          const existingIndex = state.userCarts.findIndex(c => c.userId === cart.userId)
          if (existingIndex >= 0) {
            const newCarts = [...state.userCarts]
            newCarts[existingIndex] = cart
            return { userCarts: newCarts }
          }
          return { userCarts: [...state.userCarts, cart] }
        })
      },

      createOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: `ORD-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        
        set(state => ({
          orders: [...state.orders, newOrder],
        }))
        
        return newOrder
      },

      getMyOrders: () => {
        const { currentUser, orders } = get()
        if (!currentUser) return []
        return orders.filter(order => order.userId === currentUser.id)
      },

      updateProfile: (updates) => {
        const { currentUser } = get()
        if (!currentUser) return

        set(state => ({
          currentUser: { ...currentUser, ...updates },
          users: state.users.map(u =>
            u.id === currentUser.id ? { ...u, ...updates } : u
          ),
        }))
      },
    }),
    {
      name: 'bowpaw-auth',
    }
  )
)

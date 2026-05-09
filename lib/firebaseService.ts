import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile as firebaseUpdateProfile,
  updatePassword,
} from 'firebase/auth'
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { auth, db } from './firebase'
import type { User, Order, UserCart, UserAddress } from '@/store/useAuthStore'

const OWNER_EMAIL = 'rainbowaquariumndbi@gmail.com'

const timestampToISO = (value: unknown) =>
  value instanceof Timestamp ? value.toDate().toISOString() : typeof value === 'string' ? value : new Date().toISOString()

export const createSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

// ── Auth ──────────────────────────────────────────────────────────────

export async function firebaseSignIn(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password)
  let profile = await getUserProfile(cred.user.uid)

  if (!profile && cred.user.email?.toLowerCase() === OWNER_EMAIL) {
    profile = {
      id: cred.user.uid,
      name: cred.user.displayName || 'Rainbow Aqua Owner',
      email: cred.user.email,
      mobile: '',
      role: 'owner',
      status: 'active',
      createdAt: new Date().toISOString(),
    }

    await setDoc(doc(db, 'users', cred.user.uid), {
      ...profile,
      createdAt: serverTimestamp(),
    })
  }

  return profile
}

export async function firebaseRegister(
  email: string,
  password: string,
  name: string,
  mobile: string,
  district: string
) {
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  await firebaseUpdateProfile(cred.user, { displayName: name })

  const newUser: User = {
    id: cred.user.uid,
    name,
    email,
    mobile,
    role: 'user',
    status: 'active',
    address: {
      addressLine1: '',
      area: '',
      city: '',
      district,
      pincode: '',
      state: 'Tamil Nadu',
      country: 'India',
    },
    createdAt: new Date().toISOString(),
  }

  // Write to Firestore — non-blocking, won't fail registration if rules not deployed yet
  try {
    await setDoc(doc(db, 'users', cred.user.uid), {
      ...newUser,
      createdAt: serverTimestamp(),
    })
  } catch (firestoreErr: any) {
    console.warn('Firestore write failed (check rules):', firestoreErr?.code)
  }

  return newUser
}

export async function firebaseSignOut() {
  await signOut(auth)
}

// ── User Profile ──────────────────────────────────────────────────────

export async function getUserProfile(uid: string): Promise<User | null> {
  const snap = await getDoc(doc(db, 'users', uid))
  if (!snap.exists()) return null
  const data = snap.data()
  return {
    ...data,
    id: uid,
    createdAt: timestampToISO(data.createdAt),
  } as User
}

export async function updateUserProfile(uid: string, updates: Partial<User>) {
  await updateDoc(doc(db, 'users', uid), updates)
}

export async function updateCurrentUserPassword(newPassword: string) {
  if (!auth.currentUser) {
    throw new Error('Please sign in again to update your password.')
  }

  await updatePassword(auth.currentUser, newPassword)
}

// ── Orders ────────────────────────────────────────────────────────────

export async function createOrderInDB(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) {
  const ref = await addDoc(collection(db, 'orders'), {
    ...order,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const q = query(
    collection(db, 'orders'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({
    ...d.data(),
    id: d.id,
    createdAt: timestampToISO(d.data().createdAt),
    updatedAt: timestampToISO(d.data().updatedAt),
  })) as Order[]
}

export async function getAllOrdersFromDB(): Promise<Order[]> {
  const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({
    ...d.data(),
    id: d.id,
    createdAt: timestampToISO(d.data().createdAt),
    updatedAt: timestampToISO(d.data().updatedAt),
  })) as Order[]
}

export async function updateOrderStatusInDB(orderId: string, status: Order['status']) {
  await updateDoc(doc(db, 'orders', orderId), {
    status,
    updatedAt: serverTimestamp(),
  })
}

// ── Users (admin) ─────────────────────────────────────────────────────

export async function getAllUsersFromDB(): Promise<User[]> {
  const snap = await getDocs(collection(db, 'users'))
  return snap.docs.map((d) => ({
    ...d.data(),
    id: d.id,
    createdAt: timestampToISO(d.data().createdAt),
  })) as User[]
}

// ── Carts ─────────────────────────────────────────────────────────────

export async function saveCartToDB(cart: UserCart) {
  await setDoc(doc(db, 'carts', cart.userId), {
    ...cart,
    updatedAt: serverTimestamp(),
  })
}

export async function getAllCartsFromDB(): Promise<UserCart[]> {
  const snap = await getDocs(collection(db, 'carts'))
  return snap.docs.map((d) => ({
    ...d.data(),
    userId: d.id,
    updatedAt: timestampToISO(d.data().updatedAt),
  })) as UserCart[]
}

// ── Products ──────────────────────────────────────────────────────────

export interface DBProduct {
  id: string
  name: string
  slug: string
  description: string
  category: string
  subcategory: string
  price: number
  originalPrice?: number
  stock: number
  sku?: string
  images: string[]
  isNew: boolean
  isFeatured: boolean
  variants: string[]
  inStock: boolean
  createdAt: string
  updatedAt: string
}

export async function addProductToDB(product: Omit<DBProduct, 'id' | 'createdAt' | 'updatedAt'>) {
  const ref = await addDoc(collection(db, 'products'), {
    ...product,
    slug: product.slug || createSlug(product.name),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function getProductFromDB(productId: string): Promise<DBProduct | null> {
  const snap = await getDoc(doc(db, 'products', productId))
  if (!snap.exists()) return null
  const data = snap.data()
  return {
    ...data,
    id: snap.id,
    createdAt: timestampToISO(data.createdAt),
    updatedAt: timestampToISO(data.updatedAt),
  } as DBProduct
}

export async function getAllProductsFromDB(): Promise<DBProduct[]> {
  const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map((d) => ({
    ...d.data(),
    id: d.id,
    slug: d.data().slug ?? createSlug(d.data().name ?? d.id),
    createdAt: timestampToISO(d.data().createdAt),
    updatedAt: timestampToISO(d.data().updatedAt),
  })) as DBProduct[]
}

export async function deleteProductFromDB(productId: string) {
  const { deleteDoc } = await import('firebase/firestore')
  await deleteDoc(doc(db, 'products', productId))
}

export async function updateProductInDB(productId: string, updates: Partial<DBProduct>) {
  await updateDoc(doc(db, 'products', productId), {
    ...updates,
    updatedAt: serverTimestamp(),
  })
}

// ── Storage: upload image ─────────────────────────────────────────────

export async function uploadProductImage(file: File, productName: string): Promise<string> {
  const { ref: storageRef, uploadBytes, getDownloadURL } = await import('firebase/storage')
  const { storage } = await import('./firebase')
  const fileName = `products/${Date.now()}_${file.name.replace(/\s/g, '_')}`
  const fileRef = storageRef(storage, fileName)
  await uploadBytes(fileRef, file)
  return getDownloadURL(fileRef)
}

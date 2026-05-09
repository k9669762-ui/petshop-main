// Product Types
export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  color?: string;
  size?: string;
  stock: number;
  image?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  subcategory?: string;
  tags: string[];
  images: string[];
  variants: ProductVariant[];
  reviews: ProductReview[];
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  brand: string;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isOnSale: boolean;
  petType: 'dog' | 'cat' | 'bird' | 'fish' | 'small-pet' | 'all';
  createdAt: string;
  specifications?: Record<string, string>;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
  variant?: ProductVariant;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  discount: number;
  promoCode?: string;
}

// Wishlist Types
export interface WishlistItem {
  product: Product;
  addedAt: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  image: string;
  petImage: string;
  petName: string;
  rating: number;
  content: string;
}

// Collection Types
export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  featured?: {
    image: string;
    title: string;
    description: string;
    href: string;
  };
}

// Filter Types
export interface FilterOption {
  label: string;
  value: string;
  count: number;
}

export interface Filters {
  categories: FilterOption[];
  petTypes: FilterOption[];
  brands: FilterOption[];
  priceRanges: FilterOption[];
  colors: FilterOption[];
  sizes: FilterOption[];
}

// Hero Slide Types
export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  overlayColor?: string;
  textPosition?: 'left' | 'center' | 'right';
}

// FAQ Types
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// Stats Types
export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}


// Most Popular & Fully Allowed Pet Breeds in India (2025)
// 100% legal, no bans, no restrictions

export interface PetBreed {
  id: string
  name: string
  category: 'dogs' | 'cats' | 'rabbits' | 'fish' | 'birds'
  price: string
  originalPrice?: string
  image: string
  gallery?: string[] // Multiple images for the pet
  description: string
  features: string[]
  badge?: 'Popular' | 'Best for India' | 'Easy Care' | 'Rare' | 'Family Friendly'
  inStock: boolean
  rating: number
  reviews: number
}

export const petCategories = [
  { 
    id: 'dogs', 
    name: 'Dogs', 
    icon: '🐕', 
    description: 'Safe & Allowed Breeds',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600',
    color: 'from-amber-500 to-orange-500'
  },
  { 
    id: 'cats', 
    name: 'Cats', 
    icon: '🐱', 
    description: 'Fully Legal Breeds',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600',
    color: 'from-purple-500 to-pink-500'
  },
  { 
    id: 'rabbits', 
    name: 'Rabbits', 
    icon: '🐰', 
    description: 'All Pet Breeds Allowed',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600',
    color: 'from-pink-500 to-rose-500'
  },
  { 
    id: 'fish', 
    name: 'Fish', 
    icon: '🐠', 
    description: 'Freshwater - Easy & Legal',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600',
    color: 'from-cyan-500 to-blue-500'
  },
  { 
    id: 'birds', 
    name: 'Birds', 
    icon: '🐦', 
    description: 'Fully Legal & Popular',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600',
    color: 'from-green-500 to-emerald-500'
  },
]

export const dogBreeds: PetBreed[] = [
  {
    id: 'labrador-retriever',
    name: 'Labrador Retriever',
    category: 'dogs',
    price: '₹15,000',
    originalPrice: '₹20,000',
    image: 'https://images.unsplash.com/photo-1579213838058-8a85e4ee6f65?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1579213838058-8a85e4ee6f65?w=800',
      'https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=800',
      'https://images.unsplash.com/photo-1605897472359-85e4b94d685d?w=800',
      'https://images.unsplash.com/photo-1606567595334-d39972c85dfd?w=800',
    ],
    description: 'Friendly, active, and outgoing. Perfect family companion.',
    features: ['Great with kids', 'Easy to train', 'Active lifestyle'],
    badge: 'Popular',
    inStock: true,
    rating: 4.9,
    reviews: 234
  },
  {
    id: 'golden-retriever',
    name: 'Golden Retriever',
    category: 'dogs',
    price: '₹18,000',
    originalPrice: '₹25,000',
    image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800',
      'https://images.unsplash.com/photo-1612774412771-005ed8e861d2?w=800',
      'https://images.unsplash.com/photo-1625316708582-7c38734be31d?w=800',
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800',
    ],
    description: 'Intelligent, friendly, and devoted. Excellent family dog.',
    features: ['Loyal', 'Gentle', 'Great temperament'],
    badge: 'Family Friendly',
    inStock: true,
    rating: 4.9,
    reviews: 189
  },
  {
    id: 'beagle',
    name: 'Beagle',
    category: 'dogs',
    price: '₹12,000',
    originalPrice: '₹16,000',
    image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=800',
      'https://images.unsplash.com/photo-1528318269466-69d920af5dad?w=800',
      'https://images.unsplash.com/photo-1611003229186-80e40cd54966?w=800',
      'https://images.unsplash.com/photo-1594922009922-d10f4d14b773?w=800',
    ],
    description: 'Merry, friendly, and curious. Great scent hound.',
    features: ['Compact size', 'Good with kids', 'Playful'],
    badge: 'Popular',
    inStock: true,
    rating: 4.7,
    reviews: 156
  },
  {
    id: 'pug',
    name: 'Pug',
    category: 'dogs',
    price: '₹10,000',
    originalPrice: '₹14,000',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800',
      'https://images.unsplash.com/photo-1575425186775-b8de9a427e67?w=800',
      'https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=800',
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800',
    ],
    description: 'Charming, mischievous, and loving. Perfect apartment dog.',
    features: ['Apartment friendly', 'Low exercise', 'Affectionate'],
    badge: 'Easy Care',
    inStock: true,
    rating: 4.8,
    reviews: 203
  },
  {
    id: 'indian-pariah',
    name: 'Indian Pariah (Indie)',
    category: 'dogs',
    price: '₹2,000',
    image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
      'https://images.unsplash.com/photo-1544568100-847a948585b9?w=800',
      'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?w=800',
    ],
    description: 'Hardy, intelligent, and loyal. Best suited for Indian climate.',
    features: ['Heat tolerant', 'Low maintenance', 'Healthy breed'],
    badge: 'Best for India',
    inStock: true,
    rating: 4.9,
    reviews: 312
  },
  {
    id: 'pomeranian',
    name: 'Pomeranian',
    category: 'dogs',
    price: '₹8,000',
    originalPrice: '₹12,000',
    image: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=800',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
      'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=800',
      'https://images.unsplash.com/photo-1529429617124-95b109e86bb8?w=800',
    ],
    description: 'Lively, bold, and inquisitive. Fluffy companion dog.',
    features: ['Compact', 'Alert', 'Good watchdog'],
    inStock: true,
    rating: 4.6,
    reviews: 145
  },
  {
    id: 'shih-tzu',
    name: 'Shih Tzu',
    category: 'dogs',
    price: '₹15,000',
    originalPrice: '₹20,000',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
      'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=800',
      'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800',
    ],
    description: 'Affectionate, playful, and outgoing. Royal companion.',
    features: ['Hypoallergenic', 'Good for apartments', 'Friendly'],
    badge: 'Popular',
    inStock: true,
    rating: 4.7,
    reviews: 178
  },
  {
    id: 'lhasa-apso',
    name: 'Lhasa Apso',
    category: 'dogs',
    price: '₹12,000',
    originalPrice: '₹16,000',
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600',
    description: 'Confident, smart, and comical. Ancient Tibetan breed.',
    features: ['Long coat', 'Independent', 'Good watchdog'],
    inStock: true,
    rating: 4.5,
    reviews: 98
  },
  {
    id: 'dachshund',
    name: 'Dachshund',
    category: 'dogs',
    price: '₹10,000',
    originalPrice: '₹14,000',
    image: 'https://images.unsplash.com/photo-1612195583950-b8fd34c87093?w=600',
    description: 'Clever, lively, and courageous. Unique sausage dog.',
    features: ['Unique shape', 'Brave', 'Loyal'],
    inStock: true,
    rating: 4.6,
    reviews: 134
  },
  {
    id: 'french-bulldog',
    name: 'French Bulldog',
    category: 'dogs',
    price: '₹35,000',
    originalPrice: '₹45,000',
    image: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600',
    description: 'Playful, adaptable, and smart. Trendy companion.',
    features: ['Low exercise', 'Quiet', 'Great companion'],
    badge: 'Popular',
    inStock: true,
    rating: 4.8,
    reviews: 167
  },
  {
    id: 'maltese',
    name: 'Maltese',
    category: 'dogs',
    price: '₹25,000',
    originalPrice: '₹32,000',
    image: 'https://images.unsplash.com/photo-1582456891925-a53965520aa9?w=600',
    description: 'Gentle, playful, and charming. Silky white coat.',
    features: ['Hypoallergenic', 'Affectionate', 'Elegant'],
    inStock: true,
    rating: 4.7,
    reviews: 89
  },
  {
    id: 'spitz',
    name: 'Indian Spitz',
    category: 'dogs',
    price: '₹6,000',
    originalPrice: '₹9,000',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600',
    description: 'Active, intelligent, and loyal. Fluffy Indian favorite.',
    features: ['Heat tolerant', 'Affordable', 'Good watchdog'],
    badge: 'Best for India',
    inStock: true,
    rating: 4.6,
    reviews: 256
  },
  {
    id: 'boxer',
    name: 'Boxer',
    category: 'dogs',
    price: '₹20,000',
    originalPrice: '₹28,000',
    image: 'https://images.unsplash.com/photo-1543071220-6ee5bf71a54e?w=600',
    description: 'Fun-loving, bright, and active. Great guard dog.',
    features: ['Protective', 'Energetic', 'Family friendly'],
    badge: 'Family Friendly',
    inStock: true,
    rating: 4.5,
    reviews: 112
  },
  {
    id: 'dalmatian',
    name: 'Dalmatian',
    category: 'dogs',
    price: '₹18,000',
    originalPrice: '₹24,000',
    image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600',
    description: 'Dignified, smart, and outgoing. Iconic spotted coat.',
    features: ['Athletic', 'Unique look', 'High energy'],
    inStock: true,
    rating: 4.4,
    reviews: 78
  },
  {
    id: 'cavalier-king-charles',
    name: 'Cavalier King Charles',
    category: 'dogs',
    price: '₹45,000',
    originalPrice: '₹55,000',
    image: 'https://images.unsplash.com/photo-1598134493202-393e81f13a12?w=600',
    description: 'Affectionate, gentle, and graceful. Royal companion.',
    features: ['Gentle', 'Good with seniors', 'Adaptable'],
    badge: 'Rare',
    inStock: true,
    rating: 4.9,
    reviews: 67
  },
]

export const catBreeds: PetBreed[] = [
  {
    id: 'indian-street-cat',
    name: 'Indian Street Cat (Desi Billi)',
    category: 'cats',
    price: '₹500',
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800',
      'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=800',
      'https://images.unsplash.com/photo-1494256997604-768d1f608cac?w=800',
      'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=800',
    ],
    description: 'Hardy, adaptable, and independent. Healthiest & most affordable.',
    features: ['Heat tolerant', 'Low maintenance', 'Natural immunity'],
    badge: 'Best for India',
    inStock: true,
    rating: 4.9,
    reviews: 423
  },
  {
    id: 'persian',
    name: 'Persian Cat',
    category: 'cats',
    price: '₹15,000',
    originalPrice: '₹22,000',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
      'https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=800',
      'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?w=800',
      'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=800',
    ],
    description: 'Sweet, gentle, and quiet. Luxurious long coat.',
    features: ['Calm', 'Affectionate', 'Beautiful coat'],
    badge: 'Popular',
    inStock: true,
    rating: 4.8,
    reviews: 287
  },
  {
    id: 'siamese',
    name: 'Siamese',
    category: 'cats',
    price: '₹12,000',
    originalPrice: '₹18,000',
    image: 'https://images.unsplash.com/photo-1568043210943-584af46dd588?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1568043210943-584af46dd588?w=800',
      'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=800',
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800',
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800',
    ],
    description: 'Social, intelligent, and vocal. Elegant pointed coat.',
    features: ['Vocal', 'Playful', 'Social'],
    badge: 'Popular',
    inStock: true,
    rating: 4.7,
    reviews: 198
  },
  {
    id: 'maine-coon',
    name: 'Maine Coon',
    category: 'cats',
    price: '₹35,000',
    originalPrice: '₹45,000',
    image: 'https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?w=800',
      'https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=800',
      'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800',
      'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800',
    ],
    description: 'Gentle giant with dog-like personality. Majestic appearance.',
    features: ['Large size', 'Friendly', 'Good with dogs'],
    badge: 'Rare',
    inStock: true,
    rating: 4.9,
    reviews: 145
  },
  {
    id: 'british-shorthair',
    name: 'British Shorthair',
    category: 'cats',
    price: '₹25,000',
    originalPrice: '₹32,000',
    image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600',
    gallery: [
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800',
      'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?w=800',
      'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=800',
      'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=800',
    ],
    description: 'Easygoing, calm, and affectionate. Teddy bear looks.',
    features: ['Calm', 'Round face', 'Easy care'],
    badge: 'Family Friendly',
    inStock: true,
    rating: 4.8,
    reviews: 167
  },
  {
    id: 'ragdoll',
    name: 'Ragdoll',
    category: 'cats',
    price: '₹30,000',
    originalPrice: '₹40,000',
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600',
    description: 'Docile, affectionate, and relaxed. Goes limp when held.',
    features: ['Docile', 'Blue eyes', 'Fluffy'],
    badge: 'Family Friendly',
    inStock: true,
    rating: 4.9,
    reviews: 134
  },
  {
    id: 'scottish-fold',
    name: 'Scottish Fold',
    category: 'cats',
    price: '₹40,000',
    originalPrice: '₹50,000',
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600',
    description: 'Sweet-tempered and adaptable. Unique folded ears.',
    features: ['Unique ears', 'Sweet', 'Quiet'],
    badge: 'Rare',
    inStock: true,
    rating: 4.7,
    reviews: 89
  },
  {
    id: 'bengal',
    name: 'Bengal',
    category: 'cats',
    price: '₹45,000',
    originalPrice: '₹60,000',
    image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=600',
    description: 'Athletic, playful, and wild-looking. Leopard-like coat.',
    features: ['Athletic', 'Wild look', 'Intelligent'],
    badge: 'Rare',
    inStock: true,
    rating: 4.8,
    reviews: 112
  },
  {
    id: 'sphynx',
    name: 'Sphynx',
    category: 'cats',
    price: '₹50,000',
    originalPrice: '₹65,000',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600',
    description: 'Hairless, warm, and attention-loving. Unique appearance.',
    features: ['Hairless', 'Warm body', 'Affectionate'],
    badge: 'Rare',
    inStock: true,
    rating: 4.6,
    reviews: 67
  },
  {
    id: 'himalayan',
    name: 'Himalayan',
    category: 'cats',
    price: '₹20,000',
    originalPrice: '₹28,000',
    image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=600',
    description: 'Persian and Siamese mix. Blue eyes with point colors.',
    features: ['Blue eyes', 'Long coat', 'Gentle'],
    badge: 'Popular',
    inStock: true,
    rating: 4.8,
    reviews: 156
  },
]

export const rabbitBreeds: PetBreed[] = [
  {
    id: 'netherland-dwarf',
    name: 'Netherland Dwarf',
    category: 'rabbits',
    price: '₹2,500',
    originalPrice: '₹3,500',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600',
    description: 'Tiny, energetic, and adorable. Perfect for small spaces.',
    features: ['Tiny size', 'Active', 'Cute'],
    badge: 'Popular',
    inStock: true,
    rating: 4.8,
    reviews: 145
  },
  {
    id: 'holland-lop',
    name: 'Holland Lop',
    category: 'rabbits',
    price: '₹3,000',
    originalPrice: '₹4,000',
    image: 'https://images.unsplash.com/photo-1518882605630-8eb885bf9884?w=600',
    description: 'Sweet, friendly, and compact. Floppy ears charm.',
    features: ['Floppy ears', 'Friendly', 'Compact'],
    badge: 'Popular',
    inStock: true,
    rating: 4.9,
    reviews: 178
  },
  {
    id: 'lionhead',
    name: 'Lionhead',
    category: 'rabbits',
    price: '₹2,800',
    originalPrice: '₹3,800',
    image: 'https://images.unsplash.com/photo-1535241749838-299f6e3d57aa?w=600',
    description: 'Fluffy mane around head. Gentle and playful.',
    features: ['Fluffy mane', 'Gentle', 'Unique look'],
    inStock: true,
    rating: 4.7,
    reviews: 98
  },
  {
    id: 'dutch',
    name: 'Dutch Rabbit',
    category: 'rabbits',
    price: '₹1,500',
    originalPrice: '₹2,200',
    image: 'https://images.unsplash.com/photo-1574068468470-3f0da4fc4f9f?w=600',
    description: 'Classic two-tone pattern. Friendly and hardy.',
    features: ['Classic look', 'Hardy', 'Good for beginners'],
    badge: 'Easy Care',
    inStock: true,
    rating: 4.6,
    reviews: 134
  },
  {
    id: 'mini-rex',
    name: 'Mini Rex',
    category: 'rabbits',
    price: '₹2,000',
    originalPrice: '₹2,800',
    image: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=600',
    description: 'Velvety soft fur. Calm and cuddly.',
    features: ['Velvet fur', 'Calm', 'Cuddly'],
    badge: 'Family Friendly',
    inStock: true,
    rating: 4.8,
    reviews: 112
  },
  {
    id: 'flemish-giant',
    name: 'Flemish Giant',
    category: 'rabbits',
    price: '₹5,000',
    originalPrice: '₹7,000',
    image: 'https://images.unsplash.com/photo-1559214368-6aa71c51c2e9?w=600',
    description: 'Gentle giant of rabbits. Dog-like personality.',
    features: ['Very large', 'Gentle', 'Calm'],
    badge: 'Rare',
    inStock: true,
    rating: 4.7,
    reviews: 67
  },
]

export const fishBreeds: PetBreed[] = [
  {
    id: 'goldfish',
    name: 'Goldfish',
    category: 'fish',
    price: '₹50',
    image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600',
    description: 'Classic beginner fish. Hardy and beautiful.',
    features: ['Hardy', 'Affordable', 'Long-lived'],
    badge: 'Easy Care',
    inStock: true,
    rating: 4.8,
    reviews: 456
  },
  {
    id: 'betta',
    name: 'Betta (Siamese Fighter)',
    category: 'fish',
    price: '₹150',
    originalPrice: '₹250',
    image: 'https://images.unsplash.com/photo-1520302519878-3278a31cfbc3?w=600',
    description: 'Stunning colors and flowing fins. Solitary fish.',
    features: ['Colorful', 'Low maintenance', 'No filter needed'],
    badge: 'Popular',
    inStock: true,
    rating: 4.9,
    reviews: 389
  },
  {
    id: 'guppy',
    name: 'Guppy',
    category: 'fish',
    price: '₹30',
    image: 'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=600',
    description: 'Colorful and active. Easy to breed.',
    features: ['Colorful', 'Active', 'Easy breeding'],
    badge: 'Easy Care',
    inStock: true,
    rating: 4.7,
    reviews: 312
  },
  {
    id: 'molly',
    name: 'Molly',
    category: 'fish',
    price: '₹40',
    image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=600',
    description: 'Peaceful community fish. Various colors.',
    features: ['Peaceful', 'Community fish', 'Hardy'],
    inStock: true,
    rating: 4.6,
    reviews: 198
  },
  {
    id: 'neon-tetra',
    name: 'Neon Tetra',
    category: 'fish',
    price: '₹25',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600',
    description: 'Brilliant blue and red stripe. Schooling fish.',
    features: ['Bright colors', 'Peaceful', 'Schooling'],
    badge: 'Popular',
    inStock: true,
    rating: 4.8,
    reviews: 267
  },
  {
    id: 'angelfish',
    name: 'Angelfish',
    category: 'fish',
    price: '₹200',
    originalPrice: '₹300',
    image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=600',
    description: 'Elegant triangular shape. Semi-aggressive.',
    features: ['Elegant', 'Show fish', 'Long-lived'],
    badge: 'Popular',
    inStock: true,
    rating: 4.7,
    reviews: 178
  },
  {
    id: 'platy',
    name: 'Platy',
    category: 'fish',
    price: '₹35',
    image: 'https://images.unsplash.com/photo-1520302519878-3278a31cfbc3?w=600',
    description: 'Hardy and colorful. Great for beginners.',
    features: ['Hardy', 'Colorful', 'Easy care'],
    badge: 'Easy Care',
    inStock: true,
    rating: 4.6,
    reviews: 145
  },
  {
    id: 'zebra-danio',
    name: 'Zebra Danio',
    category: 'fish',
    price: '₹20',
    image: 'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=600',
    description: 'Active and hardy. Distinctive stripes.',
    features: ['Very active', 'Hardy', 'Schooling'],
    inStock: true,
    rating: 4.5,
    reviews: 134
  },
  {
    id: 'corydoras',
    name: 'Corydoras Catfish',
    category: 'fish',
    price: '₹80',
    image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=600',
    description: 'Bottom dweller. Cleans tank naturally.',
    features: ['Tank cleaner', 'Peaceful', 'Social'],
    badge: 'Easy Care',
    inStock: true,
    rating: 4.7,
    reviews: 156
  },
]

export const birdBreeds: PetBreed[] = [
  {
    id: 'budgerigar',
    name: 'Budgerigar (Budgie)',
    category: 'birds',
    price: '₹500',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600',
    description: 'Friendly, talkative, and colorful. Most popular pet bird.',
    features: ['Can talk', 'Friendly', 'Affordable'],
    badge: 'Popular',
    inStock: true,
    rating: 4.9,
    reviews: 534
  },
  {
    id: 'cockatiel',
    name: 'Cockatiel',
    category: 'birds',
    price: '₹2,500',
    originalPrice: '₹3,500',
    image: 'https://images.unsplash.com/photo-1591198936750-16d8e15edb51?w=600',
    description: 'Gentle, affectionate, and musical. Great companion.',
    features: ['Whistles tunes', 'Affectionate', 'Long-lived'],
    badge: 'Family Friendly',
    inStock: true,
    rating: 4.9,
    reviews: 387
  },
  {
    id: 'lovebird',
    name: 'Lovebirds',
    category: 'birds',
    price: '₹1,500',
    originalPrice: '₹2,000',
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600',
    description: 'Affectionate pairs. Vibrant colors.',
    features: ['Colorful', 'Social', 'Playful'],
    badge: 'Popular',
    inStock: true,
    rating: 4.8,
    reviews: 289
  },
  {
    id: 'indian-ringneck',
    name: 'Indian Ringneck Parakeet',
    category: 'birds',
    price: '₹3,000',
    originalPrice: '₹4,500',
    image: 'https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=600',
    description: 'Intelligent talker. Stunning green plumage.',
    features: ['Excellent talker', 'Intelligent', 'Beautiful'],
    badge: 'Best for India',
    inStock: true,
    rating: 4.8,
    reviews: 234
  },
  {
    id: 'zebra-finch',
    name: 'Zebra Finch',
    category: 'birds',
    price: '₹300',
    image: 'https://images.unsplash.com/photo-1549608276-5786777e6587?w=600',
    description: 'Small, active, and cheerful. Easy to care for.',
    features: ['Low maintenance', 'Cheerful song', 'Social'],
    badge: 'Easy Care',
    inStock: true,
    rating: 4.6,
    reviews: 178
  },
  {
    id: 'canary',
    name: 'Canary',
    category: 'birds',
    price: '₹800',
    originalPrice: '₹1,200',
    image: 'https://images.unsplash.com/photo-1591198936750-16d8e15edb51?w=600',
    description: 'Beautiful singer. Bright yellow classic.',
    features: ['Beautiful song', 'Colorful', 'Independent'],
    badge: 'Popular',
    inStock: true,
    rating: 4.7,
    reviews: 156
  },
  {
    id: 'sun-conure',
    name: 'Sun Conure',
    category: 'birds',
    price: '₹15,000',
    originalPrice: '₹20,000',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600',
    description: 'Vibrant sunset colors. Playful and affectionate.',
    features: ['Stunning colors', 'Playful', 'Loud'],
    badge: 'Rare',
    inStock: true,
    rating: 4.8,
    reviews: 89
  },
  {
    id: 'green-cheek-conure',
    name: 'Green-cheeked Conure',
    category: 'birds',
    price: '₹12,000',
    originalPrice: '₹16,000',
    image: 'https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=600',
    description: 'Quiet conure variety. Cuddly and playful.',
    features: ['Quieter', 'Cuddly', 'Playful'],
    badge: 'Family Friendly',
    inStock: true,
    rating: 4.9,
    reviews: 112
  },
  {
    id: 'java-sparrow',
    name: 'Java Sparrow',
    category: 'birds',
    price: '₹600',
    image: 'https://images.unsplash.com/photo-1549608276-5786777e6587?w=600',
    description: 'Elegant appearance. Gentle and social.',
    features: ['Elegant', 'Gentle', 'Social'],
    inStock: true,
    rating: 4.5,
    reviews: 67
  },
  {
    id: 'rose-ringed-parakeet',
    name: 'Rose-ringed Parakeet',
    category: 'birds',
    price: '₹2,000',
    originalPrice: '₹3,000',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600',
    description: 'Native Indian bird. Great talker.',
    features: ['Native species', 'Good talker', 'Hardy'],
    badge: 'Best for India',
    inStock: true,
    rating: 4.7,
    reviews: 198
  },
]

// Get all pets combined
export const allPets: PetBreed[] = [
  ...dogBreeds,
  ...catBreeds,
  ...rabbitBreeds,
  ...fishBreeds,
  ...birdBreeds,
]

// Get pets by category
export function getPetsByCategory(category: PetBreed['category']): PetBreed[] {
  switch (category) {
    case 'dogs':
      return dogBreeds
    case 'cats':
      return catBreeds
    case 'rabbits':
      return rabbitBreeds
    case 'fish':
      return fishBreeds
    case 'birds':
      return birdBreeds
    default:
      return []
  }
}

// Get popular pets
export function getPopularPets(): PetBreed[] {
  return allPets.filter(pet => pet.badge === 'Popular' || pet.badge === 'Best for India')
}

// Get featured pets (one from each category)
export function getFeaturedPets(): PetBreed[] {
  return [
    dogBreeds.find(p => p.badge === 'Popular') || dogBreeds[0],
    catBreeds.find(p => p.badge === 'Popular') || catBreeds[0],
    rabbitBreeds.find(p => p.badge === 'Popular') || rabbitBreeds[0],
    fishBreeds.find(p => p.badge === 'Popular') || fishBreeds[0],
    birdBreeds.find(p => p.badge === 'Popular') || birdBreeds[0],
  ]
}


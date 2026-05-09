// Pet5 – Birds & Fish Complete Product Data

export type Pet5Category = 'birds' | 'freshwater-fish' | 'marine-fish' | 'accessories';

export interface Pet5Product {
  id: string;
  name: string;
  slug: string;
  category: Pet5Category;
  subcategory: string;
  description: string;
  price: number | null;
  originalPrice?: number;
  images: string[];
  variants: { name: string; options: string[] }[];
  tags: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  isPreOrder?: boolean;
  rating: number;
  reviews: number;
  specifications?: Record<string, string>;
}

// ─── BIRDS ───
export const birds: Pet5Product[] = [
  {
    id: 'bird-budgerigar',
    name: 'Budgerigar (Budgie)',
    slug: 'budgerigar-budgie',
    category: 'birds',
    subcategory: 'Budgerigar',
    description: 'The Budgerigar, commonly known as Budgie, is one of the most popular pet birds worldwide. These small, colorful parakeets are known for their playful personality, ability to mimic speech, and low maintenance care requirements.',
    price: 499,
    originalPrice: 699,
    images: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800',
      'https://images.unsplash.com/photo-1591198936750-16d8e15edc9f?w=800',
    ],
    variants: [
      { name: 'Color', options: ['Green', 'Blue', 'Yellow', 'White', 'Lutino', 'Albino'] }
    ],
    tags: ['birds', 'budgie', 'parakeet', 'beginner-friendly', 'talking-bird'],
    inStock: true,
    isBestSeller: true,
    rating: 4.8,
    reviews: 324,
    specifications: {
      'Lifespan': '5-10 years',
      'Size': '7-8 inches',
      'Diet': 'Seeds, Pellets, Vegetables',
      'Temperament': 'Social, Playful',
    }
  },
  {
    id: 'bird-cockatiel',
    name: 'Cockatiel',
    slug: 'cockatiel',
    category: 'birds',
    subcategory: 'Cockatiel',
    description: 'Cockatiels are affectionate, gentle birds known for their distinctive crest and charming whistling abilities. They make excellent companions and are perfect for first-time bird owners seeking a medium-sized pet bird.',
    price: 1999,
    originalPrice: 2499,
    images: [
      'https://images.unsplash.com/photo-1606567595334-d39972c85dfd?w=800',
      'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=800',
    ],
    variants: [
      { name: 'Mutation', options: ['Normal Grey', 'Lutino', 'Pied', 'Pearl', 'Cinnamon'] }
    ],
    tags: ['birds', 'cockatiel', 'whistling', 'friendly', 'medium-bird'],
    inStock: true,
    rating: 4.9,
    reviews: 256,
    specifications: {
      'Lifespan': '15-20 years',
      'Size': '12-13 inches',
      'Diet': 'Seeds, Pellets, Fruits',
      'Temperament': 'Gentle, Affectionate',
    }
  },
  {
    id: 'bird-lovebird',
    name: 'Lovebird',
    slug: 'lovebird',
    category: 'birds',
    subcategory: 'Lovebird',
    description: 'Lovebirds are small, vibrant parrots known for their strong pair bonds and playful nature. These compact birds pack a lot of personality and are beloved for their beautiful plumage and entertaining antics.',
    price: 1499,
    originalPrice: 1799,
    images: [
      'https://images.unsplash.com/photo-1544923246-77307dd628b1?w=800',
      'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=800',
    ],
    variants: [
      { name: 'Species', options: ['Peach-faced', "Fischer's", 'Masked', 'Black-cheeked'] }
    ],
    tags: ['birds', 'lovebird', 'colorful', 'pair-bond', 'small-parrot'],
    inStock: true,
    rating: 4.7,
    reviews: 189,
    specifications: {
      'Lifespan': '10-15 years',
      'Size': '5-6 inches',
      'Diet': 'Seeds, Pellets, Greens',
      'Temperament': 'Active, Playful',
    }
  },
  {
    id: 'bird-finch',
    name: 'Zebra Finch & Gouldian Finch',
    slug: 'zebra-gouldian-finch',
    category: 'birds',
    subcategory: 'Finch',
    description: 'Finches are delightful small birds perfect for those who enjoy watching bird behavior. Zebra Finches are hardy and easy to care for, while Gouldian Finches display stunning rainbow colors.',
    price: 399,
    originalPrice: 499,
    images: [
      'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=800',
      'https://images.unsplash.com/photo-1544923246-77307dd628b1?w=800',
    ],
    variants: [
      { name: 'Species', options: ['Zebra Finch', 'Gouldian Finch', 'Society Finch'] }
    ],
    tags: ['birds', 'finch', 'small-bird', 'colorful', 'aviary'],
    inStock: true,
    rating: 4.6,
    reviews: 145,
    specifications: {
      'Lifespan': '5-8 years',
      'Size': '4-5 inches',
      'Diet': 'Seeds, Millet',
      'Temperament': 'Active, Social',
    }
  },
  {
    id: 'bird-canary',
    name: 'Canary',
    slug: 'canary',
    category: 'birds',
    subcategory: 'Canary',
    description: 'Canaries are renowned for their beautiful singing abilities and vibrant colors. These cheerful birds bring joy with their melodious songs and are relatively easy to care for.',
    price: 799,
    originalPrice: 999,
    images: [
      'https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=800',
      'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=800',
    ],
    variants: [
      { name: 'Type', options: ['Red Factor', 'Yellow', 'Gloster', 'Border'] }
    ],
    tags: ['birds', 'canary', 'singing-bird', 'melodious', 'colorful'],
    inStock: true,
    rating: 4.7,
    reviews: 167,
    specifications: {
      'Lifespan': '10-15 years',
      'Size': '4-5 inches',
      'Diet': 'Seeds, Greens',
      'Temperament': 'Cheerful, Independent',
    }
  },
  {
    id: 'bird-green-cheek-conure',
    name: 'Green-Cheeked Conure',
    slug: 'green-cheeked-conure',
    category: 'birds',
    subcategory: 'Conure',
    description: 'Green-Cheeked Conures are playful, affectionate parrots perfect for families. Known for their silly antics, cuddy nature, and quieter disposition compared to other conures.',
    price: 8999,
    originalPrice: 10999,
    images: [
      'https://images.unsplash.com/photo-1544923246-77307dd628b1?w=800',
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800',
    ],
    variants: [
      { name: 'Mutation', options: ['Normal', 'Pineapple', 'Turquoise', 'Yellow-sided'] }
    ],
    tags: ['birds', 'conure', 'parrot', 'cuddly', 'family-pet'],
    inStock: true,
    rating: 4.9,
    reviews: 98,
    specifications: {
      'Lifespan': '25-30 years',
      'Size': '10 inches',
      'Diet': 'Pellets, Fruits, Vegetables',
      'Temperament': 'Playful, Affectionate',
    }
  },
  {
    id: 'bird-sun-conure',
    name: 'Sun Conure',
    slug: 'sun-conure',
    category: 'birds',
    subcategory: 'Conure',
    description: 'Sun Conures are stunning parrots with brilliant yellow, orange, and green plumage. They are extremely social, intelligent, and make loyal companions for dedicated bird enthusiasts.',
    price: 24999,
    originalPrice: 29999,
    images: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800',
      'https://images.unsplash.com/photo-1544923246-77307dd628b1?w=800',
    ],
    variants: [],
    tags: ['birds', 'conure', 'sun-conure', 'colorful', 'parrot'],
    inStock: true,
    rating: 4.8,
    reviews: 76,
    specifications: {
      'Lifespan': '25-30 years',
      'Size': '12 inches',
      'Diet': 'Pellets, Fruits, Seeds',
      'Temperament': 'Social, Vocal',
    }
  },
  {
    id: 'bird-parrotlet',
    name: 'Parrotlet',
    slug: 'parrotlet',
    category: 'birds',
    subcategory: 'Parrotlet',
    description: 'Parrotlets are the smallest true parrots, packing big personality in a tiny package. These feisty little birds can learn to talk and are perfect for those wanting a parrot in a compact size.',
    price: 4999,
    originalPrice: 5999,
    images: [
      'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=800',
      'https://images.unsplash.com/photo-1544923246-77307dd628b1?w=800',
    ],
    variants: [
      { name: 'Species', options: ['Pacific', 'Green-rumped'] }
    ],
    tags: ['birds', 'parrotlet', 'tiny-parrot', 'talking-bird', 'compact'],
    inStock: true,
    rating: 4.6,
    reviews: 89,
    specifications: {
      'Lifespan': '15-20 years',
      'Size': '4-5 inches',
      'Diet': 'Pellets, Seeds, Vegetables',
      'Temperament': 'Feisty, Bold',
    }
  },
  {
    id: 'bird-indian-ringneck',
    name: 'Indian Ringneck Parakeet',
    slug: 'indian-ringneck-parakeet',
    category: 'birds',
    subcategory: 'Indian Ringneck',
    description: 'Indian Ringneck Parakeets are elegant, intelligent birds known for their exceptional talking ability and beautiful long tail. They come in stunning color mutations and make devoted pets.',
    price: 14999,
    originalPrice: 17999,
    images: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800',
      'https://images.unsplash.com/photo-1591608971362-f08b2a75731a?w=800',
    ],
    variants: [
      { name: 'Color', options: ['Blue', 'Green', 'Lutino', 'Violet'] }
    ],
    tags: ['birds', 'ringneck', 'parakeet', 'talking-bird', 'elegant'],
    inStock: true,
    rating: 4.8,
    reviews: 134,
    specifications: {
      'Lifespan': '25-30 years',
      'Size': '16 inches',
      'Diet': 'Pellets, Fruits, Nuts',
      'Temperament': 'Intelligent, Independent',
    }
  },
  {
    id: 'bird-african-grey',
    name: 'African Grey Parrot',
    slug: 'african-grey-parrot',
    category: 'birds',
    subcategory: 'African Grey',
    description: 'African Grey Parrots are considered the most intelligent of all parrot species. Famous for their exceptional talking ability and cognitive skills, they form deep bonds with their owners.',
    price: 89999,
    originalPrice: 99999,
    images: [
      'https://images.unsplash.com/photo-1544923246-77307dd628b1?w=800',
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800',
    ],
    variants: [
      { name: 'Species', options: ['Congo', 'Timneh'] }
    ],
    tags: ['birds', 'african-grey', 'parrot', 'talking-bird', 'intelligent', 'premium'],
    inStock: true,
    isNew: true,
    rating: 5.0,
    reviews: 45,
    specifications: {
      'Lifespan': '40-60 years',
      'Size': '12-14 inches',
      'Diet': 'Pellets, Nuts, Fruits, Vegetables',
      'Temperament': 'Intelligent, Sensitive',
    }
  },
  {
    id: 'bird-rainbow-lorikeet',
    name: 'Rainbow Lorikeet',
    slug: 'rainbow-lorikeet',
    category: 'birds',
    subcategory: 'Lorikeet',
    description: 'Rainbow Lorikeets are stunningly colorful birds with a playful, energetic personality. They require a specialized nectar diet and are known for their acrobatic abilities and vibrant rainbow plumage.',
    price: 34999,
    originalPrice: 39999,
    images: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800',
      'https://images.unsplash.com/photo-1544923246-77307dd628b1?w=800',
    ],
    variants: [],
    tags: ['birds', 'lorikeet', 'rainbow', 'colorful', 'nectar-feeder', 'exotic'],
    inStock: true,
    isNew: true,
    rating: 4.9,
    reviews: 28,
    specifications: {
      'Lifespan': '20-30 years',
      'Size': '10-12 inches',
      'Diet': 'Nectar, Pollen, Fruits',
      'Temperament': 'Energetic, Playful',
    }
  },
];

// ─── FRESHWATER FISH ───
export const freshwaterFish: Pet5Product[] = [
  {
    id: 'fish-guppy',
    name: 'Fancy Guppy',
    slug: 'fancy-guppy',
    category: 'freshwater-fish',
    subcategory: 'Guppy',
    description: 'Fancy Guppies are stunning livebearers known for their beautiful, flowing tails and vibrant colors. Easy to care for and breed, they are perfect for beginners and experienced aquarists alike.',
    price: 99,
    originalPrice: 149,
    images: [
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    ],
    variants: [
      { name: 'Type', options: ['Moscow', 'Cobra', 'Koi', 'Endler'] }
    ],
    tags: ['fish', 'guppy', 'freshwater', 'beginner', 'livebearer', 'colorful'],
    inStock: true,
    isBestSeller: true,
    rating: 4.8,
    reviews: 567,
    specifications: {
      'Size': '1.5-2.5 inches',
      'Temperature': '72-82°F',
      'pH': '7.0-8.2',
      'Tank Size': '10+ gallons',
    }
  },
  {
    id: 'fish-molly',
    name: 'Molly Fish',
    slug: 'molly-fish',
    category: 'freshwater-fish',
    subcategory: 'Molly',
    description: 'Molly fish are peaceful, hardy livebearers available in various colors and fin types. They adapt well to different water conditions and are excellent community tank fish.',
    price: 79,
    originalPrice: 99,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800',
    ],
    variants: [
      { name: 'Type', options: ['Black', 'Balloon', 'Sailfin', 'Gold Dust'] }
    ],
    tags: ['fish', 'molly', 'freshwater', 'livebearer', 'community'],
    inStock: true,
    rating: 4.6,
    reviews: 423,
    specifications: {
      'Size': '3-4 inches',
      'Temperature': '72-78°F',
      'pH': '7.5-8.5',
      'Tank Size': '20+ gallons',
    }
  },
  {
    id: 'fish-platy',
    name: 'Platy Fish',
    slug: 'platy-fish',
    category: 'freshwater-fish',
    subcategory: 'Platy',
    description: 'Platy fish are colorful, peaceful livebearers that come in a wide variety of patterns and colors. They are hardy, easy to care for, and perfect for community aquariums.',
    price: 69,
    originalPrice: 89,
    images: [
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    ],
    variants: [
      { name: 'Type', options: ['Red Wag', 'Mickey Mouse', 'Sunburst'] }
    ],
    tags: ['fish', 'platy', 'freshwater', 'livebearer', 'beginner'],
    inStock: true,
    rating: 4.5,
    reviews: 312,
    specifications: {
      'Size': '2-3 inches',
      'Temperature': '70-77°F',
      'pH': '7.0-8.2',
      'Tank Size': '10+ gallons',
    }
  },
  {
    id: 'fish-swordtail',
    name: 'Swordtail Fish',
    slug: 'swordtail-fish',
    category: 'freshwater-fish',
    subcategory: 'Swordtail',
    description: 'Swordtail fish are named for the distinctive sword-like extension on males\' tails. These active swimmers are colorful, hardy, and make excellent additions to community tanks.',
    price: 89,
    originalPrice: 119,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800',
    ],
    variants: [
      { name: 'Type', options: ['Red', 'Koi', 'Pineapple'] }
    ],
    tags: ['fish', 'swordtail', 'freshwater', 'livebearer', 'active'],
    inStock: true,
    rating: 4.6,
    reviews: 234,
    specifications: {
      'Size': '4-5 inches',
      'Temperature': '72-79°F',
      'pH': '7.0-8.3',
      'Tank Size': '20+ gallons',
    }
  },
  {
    id: 'fish-tetra',
    name: 'Neon Tetra / Cardinal Tetra',
    slug: 'neon-cardinal-tetra',
    category: 'freshwater-fish',
    subcategory: 'Tetra',
    description: 'Neon and Cardinal Tetras are iconic aquarium fish with stunning iridescent blue and red coloration. Best kept in schools, they create a mesmerizing display in planted tanks.',
    price: 49,
    originalPrice: 69,
    images: [
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    ],
    variants: [
      { name: 'Species', options: ['Neon Tetra', 'Cardinal Tetra', 'Green Neon'] }
    ],
    tags: ['fish', 'tetra', 'freshwater', 'schooling', 'planted-tank'],
    inStock: true,
    rating: 4.8,
    reviews: 678,
    specifications: {
      'Size': '1-2 inches',
      'Temperature': '72-76°F',
      'pH': '6.0-7.0',
      'Tank Size': '10+ gallons',
    }
  },
  {
    id: 'fish-goldfish',
    name: 'Goldfish',
    slug: 'goldfish',
    category: 'freshwater-fish',
    subcategory: 'Goldfish',
    description: 'Goldfish are classic aquarium fish available in numerous fancy varieties. From elegant Orandas to round Ranchus, these beautiful fish are beloved worldwide for their charm and longevity.',
    price: 299,
    originalPrice: 399,
    images: [
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    ],
    variants: [
      { name: 'Variety', options: ['Fantail', 'Oranda', 'Ryukin', 'Black Moor', 'Ranchu', 'Lionhead'] }
    ],
    tags: ['fish', 'goldfish', 'freshwater', 'fancy', 'cold-water'],
    inStock: true,
    isBestSeller: true,
    rating: 4.9,
    reviews: 789,
    specifications: {
      'Size': '6-12 inches',
      'Temperature': '65-72°F',
      'pH': '7.0-8.0',
      'Tank Size': '30+ gallons',
    }
  },
  {
    id: 'fish-betta',
    name: 'Betta Fish',
    slug: 'betta-fish',
    category: 'freshwater-fish',
    subcategory: 'Betta',
    description: 'Betta fish, also known as Siamese Fighting Fish, are famous for their spectacular finnage and vibrant colors. These intelligent fish display unique personalities and are a favorite among hobbyists.',
    price: 499,
    originalPrice: 699,
    images: [
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    ],
    variants: [
      { name: 'Type', options: ['Halfmoon', 'Crowntail', 'Plakat', 'Dumbo', 'Dragon Scale', 'Koi'] }
    ],
    tags: ['fish', 'betta', 'freshwater', 'siamese-fighting-fish', 'colorful'],
    inStock: true,
    isBestSeller: true,
    rating: 4.9,
    reviews: 1234,
    specifications: {
      'Size': '2.5-3 inches',
      'Temperature': '76-82°F',
      'pH': '6.5-7.5',
      'Tank Size': '5+ gallons',
    }
  },
  {
    id: 'fish-angelfish',
    name: 'Angelfish',
    slug: 'angelfish',
    category: 'freshwater-fish',
    subcategory: 'Angelfish',
    description: 'Freshwater Angelfish are graceful cichlids with tall, elegant fins. These majestic fish are a centerpiece in many aquariums and come in various color patterns.',
    price: 399,
    originalPrice: 499,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800',
    ],
    variants: [
      { name: 'Type', options: ['Marble', 'Koi', 'Black', 'Albino'] }
    ],
    tags: ['fish', 'angelfish', 'freshwater', 'cichlid', 'elegant'],
    inStock: true,
    rating: 4.7,
    reviews: 345,
    specifications: {
      'Size': '6-8 inches',
      'Temperature': '76-84°F',
      'pH': '6.5-7.5',
      'Tank Size': '30+ gallons',
    }
  },
  {
    id: 'fish-discus',
    name: 'Discus Fish',
    slug: 'discus-fish',
    category: 'freshwater-fish',
    subcategory: 'Discus',
    description: 'Discus are the "King of the Aquarium" – stunning, disc-shaped cichlids with incredible color patterns. These premium fish require dedicated care but reward keepers with unmatched beauty.',
    price: 4999,
    originalPrice: 5999,
    images: [
      'https://images.unsplash.com/photo-1571752726703-5e7d1f6a986d?w=800',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    ],
    variants: [
      { name: 'Type', options: ['Pigeon Blood', 'Blue Diamond', 'Red Turquoise'] }
    ],
    tags: ['fish', 'discus', 'freshwater', 'premium', 'king-of-aquarium'],
    inStock: true,
    isNew: true,
    rating: 5.0,
    reviews: 89,
    specifications: {
      'Size': '8-10 inches',
      'Temperature': '82-86°F',
      'pH': '6.0-7.0',
      'Tank Size': '55+ gallons',
    }
  },
  {
    id: 'fish-corydoras',
    name: 'Corydoras Catfish',
    slug: 'corydoras-catfish',
    category: 'freshwater-fish',
    subcategory: 'Corydoras',
    description: 'Corydoras are adorable bottom-dwelling catfish known for their peaceful nature and excellent tank cleaning abilities. Best kept in groups, they are essential for any community tank.',
    price: 149,
    originalPrice: 199,
    images: [
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    ],
    variants: [
      { name: 'Species', options: ['Panda', 'Bronze', 'Sterbai'] }
    ],
    tags: ['fish', 'corydoras', 'catfish', 'freshwater', 'bottom-dweller'],
    inStock: true,
    rating: 4.7,
    reviews: 456,
    specifications: {
      'Size': '2-3 inches',
      'Temperature': '72-78°F',
      'pH': '6.5-7.5',
      'Tank Size': '10+ gallons',
    }
  },
  {
    id: 'fish-pleco',
    name: 'Bristlenose Pleco',
    slug: 'bristlenose-pleco',
    category: 'freshwater-fish',
    subcategory: 'Pleco',
    description: 'Bristlenose Plecos are excellent algae-eating catfish that stay relatively small. Their distinctive "bristles" and hardy nature make them popular choices for planted and community tanks.',
    price: 299,
    originalPrice: 399,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800',
    ],
    variants: [
      { name: 'Type', options: ['Regular', 'Albino', 'Super Red', 'Longfin'] }
    ],
    tags: ['fish', 'pleco', 'catfish', 'freshwater', 'algae-eater'],
    inStock: true,
    rating: 4.6,
    reviews: 289,
    specifications: {
      'Size': '4-5 inches',
      'Temperature': '73-81°F',
      'pH': '6.5-7.5',
      'Tank Size': '25+ gallons',
    }
  },
  {
    id: 'fish-danio',
    name: 'GloFish Danio / Zebra Danio',
    slug: 'glofish-zebra-danio',
    category: 'freshwater-fish',
    subcategory: 'Danio',
    description: 'Danios are active, hardy fish perfect for beginners. GloFish Danios feature vibrant fluorescent colors, while Zebra Danios display classic striped patterns. Both are excellent schooling fish.',
    price: 149,
    originalPrice: 199,
    images: [
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    ],
    variants: [
      { name: 'Type', options: ['GloFish', 'Zebra', 'Leopard'] }
    ],
    tags: ['fish', 'danio', 'freshwater', 'schooling', 'active'],
    inStock: true,
    rating: 4.5,
    reviews: 234,
    specifications: {
      'Size': '2 inches',
      'Temperature': '64-75°F',
      'pH': '6.5-7.5',
      'Tank Size': '10+ gallons',
    }
  },
  {
    id: 'fish-barb',
    name: 'Tiger Barb / Cherry Barb',
    slug: 'tiger-cherry-barb',
    category: 'freshwater-fish',
    subcategory: 'Barb',
    description: 'Barbs are active, colorful fish that add energy to any aquarium. Tiger Barbs are playful with bold stripes, while Cherry Barbs display beautiful red coloration.',
    price: 79,
    originalPrice: 99,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800',
    ],
    variants: [
      { name: 'Species', options: ['Tiger Barb', 'Cherry Barb', 'Rosy Barb'] }
    ],
    tags: ['fish', 'barb', 'freshwater', 'schooling', 'active'],
    inStock: true,
    rating: 4.5,
    reviews: 189,
    specifications: {
      'Size': '2-3 inches',
      'Temperature': '74-79°F',
      'pH': '6.5-7.5',
      'Tank Size': '20+ gallons',
    }
  },
  {
    id: 'fish-gourami',
    name: 'Dwarf Gourami',
    slug: 'dwarf-gourami',
    category: 'freshwater-fish',
    subcategory: 'Gourami',
    description: 'Dwarf Gouramis are stunning labyrinth fish with vibrant colors and peaceful temperament. Their unique breathing ability and beautiful patterns make them popular centerpiece fish.',
    price: 299,
    originalPrice: 399,
    images: [
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    ],
    variants: [
      { name: 'Type', options: ['Powder Blue', 'Flame', 'Neon Blue'] }
    ],
    tags: ['fish', 'gourami', 'freshwater', 'labyrinth', 'colorful'],
    inStock: true,
    rating: 4.7,
    reviews: 267,
    specifications: {
      'Size': '3-4 inches',
      'Temperature': '77-82°F',
      'pH': '6.0-7.5',
      'Tank Size': '10+ gallons',
    }
  },
];

// ─── MARINE FISH ───
export const marineFish: Pet5Product[] = [
  {
    id: 'marine-clownfish',
    name: 'Ocellaris Clownfish',
    slug: 'ocellaris-clownfish',
    category: 'marine-fish',
    subcategory: 'Clownfish',
    description: 'Ocellaris Clownfish, made famous by "Finding Nemo," are hardy marine fish perfect for beginners. They can form symbiotic relationships with anemones and come in stunning designer varieties.',
    price: 999,
    originalPrice: 1299,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800',
    ],
    variants: [
      { name: 'Type', options: ['Normal', 'Picasso', 'Snowflake', 'Black Ice'] }
    ],
    tags: ['fish', 'clownfish', 'marine', 'saltwater', 'nemo', 'beginner-marine'],
    inStock: true,
    isBestSeller: true,
    rating: 4.9,
    reviews: 456,
    specifications: {
      'Size': '3-4 inches',
      'Temperature': '75-80°F',
      'pH': '8.1-8.4',
      'Tank Size': '20+ gallons',
    }
  },
  {
    id: 'marine-royal-gramma',
    name: 'Royal Gramma',
    slug: 'royal-gramma',
    category: 'marine-fish',
    subcategory: 'Basslet',
    description: 'Royal Grammas are stunning purple and yellow basslets that add brilliant color to reef tanks. Hardy and peaceful, they are excellent choices for beginner marine aquarists.',
    price: 1499,
    originalPrice: 1799,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800',
    ],
    variants: [],
    tags: ['fish', 'royal-gramma', 'marine', 'basslet', 'reef-safe'],
    inStock: true,
    rating: 4.8,
    reviews: 123,
    specifications: {
      'Size': '3 inches',
      'Temperature': '72-78°F',
      'pH': '8.1-8.4',
      'Tank Size': '30+ gallons',
    }
  },
  {
    id: 'marine-banggai-cardinal',
    name: 'Banggai Cardinalfish',
    slug: 'banggai-cardinalfish',
    category: 'marine-fish',
    subcategory: 'Cardinal',
    description: 'Banggai Cardinalfish are elegant, silver-bodied fish with striking black bars. They are peaceful, hardy, and can be kept in small groups, making them perfect for reef aquariums.',
    price: 1299,
    originalPrice: 1599,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800',
    ],
    variants: [],
    tags: ['fish', 'cardinalfish', 'marine', 'banggai', 'reef-safe'],
    inStock: true,
    rating: 4.7,
    reviews: 98,
    specifications: {
      'Size': '3 inches',
      'Temperature': '75-80°F',
      'pH': '8.1-8.4',
      'Tank Size': '30+ gallons',
    }
  },
  {
    id: 'marine-tang',
    name: 'Yellow Tang / Blue Tang',
    slug: 'yellow-blue-tang',
    category: 'marine-fish',
    subcategory: 'Tang',
    description: 'Tangs are iconic reef fish known for their vibrant colors and active swimming. Yellow Tangs are bright golden, while Blue Tangs (Dory) display stunning blue and yellow patterns.',
    price: 4999,
    originalPrice: 5999,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800',
    ],
    variants: [
      { name: 'Species', options: ['Yellow Tang', 'Blue Tang', 'Powder Blue'] }
    ],
    tags: ['fish', 'tang', 'marine', 'dory', 'reef-safe', 'algae-eater'],
    inStock: true,
    rating: 4.8,
    reviews: 167,
    specifications: {
      'Size': '6-12 inches',
      'Temperature': '75-82°F',
      'pH': '8.1-8.4',
      'Tank Size': '75+ gallons',
    }
  },
  {
    id: 'marine-chromis',
    name: 'Green Chromis',
    slug: 'green-chromis',
    category: 'marine-fish',
    subcategory: 'Damselfish',
    description: 'Green Chromis are peaceful, shimmering schooling fish perfect for reef tanks. Their iridescent green-blue coloration and active swimming make them excellent additions to any marine setup.',
    price: 399,
    originalPrice: 499,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800',
    ],
    variants: [],
    tags: ['fish', 'chromis', 'marine', 'damselfish', 'schooling', 'reef-safe'],
    inStock: true,
    rating: 4.6,
    reviews: 234,
    specifications: {
      'Size': '3-4 inches',
      'Temperature': '72-78°F',
      'pH': '8.1-8.4',
      'Tank Size': '30+ gallons',
    }
  },
];

// ─── FISH ACCESSORIES & EQUIPMENT ───
export const accessories: Pet5Product[] = [
  {
    id: 'acc-aquarium-tank',
    name: 'Aquarium Tank',
    slug: 'aquarium-tank',
    category: 'accessories',
    subcategory: 'Tanks',
    description: 'High-quality glass aquarium tanks in various sizes. From compact nano tanks to large planted setups, find the perfect home for your aquatic pets.',
    price: 1999,
    originalPrice: 2499,
    images: [
      'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    ],
    variants: [
      { name: 'Size', options: ['10L', '20L', '30L', '50L', '100L'] },
      { name: 'Style', options: ['Regular', 'Rimless', 'Planted'] }
    ],
    tags: ['accessories', 'tank', 'aquarium', 'glass'],
    inStock: true,
    rating: 4.8,
    reviews: 345,
  },
  {
    id: 'acc-filter',
    name: 'Hang-on-Back Filter',
    slug: 'hang-on-back-filter',
    category: 'accessories',
    subcategory: 'Filters',
    description: 'Efficient hang-on-back filters for crystal clear water. Easy to install and maintain, these filters provide excellent mechanical, chemical, and biological filtration.',
    price: 799,
    originalPrice: 999,
    images: [
      'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800',
    ],
    variants: [
      { name: 'Flow Rate', options: ['100 LPH', '200 LPH', '400 LPH', '800 LPH'] }
    ],
    tags: ['accessories', 'filter', 'hob', 'filtration'],
    inStock: true,
    rating: 4.7,
    reviews: 456,
  },
  {
    id: 'acc-heater',
    name: 'Submersible Heater',
    slug: 'submersible-heater',
    category: 'accessories',
    subcategory: 'Heaters',
    description: 'Reliable submersible heaters with precise temperature control. Essential for tropical fish to maintain optimal water temperature year-round.',
    price: 599,
    originalPrice: 799,
    images: [
      'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800',
    ],
    variants: [
      { name: 'Wattage', options: ['50W', '100W', '200W', '300W'] }
    ],
    tags: ['accessories', 'heater', 'temperature', 'tropical'],
    inStock: true,
    rating: 4.6,
    reviews: 389,
  },
  {
    id: 'acc-led-light',
    name: 'LED Aquarium Light',
    slug: 'led-aquarium-light',
    category: 'accessories',
    subcategory: 'Lighting',
    description: 'Energy-efficient LED lights that enhance fish colors and support plant growth. Features adjustable brightness and multiple lighting modes.',
    price: 1299,
    originalPrice: 1599,
    images: [
      'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800',
    ],
    variants: [
      { name: 'Type', options: ['RGB', 'WRGB', 'Marine Blue'] }
    ],
    tags: ['accessories', 'light', 'led', 'planted-tank'],
    inStock: true,
    rating: 4.8,
    reviews: 267,
  },
  {
    id: 'acc-air-pump',
    name: 'Air Pump + Air Stone',
    slug: 'air-pump-air-stone',
    category: 'accessories',
    subcategory: 'Aeration',
    description: 'Quiet air pumps with air stones for optimal oxygenation. Essential for fish health, especially in warm weather or densely stocked tanks.',
    price: 299,
    originalPrice: 399,
    images: [
      'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800',
    ],
    variants: [
      { name: 'Size', options: ['Small (10-30L)', 'Medium (30-60L)', 'Large (60-100L)'] }
    ],
    tags: ['accessories', 'air-pump', 'aeration', 'oxygen'],
    inStock: true,
    rating: 4.5,
    reviews: 234,
  },
  {
    id: 'acc-substrate',
    name: 'Aquarium Substrate',
    slug: 'aquarium-substrate',
    category: 'accessories',
    subcategory: 'Substrate',
    description: 'Premium substrates for aquariums. Choose from decorative gravel, natural sand, or nutrient-rich soil for planted tanks.',
    price: 499,
    originalPrice: 649,
    images: [
      'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800',
    ],
    variants: [
      { name: 'Type', options: ['Black Gravel', 'White Sand', 'ADA Soil'] }
    ],
    tags: ['accessories', 'substrate', 'gravel', 'sand', 'planted-tank'],
    inStock: true,
    rating: 4.7,
    reviews: 198,
  },
  {
    id: 'acc-driftwood',
    name: 'Driftwood & Rocks',
    slug: 'driftwood-rocks',
    category: 'accessories',
    subcategory: 'Decor',
    description: 'Natural driftwood and rocks for stunning aquascapes. Pre-cleaned and safe for all aquarium types. Creates natural hiding spots for fish.',
    price: 399,
    originalPrice: 549,
    images: [
      'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800',
    ],
    variants: [
      { name: 'Size', options: ['Small', 'Medium', 'Large'] }
    ],
    tags: ['accessories', 'driftwood', 'rocks', 'decor', 'aquascape'],
    inStock: true,
    rating: 4.6,
    reviews: 167,
  },
  {
    id: 'acc-water-conditioner',
    name: 'Water Conditioner & Beneficial Bacteria',
    slug: 'water-conditioner-bacteria',
    category: 'accessories',
    subcategory: 'Water Care',
    description: 'Essential water treatments to remove chlorine and establish beneficial bacteria. Makes tap water safe for fish instantly.',
    price: 249,
    originalPrice: 349,
    images: [
      'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800',
    ],
    variants: [
      { name: 'Size', options: ['100ml', '250ml', '500ml'] }
    ],
    tags: ['accessories', 'water-conditioner', 'bacteria', 'water-treatment'],
    inStock: true,
    rating: 4.8,
    reviews: 456,
  },
  {
    id: 'acc-fish-food',
    name: 'Fish Food',
    slug: 'fish-food',
    category: 'accessories',
    subcategory: 'Food',
    description: 'Premium quality fish food for optimal health and color enhancement. Available in flakes, pellets, and frozen varieties.',
    price: 199,
    originalPrice: 249,
    images: [
      'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800',
    ],
    variants: [
      { name: 'Type', options: ['Flakes', 'Pellets', 'Frozen Bloodworm'] }
    ],
    tags: ['accessories', 'food', 'nutrition', 'pellets', 'flakes'],
    inStock: true,
    rating: 4.7,
    reviews: 567,
  },
  {
    id: 'acc-fish-net',
    name: 'Fish Net & Algae Scraper',
    slug: 'fish-net-algae-scraper',
    category: 'accessories',
    subcategory: 'Tools',
    description: 'Essential tools for aquarium maintenance. Soft mesh nets for safe fish handling and effective scrapers for algae removal.',
    price: 149,
    originalPrice: 199,
    images: [
      'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800',
    ],
    variants: [
      { name: 'Net Size', options: ['Small', 'Medium', 'Large'] }
    ],
    tags: ['accessories', 'net', 'scraper', 'tools', 'maintenance'],
    inStock: true,
    rating: 4.5,
    reviews: 234,
  },
  {
    id: 'acc-co2-system',
    name: 'CO2 System Set',
    slug: 'co2-system-set',
    category: 'accessories',
    subcategory: 'Planted Tank',
    description: 'Complete CO2 injection system for lush planted aquariums. Includes regulator, solenoid, diffuser, and bubble counter.',
    price: 4999,
    originalPrice: 5999,
    images: [
      'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800',
    ],
    variants: [
      { name: 'Type', options: ['Beginner Kit', 'Pro Kit'] }
    ],
    tags: ['accessories', 'co2', 'planted-tank', 'aquascape'],
    inStock: true,
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 'acc-test-kit',
    name: 'Water Test Kit',
    slug: 'water-test-kit',
    category: 'accessories',
    subcategory: 'Testing',
    description: 'Comprehensive water testing kits to monitor pH, ammonia, nitrite, and nitrate levels. Essential for maintaining a healthy aquarium.',
    price: 799,
    originalPrice: 999,
    images: [
      'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800',
    ],
    variants: [
      { name: 'Type', options: ['pH Only', 'Master Kit (All Tests)'] }
    ],
    tags: ['accessories', 'test-kit', 'water-quality', 'monitoring'],
    inStock: true,
    rating: 4.7,
    reviews: 345,
  },
  {
    id: 'acc-protein-skimmer',
    name: 'Protein Skimmer',
    slug: 'protein-skimmer',
    category: 'accessories',
    subcategory: 'Marine Equipment',
    description: 'Essential equipment for marine and reef aquariums. Removes organic waste before it breaks down, maintaining pristine water quality.',
    price: 3999,
    originalPrice: 4999,
    images: [
      'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800',
    ],
    variants: [
      { name: 'Size', options: ['Nano (up to 50L)', 'Medium (50-150L)'] }
    ],
    tags: ['accessories', 'protein-skimmer', 'marine', 'reef'],
    inStock: true,
    rating: 4.8,
    reviews: 78,
  },
];

// All products combined
export const allPet5Products: Pet5Product[] = [
  ...birds,
  ...freshwaterFish,
  ...marineFish,
  ...accessories,
];

// Filter options
export const pet5Filters = {
  types: [
    { id: 'birds', name: 'Birds', icon: '🦜' },
    { id: 'freshwater-fish', name: 'Freshwater Fish', icon: '🐠' },
    { id: 'marine-fish', name: 'Marine/Saltwater Fish', icon: '🐟' },
    { id: 'accessories', name: 'Fish Accessories', icon: '🔧' },
  ],
  birdSpecies: [
    'Budgerigar', 'Cockatiel', 'Lovebird', 'Finch', 'Canary', 
    'Conure', 'Parrotlet', 'Indian Ringneck', 'African Grey', 'Lorikeet'
  ],
  freshwaterSpecies: [
    'Guppy', 'Molly', 'Platy', 'Swordtail', 'Tetra', 'Goldfish', 
    'Betta', 'Angelfish', 'Discus', 'Corydoras', 'Pleco', 'Danio', 
    'Barb', 'Gourami'
  ],
  marineSpecies: [
    'Clownfish', 'Basslet', 'Cardinal', 'Tang', 'Damselfish'
  ],
  priceRanges: [
    { min: 0, max: 500, label: 'Under ₹500' },
    { min: 500, max: 1000, label: '₹500 - ₹1,000' },
    { min: 1000, max: 5000, label: '₹1,000 - ₹5,000' },
    { min: 5000, max: 20000, label: '₹5,000 - ₹20,000' },
    { min: 20000, max: Infinity, label: '₹20,000+' },
  ],
};


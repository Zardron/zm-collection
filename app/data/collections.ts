import { Product } from '../contexts/CartContext';

// Available collection images by category
// Using category-specific product placeholder images
// Note: Replace these with actual product photos in the public folder for better results
const collectionImages: Record<string, string[]> = {
  "Men's T-Shirt": [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=800&fit=crop',
  ],
  "Men's Shorts": [
    'https://images.unsplash.com/photo-1591195853828-11b59e3b3c02?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop',
  ],
  "Women's Blouse": [
    'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1594633313647-681b448ce350?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=800&fit=crop',
  ],
  "Women's Dress": [
    'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&h=800&fit=crop',
  ],
  "Men's Pants": [
    'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop',
  ],
  "Accessories": [
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1572635196237-14b3f281738f?w=800&h=800&fit=crop',
  ],
};

// Placeholder image for collections without photos
const PLACEHOLDER_COLLECTION_IMAGE = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=800&fit=crop';

// Helper function to get collection image based on category and collection ID
function getCollectionImage(category: string | undefined, collectionId: number): string {
  if (!category) {
    return PLACEHOLDER_COLLECTION_IMAGE;
  }

  const images = collectionImages[category];
  if (!images || images.length === 0) {
    return PLACEHOLDER_COLLECTION_IMAGE;
  }

  // Use collection ID to deterministically assign images
  // This ensures the same collection always gets the same image
  // Subtract 100 because collection IDs start at 100
  const imageIndex = (collectionId - 100) % images.length;
  return images[imageIndex];
}

// Fashion collections data (clothing items)
export const allCollections: Product[] = [
  // Men's T-Shirts
  {
    id: 100,
    name: 'Classic Cotton T-Shirt - Men',
    price: '₱899',
    originalPrice: '₱1,299',
    image: getCollectionImage("Men's T-Shirt", 100),
    badge: 'Best Seller',
    category: "Men's T-Shirt",
  },
  {
    id: 101,
    name: 'Premium V-Neck T-Shirt - Men',
    price: '₱999',
    originalPrice: '₱1,399',
    image: getCollectionImage("Men's T-Shirt", 101),
    badge: 'New',
    category: "Men's T-Shirt",
  },
  {
    id: 102,
    name: 'Slim Fit Polo T-Shirt - Men',
    price: '₱1,299',
    originalPrice: '₱1,799',
    image: getCollectionImage("Men's T-Shirt", 102),
    badge: 'Premium',
    category: "Men's T-Shirt",
  },
  {
    id: 103,
    name: 'Graphic Print T-Shirt - Men',
    price: '₱1,199',
    originalPrice: '₱1,599',
    image: getCollectionImage("Men's T-Shirt", 103),
    badge: 'New',
    category: "Men's T-Shirt",
  },
  // Men's Shorts
  {
    id: 104,
    name: 'Cargo Shorts - Men',
    price: '₱1,499',
    originalPrice: '₱1,999',
    image: getCollectionImage("Men's Shorts", 104),
    badge: 'Best Seller',
    category: "Men's Shorts",
  },
  {
    id: 105,
    name: 'Athletic Shorts - Men',
    price: '₱1,199',
    originalPrice: '₱1,599',
    image: getCollectionImage("Men's Shorts", 105),
    badge: 'New',
    category: "Men's Shorts",
  },
  {
    id: 106,
    name: 'Chino Shorts - Men',
    price: '₱1,399',
    originalPrice: '₱1,899',
    image: getCollectionImage("Men's Shorts", 106),
    badge: 'Premium',
    category: "Men's Shorts",
  },
  // Women's Blouses
  {
    id: 107,
    name: 'Elegant Silk Blouse - Women',
    price: '₱1,899',
    originalPrice: '₱2,499',
    image: getCollectionImage("Women's Blouse", 107),
    badge: 'Best Seller',
    category: "Women's Blouse",
  },
  {
    id: 108,
    name: 'Ruffled Sleeve Blouse - Women',
    price: '₱1,599',
    originalPrice: '₱2,199',
    image: getCollectionImage("Women's Blouse", 108),
    badge: 'New',
    category: "Women's Blouse",
  },
  {
    id: 109,
    name: 'Classic Button-Down Blouse - Women',
    price: '₱1,699',
    originalPrice: '₱2,299',
    image: getCollectionImage("Women's Blouse", 109),
    badge: 'Premium',
    category: "Women's Blouse",
  },
  {
    id: 110,
    name: 'Floral Print Blouse - Women',
    price: '₱1,799',
    originalPrice: '₱2,399',
    image: getCollectionImage("Women's Blouse", 110),
    badge: 'New',
    category: "Women's Blouse",
  },
  // Women's Dresses
  {
    id: 111,
    name: 'A-Line Summer Dress - Women',
    price: '₱2,199',
    originalPrice: '₱2,999',
    image: getCollectionImage("Women's Dress", 111),
    badge: 'New',
    category: "Women's Dress",
  },
  {
    id: 112,
    name: 'Maxi Floral Dress - Women',
    price: '₱2,499',
    originalPrice: '₱3,299',
    image: getCollectionImage("Women's Dress", 112),
    badge: 'Best Seller',
    category: "Women's Dress",
  },
  // Men's Pants
  {
    id: 113,
    name: 'Slim Fit Chino Pants - Men',
    price: '₱1,799',
    originalPrice: '₱2,399',
    image: getCollectionImage("Men's Pants", 113),
    badge: 'Best Seller',
    category: "Men's Pants",
  },
  {
    id: 114,
    name: 'Classic Denim Jeans - Men',
    price: '₱1,999',
    originalPrice: '₱2,599',
    image: getCollectionImage("Men's Pants", 114),
    badge: 'Premium',
    category: "Men's Pants",
  },
  // Accessories
  {
    id: 115,
    name: 'Leather Crossbody Bag',
    price: '₱2,499',
    originalPrice: '₱3,299',
    image: getCollectionImage("Accessories", 115),
    badge: 'Best Seller',
    category: "Accessories",
  },
  {
    id: 116,
    name: 'Classic Leather Watch',
    price: '₱3,999',
    originalPrice: '₱4,999',
    image: getCollectionImage("Accessories", 116),
    badge: 'Premium',
    category: "Accessories",
  },
  {
    id: 117,
    name: 'Designer Sunglasses',
    price: '₱1,899',
    originalPrice: '₱2,499',
    image: getCollectionImage("Accessories", 117),
    badge: 'New',
    category: "Accessories",
  },
  {
    id: 118,
    name: 'Genuine Leather Belt',
    price: '₱1,299',
    originalPrice: '₱1,799',
    image: getCollectionImage("Accessories", 118),
    badge: 'Best Seller',
    category: "Accessories",
  },
  {
    id: 119,
    name: 'Premium Backpack',
    price: '₱2,799',
    originalPrice: '₱3,599',
    image: getCollectionImage("Accessories", 119),
    badge: 'New',
    category: "Accessories",
  },
];

// Extended collection interface for detail page
export interface CollectionDetails extends Product {
  description?: string;
  features?: string[];
  materials?: string[];
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
}

// Extended collection details
export const collectionDetails: Record<number, Partial<CollectionDetails>> = {
  100: {
    description: 'The perfect everyday essential. Our Classic Cotton T-Shirt for men features premium cotton fabric that is soft, breathable, and comfortable. Perfect for casual wear or layering.',
    features: [
      '100% premium cotton',
      'Soft and breathable',
      'Classic fit',
      'Durable construction',
      'Easy care'
    ],
    materials: ['100% Cotton'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Navy', 'Gray'],
    inStock: true,
  },
  101: {
    description: 'A modern twist on a classic. Our Premium V-Neck T-Shirt offers a sophisticated look with a comfortable fit. Made from high-quality cotton blend for ultimate comfort.',
    features: [
      'Premium cotton blend',
      'V-neck design',
      'Modern fit',
      'Wrinkle-resistant',
      'Versatile styling'
    ],
    materials: ['60% Cotton', '40% Polyester'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Charcoal'],
    inStock: true,
  },
  102: {
    description: 'Elevate your casual style with our Slim Fit Polo T-Shirt. Perfect for smart-casual occasions, this polo combines comfort with a polished appearance.',
    features: [
      'Slim fit design',
      'Premium pique fabric',
      'Three-button placket',
      'Ribbed collar',
      'Side vents'
    ],
    materials: ['100% Cotton Pique'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Navy', 'Black'],
    inStock: true,
  },
  103: {
    description: 'Make a statement with our Graphic Print T-Shirt. Featuring unique designs and premium quality, this t-shirt is perfect for expressing your personal style.',
    features: [
      'Unique graphic prints',
      'Premium cotton',
      'Vibrant colors',
      'Comfortable fit',
      'Limited edition designs'
    ],
    materials: ['100% Cotton'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Various prints available'],
    inStock: true,
  },
  104: {
    description: 'Functional and stylish, our Cargo Shorts are perfect for everyday adventures. Multiple pockets provide ample storage while maintaining a modern, streamlined look.',
    features: [
      'Multiple cargo pockets',
      'Durable fabric',
      'Comfortable fit',
      'Adjustable waist',
      'Versatile styling'
    ],
    materials: ['65% Cotton', '35% Polyester'],
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Khaki', 'Navy', 'Black'],
    inStock: true,
  },
  105: {
    description: 'Stay active and comfortable with our Athletic Shorts. Designed for movement, these shorts feature moisture-wicking fabric and a flexible fit.',
    features: [
      'Moisture-wicking fabric',
      'Elastic waistband',
      'Lightweight design',
      'Quick-dry material',
      'Perfect for sports'
    ],
    materials: ['Polyester', 'Spandex'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Gray'],
    inStock: true,
  },
  106: {
    description: 'Sophisticated and versatile, our Chino Shorts are perfect for both casual and semi-formal occasions. Made from premium chino fabric for a polished look.',
    features: [
      'Premium chino fabric',
      'Classic fit',
      'Flat front design',
      'Belt loops included',
      'Versatile styling'
    ],
    materials: ['98% Cotton', '2% Elastane'],
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Khaki', 'Navy', 'Beige'],
    inStock: true,
  },
  107: {
    description: 'Elegance meets comfort in our Silk Blouse. Made from premium silk fabric, this blouse drapes beautifully and feels luxurious against the skin.',
    features: [
      '100% premium silk',
      'Elegant drape',
      'Classic collar',
      'Button front',
      'Timeless design'
    ],
    materials: ['100% Silk'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Ivory', 'Black', 'Navy', 'Blush'],
    inStock: true,
  },
  108: {
    description: 'Add a touch of femininity with our Ruffled Sleeve Blouse. The delicate ruffles and soft fabric create a romantic, elegant look perfect for any occasion.',
    features: [
      'Ruffled sleeve detail',
      'Soft fabric',
      'Flattering fit',
      'Button closure',
      'Feminine design'
    ],
    materials: ['Polyester', 'Viscose'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['White', 'Pink', 'Lavender'],
    inStock: true,
  },
  109: {
    description: 'A wardrobe essential, our Classic Button-Down Blouse never goes out of style. Perfect for office wear or casual occasions, this versatile piece is a must-have.',
    features: [
      'Classic button-down',
      'Professional look',
      'Comfortable fit',
      'Crisp collar',
      'Versatile styling'
    ],
    materials: ['100% Cotton'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Light Blue', 'Pink'],
    inStock: true,
  },
  110: {
    description: 'Brighten your wardrobe with our Floral Print Blouse. Featuring beautiful floral patterns and a comfortable fit, this blouse adds a fresh, feminine touch to any outfit.',
    features: [
      'Floral print design',
      'Soft fabric',
      'Flowing fit',
      'V-neck design',
      'Spring-ready'
    ],
    materials: ['Polyester', 'Cotton'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Floral prints in various colors'],
    inStock: true,
  },
  111: {
    description: 'Stay cool and stylish with our A-Line Summer Dress. The flattering A-line silhouette and lightweight fabric make this dress perfect for warm weather.',
    features: [
      'A-line silhouette',
      'Lightweight fabric',
      'Flattering fit',
      'Knee-length',
      'Summer-ready'
    ],
    materials: ['Cotton', 'Linen'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Floral', 'Solid colors'],
    inStock: true,
  },
  112: {
    description: 'Make a statement with our Maxi Floral Dress. This elegant floor-length dress features a beautiful floral pattern and flowing silhouette for a romantic, feminine look.',
    features: [
      'Maxi length',
      'Floral pattern',
      'Flowing silhouette',
      'Comfortable fit',
      'Perfect for events'
    ],
    materials: ['Polyester', 'Viscose'],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Various floral patterns'],
    inStock: true,
  },
  113: {
    description: 'Versatile and stylish, our Slim Fit Chino Pants are perfect for both casual and business-casual occasions. The slim fit provides a modern, polished look.',
    features: [
      'Slim fit design',
      'Premium chino fabric',
      'Flat front',
      'Belt loops',
      'Versatile styling'
    ],
    materials: ['98% Cotton', '2% Elastane'],
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Khaki', 'Navy', 'Charcoal'],
    inStock: true,
  },
  114: {
    description: 'A timeless classic, our Classic Denim Jeans offer comfort and style. Made from premium denim, these jeans are built to last and never go out of style.',
    features: [
      'Premium denim',
      'Classic fit',
      'Five-pocket design',
      'Durable construction',
      'Timeless style'
    ],
    materials: ['98% Cotton', '2% Elastane'],
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Dark Blue', 'Medium Blue', 'Black'],
    inStock: true,
  },
  115: {
    description: 'Elevate your style with our Leather Crossbody Bag. Made from genuine leather, this versatile bag is perfect for everyday use. Features multiple compartments and an adjustable strap for comfort.',
    features: [
      'Genuine leather',
      'Multiple compartments',
      'Adjustable strap',
      'Secure zipper closure',
      'Perfect size for essentials'
    ],
    materials: ['100% Genuine Leather', 'Metal Hardware'],
    sizes: ['One Size'],
    colors: ['Brown', 'Black', 'Tan'],
    inStock: true,
  },
  116: {
    description: 'Make a statement with our Classic Leather Watch. This timeless timepiece features a premium leather strap and elegant design that complements any outfit, from casual to formal.',
    features: [
      'Premium leather strap',
      'Quartz movement',
      'Water resistant',
      'Classic design',
      'Scratch-resistant crystal'
    ],
    materials: ['Leather', 'Stainless Steel', 'Mineral Crystal'],
    sizes: ['One Size'],
    colors: ['Brown Leather', 'Black Leather'],
    inStock: true,
  },
  117: {
    description: 'Protect your eyes in style with our Designer Sunglasses. These premium sunglasses feature UV protection and a modern, fashionable design that suits any face shape.',
    features: [
      '100% UV protection',
      'Polarized lenses',
      'Lightweight frame',
      'Modern design',
      'Comfortable fit'
    ],
    materials: ['Acetate Frame', 'Polycarbonate Lenses'],
    sizes: ['One Size'],
    colors: ['Black', 'Brown', 'Tortoise'],
    inStock: true,
  },
  118: {
    description: 'Complete your look with our Genuine Leather Belt. Crafted from premium leather, this belt features a classic buckle design and is perfect for both casual and formal occasions.',
    features: [
      'Genuine leather',
      'Classic buckle design',
      'Durable construction',
      'Versatile styling',
      'Multiple size options'
    ],
    materials: ['100% Genuine Leather', 'Metal Buckle'],
    sizes: ['30', '32', '34', '36', '38', '40'],
    colors: ['Brown', 'Black'],
    inStock: true,
  },
  119: {
    description: 'Carry your essentials in style with our Premium Backpack. Designed for both work and travel, this backpack features multiple compartments, padded straps, and a sleek, modern design.',
    features: [
      'Multiple compartments',
      'Padded shoulder straps',
      'Laptop compartment',
      'Water-resistant material',
      'Modern design'
    ],
    materials: ['Nylon', 'Polyester', 'Leather Accents'],
    sizes: ['One Size'],
    colors: ['Black', 'Navy', 'Gray'],
    inStock: true,
  },
};

// Helper function to get collection by ID
export function getCollectionById(id: number): Product | undefined {
  return allCollections.find(collection => collection.id === id);
}

// Helper function to get collection details by ID
export function getCollectionDetails(id: number): CollectionDetails | undefined {
  const collection = getCollectionById(id);
  if (!collection) return undefined;
  
  const details = collectionDetails[id] || {};
  return { ...collection, ...details };
}

// Helper function to get related collections
export function getRelatedCollections(currentCollectionId: number, limit: number = 4): Product[] {
  const currentCollection = getCollectionById(currentCollectionId);
  if (!currentCollection) return [];
  
  return allCollections
    .filter(collection => 
      collection.id !== currentCollectionId && 
      (collection.category === currentCollection.category || Math.random() > 0.5)
    )
    .slice(0, limit);
}

// Helper function to get collections by category
export function getCollectionsByCategory(category: string): Product[] {
  return allCollections.filter(collection => collection.category === category);
}


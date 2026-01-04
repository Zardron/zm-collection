import { Product } from '../contexts/CartContext';

// Available product images by category
const productImages: Record<string, string[]> = {
  'Lip Tint': [
    '/lip-tint/7811b1f6-b688-4abc-89b9-97653b4bf04a.jpeg',
    '/lip-tint/8971edae-d361-4d9c-a1a1-6b41b7ab6abe.jpeg',
    '/lip-tint/f5e6130e-75e4-4384-a2f6-d0f20733778c.jpeg',
    '/lip-tint/fcfef812-0600-4dc1-a2bb-7a4640b0ab85.jpeg',
  ],
  'Perfume': [
    '/perfume/a08f8f04-2d59-438a-b136-66c08dc7c814.jpeg',
    '/perfume/b723d408-d6b8-48b6-8cad-3331a4e5f66c.jpeg',
    '/perfume/d3bd48b7-1981-4a0a-a466-0a4b4a7ad189.jpeg',
  ],
  'Serum': [
    '/serum/2b5aa96a-562a-41b2-9705-7284b0fc2056.jpeg',
  ],
};

// Placeholder image for products without photos
// Using a realistic product placeholder image service
const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&h=800&fit=crop';

// Helper function to get product image based on category and product ID
function getProductImage(category: string | undefined, productId: number): string {
  if (!category) {
    return PLACEHOLDER_IMAGE;
  }

  const images = productImages[category];
  if (!images || images.length === 0) {
    return PLACEHOLDER_IMAGE;
  }

  // Use product ID to deterministically assign images
  // This ensures the same product always gets the same image
  const imageIndex = (productId - 1) % images.length;
  return images[imageIndex];
}

// Centralized product data
export const allProducts: Product[] = [
  {
    id: 1,
    name: 'Velvet Lip Tint - Rose',
    price: '₱1,399',
    originalPrice: '₱1,949',
    image: getProductImage('Lip Tint', 1),
    badge: 'Best Seller',
    category: 'Lip Tint',
    rating: 4.8,
    reviewCount: 1247,
  },
  {
    id: 2,
    name: 'Luxury Perfume - Eau de Parfum',
    price: '₱4,999',
    originalPrice: '₱6,599',
    image: getProductImage('Perfume', 2),
    badge: 'New',
    category: 'Perfume',
    rating: 4.6,
    reviewCount: 892,
  },
  {
    id: 3,
    name: 'Hyaluronic Acid Serum',
    price: '₱2,199',
    originalPrice: '₱2,749',
    image: getProductImage('Serum', 3),
    badge: 'Limited',
    category: 'Serum',
    rating: 4.9,
    reviewCount: 2156,
  },
  {
    id: 4,
    name: 'Niacinamide Brightening Serum',
    price: '₱2,599',
    originalPrice: '₱3,199',
    image: getProductImage('Serum', 4),
    badge: 'New',
    category: 'Serum',
    rating: 4.7,
    reviewCount: 1034,
  },
  {
    id: 5,
    name: 'Glossy Lip Oil - Cherry',
    price: '₱1,099',
    originalPrice: '₱1,649',
    image: getProductImage('Lip Tint', 5),
    badge: 'New',
    category: 'Lip Tint',
    rating: 4.5,
    reviewCount: 678,
  },
  {
    id: 6,
    name: 'Vitamin C Brightening Serum',
    price: '₱2,479',
    originalPrice: '₱3,024',
    image: getProductImage('Serum', 6),
    badge: 'New',
    category: 'Serum',
    rating: 4.8,
    reviewCount: 1456,
  },
  {
    id: 7,
    name: 'Floral Essence Perfume',
    price: '₱4,399',
    originalPrice: '₱5,499',
    image: getProductImage('Perfume', 7),
    badge: 'New',
    category: 'Perfume',
    rating: 4.4,
    reviewCount: 523,
  },
  {
    id: 8,
    name: 'Matte Lipstick - Nude Collection',
    price: '₱1,599',
    originalPrice: '₱2,199',
    image: getProductImage('Lip Tint', 8),
    badge: 'New',
    category: 'Lip Tint',
    rating: 4.6,
    reviewCount: 987,
  },
  {
    id: 9,
    name: 'Retinol Night Cream',
    price: '₱3,024',
    originalPrice: '₱3,574',
    image: getProductImage('Serum', 9),
    badge: 'Best Seller',
    category: 'Serum',
    rating: 4.9,
    reviewCount: 1892,
  },
  {
    id: 10,
    name: 'Classic Eau de Toilette',
    price: '₱3,849',
    originalPrice: '₱4,949',
    image: getProductImage('Perfume', 10),
    badge: 'Best Seller',
    category: 'Perfume',
    rating: 4.7,
    reviewCount: 1123,
  },
  {
    id: 11,
    name: 'Premium Makeup Brush Set',
    price: '₱2,749',
    originalPrice: '₱3,849',
    image: getProductImage('Makeup', 11),
    badge: 'Best Seller',
    category: 'Makeup',
    rating: 4.8,
    reviewCount: 1567,
  },
];

// Extended product interface for detail page
export interface ProductDetails extends Product {
  description?: string;
  features?: string[];
  ingredients?: string[];
  size?: string;
  inStock?: boolean;
}

// Extended product details (you can expand this with more details)
export const productDetails: Record<number, Partial<ProductDetails>> = {
  1: {
    description: 'Experience the perfect blend of luxury and long-lasting color with our Velvet Lip Tint in Rose. This premium formula provides intense pigmentation with a velvety matte finish that stays put all day. Enriched with hydrating ingredients, it keeps your lips soft and comfortable.',
    features: [
      'Long-lasting matte finish',
      'Intense color payoff',
      'Hydrating formula',
      'Transfer-resistant',
      'Cruelty-free'
    ],
    ingredients: ['Dimethicone', 'Isododecane', 'Trisiloxane', 'Phenoxyethanol', 'Tocopherol'],
    size: '5ml',
    inStock: true,
  },
  2: {
    description: 'Indulge in the opulent fragrance of our Luxury Perfume - Eau de Parfum. A sophisticated blend of floral and woody notes that creates an unforgettable scent. Perfect for special occasions and everyday elegance.',
    features: [
      'Long-lasting fragrance',
      'Premium ingredients',
      'Elegant packaging',
      'Unisex appeal',
      'Alcohol-based formula'
    ],
    ingredients: ['Alcohol', 'Fragrance', 'Water', 'Benzyl Salicylate', 'Limonene'],
    size: '50ml',
    inStock: true,
  },
  3: {
    description: 'Transform your skin with our Hyaluronic Acid Serum. This powerful hydrating serum penetrates deep into the skin to plump, smooth, and restore moisture. Perfect for all skin types, it helps reduce the appearance of fine lines and wrinkles.',
    features: [
      'Deep hydration',
      'Plumps skin',
      'Reduces fine lines',
      'Lightweight formula',
      'Suitable for all skin types'
    ],
    ingredients: ['Hyaluronic Acid', 'Glycerin', 'Niacinamide', 'Aloe Vera', 'Vitamin E'],
    size: '30ml',
    inStock: true,
  },
  4: {
    description: 'Illuminate your complexion with our Niacinamide Brightening Serum. This powerful formula helps reduce the appearance of dark spots, minimize pores, and even out skin tone for a radiant, glowing look.',
    features: [
      'Brightens skin tone',
      'Minimizes pores',
      'Reduces dark spots',
      'Oil control',
      'Suitable for all skin types'
    ],
    ingredients: ['Niacinamide', 'Zinc PCA', 'Allantoin', 'Hyaluronic Acid', 'Glycerin'],
    size: '30ml',
    inStock: true,
  },
  5: {
    description: 'Get luscious, glossy lips with our Glossy Lip Oil in Cherry. This nourishing formula provides a high-shine finish while keeping your lips hydrated and soft. The cherry flavor adds a delightful touch.',
    features: [
      'High-shine finish',
      'Nourishing formula',
      'Non-sticky texture',
      'Cherry flavor',
      'Buildable coverage'
    ],
    size: '8ml',
    inStock: true,
  },
  6: {
    description: 'Brighten and even out your skin tone with our Vitamin C Brightening Serum. This potent formula helps fade dark spots, reduce hyperpigmentation, and give you a radiant, glowing complexion.',
    features: [
      'Brightens skin tone',
      'Fades dark spots',
      'Antioxidant protection',
      'Lightweight texture',
      'Suitable for daily use'
    ],
    ingredients: ['Vitamin C', 'Ferulic Acid', 'Vitamin E', 'Hyaluronic Acid', 'Glycerin'],
    size: '30ml',
    inStock: true,
  },
  7: {
    description: 'Immerse yourself in the delicate floral essence of our Floral Essence Perfume. A beautiful bouquet of fresh flowers creates a light, airy fragrance that is perfect for daytime wear.',
    features: [
      'Floral fragrance',
      'Light and airy',
      'Long-lasting',
      'Elegant bottle design',
      'Perfect for daytime'
    ],
    size: '50ml',
    inStock: true,
  },
  8: {
    description: 'Discover your perfect nude shade with our Matte Lipstick - Nude Collection. This creamy matte formula provides full coverage with a velvety finish. Available in multiple nude shades to complement every skin tone.',
    features: [
      'Creamy matte finish',
      'Full coverage',
      'Long-lasting',
      'Multiple nude shades',
      'Comfortable wear'
    ],
    ingredients: ['Dimethicone', 'Isododecane', 'Trisiloxane', 'Tocopherol', 'Vitamin E'],
    size: '3.5g',
    inStock: true,
  },
  9: {
    description: 'Restore and renew your skin overnight with our Retinol Night Cream. This advanced formula works while you sleep to reduce fine lines, improve skin texture, and promote a youthful appearance.',
    features: [
      'Overnight renewal',
      'Reduces fine lines',
      'Improves skin texture',
      'Non-greasy formula',
      'Suitable for mature skin'
    ],
    ingredients: ['Retinol', 'Peptides', 'Niacinamide', 'Hyaluronic Acid', 'Ceramides'],
    size: '50ml',
    inStock: true,
  },
  10: {
    description: 'Discover the classic elegance of our Classic Eau de Toilette. A timeless fragrance that blends traditional notes with a modern twist. Perfect for those who appreciate sophisticated scents.',
    features: [
      'Classic fragrance',
      'Timeless appeal',
      'Moderate sillage',
      'Elegant packaging',
      'Versatile wear'
    ],
    size: '100ml',
    inStock: true,
  },
  11: {
    description: 'Achieve flawless makeup application with our Premium Makeup Brush Set. These professional-grade brushes feature soft, synthetic bristles and ergonomic handles for precise control.',
    features: [
      'Professional-grade',
      'Soft synthetic bristles',
      'Ergonomic handles',
      'Complete set',
      'Easy to clean'
    ],
    size: 'Set of 12 brushes',
    inStock: true,
  },
};

// Helper function to get product by ID
export function getProductById(id: number): Product | undefined {
  return allProducts.find(product => product.id === id);
}

// Helper function to get product details by ID
export function getProductDetails(id: number): ProductDetails | undefined {
  const product = getProductById(id);
  if (!product) return undefined;
  
  const details = productDetails[id] || {};
  return { ...product, ...details };
}

// Helper function to get related products
export function getRelatedProducts(currentProductId: number, limit: number = 4): Product[] {
  const currentProduct = getProductById(currentProductId);
  if (!currentProduct) return [];
  
  return allProducts
    .filter(product => 
      product.id !== currentProductId && 
      (product.category === currentProduct.category || Math.random() > 0.5)
    )
    .slice(0, limit);
}


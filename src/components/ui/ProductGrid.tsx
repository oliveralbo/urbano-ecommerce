import React from 'react';
import { ProductCard, type Product } from './ProductCard';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Smart TV 50" 4K UHD con Android TV y Google Assistant',
    price: 450000,
    image:
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    category: 'Tecnología',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: 'Smartphone Pro Max 256GB Cámara 108MP Batería 5000mAh',
    price: 1200000,
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    category: 'Celulares',
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: 'Notebook Ultra Slim i7 16GB RAM 512GB SSD 14" FHD',
    price: 890000,
    image:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    category: 'Computación',
    rating: 4.7,
    reviews: 56,
  },
  {
    id: 4,
    name: 'Auriculares Wireless Noise Cancelling Bluetooth 5.2',
    price: 150000,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    category: 'Audio',
    rating: 4.5,
    reviews: 210,
  },
  {
    id: 5,
    name: 'Cafetera Express Automática 15 Bares Molinillo Integrado',
    price: 320000,
    image:
      'https://images.unsplash.com/photo-1520970014086-2208d157c9e2?auto=format&fit=crop&w=800&q=80',
    category: 'Electrohogar',
    rating: 4.6,
    reviews: 45,
  },
  {
    id: 6,
    name: 'Reloj Inteligente Sport GPS Sumergible Ritmo Cardíaco',
    price: 95000,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    category: 'Tecnología',
    rating: 4.4,
    reviews: 167,
  },
  {
    id: 7,
    name: 'Zapatillas Running Ultralight Amortiguación Premium',
    price: 110000,
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    category: 'Deportes',
    rating: 4.8,
    reviews: 312,
  },
  {
    id: 8,
    name: 'Cámara Mirrorless 24MP 4K Video Lente 18-55mm Incluido',
    price: 750000,
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    category: 'Fotografía',
    rating: 4.9,
    reviews: 34,
  },
];

export const ProductGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {MOCK_PRODUCTS.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

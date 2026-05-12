import { ShoppingCart, Star } from 'lucide-react';
import React from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm text-gray-400 hover:text-red-500 transition-colors">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
          {product.category}
        </div>
        <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-12 mb-2 leading-tight hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                className={
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toLocaleString('es-AR')}
            </span>
            <span className="text-[10px] text-green-600 font-bold">
              Envío gratis
            </span>
          </div>
          <button className="p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

import {
  ShoppingCart,
  Star,
  Monitor,
  Laptop,
  Shirt,
  Headphones,
  MousePointer2,
  Package,
} from 'lucide-react';
import React from 'react';
import type { Product } from '../../api/inventory';
import { getProductDisplayData } from '../../utils/productUtils';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Computers: Laptop,
  Fashion: Shirt,
  Audio: Headphones,
  Monitors: Monitor,
  Peripherals: MousePointer2,
};

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
}) => {
  const {
    displayTitle,
    displayCategory,
    displayPrice,
    displayRating,
    displayReviews,
  } = getProductDisplayData(product);

  const CategoryIcon = CATEGORY_ICONS[displayCategory] || Package;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border-2 border-blue-50 hover:border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col h-full group cursor-pointer relative"
    >
      <div className="absolute top-4 right-4">
        <div className="p-2.5 bg-gray-50 text-gray-400 group-hover:text-blue-500 group-hover:bg-blue-50 rounded-xl transition-all duration-300">
          <CategoryIcon size={18} strokeWidth={2.5} />
        </div>
      </div>

      <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2 px-2 py-0.5 bg-blue-50 w-fit rounded-full">
        {displayCategory}
      </div>

      <h3 className="font-bold text-gray-800 text-lg line-clamp-2 min-h-14 mb-4 leading-snug group-hover:text-blue-600 transition-colors">
        {displayTitle}
      </h3>

      <div className="flex items-center gap-1 mb-6">
        <div className="flex items-center text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              fill={i < Math.floor(displayRating) ? 'currentColor' : 'none'}
              className={
                i < Math.floor(displayRating)
                  ? 'text-yellow-400'
                  : 'text-gray-300'
              }
            />
          ))}
        </div>
        <span className="text-xs text-gray-400 font-medium">
          ({displayReviews})
        </span>
      </div>

      <div className="flex items-end justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">
            Precio final
          </span>
          <span className="text-2xl font-black text-gray-900">
            ${displayPrice.toLocaleString('es-AR')}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
        >
          <ShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
};

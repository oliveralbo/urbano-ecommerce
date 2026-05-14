import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  reviews: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  reviews,
}) => (
  <div className="flex flex-col items-center gap-2 py-6 border-y border-gray-50">
    <div className="flex items-center gap-2">
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
            className={
              i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
            }
          />
        ))}
      </div>
      <span className="text-sm font-black text-gray-700">
        {rating.toFixed(1)}
      </span>
      <span className="text-sm text-gray-400 font-medium">
        ({reviews} opiniones)
      </span>
    </div>
  </div>
);

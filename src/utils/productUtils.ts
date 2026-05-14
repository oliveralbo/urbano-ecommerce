import type { Product } from '../api/inventory';

/**
 * Genera datos de fallback consistentes para productos que no tienen
 * toda la información poblada desde la API.
 */
export const getProductDisplayData = (product: Product) => {
  const displayTitle = product.title || product.name || 'Producto sin título';
  const displayCategory =
    product.category?.name ||
    (product.details?.category as string) ||
    'General';

  // Precio determinista basado en el ID
  const displayPrice =
    product.price || Math.floor((product.id * 15432) % 900000) + 50000;

  // Imagen determinista basada en el ID
  const displayImage =
    product.image || `https://picsum.photos/seed/${product.id}/800/800`;

  // Rating entre 4.0 y 5.0
  const displayRating = product.rating || 4.0 + (product.id % 11) / 10;

  // Reviews deterministas
  const displayReviews =
    product.reviews || Math.floor((product.id * 23) % 200) + 10;

  return {
    displayTitle,
    displayCategory,
    displayPrice,
    displayImage,
    displayRating,
    displayReviews,
  };
};

import React, { useEffect, useState } from 'react';
import { inventoryApi, type Product } from '../../api/inventory';
import { useAuth } from '../../hooks/useAuth';
import { ProductCard } from './ProductCard';
import { ProductDetailsModal } from './ProductDetailsModal';

export const ProductGrid: React.FC = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await inventoryApi.getProducts(token);
        const activeProducts = data.filter((p) => p.isActive);
        setProducts(activeProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(
          'No se pudieron cargar los productos. Por favor, intenta de nuevo más tarde.',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const handleProductClick = (id: number) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border-2 border-blue-50 h-[220px] animate-pulse p-6"
          >
            <div className="h-4 bg-gray-100 rounded w-1/4 mb-4" />
            <div className="h-6 bg-gray-100 rounded w-3/4 mb-2" />
            <div className="h-6 bg-gray-100 rounded w-1/2 mb-6" />
            <div className="flex justify-between items-end mt-auto">
              <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded w-12" />
                <div className="h-6 bg-gray-100 rounded w-24" />
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!token) {
    return (
      <div className="text-center py-12 bg-blue-50 rounded-2xl border border-blue-100">
        <p className="text-blue-600 font-medium">
          Inicia sesión para ver nuestros productos exclusivos.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-2xl border border-red-100">
        <p className="text-red-600 font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-sm font-bold text-red-700 hover:underline"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
        <p className="text-gray-500 font-medium">
          No hay productos disponibles en este momento.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => handleProductClick(product.id)}
          />
        ))}
      </div>

      {selectedProductId && (
        <ProductDetailsModal
          productId={selectedProductId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

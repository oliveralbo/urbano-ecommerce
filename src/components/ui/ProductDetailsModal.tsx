import { Calendar, Package, ShoppingCart, Store, Tag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { inventoryApi, type Product } from '../../api/inventory';
import { useAuth } from '../../hooks/useAuth';
import { getProductDisplayData } from '../../utils/productUtils';
import { DetailSection } from '../product/DetailSection';
import { InfoCard } from '../product/InfoCard';
import { RatingStars } from '../product/RatingStars';
import { Button } from './Button';

interface ProductDetailsModalProps {
  productId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailsModal = ({
  productId,
  isOpen,
  onClose,
}: ProductDetailsModalProps) => {
  const { token } = useAuth();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!token || !isOpen) return;

      try {
        setIsLoading(true);
        const data = await inventoryApi.getProductById(token, productId);
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('No se pudo cargar la información del producto.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId, isOpen, token]);

  if (!isOpen) return null;

  const displayData = product ? getProductDisplayData(product) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl border-2 border-blue-50 overflow-hidden flex flex-col animate-in zoom-in duration-300">
        {/* Header con Badge y Botón de Cierre */}
        <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
            <Tag size={12} />
            {displayData?.displayCategory || 'General'}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Área de Contenido con Scroll */}
        <div className="overflow-y-auto p-8 md:p-10">
          {isLoading ? (
            <div className="space-y-6 animate-pulse">
              <div className="h-10 bg-gray-100 rounded-xl w-3/4 mx-auto" />
              <div className="h-6 bg-gray-100 rounded-xl w-1/4 mx-auto" />
              <div className="h-24 bg-gray-50 rounded-2xl w-full" />
              <div className="space-y-3 pt-4">
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-2/3" />
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 font-medium mb-6">{error}</p>
              <Button onClick={onClose} variant="outline">
                Cerrar
              </Button>
            </div>
          ) : product && displayData ? (
            <div className="space-y-8">
              {/* Título y Referencia */}
              <div className="space-y-3 text-center">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                  {displayData.displayTitle}
                </h2>
                <div className="text-xs text-gray-400 font-mono tracking-tighter uppercase">
                  Ref: {product.code}
                </div>
              </div>

              {/* Rating y Precio */}
              <div className="space-y-4">
                <RatingStars
                  rating={displayData.displayRating}
                  reviews={displayData.displayReviews}
                />
                <div className="text-center">
                  <div className="text-4xl font-black text-gray-900">
                    ${displayData.displayPrice.toLocaleString('es-AR')}
                  </div>
                  <div className="text-xs text-green-600 font-bold uppercase tracking-widest mt-1">
                    Envío gratis bonificado
                  </div>
                </div>
              </div>

              {/* Sección de Descripción */}
              <DetailSection title="Descripción del Producto" icon={Package}>
                <p className="text-gray-600 leading-relaxed text-base">
                  {product.description || 'Sin descripción disponible.'}
                </p>
              </DetailSection>

              {/* Características destacadas */}
              {product.about && product.about.length > 0 && (
                <DetailSection title="Características Destacadas" bg>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.about.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-gray-700 font-medium"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </DetailSection>
              )}

              {/* Grid de Información Extra */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <InfoCard
                  icon={Store}
                  label="Vendedor"
                  value={
                    product.merchant?.email.split('@')[0] || 'Oficial Store'
                  }
                />
                <InfoCard
                  icon={Calendar}
                  label="Lanzamiento"
                  value={
                    product.createdAt
                      ? new Date(product.createdAt).toLocaleDateString()
                      : 'Reciente'
                  }
                />
              </div>
            </div>
          ) : null}
        </div>

        {/* Barra de Acciones Fija */}
        <div className="p-6 bg-white border-t border-gray-50 flex gap-4">
          <Button className="flex-1 h-14 text-lg font-black shadow-xl shadow-blue-100 rounded-2xl transition-transform active:scale-[0.98]">
            Comprar Ahora
          </Button>
          <Button
            variant="outline"
            className="p-4 h-14 aspect-square border-2 border-blue-50 rounded-2xl hover:bg-blue-50 transition-all active:scale-95"
          >
            <ShoppingCart size={24} className="text-blue-600" />
          </Button>
        </div>
      </div>
    </div>
  );
};

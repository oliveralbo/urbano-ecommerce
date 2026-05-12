import { ChevronRight } from 'lucide-react';
import React from 'react';
import { Navbar } from '../components/ui/Navbar';
import { ProductGrid } from '../components/ui/ProductGrid';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner Section (Optional/Future) */}
        <div className="relative h-48 md:h-64 bg-blue-700 rounded-2xl mb-8 overflow-hidden shadow-sm">
          <div className="absolute inset-0 bg-linear-to-r from-blue-800 to-transparent flex flex-col justify-center px-8 md:px-12 text-white">
            <h2 className="text-2xl md:text-4xl font-bold mb-2">
              Ofertas Imperdibles
            </h2>
            <p className="text-blue-100 mb-4 max-w-md hidden md:block">
              Aprovechá hasta 12 cuotas sin interés en productos seleccionados
              de tecnología y hogar.
            </p>
            <button className="bg-white text-blue-700 font-bold py-2 px-6 rounded-lg w-fit hover:bg-blue-50 transition-colors text-sm">
              Ver más
            </button>
          </div>
          {/* Decorative element */}
          <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            Inspirado en lo último que viste
            <ChevronRight size={20} className="text-blue-600" />
          </h2>
          <a
            href="#"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Ver todo
          </a>
        </div>

        {/* Product Grid */}
        <ProductGrid />

        {/* Categories Section (Future) */}
        <section className="mt-16 mb-12">
          <h3 className="text-lg font-bold text-gray-800 mb-6 uppercase tracking-wider">
            Categorías populares
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              'Celulares',
              'Audio',
              'Gaming',
              'TVs',
              'Notebooks',
              'Electro',
              'Deportes',
              'Hogar',
            ].map((cat) => (
              <div
                key={cat}
                className="bg-white p-4 rounded-xl border border-gray-100 text-center hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-full mx-auto mb-3 flex items-center justify-center group-hover:bg-blue-50 transition-colors text-gray-400 group-hover:text-blue-600">
                  {/* Placeholder icon */}
                  <div className="w-6 h-6 border-2 border-current rounded-md"></div>
                </div>
                <span className="text-xs font-medium text-gray-600">{cat}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-xl font-bold text-gray-400 mb-4 tracking-tight">
            URBANO ECOMMERCE
          </div>
          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            Tu marketplace de confianza. Encontrá lo que buscás al mejor precio
            y con la seguridad de siempre.
          </p>
          <div className="mt-8 flex justify-center gap-6 text-gray-400">
            {/* Social links placeholder */}
            <div className="w-5 h-5 bg-gray-100 rounded"></div>
            <div className="w-5 h-5 bg-gray-100 rounded"></div>
            <div className="w-5 h-5 bg-gray-100 rounded"></div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-100 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
            &copy; 2026 Urbano - Todos los derechos reservados
          </div>
        </div>
      </footer>
    </div>
  );
};

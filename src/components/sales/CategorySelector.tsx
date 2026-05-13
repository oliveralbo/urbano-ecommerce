import { Cpu, Layers, Shirt } from 'lucide-react';
import React from 'react';
import type { Category } from '../../api/inventory';
import { Button } from '../ui/Button';

interface CategorySelectorProps {
  categories: Category[];
  selectedCategoryId: string;
  onSelect: (categoryId: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategoryId,
  onSelect,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Layers className="text-blue-600" size={24} />
        Seleccioná la categoría de tu producto
      </h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelect(String(cat.id))}
              className={`p-6 rounded-xl border-2 transition-all text-left flex items-center gap-4 ${
                selectedCategoryId === String(cat.id)
                  ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md'
                  : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50'
              }`}
            >
              <div
                className={`p-3 rounded-lg ${selectedCategoryId === String(cat.id) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}
              >
                {cat.name === 'Computers' ? (
                  <Cpu size={24} />
                ) : (
                  <Shirt size={24} />
                )}
              </div>
              <span className="font-bold text-lg">{cat.name}</span>
            </button>
          ))}
        </div>
        <div className="pt-6">
          <Button
            type="submit"
            fullWidth
            disabled={!selectedCategoryId || isLoading}
            className="h-14 text-lg font-bold"
          >
            {isLoading ? 'Iniciando...' : 'Siguiente Paso'}
          </Button>
        </div>
      </form>
    </div>
  );
};

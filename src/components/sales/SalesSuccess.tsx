import { CheckCircle2 } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/Button';

interface SalesSuccessProps {
  onReset: () => void;
}

export const SalesSuccess: React.FC<SalesSuccessProps> = ({ onReset }) => {
  return (
    <div className="max-w-2xl mx-auto mt-20 p-10 bg-white rounded-2xl shadow-xl text-center border-t-8 border-green-500">
      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={48} />
      </div>
      <h1 className="text-3xl font-bold text-gray-900">¡Producto Publicado!</h1>
      <p className="text-gray-600 mt-4 text-lg">
        El producto ya se encuentra activo en el catálogo del marketplace.
      </p>
      <Button onClick={onReset} className="mt-8">
        Crear otro producto
      </Button>
    </div>
  );
};

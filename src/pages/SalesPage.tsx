import React from 'react';

export const SalesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Panel de Ventas (Merchant)
      </h1>
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
        <p className="text-gray-600 mb-4">
          Gestiona tus productos publicados y realiza el seguimiento de tus
          pedidos recibidos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
            <h3 className="font-semibold text-orange-800">Mis Productos</h3>
            <p className="text-sm text-orange-600">
              Publicar y editar tus anuncios
            </p>
          </div>
          <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
            <h3 className="font-semibold text-teal-800">Pedidos Recibidos</h3>
            <p className="text-sm text-teal-800">
              Gestionar envíos y estados de venta
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

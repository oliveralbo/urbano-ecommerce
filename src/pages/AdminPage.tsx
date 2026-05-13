import React from 'react';

export const AdminPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Panel de Administración
      </h1>
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
        <p className="text-gray-600 mb-4">
          Bienvenido al panel de administración. Aquí podrás gestionar usuarios,
          productos y configuraciones globales.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-blue-800">Usuarios</h3>
            <p className="text-sm text-blue-600">Gestionar cuentas y roles</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-100">
            <h3 className="font-semibold text-green-800">Catálogo</h3>
            <p className="text-sm text-green-600">
              Control de inventario maestro
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
            <h3 className="font-semibold text-purple-800">Reportes</h3>
            <p className="text-sm text-purple-600">Estadísticas generales</p>
          </div>
        </div>
      </div>
    </div>
  );
};

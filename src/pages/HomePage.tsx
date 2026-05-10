import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { LogOut, User } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600">Urbano eCommerce</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <User size={20} />
              <span className="text-sm font-medium">Mi Cuenta</span>
            </div>
            <Button variant="outline" className="flex items-center gap-2" onClick={logout}>
              <LogOut size={18} />
              <span>Salir</span>
            </Button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-6">
            <User size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
            ¡Bienvenido de nuevo!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Has iniciado sesión correctamente. Este es tu panel de control principal. 
            Aquí podrás gestionar tus pedidos, ver tus productos favoritos y actualizar tu perfil.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-xl hover:border-blue-500 transition-colors cursor-pointer group">
              <h3 className="font-bold text-gray-900 group-hover:text-blue-600">Mis Pedidos</h3>
              <p className="text-sm text-gray-500 mt-1">Rastrea tus compras recientes.</p>
            </div>
            <div className="p-6 border rounded-xl hover:border-blue-500 transition-colors cursor-pointer group">
              <h3 className="font-bold text-gray-900 group-hover:text-blue-600">Favoritos</h3>
              <p className="text-sm text-gray-500 mt-1">Productos que te encantaron.</p>
            </div>
            <div className="p-6 border rounded-xl hover:border-blue-500 transition-colors cursor-pointer group">
              <h3 className="font-bold text-gray-900 group-hover:text-blue-600">Configuración</h3>
              <p className="text-sm text-gray-500 mt-1">Ajustes de tu cuenta.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

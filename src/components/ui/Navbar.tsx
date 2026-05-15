import { LogOut, Menu, Search, ShoppingCart, User } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  const isAdmin = user?.roles.some((role) => role.name === 'Admin');
  const isMerchant = user?.roles.some((role) => role.name === 'Merchant');

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              U
            </div>
            <span className="text-xl font-bold text-gray-900 hidden md:block tracking-tight">
              Urbano
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl hidden sm:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Buscar productos, marcas y más..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all text-sm placeholder-gray-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600 mr-2">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="hover:text-blue-600 transition-colors"
                >
                  Admin
                </Link>
              )}
              {isMerchant && (
                <Link
                  to="/ventas"
                  className="hover:text-blue-600 transition-colors"
                >
                  Ventas
                </Link>
              )}
            </div>

            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingCart size={22} />
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            <div className="hidden md:flex items-center gap-1">
              <Button
                variant="outline"
                className="flex items-center gap-2 py-1.5 px-3 border-none hover:bg-gray-100 rounded-full"
              >
                <User size={18} />
                <span className="text-sm font-semibold max-w-25 truncate">
                  {user?.email.split('@')[0]}
                </span>
              </Button>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Cerrar sesión"
              >
                <LogOut size={18} />
              </button>
            </div>

            <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="pb-3 sm:hidden">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Buscar..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

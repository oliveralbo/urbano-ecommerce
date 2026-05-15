import React, { useCallback, useEffect, useState } from 'react';
import type { User } from '../api/auth';
import { userApi } from '../api/user';
import { Button } from '../components/ui/Button';
import { Navbar } from '../components/ui/Navbar';
import { useAuth } from '../hooks/useAuth';

const ROLE_IDS = {
  MERCHANT: 2,
  ADMIN: 3,
};

export const AdminPage: React.FC = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchUsers = useCallback(
    async (showLoading = false) => {
      if (!token) return;
      try {
        if (showLoading) setIsLoading(true);
        const data = await userApi.getUsers(token);
        setUsers(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar usuarios');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [token],
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleToggleRole = async (
    userId: number,
    roleId: number,
    hasRole: boolean,
  ) => {
    if (!token) return;
    try {
      setProcessingId(userId);
      if (hasRole) {
        await userApi.unassignRole(token, { userId, roleId });
        setSuccessMessage('Rol removido correctamente.');
      } else {
        await userApi.assignRole(token, { userId, roleId });
        setSuccessMessage(
          'Rol asignado correctamente. Se ha enviado un correo al usuario.',
        );
      }
      setTimeout(() => setSuccessMessage(null), 5000);
      await fetchUsers(true);
    } catch (err) {
      alert('Error al actualizar el rol');
      console.error(err);
    } finally {
      setProcessingId(null);
    }
  };

  const hasRole = (user: User, roleName: string) => {
    return user.roles.some((role) => role.name === roleName);
  };

  const { user: currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Gestión de Usuarios
          </h1>
          <p className="mt-2 text-gray-600">
            Administra los roles y permisos de los usuarios de la plataforma.
          </p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex justify-between items-center">
            <span>{successMessage}</span>
            <button
              onClick={() => setSuccessMessage(null)}
              className="text-green-900 font-bold px-2"
            >
              ×
            </button>
          </div>
        )}

        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-gray-500">
              Cargando usuarios...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-bottom border-gray-200">
                    <th className="px-6 py-4 text-sm font-semibold text-gray-900">
                      Usuario
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-900">
                      Roles Actuales
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((u) => {
                    const isMerchant = hasRole(u, 'Merchant');
                    const isAdmin = hasRole(u, 'Admin');
                    const isSelf = currentUser?.id === u.id;

                    return (
                      <tr
                        key={u.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {u.email}
                            {isSelf && (
                              <span className="ml-2 text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded uppercase tracking-wider font-bold">
                                Tú
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID: {u.id}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {u.roles.map((role) => (
                              <span
                                key={role.id}
                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  role.name === 'Admin'
                                    ? 'bg-purple-100 text-purple-700'
                                    : role.name === 'Merchant'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'bg-gray-100 text-gray-700'
                                }`}
                              >
                                {role.name}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant={isMerchant ? 'primary' : 'outline'}
                              size="sm"
                              onClick={() =>
                                handleToggleRole(
                                  u.id,
                                  ROLE_IDS.MERCHANT,
                                  isMerchant,
                                )
                              }
                              disabled={processingId === u.id}
                              className={
                                isMerchant
                                  ? 'bg-blue-600 hover:bg-blue-700'
                                  : ''
                              }
                            >
                              {isMerchant ? 'Vendedor ✓' : 'Hacer Vendedor'}
                            </Button>
                            <Button
                              variant={isAdmin ? 'primary' : 'outline'}
                              size="sm"
                              onClick={() =>
                                handleToggleRole(u.id, ROLE_IDS.ADMIN, isAdmin)
                              }
                              disabled={
                                processingId === u.id || (isSelf && isAdmin)
                              }
                              className={
                                isAdmin
                                  ? 'bg-purple-600 hover:bg-purple-700 border-purple-600'
                                  : ''
                              }
                              title={
                                isSelf && isAdmin
                                  ? 'No puedes quitarte el rol de Admin a ti mismo'
                                  : ''
                              }
                            >
                              {isAdmin ? 'Admin ✓' : 'Hacer Admin'}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {users.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No se encontraron usuarios.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

import React, { useState } from 'react';
import { authApi } from '../../api/auth';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface RegisterFormProps {
  onSuccess: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    try {
      await authApi.register({ email, password });
      onSuccess();
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Ocurrió un error inesperado',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Crear Cuenta
      </h2>
      <Input
        label="Email"
        type="email"
        placeholder="tu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Contraseña"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Input
        label="Confirmar Contraseña"
        type="password"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? 'Cargando...' : 'Registrarse'}
      </Button>
    </form>
  );
};

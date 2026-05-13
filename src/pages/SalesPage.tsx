import {
  AlertCircle,
  CheckCircle2,
  Cpu,
  Info,
  Layers,
  Rocket,
  Shirt,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type {
  CapacityType,
  CapacityUnit,
  Category,
  ComputerDetails,
  Product,
  ProductBase,
  ProductDetailsDto,
} from '../api/inventory';
import { inventoryApi } from '../api/inventory';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Navbar } from '../components/ui/Navbar';
import { useAuth } from '../hooks/useAuth';

interface BaseForm extends ProductBase {
  categoryId: string;
  about: string;
}

export const SalesPage: React.FC = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [createdProduct, setCreatedProduct] = useState<Product | null>(null);
  const [success, setSuccess] = useState(false);

  // Form base
  const [baseData, setBaseData] = useState<BaseForm>({
    categoryId: '',
    title: '',
    code: '',
    description: '',
    about: '',
    variationType: 'NONE',
  });

  // computers details
  const [computerDetails, setComputerDetails] = useState<ComputerDetails>({
    category: 'Computers',
    brand: '',
    series: '',
    capacity: 0,
    capacityUnit: 'GB',
    capacityType: 'SSD',
  });

  useEffect(() => {
    const loadCategories = async () => {
      if (!token) return;
      try {
        const data = await inventoryApi.getCategories(token);
        setCategories(data);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : 'Ocurrió un error inesperado',
        );
      } finally {
        setIsLoading(false);
      }
    };
    loadCategories();
  }, [token]);
  const selectedCategory = categories.find(
    (c) => c.id === Number(baseData.categoryId),
  );
  const isComputer = selectedCategory?.name === 'Computers';

  const handleStep1Create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !baseData.categoryId) return;
    setIsLoading(true);
    setError(null);

    try {
      const product = await inventoryApi.createProduct(token, {
        categoryId: Number(baseData.categoryId),
      });
      setCreatedProduct(product);
      setStep(2);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Ocurrió un error inesperado',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleStep2SubmitDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !createdProduct || !selectedCategory) return;
    setIsLoading(true);
    setError(null);

    try {
      const payload: ProductDetailsDto = {
        title: baseData.title,
        code: baseData.code,
        variationType: baseData.variationType,
        description: baseData.description,
        about: baseData.about.split('\n').filter((line) => line.trim() !== ''),
        details: isComputer
          ? {
              ...computerDetails,
              capacity: Number(computerDetails.capacity),
            }
          : {
              category: selectedCategory.name,
            },
      };

      const updatedProduct = await inventoryApi.updateDetails(
        token,
        createdProduct.id,
        payload,
      );

      if (updatedProduct.isActive) {
        setSuccess(true);
        setTimeout(() => resetForm(), 3000);
      } else {
        // Si no se activó solo, intentamos forzar activación
        const activated = await inventoryApi.activateProduct(
          token,
          createdProduct.id,
        );
        if (activated.isActive) {
          setSuccess(true);
          setTimeout(() => resetForm(), 3000);
        }
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : 'Ocurrió un error inesperado',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setCreatedProduct(null);
    setSuccess(false);
    setBaseData({
      categoryId: '',
      title: '',
      code: '',
      description: '',
      about: '',
      variationType: 'NONE',
    });
    setComputerDetails({
      category: 'Computers',
      brand: '',
      series: '',
      capacity: 0,
      capacityUnit: 'GB',
      capacityType: 'SSD',
    });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#f5f5f5]">
        <Navbar />
        <div className="max-w-2xl mx-auto mt-20 p-10 bg-white rounded-2xl shadow-xl text-center border-t-8 border-green-500">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            ¡Producto Publicado!
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            El producto ya se encuentra activo en el catálogo del marketplace.
          </p>
          <Button onClick={resetForm} className="mt-8">
            Crear otro producto
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Vender Producto
          </h1>
          <p className="text-gray-600 mt-2 text-lg font-medium">
            Completá los pasos para publicar en Urbano Marketplace
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-center gap-3 text-red-700">
            <AlertCircle size={24} className="shrink-0" />
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {/* Stepper UI */}
        <div className="flex items-center justify-center mb-12 gap-4">
          <div
            className={`flex items-center gap-2 font-bold ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}
            >
              1
            </span>
            Categoría
          </div>
          <div className="w-12 h-0.5 bg-gray-200"></div>
          <div
            className={`flex items-center gap-2 font-bold ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}
            >
              2
            </span>
            Información
          </div>
        </div>

        {step === 1 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Layers className="text-blue-600" size={24} />
              Seleccioná la categoría de tu producto
            </h2>
            <form onSubmit={handleStep1Create} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() =>
                      setBaseData({ ...baseData, categoryId: String(cat.id) })
                    }
                    className={`p-6 rounded-xl border-2 transition-all text-left flex items-center gap-4 ${
                      baseData.categoryId === String(cat.id)
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md'
                        : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50'
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg ${baseData.categoryId === String(cat.id) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}
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
                  disabled={!baseData.categoryId || isLoading}
                  className="h-14 text-lg font-bold"
                >
                  {isLoading ? 'Iniciando...' : 'Siguiente Paso'}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <form
            onSubmit={handleStep2SubmitDetails}
            className="space-y-8 animate-in fade-in duration-500"
          >
            {/* Sección: Información Base */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                <Info size={22} className="text-blue-600" />
                <h2 className="text-lg font-bold text-gray-800">
                  Información del Producto
                </h2>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Nombre del Producto"
                    placeholder="Ej: Laptop Gamer Nitro 5"
                    value={baseData.title}
                    onChange={(e) =>
                      setBaseData({ ...baseData, title: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="SKU / Código"
                    placeholder="Ej: SKU-9988"
                    value={baseData.code}
                    onChange={(e) =>
                      setBaseData({ ...baseData, code: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700">
                    Descripción Larga
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none transition-all h-32"
                    value={baseData.description}
                    onChange={(e) =>
                      setBaseData({ ...baseData, description: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-bold text-gray-700">
                    Características Principales (una por línea)
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none transition-all h-32 font-mono text-sm"
                    placeholder="Ej: Procesador Intel i7&#10;16GB RAM DDR4"
                    value={baseData.about}
                    onChange={(e) =>
                      setBaseData({ ...baseData, about: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            {/* Sección: Detalles Técnicos (Polimórfica) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                {isComputer ? (
                  <Cpu size={22} className="text-blue-600" />
                ) : (
                  <Layers size={22} className="text-blue-600" />
                )}
                <h2 className="text-lg font-bold text-gray-800">
                  {isComputer
                    ? 'Especificaciones Técnicas'
                    : `Información General (${selectedCategory?.name})`}
                </h2>
              </div>
              <div className="p-8">
                {isComputer ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Input
                      label="Marca"
                      placeholder="Ej: Acer"
                      value={computerDetails.brand}
                      onChange={(e) =>
                        setComputerDetails({
                          ...computerDetails,
                          brand: e.target.value,
                        })
                      }
                      required
                    />
                    <Input
                      label="Serie / Modelo"
                      placeholder="Ej: Nitro 5"
                      value={computerDetails.series}
                      onChange={(e) =>
                        setComputerDetails({
                          ...computerDetails,
                          series: e.target.value,
                        })
                      }
                      required
                    />
                    <Input
                      label="Capacidad"
                      type="number"
                      placeholder="Ej: 512"
                      value={computerDetails.capacity || ''}
                      onChange={(e) =>
                        setComputerDetails({
                          ...computerDetails,
                          capacity: Number(e.target.value),
                        })
                      }
                      required
                    />
                    <div className="space-y-1">
                      <label className="block text-sm font-bold text-gray-700">
                        Unidad
                      </label>
                      <select
                        className="w-full px-4 py-2 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none"
                        value={computerDetails.capacityUnit}
                        onChange={(e) =>
                          setComputerDetails({
                            ...computerDetails,
                            capacityUnit: e.target.value as CapacityUnit,
                          })
                        }
                      >
                        <option value="GB">GB</option>
                        <option value="TB">TB</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-sm font-bold text-gray-700">
                        Tipo de Almacenamiento
                      </label>
                      <select
                        className="w-full px-4 py-2 border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none"
                        value={computerDetails.capacityType}
                        onChange={(e) =>
                          setComputerDetails({
                            ...computerDetails,
                            capacityType: e.target.value as CapacityType,
                          })
                        }
                      >
                        <option value="SSD">SSD</option>
                        <option value="HD">HD</option>
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-xl border border-dashed border-gray-200 text-center">
                    <p className="text-gray-500 font-medium italic">
                      No se requieren especificaciones adicionales para la
                      categoría {selectedCategory?.name}.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1 h-14 font-bold border-2"
                disabled={isLoading}
              >
                Volver
              </Button>
              <Button
                type="submit"
                className="flex-2 h-14 text-lg font-bold shadow-lg shadow-blue-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Publicando...'
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Rocket size={20} />
                    Finalizar y Publicar
                  </span>
                )}
              </Button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

import { AlertCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type {
  Category,
  ComputerDetails,
  Product,
  ProductDetailsDto,
  ProductForm,
} from '../api/inventory';
import { inventoryApi } from '../api/inventory';
import { CategorySelector } from '../components/sales/CategorySelector';
import { ProductDetailsForm } from '../components/sales/ProductDetailsForm';
import { SalesSuccess } from '../components/sales/SalesSuccess';
import { Navbar } from '../components/ui/Navbar';
import { useAuth } from '../hooks/useAuth';

export const SalesPage: React.FC = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [createdProduct, setCreatedProduct] = useState<Product | null>(null);
  const [success, setSuccess] = useState(false);

  // Form base
  const [baseData, setBaseData] = useState<ProductForm>({
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
      } else {
        const activated = await inventoryApi.activateProduct(
          token,
          createdProduct.id,
        );
        if (activated.isActive) {
          setSuccess(true);
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
        <SalesSuccess onReset={resetForm} />
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
          <CategorySelector
            categories={categories}
            selectedCategoryId={baseData.categoryId}
            onSelect={(id) => setBaseData({ ...baseData, categoryId: id })}
            onSubmit={handleStep1Create}
            isLoading={isLoading}
          />
        ) : (
          <ProductDetailsForm
            baseData={baseData}
            onBaseDataChange={setBaseData}
            computerDetails={computerDetails}
            onComputerDetailsChange={setComputerDetails}
            isComputer={isComputer}
            categoryName={selectedCategory?.name}
            onSubmit={handleStep2SubmitDetails}
            onBack={() => setStep(1)}
            isLoading={isLoading}
          />
        )}
      </main>
    </div>
  );
};

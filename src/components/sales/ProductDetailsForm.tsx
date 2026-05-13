import { Cpu, Info, Layers, Rocket } from 'lucide-react';
import React from 'react';
import type {
  CapacityType,
  CapacityUnit,
  ComputerDetails,
  ProductForm,
} from '../../api/inventory';
import { Button } from '../ui/Button';
import { FormSection } from '../ui/FormSection';
import { Input } from '../ui/Input';

interface ProductDetailsFormProps {
  baseData: ProductForm;
  onBaseDataChange: (data: ProductForm) => void;
  computerDetails: ComputerDetails;
  onComputerDetailsChange: (details: ComputerDetails) => void;
  isComputer: boolean;
  categoryName?: string;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  isLoading: boolean;
}

export const ProductDetailsForm: React.FC<ProductDetailsFormProps> = ({
  baseData,
  onBaseDataChange,
  computerDetails,
  onComputerDetailsChange,
  isComputer,
  categoryName,
  onSubmit,
  onBack,
  isLoading,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-8 animate-in fade-in duration-500"
    >
      <FormSection title="Información del Producto" icon={<Info size={22} />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Nombre del Producto"
            placeholder="Ej: Laptop Gamer Nitro 5"
            value={baseData.title}
            onChange={(e) =>
              onBaseDataChange({ ...baseData, title: e.target.value })
            }
            required
          />
          <Input
            label="SKU / Código"
            placeholder="Ej: SKU-9988"
            value={baseData.code}
            onChange={(e) =>
              onBaseDataChange({ ...baseData, code: e.target.value })
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
              onBaseDataChange({ ...baseData, description: e.target.value })
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
              onBaseDataChange({ ...baseData, about: e.target.value })
            }
            required
          />
        </div>
      </FormSection>

      <FormSection
        title={
          isComputer
            ? 'Especificaciones Técnicas'
            : `Información General (${categoryName})`
        }
        icon={isComputer ? <Cpu size={22} /> : <Layers size={22} />}
      >
        {isComputer ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input
              label="Marca"
              placeholder="Ej: Acer"
              value={computerDetails.brand}
              onChange={(e) =>
                onComputerDetailsChange({
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
                onComputerDetailsChange({
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
                onComputerDetailsChange({
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
                  onComputerDetailsChange({
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
                  onComputerDetailsChange({
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
              No se requieren especificaciones adicionales para la categoría{' '}
              {categoryName}.
            </p>
          </div>
        )}
      </FormSection>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
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
  );
};

import React from 'react';
import { MedicineCategory } from '../../types/medicine';
import { TextInput } from './form/TextInput';
import { NumericInput } from './form/NumericInput';
import { CategorySelect } from './form/CategorySelect';

interface MedicineFormFieldsProps {
  values: {
    name: string;
    manufacturer: string;
    category: MedicineCategory;
    price: number;
    stock: number;
    expiryDate: string;
    batchNumber: string;
    minStockLevel: number;
    prescriptionRequired: boolean;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function MedicineFormFields({ values, onChange }: MedicineFormFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          name="name"
          value={values.name}
          onChange={onChange}
          label="Name"
          required
        />
        <TextInput
          name="manufacturer"
          value={values.manufacturer}
          onChange={onChange}
          label="Manufacturer"
          required
        />
        <CategorySelect
          value={values.category}
          onChange={onChange}
          required
        />
        <NumericInput
          name="price"
          value={values.price}
          onChange={onChange}
          min={0}
          step={0.01}
          label="Price"
          required
        />
        <NumericInput
          name="stock"
          value={values.stock}
          onChange={onChange}
          min={0}
          label="Stock"
          required
        />
        <NumericInput
          name="minStockLevel"
          value={values.minStockLevel}
          onChange={onChange}
          min={0}
          label="Minimum Stock Level"
          required
        />
        <TextInput
          name="batchNumber"
          value={values.batchNumber}
          onChange={onChange}
          label="Batch Number"
          required
        />
        <TextInput
          name="expiryDate"
          value={values.expiryDate}
          onChange={onChange}
          type="date"
          label="Expiry Date"
          required
        />
      </div>
      <div className="mt-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="prescriptionRequired"
            checked={values.prescriptionRequired}
            onChange={onChange}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <span className="ml-2 text-sm text-gray-600">Prescription Required</span>
        </label>
      </div>
    </>
  );
}
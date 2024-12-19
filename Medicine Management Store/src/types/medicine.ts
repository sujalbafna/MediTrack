export type MedicineCategory = 'Tablets' | 'Syrups' | 'Injections' | 'First Aid' | 'Antibiotics' | 'Painkillers' | 'Vitamins';

export interface Medicine {
  id: string;
  name: string;
  manufacturer: string;
  category: MedicineCategory;
  price: number;
  stock: number;
  expiryDate: string;
  batchNumber: string;
  minStockLevel: number;
  prescriptionRequired: boolean;
  supplierId: string;
}

export type MedicineFormData = Omit<Medicine, 'id'>;
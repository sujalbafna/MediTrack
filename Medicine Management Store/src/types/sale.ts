export interface Sale {
  id: string;
  customerId?: string;
  items: SaleItem[];
  total: number;
  date: string;
  prescriptionIds: string[];
}

export interface SaleItem {
  medicineId: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export type SaleFormData = Omit<Sale, 'id' | 'date'>;
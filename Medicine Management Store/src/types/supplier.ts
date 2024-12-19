export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
}

export type SupplierFormData = Omit<Supplier, 'id'>;
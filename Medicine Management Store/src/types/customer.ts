export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  prescriptions: Prescription[];
}

export interface Prescription {
  id: string;
  medicineId: string;
  doctorName: string;
  issueDate: string;
  expiryDate: string;
  refillsRemaining: number;
}

export type CustomerFormData = Omit<Customer, 'id' | 'prescriptions'>;
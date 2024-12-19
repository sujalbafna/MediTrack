import { useState, useCallback } from 'react';
import { Customer, CustomerFormData, Prescription } from '../types';

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const addCustomer = useCallback((customerData: CustomerFormData) => {
    const newCustomer = {
      ...customerData,
      id: Date.now().toString(),
      prescriptions: [],
    };
    setCustomers(prev => [...prev, newCustomer]);
  }, []);

  const updateCustomer = useCallback((id: string, customerData: CustomerFormData) => {
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === id
          ? { ...customer, ...customerData }
          : customer
      )
    );
  }, []);

  const addPrescription = useCallback((customerId: string, prescription: Omit<Prescription, 'id'>) => {
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === customerId
          ? {
              ...customer,
              prescriptions: [
                ...customer.prescriptions,
                { ...prescription, id: Date.now().toString() },
              ],
            }
          : customer
      )
    );
  }, []);

  return {
    customers,
    addCustomer,
    updateCustomer,
    addPrescription,
  };
}
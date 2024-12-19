import {
  collection,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';
import { Medicine, Sale, SaleItem } from '../../types';

// User Profile Operations
export const updateUserProfile = async (userId: string, profileData: any) => {
  const userRef = doc(db, 'users', userId);
  return updateDoc(userRef, {
    ...profileData,
    updatedAt: serverTimestamp(),
  });
};

// Medicine Operations
export const getMedicinesForUser = (userId: string) => {
  return query(collection(db, 'medicines'), where('userId', '==', userId));
};

export const addMedicine = (userId: string, data: Omit<Medicine, 'id'>) => {
  return addDoc(collection(db, 'medicines'), {
    ...data,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

// Sales Operations
export const getSalesForUser = (userId: string) => {
  return query(collection(db, 'sales'), where('userId', '==', userId));
};

export const processSale = async (
  userId: string,
  items: SaleItem[],
  customerId?: string
): Promise<void> => {
  const batch = db.batch();

  // Create sale document
  const saleData: Omit<Sale, 'id'> = {
    items,
    customerId,
    userId,
    total: items.reduce((sum, item) => sum + item.subtotal, 0),
    date: Timestamp.now(),
    prescriptionIds: [],
  };

  const saleRef = doc(collection(db, 'sales'));
  batch.set(saleRef, saleData);

  // Update medicine stock
  for (const item of items) {
    const medicineRef = doc(db, 'medicines', item.medicineId);
    batch.update(medicineRef, {
      stock: item.newStock,
      updatedAt: serverTimestamp(),
    });
  }

  await batch.commit();
};

// Export functions
export const generatePDF = async (data: any) => {
  // Implement PDF generation logic here
  const response = await fetch('/api/reports/pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) throw new Error('Failed to generate PDF');
  
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'report.pdf';
  a.click();
};

export const generateExcel = async (data: any) => {
  // Implement Excel generation logic here
  const response = await fetch('/api/reports/excel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) throw new Error('Failed to generate Excel');
  
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'report.xlsx';
  a.click();
};
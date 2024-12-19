import { useState, useEffect, useCallback } from 'react';
import { collection, onSnapshot, query, where, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Sale, SaleFormData } from '../types';
import { useAuth } from './useAuth';

export function useSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setSales([]);
      setLoading(false);
      return;
    }

    const salesQuery = query(
      collection(db, 'sales'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(salesQuery, (snapshot) => {
      const salesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Sale[];
      setSales(salesData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching sales:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addSale = useCallback(async (saleData: SaleFormData) => {
    if (!user) {
      throw new Error('User must be logged in to add sales');
    }

    try {
      const salesRef = collection(db, 'sales');
      await addDoc(salesRef, {
        ...saleData,
        userId: user.uid,
        createdAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Error adding sale:', error);
      throw new Error('Failed to add sale. Please try again.');
    }
  }, [user]);

  return { sales, loading, addSale };
}
import { useState, useEffect, useCallback } from 'react';
import { collection, onSnapshot, query, where, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Medicine, MedicineFormData } from '../types';
import { useAuth } from './useAuth';

export function useMedicines() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setMedicines([]);
      setLoading(false);
      return;
    }

    const medicinesQuery = query(
      collection(db, 'medicines'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(
      medicinesQuery,
      (snapshot) => {
        const medicinesList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Medicine[];
        setMedicines(medicinesList);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching medicines:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const addMedicine = useCallback(async (medicineData: MedicineFormData) => {
    if (!user) {
      throw new Error('User must be logged in to add medicines');
    }

    try {
      const medicinesRef = collection(db, 'medicines');
      await addDoc(medicinesRef, {
        ...medicineData,
        userId: user.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error adding medicine:', error);
      throw new Error('Failed to add medicine. Please try again.');
    }
  }, [user]);

  const updateMedicine = useCallback(async (id: string, medicineData: Partial<MedicineFormData>) => {
    if (!user) {
      throw new Error('User must be logged in to update medicines');
    }

    try {
      const medicineRef = doc(db, 'medicines', id);
      await updateDoc(medicineRef, {
        ...medicineData,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error updating medicine:', error);
      throw new Error('Failed to update medicine. Please try again.');
    }
  }, [user]);

  const deleteMedicine = useCallback(async (id: string) => {
    if (!user) {
      throw new Error('User must be logged in to delete medicines');
    }

    try {
      const medicineRef = doc(db, 'medicines', id);
      await deleteDoc(medicineRef);
    } catch (error) {
      console.error('Error deleting medicine:', error);
      throw new Error('Failed to delete medicine. Please try again.');
    }
  }, [user]);

  return {
    medicines,
    loading,
    addMedicine,
    updateMedicine,
    deleteMedicine,
  };
}
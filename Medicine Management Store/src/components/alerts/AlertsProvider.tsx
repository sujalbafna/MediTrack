import React, { createContext, useContext, useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { getLowStockMedicines, getExpiringMedicines } from '../../lib/firebase/db';
import { Medicine } from '../../types';

interface AlertsContextType {
  lowStockMedicines: Medicine[];
  expiringMedicines: Medicine[];
  loading: boolean;
}

const AlertsContext = createContext<AlertsContextType>({
  lowStockMedicines: [],
  expiringMedicines: [],
  loading: true,
});

export function AlertsProvider({ children }: { children: React.ReactNode }) {
  const [lowStockMedicines, setLowStockMedicines] = useState<Medicine[]>([]);
  const [expiringMedicines, setExpiringMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lowStockQuery = getLowStockMedicines();
    const expiringQuery = getExpiringMedicines();

    const unsubscribeLowStock = onSnapshot(lowStockQuery, (snapshot) => {
      setLowStockMedicines(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Medicine[]);
    });

    const unsubscribeExpiring = onSnapshot(expiringQuery, (snapshot) => {
      setExpiringMedicines(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Medicine[]);
      setLoading(false);
    });

    return () => {
      unsubscribeLowStock();
      unsubscribeExpiring();
    };
  }, []);

  return (
    <AlertsContext.Provider value={{ lowStockMedicines, expiringMedicines, loading }}>
      {children}
    </AlertsContext.Provider>
  );
}

export const useAlerts = () => useContext(AlertsContext);
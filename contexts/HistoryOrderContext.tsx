// contexts/HistoryOrderContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

interface OrderItem {
  id: string;
  totalPrice: number;
  totalItem: number;
  [key: string]: any; // Cho các thuộc tính khác
}

interface HistoryOrderContextType {
  orderItems: OrderItem[];
  setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  loadHistoryOrders: () => Promise<void>;
  addToHistoryOrder: (item: OrderItem) => Promise<void>;
}

const HistoryOrderContext = createContext<HistoryOrderContextType | undefined>(undefined);

export const HistoryOrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const fileUri = FileSystem.documentDirectory + 'my-history-order.txt';

  // Load history orders from file
  const loadHistoryOrders = async () => {
    try {
      const fileExists = await FileSystem.getInfoAsync(fileUri);
      if (fileExists.exists) {
        const content = await FileSystem.readAsStringAsync(fileUri);
        const parsedOrders = JSON.parse(content || '[]');
        setOrderItems(parsedOrders);
      } else {
        console.log('History order file does not exist, initializing empty array.');
        setOrderItems([]);
      }
    } catch (error) {
      console.error('Error loading history orders:', error);
      setOrderItems([]);
    }
  };

  // Add a single order item to history
  const addToHistoryOrder = async (item: OrderItem) => {
    try {
      const updatedOrders = [...orderItems, item];
      setOrderItems(updatedOrders);
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedOrders));
      console.log('Order added to history successfully');
    } catch (error) {
      console.error('Error adding to history orders:', error);
    }
  };

  useEffect(() => {
    loadHistoryOrders();
  }, []);

  return (
    <HistoryOrderContext.Provider value={{ orderItems, setOrderItems, loadHistoryOrders, addToHistoryOrder }}>
      {children}
    </HistoryOrderContext.Provider>
  );
};

export const useHistoryOrder = () => {
  const context = useContext(HistoryOrderContext);
  if (!context) {
    throw new Error('useHistoryOrder must be used within a HistoryOrderProvider');
  }
  return context;
};

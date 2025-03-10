import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

// Kiểu dữ liệu cho OrderItem
export interface OrderItem {
  id: string;
  name: string;
  date: string;
  points: number;
  address: string;
  orderDate: string;
  totalPrice: number;
  totalItem: number;
}

interface OrderContextType {
  orderItems: OrderItem[];
  loadOrders: () => Promise<void>;
  addOrder: (newOrder: OrderItem) => Promise<void>;
  removeOrder: (id: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const orderFileUri = FileSystem.documentDirectory + 'my-order-on-going.txt';

  // Load orders on start
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const fileExists = await FileSystem.getInfoAsync(orderFileUri);

      if (fileExists.exists) {
        const content = await FileSystem.readAsStringAsync(orderFileUri);
        const parsedOrders: OrderItem[] = JSON.parse(content);
        setOrderItems(parsedOrders);
      } else {
        setOrderItems([]);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  const saveOrdersToFile = async (orders: OrderItem[]) => {
    try {
      await FileSystem.writeAsStringAsync(orderFileUri, JSON.stringify(orders), {
        encoding: FileSystem.EncodingType.UTF8,
      });
    } catch (error) {
      console.error('Error saving orders to file:', error);
    }
  };

  const addOrder = async (newOrder: OrderItem) => {
    const updatedOrders = [...orderItems, newOrder];
    setOrderItems(updatedOrders);
    await saveOrdersToFile(updatedOrders);
  };

  const removeOrder = async (id: string) => {
    const updatedOrders = orderItems.filter(order => order.id !== id);
    setOrderItems(updatedOrders);
    await saveOrdersToFile(updatedOrders);
  };

  return (
    <OrderContext.Provider
      value={{
        orderItems,
        loadOrders,
        addOrder,
        removeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

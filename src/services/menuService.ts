import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { sanitizeInput } from '../lib/validation';

const COLLECTION_NAME = 'menu';

export interface MenuItem {
  id?: string;
  name: string;
  category: string;
  subcategory?: string; // 'Milk' | 'Non-Milk' | undefined
  price: string;
}

export const getMenuItems = async () => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('category'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
};

export const addMenuItem = async (item: MenuItem) => {
  // Sanitize input data
  const sanitizedItem: MenuItem = {
    ...item,
    name: sanitizeInput(item.name),
    category: sanitizeInput(item.category),
    price: sanitizeInput(item.price),
    subcategory: item.subcategory ? sanitizeInput(item.subcategory) : undefined
  };
  return await addDoc(collection(db, COLLECTION_NAME), sanitizedItem);
};

export const updateMenuItem = async (id: string, item: Partial<MenuItem>) => {
  // Sanitize input data
  const sanitizedItem: Partial<MenuItem> = {};
  if (item.name) sanitizedItem.name = sanitizeInput(item.name);
  if (item.category) sanitizedItem.category = sanitizeInput(item.category);
  if (item.price) sanitizedItem.price = sanitizeInput(item.price);
  if (item.subcategory) sanitizedItem.subcategory = sanitizeInput(item.subcategory);

  const docRef = doc(db, COLLECTION_NAME, id);
  return await updateDoc(docRef, sanitizedItem);
};

export const deleteMenuItem = async (id: string) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return await deleteDoc(docRef);
};

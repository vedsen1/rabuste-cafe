import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

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
  return await addDoc(collection(db, COLLECTION_NAME), item);
};

export const updateMenuItem = async (id: string, item: Partial<MenuItem>) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return await updateDoc(docRef, item);
};

export const deleteMenuItem = async (id: string) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return await deleteDoc(docRef);
};

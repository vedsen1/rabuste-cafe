import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

const COLLECTION_NAME = 'workshops';

export interface Workshop {
  id?: string;
  title: string;
  schedule: string; // e.g., "Every Saturday • 10:00 AM"
}

export const getWorkshops = async () => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('title'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Workshop));
};

export const addWorkshop = async (workshop: Workshop) => {
  return await addDoc(collection(db, COLLECTION_NAME), workshop);
};

export const deleteWorkshop = async (id: string) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return await deleteDoc(docRef);
};

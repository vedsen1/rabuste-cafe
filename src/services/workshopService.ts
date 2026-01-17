import { db } from '../lib/firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  runTransaction,
  serverTimestamp,
  query,
  orderBy,
  getDoc
} from 'firebase/firestore';

export interface Workshop {
  id: string;
  title: string;
  schedule: string;
  description?: string;
  image?: string;
  reel?: string;
  status?: string;
  reviews?: string[];
  totalSeats?: number;
  registrationsCount?: number;
  // Computed client-side for compatibility
  seatsLeft?: number;
}

const COLLECTION_NAME = 'workshops';

export const getWorkshops = async (): Promise<Workshop[]> => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      // Compute seatsLeft for frontend compatibility
      seatsLeft: (data.totalSeats || 0) - (data.registrationsCount || 0)
    } as Workshop;
  });
};

export const addWorkshop = async (workshop: Omit<Workshop, 'id' | 'seatsLeft'>) => {
  return await addDoc(collection(db, COLLECTION_NAME), {
    ...workshop,
    registrationsCount: 0,
    totalSeats: workshop.totalSeats || 20, // Default if not provided
    createdAt: serverTimestamp()
  });
};

export const deleteWorkshop = async (id: string) => {
  // Note: Subcollections are NOT automatically deleted in Firestore.
  // For strict cleanup, we'd need a Cloud Function or client-side recursive delete.
  // For now, we just delete the parent doc, which makes it disappear from UI.
  // Orphaned subcollections are generally fine in this scale.
  return await deleteDoc(doc(db, COLLECTION_NAME, id));
};

export const registerForWorkshop = async (id: string, details: { name: string; email: string; phone: string }) => {
  const workshopRef = doc(db, COLLECTION_NAME, id);

  try {
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(workshopRef);
      if (!sfDoc.exists()) {
        throw 'Workshop not found';
      }

      const data = sfDoc.data();
      const totalSeats = data.totalSeats || 0;
      const registrationsCount = data.registrationsCount || 0;

      if (registrationsCount >= totalSeats) {
        throw 'Workshop is sold out';
      }

      // Add registration to subcollection
      const regRef = doc(collection(workshopRef, 'registrations'));
      transaction.set(regRef, {
        ...details,
        timestamp: serverTimestamp()
      });

      // Update count
      transaction.update(workshopRef, {
        registrationsCount: registrationsCount + 1
      });
    });

    // Send confirmation email (Side effect outside transaction)
    // We swallow errors here so the user isn't told "Failed" if only the email failed
    fetch('/api/send-confirmation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workshopId: id,
        ...details
      })
    }).catch(err => console.error('Email sending failed', err));

    return { success: true };

  } catch (error) {
    console.error("Registration failed: ", error);
    // Throw error string to be caught by UI
    throw new Error(typeof error === 'string' ? error : 'Registration failed');
  }
};

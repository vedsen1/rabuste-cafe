import { db, storage } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const COLLECTION_NAME = 'art';

export interface ArtPiece {
  id?: string;
  title: string;
  artist: string;
  price: string;
  description?: string;
  imageUrl: string;
  imagePath?: string; // To delete from storage later
}

export const getArtPieces = async () => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('title'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ArtPiece));
};

export const addArtPiece = async (art: Omit<ArtPiece, 'imageUrl'>, file: File) => {
  // 1. Upload Image
  const storageRef = ref(storage, `art/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  // 2. Save Metadata to Firestore
  const newArt: ArtPiece = {
    ...art,
    imageUrl: downloadURL,
    imagePath: snapshot.ref.fullPath
  };
  
  return await addDoc(collection(db, COLLECTION_NAME), newArt);
};

export const deleteArtPiece = async (id: string, imagePath?: string) => {
  // 1. Delete from Firestore
  await deleteDoc(doc(db, COLLECTION_NAME, id));

  // 2. Delete Image from Storage if exists
  if (imagePath) {
    const storageRef = ref(storage, imagePath);
    try {
      await deleteObject(storageRef);
    } catch (error) {
      console.warn("Failed to delete image from storage:", error);
    }
  }
};

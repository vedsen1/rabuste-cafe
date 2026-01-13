import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { uploadToCloudinary } from './cloudinaryService';
import { validateImageFile, sanitizeInput } from '../lib/validation';

const COLLECTION_NAME = 'robusta-seeds';

export interface RobustaSeed {
  id?: string;
  title: string;
  description: string;
  price: string;
  quantity: string;
  imageUrl: string;
}

export const getRobustaSeeds = async () => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('title'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RobustaSeed));
};

export const addRobustaSeed = async (seed: Omit<RobustaSeed, 'imageUrl'>, file: File | null) => {
  if (!file) throw new Error("Image file is required");

  // Validate file before upload
  const fileValidation = validateImageFile(file);
  if (!fileValidation.valid) {
    throw new Error(fileValidation.error || 'Invalid file');
  }

  // 1. Upload Image to Cloudinary
  const downloadURL = await uploadToCloudinary(file);

  // 2. Save Metadata to Firestore with sanitized data
  const newSeed: RobustaSeed = {
    ...seed,
    title: sanitizeInput(seed.title),
    description: sanitizeInput(seed.description),
    price: sanitizeInput(seed.price),
    quantity: sanitizeInput(seed.quantity),
    imageUrl: downloadURL,
  };
  
  return await addDoc(collection(db, COLLECTION_NAME), newSeed);
};

export const deleteRobustaSeed = async (id: string) => {
  // Delete from Firestore
  await deleteDoc(doc(db, COLLECTION_NAME, id));
  // Note: Image remains in Cloudinary (orphaned)
};

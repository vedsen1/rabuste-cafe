import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, updateDoc } from 'firebase/firestore';
import { uploadToCloudinary } from './cloudinaryService';
import { validateImageFile, sanitizeInput } from '../lib/validation';

const COLLECTION_NAME = 'art';

export interface ArtPiece {
  id?: string;
  title: string;
  artist: string;
  price: string;
  description?: string;
  imageUrl: string;
  stock?: number;
  category?: string;
  dimensions?: string;
  medium?: string;
  year?: string;
  imagePath?: string; 
}

export const getArtPieces = async () => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('title'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ArtPiece));
};

export const addArtPiece = async (art: Omit<ArtPiece, 'imageUrl'>, file: File | null) => {
  if (!file) throw new Error("Image file is required");

  // Validate file before upload
  const fileValidation = validateImageFile(file);
  if (!fileValidation.valid) {
    throw new Error(fileValidation.error || 'Invalid file');
  }

  // 1. Upload Image to Cloudinary
  const downloadURL = await uploadToCloudinary(file);

  // 2. Save Metadata to Firestore with sanitized data
  const newArt: ArtPiece = {
    ...art,
    title: sanitizeInput(art.title),
    artist: sanitizeInput(art.artist),
    price: sanitizeInput(art.price),
    description: art.description ? sanitizeInput(art.description) : undefined,
    imageUrl: downloadURL,
    stock: art.stock || 1,
    category: art.category ? sanitizeInput(art.category) : undefined,
    dimensions: art.dimensions ? sanitizeInput(art.dimensions) : undefined,
    medium: art.medium ? sanitizeInput(art.medium) : undefined,
    year: art.year ? sanitizeInput(art.year) : undefined,
  };
  
  return await addDoc(collection(db, COLLECTION_NAME), newArt);
};

export const deleteArtPiece = async (id: string) => {
  // 1. Delete from Firestore
  await deleteDoc(doc(db, COLLECTION_NAME, id));

  // Note: Deleting images from Cloudinary requires a signed backend API 
  // or a signed upload preset with delete permissions (risky on frontend).
  // For this simple implementation, we only delete the database record.
  // The image remains in Cloudinary but becomes "orphaned".
};

export const updateArtPiece = async (id: string, updates: Partial<ArtPiece>) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const sanitizedUpdates = {
    ...updates,
    ...(updates.title && { title: sanitizeInput(updates.title) }),
    ...(updates.description && { description: sanitizeInput(updates.description) }),
    ...(updates.category && { category: sanitizeInput(updates.category) }),
    ...(updates.dimensions && { dimensions: sanitizeInput(updates.dimensions) }),
    ...(updates.medium && { medium: sanitizeInput(updates.medium) }),
    ...(updates.year && { year: sanitizeInput(updates.year) }),
  };
  return await updateDoc(docRef, sanitizedUpdates);
};
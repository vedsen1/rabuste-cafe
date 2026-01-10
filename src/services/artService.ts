import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
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
  // imagePath is no longer needed for Cloudinary deletions via simple API, 
  // but we keep it optional to avoid breaking old data types if needed
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
    // We don't need to store a storage path for Cloudinary unless we implement 
    // signed deletion logic later. For now, we just store the URL.
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
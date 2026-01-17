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
  category: 'Traditional' | 'Digital' | 'Sculpture' | 'Photography' | 'Contemporary';
  dimensions?: string;
  year?: string;
  isArEnabled?: boolean;
  // imagePath is no longer needed for Cloudinary deletions via simple API, 
  // but we keep it optional to avoid breaking old data types if needed
  imagePath?: string;
}

export const MOCK_ART_PIECES: ArtPiece[] = [
  {
    id: '1',
    title: 'Abstract Harmony',
    artist: 'Elena R.',
    price: '₹25,000',
    category: 'Traditional',
    year: '2023',
    dimensions: '24x36"',
    isArEnabled: true,
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80',
    description: 'An expansive oil painting exploring color theory and emotional resonance.'
  },
  {
    id: '2',
    title: 'Neon Dreams',
    artist: 'Marcus T.',
    price: '₹18,500',
    category: 'Digital',
    year: '2024',
    dimensions: 'Digital Print',
    isArEnabled: true,
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80',
    description: 'A cyberpunk-inspired digital composition focusing on urban isolation.'
  },
  {
    id: '3',
    title: 'Sculpted Silence',
    artist: 'Sarah L.',
    price: '₹45,000',
    category: 'Sculpture',
    year: '2022',
    dimensions: '18x12x10"',
    isArEnabled: true,
    imageUrl: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80',
    description: 'Modern minimalist sculpture capturing the essence of quiet moments.'
  },
  {
    id: '4',
    title: 'Golden Horizon',
    artist: 'Davinci B.',
    price: '₹32,000',
    category: 'Traditional',
    year: '2023',
    dimensions: '30x40"',
    isArEnabled: true,
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80',
    description: 'Acrylic on canvas, a study of light hitting the landscape at golden hour.'
  },
  {
    id: '5',
    title: 'Urban Complexity',
    artist: 'Banksy Lite',
    price: '₹28,000',
    category: 'Contemporary',
    year: '2024',
    dimensions: '20x20"',
    isArEnabled: false,
    imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80',
    description: 'Mixed media piece exploring the chaotic texture of modern city life.'
  },
  {
    id: '6',
    title: 'Fluid Thoughts',
    artist: 'Maria K.',
    price: '₹22,000',
    category: 'Traditional',
    year: '2023',
    dimensions: '18x24"',
    isArEnabled: true,
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80',
    description: 'Watercolor exploration of fluid dynamics and mental states.'
  }
];

export const MOCK_ARTISTS = [
  {
    id: 'a1',
    name: 'Elena R.',
    bio: 'Elena is a classical oil painter who finds beauty in the mundane rituals of daily life. Her "Coffee Series" explores the texture of steam and liquid.',
    imageUrl: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&q=80',
    specialty: 'Oil & Canvas'
  },
  {
    id: 'a2',
    name: 'Marcus T.',
    bio: 'A digital native, Marcus blends cyber-aesthetics with organic forms. His work questions the boundary between the natural bean and the digital brew.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    specialty: 'Digital Art'
  },
  {
    id: 'a3',
    name: 'Sarah L.',
    bio: 'Sarah uses high-speed photography to capture the unseen physics of liquid dynamics. Her work turns a simple pour into a chaotic masterpiece.',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    specialty: 'Photography'
  },
  {
    id: 'a4',
    name: 'Davinci B.',
    bio: 'Inspired by the old masters, Davinci B. brings a renaissance touch to modern subjects, focusing on light, shadow, and crema.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
    specialty: 'Acrylics'
  }
];

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
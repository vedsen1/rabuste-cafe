import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';

const COLLECTION_NAME = 'inquiries';

export type InquiryType = 'feedback' | 'contact' | 'seeds';

export interface BaseInquiry {
    id?: string;
    type: InquiryType;
    submittedAt: Timestamp; // Using Firestore Timestamp
}

export interface FeedbackInquiry extends BaseInquiry {
    type: 'feedback';
    name: string;
    phone: string;
    email: string;
    rating: number;
    review: string;
}

export interface ContactInquiry extends BaseInquiry {
    type: 'contact';
    name: string;
    phone: string;
    email: string;
    reason: string;
    suggestions?: string;
}

export interface SeedInquiry extends BaseInquiry {
    type: 'seeds';
    name: string;
    phone: string;
    email: string;
    seedType: string;
    quantity: string;
    message?: string;
}

export type Inquiry = FeedbackInquiry | ContactInquiry | SeedInquiry;

// Helper to distribute Omit across a union
type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;

export type InquiryInput = DistributiveOmit<Inquiry, 'id' | 'submittedAt'>;

export const addInquiry = async (data: InquiryInput) => {
    const inquiryData = {
        ...data,
        submittedAt: Timestamp.now()
    };
    return await addDoc(collection(db, COLLECTION_NAME), inquiryData);
};

export const getInquiries = async () => {
    const q = query(collection(db, COLLECTION_NAME), orderBy('submittedAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Inquiry));
};

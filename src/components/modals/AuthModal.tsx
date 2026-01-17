import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User as UserIcon, Loader2, AlertCircle } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: 'login' | 'signup';
}

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) => {
    const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();

    // Reset state when modal opens/closes or mode changes
    const resetForm = () => {
        setEmail('');
        setPassword('');
        setName('');
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (mode === 'signup') {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Update profile with name
                await updateProfile(user, {
                    displayName: name
                });

                // Create user document in Firestore
                await setDoc(doc(db, 'users', user.uid), {
                    uid: user.uid,
                    email: user.email,
                    displayName: name,
                    role: 'customer',
                    createdAt: new Date().toISOString()
                });
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            onClose();
            resetForm();
        } catch (err: any) {
            console.error("Auth error:", err);
            if (err.code === 'auth/email-already-in-use') {
                setError('Email is already in use.');
            } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
                setError('Invalid email or password.');
            } else if (err.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters.');
            } else {
                setError('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {
        setMode(mode === 'login' ? 'signup' : 'login');
        setError('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] flex items-center justify-center p-4"
                    >
                        {/* Modal */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#2b1e1a] w-full max-w-md rounded-2xl border border-gold-400/20 shadow-2xl overflow-hidden relative"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-cream-200/50 hover:text-gold-400 transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <div className="p-8">
                                {/* Header */}
                                <div className="text-center mb-8">
                                    <h2 className="text-3xl font-serif text-cream-100 mb-2">
                                        {mode === 'login' ? 'Welcome Back' : 'Join Rabuste'}
                                    </h2>
                                    <p className="text-cream-200/60 text-sm">
                                        {mode === 'login'
                                            ? 'Sign in to access your account'
                                            : 'Create an account to get started'}
                                    </p>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-200 text-sm">
                                        <AlertCircle size={16} />
                                        <span>{error}</span>
                                    </div>
                                )}

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">

                                    {mode === 'signup' && (
                                        <div className="space-y-1">
                                            <div className="relative">
                                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-200/40" size={18} />
                                                <input
                                                    type="text"
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    placeholder="Full Name"
                                                    className="w-full bg-black/20 border border-gold-400/10 rounded-lg py-3 pl-10 pr-4 text-cream-100 placeholder:text-cream-200/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-1">
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-200/40" size={18} />
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Email Address"
                                                className="w-full bg-black/20 border border-gold-400/10 rounded-lg py-3 pl-10 pr-4 text-cream-100 placeholder:text-cream-200/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-200/40" size={18} />
                                            <input
                                                type="password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Password"
                                                minLength={6}
                                                className="w-full bg-black/20 border border-gold-400/10 rounded-lg py-3 pl-10 pr-4 text-cream-100 placeholder:text-cream-200/30 focus:outline-none focus:border-gold-400/50 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3 bg-gold-600 hover:bg-gold-500 text-[#2b1e1a] font-bold rounded-lg transition-colors mt-6 flex items-center justify-center gap-2"
                                    >
                                        {loading ? <Loader2 size={20} className="animate-spin" /> : (mode === 'login' ? 'Sign In' : 'Create Account')}
                                    </button>
                                </form>

                                {/* Footer Switch */}
                                <div className="mt-6 text-center text-sm text-cream-200/60">
                                    <p>
                                        {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                                        <button
                                            onClick={switchMode}
                                            className="text-gold-400 hover:text-gold-300 font-medium transition-colors"
                                        >
                                            {mode === 'login' ? 'Sign Up' : 'Log In'}
                                        </button>
                                    </p>
                                </div>

                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

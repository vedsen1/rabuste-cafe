import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin');
    }
  }, [user, isAdmin, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // We don't manually navigate here anymore.
      // The useEffect above will handle redirection once the AuthContext updates.
    } catch (err: any) {
      // Show generic error message for security
      setError('Invalid email or password. Please try again.');
      // Log detailed error in development only
      if (import.meta.env.DEV) {
        console.error(err);
      }
      setLoading(false);
    }
    // Note: We don't set loading(false) in success case to prevent UI flicker before redirect
  };

  return (
    <div className="min-h-screen bg-brown-800 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-brown-900 p-8 rounded-2xl border border-gold-500/20 shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-serif text-gold-400 mb-6 text-center">Admin Access</h2>
        
        {error && (
          <div className="bg-red-900/30 text-red-200 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-cream-200 text-sm font-bold mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gold-500/50" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-brown-800 border border-gold-500/30 rounded pl-10 p-3 text-cream-100 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all"
                placeholder="admin@rabustecafe.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-cream-200 text-sm font-bold mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gold-500/50" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-brown-800 border border-gold-500/30 rounded pl-10 p-3 text-cream-100 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gold-500 text-brown-900 font-bold py-3 rounded hover:bg-cream-100 transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

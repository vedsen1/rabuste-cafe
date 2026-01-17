import { motion } from 'framer-motion';
import { useState } from 'react';
import { registerForWorkshop } from '../services/workshopService';
import type { Workshop } from '../services/workshopService';

interface Props {
  workshop: Workshop;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function WorkshopRegistrationModal({ workshop, onClose, onSuccess }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async () => {
    if (!name || !email || !phone) {
      alert("Please fill in all fields.");
      return;
    }

    setStatus('submitting');

    try {
      if (!workshop.id) throw new Error("Invalid workshop ID");
      await registerForWorkshop(workshop.id, { name, email, phone });

      setStatus('success');
      setTimeout(() => {
        alert("Registration successful! Check your email for confirmation.");
        onSuccess?.();
        onClose();
      }, 500);

    } catch (error: any) {
      console.error('Registration error:', error);
      setStatus('error');
      // If server returns error, show it (e.g., Sold Out)
      alert(`Registration failed: ${error.message}`);
    } finally {
      if (status !== 'success') setStatus('idle');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg rounded-3xl p-10 relative shadow-[0_30px_90px_rgba(0,0,0,0.85)] bg-gradient-to-br from-[#200817] via-[#2B0E21] to-[#3D132B] border border-white/5"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-cream-100/40 hover:text-cream-100 text-xl transition-colors duration-300"
        >
          ✕
        </button>

        <p className="text-[0.7rem] tracking-[0.3em] uppercase text-cream-100/60 mb-2">
          Workshop Registration
        </p>
        <h2 className="text-3xl font-serif mb-1 text-cream-100 pr-8">
          {workshop.title}
        </h2>
        <p className="text-cream-100/60 mb-8 text-sm">
          {workshop.schedule}
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-cream-100/70 text-xs mb-1 uppercase tracking-[0.18em]">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b-2 border-cream-100/25 focus:outline-none focus:border-cream-100/80 text-cream-100 placeholder:text-cream-100/30 py-2"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label className="block text-cream-100/70 text-xs mb-1 uppercase tracking-[0.18em]">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b-2 border-cream-100/25 focus:outline-none focus:border-cream-100/80 text-cream-100 placeholder:text-cream-100/30 py-2"
              placeholder="jane@example.com"
            />
          </div>

          <div>
            <label className="block text-cream-100/70 text-xs mb-1 uppercase tracking-[0.18em]">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-transparent border-b-2 border-cream-100/25 focus:outline-none focus:border-cream-100/80 text-cream-100 placeholder:text-cream-100/30 py-2"
              placeholder="+91 98765 43210"
            />
          </div>

          <motion.button
            onClick={handleSubmit}
            className={`w-full rounded-full bg-gradient-to-r from-[#C48A5A] via-[#E28A3F] to-[#C45A2A] text-[#2D1B14] py-4 uppercase tracking-[0.2em] text-xs font-semibold hover:brightness-105 transition-all duration-400 ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
            whileHover={status === 'submitting' ? {} : { scale: 1.01 }}
            whileTap={status === 'submitting' ? {} : { scale: 0.99 }}
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Processing...' : 'Secure Your Spot'}
          </motion.button>
        </div>

        <p className="text-cream-100/50 text-[0.7rem] text-center mt-6">
          Limited seats, slow evenings. We&apos;ll confirm your spot over email.
        </p>
      </motion.div>
    </div>
  );
}




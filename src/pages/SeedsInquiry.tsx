import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Send } from 'lucide-react';
import { addInquiry } from '../services/franchiseService';

export default function SeedsInquiry() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    quantity: '',
    seedType: 'premium',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save to Firestore
      await addInquiry({
        type: 'seeds',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        seedType: formData.seedType,
        quantity: formData.quantity,
        message: formData.message
      });

      setSubmitted(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brown-900 to-brown-800 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {!submitted ? (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl md:text-6xl font-serif text-cream-100 mb-4">
                Grow Your Own Robusta
              </h1>
              <p className="text-cream-200/80 text-lg max-w-2xl mx-auto">
                Premium Robusta seeds sourced from the finest coffee regions. Fill out the form below
                and our team will contact you with pricing, availability, and growing guidance.
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-brown-800 rounded-2xl p-8 md:p-12 border border-gold-500/20 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-cream-200 font-serif text-lg mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-brown-700 border border-gold-500/30 rounded-lg px-4 py-3 text-cream-100 focus:border-gold-400 focus:outline-none transition"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-cream-200 font-serif text-lg mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-brown-700 border border-gold-500/30 rounded-lg px-4 py-3 text-cream-100 focus:border-gold-400 focus:outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-cream-200 font-serif text-lg mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-brown-700 border border-gold-500/30 rounded-lg px-4 py-3 text-cream-100 focus:border-gold-400 focus:outline-none transition"
                    placeholder="+91 98765 43210"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-cream-200 font-serif text-lg mb-2">Quantity Needed</label>
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="w-full bg-brown-700 border border-gold-500/30 rounded-lg px-4 py-3 text-cream-100 focus:border-gold-400 focus:outline-none transition"
                    placeholder="e.g., 500 seeds"
                  />
                </div>
              </div>

              {/* Seed Type */}
              <div>
                <label className="block text-cream-200 font-serif text-lg mb-2">Seed Type</label>
                <select
                  name="seedType"
                  value={formData.seedType}
                  onChange={handleChange}
                  className="w-full bg-brown-700 border border-gold-500/30 rounded-lg px-4 py-3 text-cream-100 focus:border-gold-400 focus:outline-none transition"
                >
                  <option value="premium">Premium Robusta Seeds</option>
                  <option value="organic">Organic Robusta Variety</option>
                  <option value="blend">Robusta Conilion Blend</option>
                  <option value="mixed">Mixed Variety Pack</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-cream-200 font-serif text-lg mb-2">Message (Optional)</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full bg-brown-700 border border-gold-500/30 rounded-lg px-4 py-3 text-cream-100 focus:border-gold-400 focus:outline-none transition resize-none"
                  placeholder="Tell us about your growing experience, location, or any special requirements..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 disabled:from-gray-500 disabled:to-gray-600 text-brown-900 font-serif text-lg py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
              >
                <Send size={20} />
                {loading ? 'Sending...' : 'Send Inquiry'}
              </motion.button>

              <p className="text-center text-cream-200/60 text-sm">
                Our team will review your inquiry and contact you within 24 hours
              </p>
            </motion.form>
          </>
        ) : (
          /* Success Message */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-green-900/30 border border-green-500/50 rounded-2xl p-12"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.6 }}
              className="text-6xl mb-6"
            >
              ✓
            </motion.div>
            <h2 className="text-4xl font-serif text-cream-100 mb-4">Thank You!</h2>
            <p className="text-cream-200 text-lg mb-6">
              Your inquiry has been submitted successfully. Our team will contact you shortly
              with pricing and availability details.
            </p>
            <p className="text-cream-200/60 text-sm">
              Redirecting you to home page...
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

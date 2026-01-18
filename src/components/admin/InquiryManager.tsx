import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader, MessageSquare, Star, Mail, Phone, Calendar } from 'lucide-react';
import { getInquiries, Inquiry } from '../../services/franchiseService';

export const InquiryManager = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'feedback' | 'contact'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const data = await getInquiries();
      setInquiries(data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredInquiries = inquiries.filter(item => {
    const matchesFilter = filter === 'all' || item.type === filter;
    const searchString = searchTerm.toLowerCase();
    const matchesSearch =
      item.name.toLowerCase().includes(searchString) ||
      item.email.toLowerCase().includes(searchString) ||
      (item.type === 'contact' ? item.reason.toLowerCase().includes(searchString) : false);

    return matchesFilter && matchesSearch;
  });

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown Date';
    return new Date(timestamp.seconds * 1000).toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-serif text-cream-100">Inquiries & Feedback</h2>
          <p className="text-cream-200/60 text-sm">Manage customer messages and reviews</p>
        </div>

        <div className="flex items-center gap-4 bg-brown-900 border border-gold-500/20 rounded-lg p-1">
          {['all', 'feedback', 'contact'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-md text-sm transition-all capitalize ${
                filter === f
                  ? 'bg-gold-500 text-brown-900 font-bold'
                  : 'text-cream-200 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-200/40" size={20} />
        <input
          type="text"
          placeholder="Search by name, email, or reason..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-brown-900 border border-gold-500/20 rounded-xl pl-12 pr-4 py-3 text-cream-100 focus:border-gold-500/50 outline-none transition-colors placeholder:text-cream-200/20"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader className="animate-spin text-gold-400" size={32} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence>
            {filteredInquiries.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-cream-200/40"
              >
                No inquiries found.
              </motion.div>
            ) : (
              filteredInquiries.map((inquiry) => (
                <motion.div
                  key={inquiry.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-brown-900/50 border border-gold-500/10 rounded-xl p-6 hover:bg-brown-900 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          inquiry.type === 'feedback'
                            ? 'bg-green-900/20 text-green-400'
                            : 'bg-blue-900/20 text-blue-400'
                        }`}
                      >
                        {inquiry.type === 'feedback' ? <Star size={20} /> : <MessageSquare size={20} />}
                      </div>
                      <div>
                        <h3 className="text-xl font-serif text-gold-400">{inquiry.name}</h3>
                        <p className="text-xs text-cream-200/40 uppercase tracking-widest flex items-center gap-2">
                          <Calendar size={12} /> {formatDate(inquiry.submittedAt)}
                        </p>
                      </div>
                    </div>

                    {inquiry.type === 'feedback' && (
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={
                              i < inquiry.rating
                                ? "fill-gold-400 text-gold-400"
                                : "text-gray-600"
                            }
                          />
                        ))}
                      </div>
                    )}

                    {inquiry.type === 'contact' && (
                      <span className="px-3 py-1 bg-gold-500/10 text-gold-400 text-xs rounded-full uppercase tracking-wider border border-gold-500/20">
                        {inquiry.reason}
                      </span>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm text-cream-200/70">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-gold-500/50" />
                      {inquiry.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-gold-500/50" />
                      {inquiry.phone}
                    </div>
                  </div>

                  <div className="p-4 bg-black/20 rounded-lg border border-white/5">
                    <p className="text-cream-100 italic">
                      "{inquiry.type === 'feedback'
                        ? inquiry.review
                        : ('suggestions' in inquiry && inquiry.suggestions
                            ? inquiry.suggestions
                            : 'No additional message.')
                      }"
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

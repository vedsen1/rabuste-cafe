import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getWorkshops, Workshop } from '../services/workshopService';

export default function Workshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const data = await getWorkshops();
        setWorkshops(data);
      } catch (error) {
        console.error("Failed to load workshops", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-start">
        
        {/* Info Section */}
        <div>
           <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-serif text-brown-900 mb-8"
          >
            Workshops
          </motion.h1>
          <div className="space-y-8 text-brown-900/80 font-sans text-lg leading-relaxed">
            <p>
              Join our master baristas and artisans for immersive workshops designed to elevate your coffee knowledge and brewing skills.
            </p>
            
            {loading ? (
              <div className="text-brown-900/50">Loading workshops...</div>
            ) : workshops.length > 0 ? (
              workshops.map((workshop) => (
                <div key={workshop.id} className="bg-white/50 p-6 rounded-lg border-l-4 border-brown-900 shadow-md">
                  <h3 className="text-xl font-serif text-brown-900 mb-2">{workshop.title}</h3>
                  <p className="text-sm">{workshop.schedule}</p>
                </div>
              ))
            ) : (
              <div className="text-brown-900/50">No workshops scheduled.</div>
            )}
          </div>
        </div>

        {/* Registration Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-brown-900 p-8 md:p-12 rounded-2xl shadow-2xl border border-gold-500/20"
        >
          <h2 className="text-3xl font-serif text-cream-100 mb-8 text-center">Register Now</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-gold-400 text-sm font-bold mb-2 uppercase tracking-wider">Full Name</label>
              <input type="text" className="w-full bg-brown-800 border border-gold-500/30 rounded p-4 text-cream-100 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all" placeholder="Jane Doe" />
            </div>
            <div>
              <label className="block text-gold-400 text-sm font-bold mb-2 uppercase tracking-wider">Email Address</label>
              <input type="email" className="w-full bg-brown-800 border border-gold-500/30 rounded p-4 text-cream-100 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all" placeholder="jane@example.com" />
            </div>
             <div>
              <label className="block text-gold-400 text-sm font-bold mb-2 uppercase tracking-wider">Workshop Type</label>
              <select className="w-full bg-brown-800 border border-gold-500/30 rounded p-4 text-cream-100 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all">
                {workshops.map(ws => (
                  <option key={ws.id}>{ws.title}</option>
                ))}
                {workshops.length === 0 && <option>No workshops available</option>}
              </select>
            </div>
            <button className="w-full bg-gold-500 text-brown-900 font-bold py-4 rounded hover:bg-cream-100 transition-colors duration-300 mt-4">
              SECURE YOUR SPOT
            </button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Coffee, TrendingUp, Users, Award } from 'lucide-react';

const features = [
  { icon: Coffee, title: "Premium Sourcing", desc: "Direct access to our exclusive network of single-origin farms." },
  { icon: TrendingUp, title: "Proven Model", desc: "A business model refined over decade of operation." },
  { icon: Users, title: "Training Support", desc: "Comprehensive training for your staff at our HQ." },
  { icon: Award, title: "Brand Recognition", desc: "Leverage the prestige of the Rabuste name." }
];

export default function Franchise() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-brown-900 mb-6"
          >
            Franchise
          </motion.h1>
          <p className="text-xl text-brown-900/80 font-light">
            Bring the Rabuste experience to your city. Partner with us to create a sanctuary for coffee lovers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/50 p-8 rounded-xl border border-brown-900/20 hover:border-brown-900/50 transition-colors group shadow-md"
            >
              <feat.icon className="w-12 h-12 text-brown-900 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-serif text-brown-900 mb-4">{feat.title}</h3>
              <p className="text-brown-900/60 font-sans">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-[#895b60] rounded-2xl p-12 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <div className="relative z-10">
             <h2 className="text-3xl md:text-4xl font-serif text-cream-100 mb-6">Ready to Start Your Journey?</h2>
             <button className="bg-gold-500 text-brown-900 px-10 py-4 font-bold rounded-full hover:bg-white hover:scale-105 transition-all shadow-xl">
               DOWNLOAD BROCHURE
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import {
  Coffee,
  Instagram,
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Play,
  Mail,
  Phone,
  X,
  ArrowUpRight,
  ArrowUp,
  Users,
  Globe,
  Quote
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import exploreImg from "../assets/exploreimg.png";
import cafeCommunityBg from "../assets/cafe_community_bg.png";
import founderImg from "../assets/founder.png";

export default function Explore() {
  const navigate = useNavigate();
  const [showFixedBox, setShowFixedBox] = useState(true);

  return (
    <div className="w-full min-h-screen bg-[#fdfbf7]">



      {/* HERO SECTION */}
      <section className="relative py-20 px-4 overflow-hidden bg-[#fffdf5]">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#fdf5e6] rounded-l-[100px] opacity-50 pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#d4a574]/30">
              <img src={exploreImg} alt="Explore Rabuste" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#d4a574] rounded-full mix-blend-multiply opacity-20 blur-3xl"></div>
          </motion.div>

          {/* Content Side */}
          <div className="w-full md:w-1/2 space-y-8 text-[#2c1810] text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[#1a120b]">Franchise with us</h2>

              <div className="space-y-4 text-l leading-relaxed text-[#3e272] text-center">
                <p>
                  Looking to invest in a café business that’s rewarding, creative, and full of character?
                  You’re in the right place.                </p>
                <p>
                  Rabuste Café, based in Surat, invites you to be part of a growing coffee culture rooted in Robusta, art, and community. As we expand, we’re excited to welcome passionate partners who want to build something meaningful and profitable.
                </p>
                <p className="font-medium text-[#1a120b]">
                  When you partner with Rabuste, you’re never alone. We support you at every stage—right from café concept and layout design to sourcing equipment, curating the menu, staff training, and setting up smooth day-to-day operations under expert guidance. Our team also provides strong marketing support before launch and well beyond it.                </p>
                <p> Together, we don’t just open cafés—we create places people return to. Places where coffee sparks conversations and every effort feels worth it.</p>
                <p>Let’s build Rabuste, together.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section >

      {/* --- JOIN OUR COMMUNITY --- */}
      < section className="relative py-24 px-6 text-cream-100 overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${cafeCommunityBg})` }
      }>
        {/* Dark Overlay for readability */}
        < div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" ></div >

        {/* Background Pattern */}
        < div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" ></div >

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-4xl font-serif mb-8 text-gold-400"
          >
            Join Our Coffee Community
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl leading-relaxed mb-12 text-white/80"
          >
            When you franchise with Rabuste, you become part of a growing coffee community built on culture, creativity, and connection. Rooted in a modern coffee experience, Rabuste focuses on warm, welcoming spaces where every touchpoint feels thoughtful, social, and inviting.         </motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: ["0px 0px 0px rgba(212, 175, 55, 0)", "0px 0px 20px rgba(212, 175, 55, 0.5)", "0px 0px 0px rgba(212, 175, 55, 0)"]
            }}
            transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
            onClick={() => navigate('/franchise#inquiry')}
            className="bg-gold-400 text-[#2F1B14] px-12 py-4 rounded-full font-bold uppercase tracking-widest text-lg hover:bg-white transition-colors mb-16"
          >
            Connect
          </motion.button>

          {/* Icon Actions */}
          <div className="flex flex-wrap justify-center gap-12 md:gap-20">
            {/* 4th Icon (Now 3rd): Back to Franchise */}
            <div
              className="flex flex-col items-center gap-4 group cursor-pointer"
              onClick={() => navigate('/franchise')}
            >
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-gold-400 group-hover:bg-gold-400/10 transition-all">
                <ArrowLeft className="w-8 h-8 text-gold-400" />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-white/30 group-hover:text-gold-400 transition-colors">Back</p>
            </div>

            {/* 1st Icon: Home Redirection */}
            <div className="flex flex-col items-center gap-4 group cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-gold-400 group-hover:bg-gold-400/10 transition-all">
                <Users className="w-8 h-8 text-gold-400" />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-white/30 group-hover:text-gold-400 transition-colors">Home</p>
            </div>

            {/* 2nd Icon: Website Link */}
            <a
              href="https://rabuste.cafe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 group cursor-pointer"
              title="https://rabuste.cafe"
            >
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:border-gold-400 group-hover:bg-gold-400/10 transition-all">
                <Globe className="w-8 h-8 text-gold-400" />
              </div>
              <p className="text-[10px] uppercase tracking-widest text-white/30 group-hover:text-gold-400 transition-colors">Rabuste</p>
            </a>

          </div>
        </div>
      </section >

      {/* --- FRANCHISE TESTIMONIALS --- */}
      <section className="py-24 px-6 bg-[#fdfbf7]">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif text-center mb-16 text-[#1a120b] uppercase tracking-wide"
          >
            Founder's Vision
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-[#e8d5b7] relative overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4a574]/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

            <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-2xl overflow-hidden border-4 border-[#d4a574]/30 shadow-xl"
              >
                <img
                  src={founderImg}
                  alt="Founder"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>

              <div className="flex-1 text-center md:text-left">
                <Quote className="w-10 h-10 text-gold-400 mb-6 opacity-30 mx-auto md:mx-0" />
                <p className="text-xl md:text-2xl text-[#3e2723] italic leading-relaxed mb-8 font-serif">
                  "Rabuste is more than just a café; it's a dream of connecting people over the finest Robusta. Our journey is built on passion, quality, and the community that walks through our doors every day."
                </p>
                <div>
                  <h4 className="text-2xl font-bold text-[#1a120b] uppercase tracking-tight">Vaibhav Sutaria</h4>
                  <p className="text-sm text-gold-500 uppercase tracking-[0.2em] font-bold">Founder, Rabuste Café</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FIXED ENQUIRE BOX --- */}
      <AnimatePresence>
        {
          showFixedBox && (
            <>
              {/* Desktop Version */}
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="fixed bottom-6 left-6 z-40 max-w-sm w-[90vw] md:w-auto bg-[#1a120b] p-6 pt-8 rounded-xl shadow-2xl border-l-4 border-gold-400 hidden md:block"
              >
                <button
                  onClick={() => setShowFixedBox(false)}
                  className="absolute top-2 right-2 text-white/30 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="text-gold-400 font-serif text-lg mb-2 leading-tight">
                  "Become a part of the fastest growing cafe chain of India"
                </h3>
                <button
                  onClick={() => navigate('/franchise#inquiry')}
                  className="mt-3 text-xs w-full bg-white/10 hover:bg-gold-400 hover:text-[#3b2a2a] text-white py-3 rounded-lg uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 group"
                >
                  Connect
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </motion.div>

              {/* Mobile Version */}
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                className="fixed bottom-0 left-0 right-0 z-40 bg-[#1a120b] p-4 md:hidden flex justify-between items-center border-t-2 border-gold-400"
              >
                <span className="text-white text-xs font-bold uppercase tracking-wide">Join the Family</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => navigate('/franchise#inquiry')}
                    className="bg-gold-400 text-[#3b2a2a] px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
                  >
                    Connect
                  </button>
                  <button
                    onClick={() => setShowFixedBox(false)}
                    className="text-white/30 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            </>
          )
        }
      </AnimatePresence >

    </div >
  );
}

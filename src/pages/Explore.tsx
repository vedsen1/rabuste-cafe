import { motion } from "framer-motion";
import { Coffee, ArrowLeft, Heart, MessageCircle, Share2, Play, Mail, Phone } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowUpRight,
  Users,
  Award,

  Globe,
  Quote
} from "lucide-react";

import franchiseImg from "../assets/rabuste_franchise.png";
import seedsBg from "../assets/seeds-bg.png"

export default function Explore() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-[#fdfbf7]">
      {/* HEADER */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-md bg-[#1a120b]/95 border-b border-[#d4a574]/20 shadow-lg"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-[#d4a574] hover:text-[#c89a5c] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back to Home</span>
            </button>

            <div className="flex items-center gap-3">
              <Coffee className="w-8 h-8 text-[#d4a574]" />
              <h1 className="text-2xl font-serif text-white">Rabuste Franchise</h1>
            </div>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#d4a574] hover:text-[#c89a5c] transition-colors"
            >
              <FaInstagram className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Follow Us</span>
            </a>
          </div>
        </div>
      </motion.header>

      {/* HERO SECTION */}
      <section
        className="relative py-20 px-4 overflow-hidden bg-[#fffdf5]"
      >
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
              <img src={franchiseImg} alt="Rabuste Franchise" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
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

              <div className="space-y-6 text-lg leading-relaxed text-[#3e2723] text-center">
                <p>
                  If you are looking for a rewarding investment and want to start your own business? You are at the right place! Become a part of the Barista Brewing Family. We are expanding rapidly and we would be delighted for you to join us in this journey. As a Barista franchise, all the processes become much easier.
                </p>
                <p>
                  We assist our franchise partners at all stages of starting the business and provide complete support in Cafe design and layout, Support/vendor negotiations in the sourcing of equipment; Food and Menu development; Training of staff, and establishing operations under the guidance of our seasoned manager; Marketing support around launch and post-launch of café and much more.
                </p>
                <p className="font-medium text-[#1a120b]">
                  Join us in the journey of brewing experiences, and freshness accompanied by its perfect companions to enjoy along with captive audiences all across. Your efforts will be rewarded. Don't miss out on this amazing opportunity because we make your Investments more rewarding.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- JOIN OUR COMMUNITY --- */}
      <section className="bg-[#2F1B14] py-24 px-6 text-cream-100 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-400/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif mb-8 text-gold-400"
          >
            Join Our Coffee Community
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl leading-relaxed mb-12 text-white/80"
          >
            When you decide to franchise with us, you choose to become a part of a growing coffee community across the globe. Barista coffee Company is the Pioneer of coffee culture in India and its long-established identity of offering a truly International coffee experience in a warm, sociable, friendly and peaceful environment. Barista thrives to provide a welcoming experience to its guests at all the touch points across various formats.
          </motion.p>

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
            Get in Touch
          </motion.button>

          {/* Icon Placeholders */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[Users, Globe, Coffee, Award].map((Icon, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 hover:border-gold-400/50 transition-colors">
                  <Icon className="w-8 h-8 text-gold-400" />
                </div>
                <div className="w-16 h-2 bg-white/10 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FRANCHISE TESTIMONIALS --- */}
      <section className="py-24 px-6 bg-[#fdfbf7]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif text-center mb-16 text-[#1a120b] uppercase tracking-wide">
            Franchise Testimonials
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-xl border border-[#e8d5b7]">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-gold-400 overflow-hidden">
                    {/* Placeholder for Owner Image */}
                    <img src={`https://placehold.co/100x100?text=Owner+${i}`} alt="Owner" className="w-full h-full object-cover" />
                  </div>
                </div>
                <Quote className="w-8 h-8 text-gold-400 mx-auto mb-4 opacity-50" />
                <p className="text-center text-[#3e2723] italic mb-6">
                  "Joining the Rabuste family was the best decision for my business career. The support has been phenomenal."
                </p>
                <div className="text-center">
                  <h4 className="font-bold text-[#1a120b] uppercase">Franchise Owner</h4>
                  <p className="text-xs text-gold-500 uppercase tracking-widest">Location Name</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FIXED ENQUIRE BOX --- */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed bottom-6 left-6 z-40 max-w-sm w-[90vw] md:w-auto bg-[#1a120b] p-6 rounded-xl shadow-2xl border-l-4 border-gold-400 hidden md:block"
      >
        <h3 className="text-gold-400 font-serif text-lg mb-2 leading-tight">
          "Become a part of the fastest growing cafe chain of India"
        </h3>
        <button
          onClick={() => navigate('/franchise#inquiry')}
          className="mt-3 text-xs w-full bg-white/10 hover:bg-gold-400 hover:text-[#3b2a2a] text-white py-3 rounded-lg uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 group"
        >
          Get in Touch
          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </motion.div>

      {/* Mobile Version of Fixed Box (Simpler) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1a120b] p-4 md:hidden flex justify-between items-center border-t-2 border-gold-400">
        <span className="text-white text-xs font-bold uppercase tracking-wide">Join the Family</span>
        <button
          onClick={() => navigate('/franchise#inquiry')}
          className="bg-gold-400 text-[#3b2a2a] px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
        >
          Get in Touch
        </button>
      </div>

    </div>
  );
}

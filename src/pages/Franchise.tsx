import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle,
  Star,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  NotebookPen,
  Compass
} from "lucide-react";

import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

import coverimg from "../assets/coverimg.png";
import seedsBg from "../assets/seeds-bg.png";
import beans1 from "../assets/beans1.png";
import symbol from "../assets/symbol.png"
import Products2 from "../assets/Products2.jpeg";
import beansack from "../assets/beansack.jpg"



export default function Franchise() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  // --- STATES ---
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactReason, setContactReason] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [showContactSuccessModal, setShowContactSuccessModal] = useState(false);
  const [contactErrors, setContactErrors] = useState<{ [key: string]: string }>({});

  // --- VALIDATION & HANDLERS ---
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (/\d/.test(name)) newErrors.name = "Name cannot contain numbers";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Valid email required";
    if (!phone || phone.length !== 10) newErrors.phone = "Valid 10-digit phone required";
    if (/[a-zA-Z]/.test(phone)) newErrors.phone = "Phone cannot contain letters";
    if (!review.trim()) newErrors.review = "Experience is required";
    if (review.split(" ").length > 500) newErrors.review = "Max 500 words";
    if (rating === 0) newErrors.rating = "Rating is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateContactForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!contactName.trim()) newErrors.name = "Name is required";
    if (/\d/.test(contactName)) newErrors.name = "Name cannot contain numbers";
    if (!contactEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) newErrors.email = "Valid email required";
    if (!contactPhone || contactPhone.length !== 10) newErrors.phone = "Valid 10-digit phone required";
    if (/[a-zA-Z]/.test(contactPhone)) newErrors.phone = "Phone cannot contain letters";
    if (!contactReason) newErrors.reason = "Reason is required";
    if (suggestions.split(" ").length > 500) newErrors.suggestions = "Max 500 words";
    setContactErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccessModal(true);
    setName(""); setEmail(""); setPhone(""); setReview(""); setRating(0);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContactForm()) return;
    setIsContactSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsContactSubmitting(false);
    setShowContactSuccessModal(true);
    setContactName(""); setContactEmail(""); setContactPhone(""); setContactReason(""); setSuggestions("");
  };

  return (
    <div ref={containerRef} className="w-full relative bg-[#f4f1ea] overflow-x-hidden">

      {/* --- HERO SECTION --- */}
      <motion.section
        style={{ y: heroY }}
        className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden z-0"
      >
        {/* Placeholder for Background Image */}
        <div className="absolute inset-0  bg-gray-900 bg-cover bg-[center_70%] " style={{ backgroundImage: `url(${beansack})` }}>
          <div className="absolute inset-0 bg-black/50" />
        </div>


        <div className="relative z-10 text-center flex flex-col items-center p-6">


          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-3xl md:text-8xl font-serif text-white mb-4 tracking-wider"
          >
            RABUSTE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-gold-400 text-lg md:text-2xl uppercase tracking-[0.3em] font-medium"
          >
            Where Coffee Meets Community
          </motion.p>
        </div>
      </motion.section>

      {/* --- SECOND SECTION (PARALLEL FORMS) --- */}
      <motion.section
        className="relative z-10 w-full min-h-screen flex flex-col md:flex-row bg-[#e8d5b7]/20"
      >
        {/* LEFT FORM (SHARE EXPERIENCE - Review) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 min-h-[800px] bg-[#895b60] p-8 md:p-16 text-[#f5efe6] flex flex-col justify-center relative border-r border-white/5"
        >
          <div className="relative z-10 max-w-lg mx-auto w-full">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center mb-4">
                <NotebookPen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif">Share Experience</h2>
              <p className="text-white/80 text-sm mt-2 uppercase tracking-widest">Help us serve better</p>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-6">

              {/* Boxed Inputs Style */}
              <div className="grid grid-cols-1 gap-6">
                <div className="relative group">
                  <input
                    value={name} onChange={e => setName(e.target.value)}
                    className="w-full bg-[#5d3a3d] border-2 border-transparent focus:border-gold-400 rounded-lg py-4 px-4 outline-none placeholder:text-white/30 transition-all font-medium"
                    placeholder="Your Name"
                  />
                  {errors.name && <p className="text-[#fca5a5] text-xs absolute -bottom-5 left-1">{errors.name}</p>}
                </div>

                <div className="relative group">
                  <input
                    value={phone} onChange={e => setPhone(e.target.value)} maxLength={10}
                    className="w-full bg-[#5d3a3d] border-2 border-transparent focus:border-gold-400 rounded-lg py-4 px-4 outline-none placeholder:text-white/30 transition-all font-medium"
                    placeholder="Phone Number"
                  />
                  {errors.phone && <p className="text-[#fca5a5] text-xs absolute -bottom-5 left-1">{errors.phone}</p>}
                </div>

                <div className="relative group">
                  <input
                    value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full bg-[#5d3a3d] border-2 border-transparent focus:border-gold-400 rounded-lg py-4 px-4 outline-none placeholder:text-white/30 transition-all font-medium"
                    placeholder="Email Address"
                  />
                  {errors.email && <p className="text-[#fca5a5] text-xs absolute -bottom-5 left-1">{errors.email}</p>}
                </div>
              </div>

              <div className="pt-4">
                <label className="text-xs uppercase font-bold tracking-widest ml-1 text-white/80 mb-2 block">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${star <= (hoveredRating || rating) ? "fill-gold-400 text-gold-400" : "text-white/30"}`}
                      />
                    </button>
                  ))}
                </div>
                {errors.rating && <p className="text-[#fca5a5] text-xs mt-1">{errors.rating}</p>}
              </div>

              <div className="relative group">
                <textarea
                  value={review} onChange={e => setReview(e.target.value)} rows={4}
                  className="w-full bg-[#5d3a3d] border-2 border-transparent focus:border-gold-400 rounded-lg py-4 px-4 outline-none placeholder:text-white/30 transition-all font-medium resize-none"
                  placeholder="Write your review here (max 500 words)..."
                />
                {errors.review && <p className="text-[#fca5a5] text-xs absolute -bottom-5 left-1">{errors.review}</p>}
              </div>

              <div className="pt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitting}
                  className="w-full bg-[#3b2a2a] text-gold-400 border-2 border-transparent active:border-gold-400 hover:border-gold-400 py-4 rounded-xl font-bold uppercase tracking-[0.15em] transition-all shadow-xl"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </motion.button>
              </div>

            </form>
          </div>
        </motion.div>

        {/* RIGHT FORM (KNOW MORE - Contact) - Virtual Tour Aesthetic */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 min-h-[800px] flex flex-col justify-center relative overflow-hidden"
        >
          {/* Background Image from Virtual Tour */}
          <img
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80"
            alt="Cafe Interior"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

          <div className="relative z-10 max-w-lg mx-auto w-full p-8 md:p-16 text-white">
            <div className="flex flex-col items-center text-center mb-10">
              <Phone className="w-12 h-12 md:w-10 md:h-10 text-white md:text-gold-400 mb-4 md:mb-6 md:animate-pulse" />

              <h2 className="text-3xl md:text-4xl font-serif mb-3 md:mb-4 leading-tight drop-shadow-lg">
                Know More
              </h2>
              <p className="text-sm md:text-l text-white/90 md:text-cream-200/90 max-w-xs md:max-w-lg">
                Connect with Rabuste
              </p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-xs uppercase font-bold tracking-widest ml-1 text-gold-400"></label>
                <input
                  value={contactName} onChange={e => setContactName(e.target.value)}
                  className="w-full bg-white/10 md:bg-black/20 border-2 border-white/30 focus:border-gold-400 text-white rounded-lg py-3 px-4 focus:outline-none transition-all placeholder:text-white/40 backdrop-blur-sm"
                  placeholder="Full Name"
                />
                {contactErrors.name && <p className="text-red-400 text-xs ml-1">{contactErrors.name}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase font-bold tracking-widest ml-1 text-gold-400"></label>
                <div className="flex">
                  <span className="py-3 px-2 text-white/50 bg-white/10 md:bg-black/20 border-2 border-white/30 border-r-0 rounded-l-lg flex items-center">+91</span>
                  <input
                    value={contactPhone} onChange={e => setContactPhone(e.target.value)} maxLength={10}
                    className="w-full bg-white/10 md:bg-black/20 border-2 border-white/30 border-l-0 focus:border-gold-400 text-white rounded-r-lg py-3 px-3 focus:outline-none transition-all placeholder:text-white/40 backdrop-blur-sm "
                    placeholder="999 999 9999"
                  />
                </div>
                {contactErrors.phone && <p className="text-red-400 text-xs ml-1">{contactErrors.phone}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase font-bold tracking-widest ml-1 text-gold-400"></label>
                <input
                  value={contactEmail} onChange={e => setContactEmail(e.target.value)}
                  className="w-full bg-white/10 md:bg-black/20 border-2 border-white/30 focus:border-gold-400 text-white rounded-lg py-3 px-3 focus:outline-none transition-all placeholder:text-white/40 backdrop-blur-sm"
                  placeholder="ABC@email.com"
                />
                {contactErrors.email && <p className="text-red-400 text-xs ml-1">{contactErrors.email}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase font-bold tracking-widest ml-1 text-gold-400"></label>
                <select
                  value={contactReason} onChange={e => setContactReason(e.target.value)}
                  className="w-full bg-white/10 md:bg-black/20 border-2 border-white/30 focus:border-gold-400 text-white rounded-lg py-3 px-4 focus:outline-none transition-all [&>option]:text-black backdrop-blur-sm"
                >
                  <option value="">Select Reason</option>
                  <option value="franchise">Franchise Inquiry</option>
                  <option value="corporate">Corporate Order</option>
                  <option value="other">General Inquiry</option>
                </select>
                {contactErrors.reason && <p className="text-red-400 text-xs ml-1">{contactErrors.reason}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase font-bold tracking-widest ml-1 text-gold-400">Suggestions / Questions</label>
                <textarea
                  value={suggestions} onChange={e => setSuggestions(e.target.value)} rows={3}
                  className="w-full bg-white/10 md:bg-black/20 border-2 border-white/30 focus:border-gold-400 text-white rounded-lg py-4 px-4 focus:outline-none transition-all resize-none placeholder:text-white/40 backdrop-blur-sm"
                  placeholder="Max 500 words..."
                />
                {contactErrors.suggestions && <p className="text-red-400 text-xs ml-1">{contactErrors.suggestions}</p>}
              </div>

              <div className="pt-6 flex flex-col gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isContactSubmitting}
                  className="
                    w-full px-6 py-4 rounded-full text-sm font-bold uppercase tracking-[0.2em]
                    border-2 border-white md:border-gold-400 text-white md:text-gold-400
                    bg-white/10 md:bg-black/20 hover:bg-white hover:text-black
                    md:hover:bg-gold-400 md:hover:text-brown-900 transition-all backdrop-blur-sm shadow-xl
                  "
                >
                  {isContactSubmitting ? "Sending..." : "Submit Inquiry"}
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/explore')}
                  className="w-full text-white/70 py- font-serif uppercase tracking-widest hover:text-gold-400 transition-all group flex items-center justify-center gap-2 text-s"
                >
                  Explore More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

            </form>
          </div>
        </motion.div>

      </motion.section>

      {/* --- FINAL SECTION (VISIT US) - Color Changed to #464646 (Old Know More color) --- */}
      <section className="relative z-10 w-full bg-[#3b2a2a] text-cream-100 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-6 text-gold-400">
              VISIT US
            </h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto opacity-60"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">

            {/* Contact Info */}
            <div className="space-y-2 bg-white/5 p-10 rounded-2xl border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-serif text-gold-400 border-b border-white/10 pb-4 mb-6">Contact Info</h3>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                  <Phone className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Phone</p>
                  <p className="text-xl font-medium">123456789</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                  <MapPin className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Address</p>
                  <p className="text-xl font-medium">Surat, Gujarat 395007</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                  <Mail className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-1">Email</p>
                  <p className="text-xl font-medium">hello@rabuste.cafe</p>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="space-y-1 bg-gold-400/5 p-10 rounded-2xl border border-gold-400/20 backdrop-blur-sm">
              <h3 className="text-2xl font-serif text-gold-400 border-b border-white/10 pb-4 mb-6">
                OPENING HOURS
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-white/80">Daily</span>
                  <span className="font-serif text-2xl text-gold-400 font-bold">9:30 AM – 11:00 PM</span>
                </div>
              </div>

              <div className="pt-8 text-center">
                <p className="italic text-white/40 font-serif">"Freshly brewed, every single day."</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {(showSuccessModal || showContactSuccessModal) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#f5efe6] w-full max-w-md p-10 rounded-3xl relative shadow-2xl border-4 border-gold-400/30"
            >
              <button
                onClick={() => { setShowSuccessModal(false); setShowContactSuccessModal(false); }}
                className="absolute top-4 right-4 text-[#3b2a2a]/50 hover:text-[#3b2a2a] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-serif text-[#3b2a2a] mb-2">
                  {showSuccessModal ? "Thank You!" : "Received!"}
                </h3>
                <p className="text-[#3b2a2a]/70 mb-8 leading-relaxed">
                  {showSuccessModal ? "Your feedback helps us brew better experiences." : "We have received your inquiry and will get back to you shortly."}
                </p>
                <button
                  onClick={() => { setShowSuccessModal(false); setShowContactSuccessModal(false); }}
                  className="bg-[#3b2a2a] text-[#f5efe6] px-10 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-gold-400 hover:text-[#3b2a2a] transition-all shadow-lg"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  FaWhatsapp
} from "react-icons/fa";

import coverimg from "../assets/coverimg.png";
import seedsBg from "../assets/seeds-bg.png";
import beans1 from "../assets/beans1.png";
import symbol from "../assets/symbol.png"
import Products2 from "../assets/Products2.jpeg";
import beansack from "../assets/beansack.jpg"



export default function Franchise() {
  const navigate = useNavigate();
  const { hash } = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  // --- STATES ---
  const [activeForm, setActiveForm] = useState<'review' | 'contact' | null>(null);

  // --- HASH SCROLL EFFECT & AUTO-EXPAND ---
  useEffect(() => {
    if (hash === '#inquiry') {
      setActiveForm('contact');
      // Scroll to the contact form section
      const element = document.getElementById('inquiry');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    }
  }, [hash]);

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
      <AnimatePresence>
        <motion.section
          layout
          className="relative z-10 w-full min-h-screen flex flex-col md:flex-row bg-[#f4f1ea]"
        >
          {/* LEFT FORM (SHARE EXPERIENCE - Review) */}
          <motion.div
            layout
            onClick={() => setActiveForm('review')}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, layout: { duration: 0.5 } }}
            className={`
             relative w-full md:w-1/2 min-h-[800px] flex flex-col justify-center p-8 md:p-20 overflow-hidden bg-[#F5E6D3]
             ${activeForm === 'review' ? 'fixed inset-0 z-50 w-full h-full md:w-full' : 'relative group cursor-pointer'} 
             ${activeForm === 'contact' ? 'hidden' : 'flex'}
           `}
          >
            {/* Close Button */}
            {activeForm === 'review' && (
              <button
                onClick={(e) => { e.stopPropagation(); setActiveForm(null); }}
                className="absolute top-6 right-6 z-50 p-2 bg-[#3b2a2a] text-[#f5efe6] rounded-full hover:bg-[#895b60] transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            )}
            {/* Coffee Beans Background Pattern */}
            <div className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
              style={{ backgroundImage: `url(${seedsBg})`, backgroundSize: '300px', backgroundRepeat: 'repeat', mixBlendMode: 'multiply' }}
            />

            <div className={`relative z-10 max-w-lg mx-auto w-full transition-all duration-500 ${activeForm === 'review' ? 'scale-100' : 'scale-95 group-hover:scale-100'}`}>
              <div className="mb-12">
                <span className="font-lato text-[#895b60] uppercase tracking-widest text-2xl font-bold pl-1 mb-2 block">Feedback</span>
                <h2 className="text-4xl md:text-5xl font-serif text-[#3b2a2a] mb-4"></h2>
                <p className="font-lato text-[#5d3a3d]/70 text-lg leading-relaxed">
                  Every cup tells a story. We'd love to hear yours.
                </p>
              </div>

              <form onSubmit={handleReviewSubmit} className="space-y-8" onClick={(e) => e.stopPropagation()}>

                {/* Minimalist Inputs */}
                <div className="space-y-6">
                  <div className="relative group">
                    <input
                      value={name} onChange={e => setName(e.target.value)}
                      className="w-full bg-transparent border-b border-[#3b2a2a]/20 py-3 text-[#3b2a2a] font-lato text-lg focus:border-[#895b60] outline-none transition-colors placeholder:text-[#3b2a2a]/30"
                      placeholder="Describe yourself (Name)"
                    />
                    {errors.name && <p className="text-[#fca5a5] text-xs absolute -bottom-5 left-0">{errors.name}</p>}
                  </div>

                  <div className="relative group">
                    <div className="flex items-center border-b border-[#3b2a2a]/20 focus-within:border-[#895b60] transition-colors">
                      <span className="text-[#3b2a2a]/40 font-lato mr-2">+91</span>
                      <input
                        value={phone} onChange={e => setPhone(e.target.value)} maxLength={10}
                        className="w-full bg-transparent py-3 text-[#3b2a2a] font-lato text-lg outline-none placeholder:text-[#3b2a2a]/30"
                        placeholder=" Phone Number"
                      />
                    </div>
                    {errors.phone && <p className="text-[#fca5a5] text-xs absolute -bottom-5 left-0">{errors.phone}</p>}
                  </div>

                  <div className="relative group">
                    <input
                      value={email} onChange={e => setEmail(e.target.value)}
                      className="w-full bg-transparent border-b border-[#3b2a2a]/20 py-3 text-[#3b2a2a] font-lato text-lg focus:border-[#895b60] outline-none transition-colors placeholder:text-[#3b2a2a]/30"
                      placeholder="Where can we reach you? (Email)"
                    />
                    {errors.email && <p className="text-[#fca5a5] text-xs absolute -bottom-5 left-0">{errors.email}</p>}
                  </div>
                </div>

                <div className="py-4">
                  <label className="text-sm font-lato text-[#3b2a2a]/60 block mb-3">How was your brew?</label>
                  <div className="flex gap-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          strokeWidth={1.5}
                          className={`w-8 h-8 ${star <= (hoveredRating || rating) ? "fill-[#D4AF37] text-[#D4AF37]" : "text-[#3b2a2a]/20"}`}
                        />
                      </button>
                    ))}
                  </div>
                  {errors.rating && <p className="text-[#fca5a5] text-xs mt-2">{errors.rating}</p>}
                </div>

                <div className="relative group">
                  <textarea
                    value={review} onChange={e => setReview(e.target.value)} rows={3}
                    className="w-full bg-[#3b2a2a]/5 rounded-xl border-none p-4 text-[#3b2a2a] font-lato text-lg focus:ring-1 focus:ring-[#895b60]/50 outline-none transition-all placeholder:text-[#3b2a2a]/30 resize-none"
                    placeholder="Share your thoughts..."
                  />
                  {errors.review && <p className="text-[#fca5a5] text-xs absolute -bottom-5 left-1">{errors.review}</p>}
                </div>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={isSubmitting}
                    className="
                    px-10 py-4 bg-[#3b2a2a] text-[#f5efe6] font-serif uppercase tracking-[0.15em] text-sm
                    hover:bg-[#895b60] transition-colors shadow-lg
                  "
                  >
                    {isSubmitting ? "Submitting..." : "Send Review"}
                  </motion.button>
                </div>

              </form>
            </div>
            {!activeForm && (
              <div className="absolute inset-0 z-20 bg-black/0 hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 hover:opacity-100 pointer-events-none md:pointer-events-auto">
                <span className="bg-[#3b2a2a] text-[#f5efe6] px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest pointer-events-auto shadow-xl">
                  Click to Expand
                </span>
              </div>
            )}
          </motion.div>

          {/* RIGHT FORM (KNOW MORE - Contact) */}
          <motion.div
            id="inquiry"
            layout
            onClick={() => setActiveForm('contact')}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, layout: { duration: 0.5 } }}
            className={`
             w-full md:w-1/2 min-h-[800px] flex flex-col justify-center relative bg-[#5d3a3d] p-4 md:p-20 text-[#f5efe6]
             ${activeForm === 'contact' ? 'fixed inset-0 z-50 w-full h-full md:w-full' : 'relative group cursor-pointer'} 
             ${activeForm === 'review' ? 'hidden' : 'flex'}
           `}
          >
            {/* Close Button */}
            {activeForm === 'contact' && (
              <button
                onClick={(e) => { e.stopPropagation(); setActiveForm(null); }}
                className="absolute top-6 right-6 z-50 p-2 bg-white text-[#5d3a3d] rounded-full hover:bg-gold-400 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            )}
            {/* Subtle Texture */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${seedsBg})`, backgroundSize: 'cover', mixBlendMode: 'overlay' }}></div>

            <div className={`relative z-10 max-w-lg mx-auto w-full transition-all duration-500 ${activeForm === 'contact' ? 'scale-100' : 'scale-95 group-hover:scale-100'}`}>
              <div className="mb-12">
                <span className="font-lato text-gold-400 uppercase tracking-widest text-sm font-bold pl-1 mb-2 block">Partnership</span>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Let's Grow Together</h2>
                <p className="font-lato text-white/60 text-lg leading-relaxed">
                  Whether it's franchising or just a hello, we're listening.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-8" onClick={(e) => e.stopPropagation()}>
                <div className="space-y-6">

                  <div className="relative">
                    <input
                      value={contactName} onChange={e => setContactName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-white font-lato text-lg focus:border-gold-400/50 focus:bg-white/10 outline-none transition-all placeholder:text-white/20"
                      placeholder="Full Name"
                    />
                    {contactErrors.name && <p className="text-red-300 text-xs absolute -bottom-5 left-1">{contactErrors.name}</p>}
                  </div>

                  <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input
                        value={contactPhone} onChange={e => setContactPhone(e.target.value)} maxLength={10}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-white font-lato text-lg focus:border-gold-400/50 focus:bg-white/10 outline-none transition-all placeholder:text-white/20"
                        placeholder="Phone Number"
                      />
                      {contactErrors.phone && <p className="text-red-300 text-xs absolute -bottom-5 left-1">{contactErrors.phone}</p>}
                    </div>

                    <div className="relative">
                      <input
                        value={contactEmail} onChange={e => setContactEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-white font-lato text-lg focus:border-gold-400/50 focus:bg-white/10 outline-none transition-all placeholder:text-white/20"
                        placeholder="Email Address"
                      />
                      {contactErrors.email && <p className="text-red-300 text-xs absolute -bottom-5 left-1">{contactErrors.email}</p>}
                    </div>
                  </div>


                  <div className="relative">
                    <select
                      value={contactReason} onChange={e => setContactReason(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-white font-lato text-lg focus:border-gold-400/50 focus:bg-white/10 outline-none transition-all [&>option]:text-black appearance-none"
                      style={{ backgroundImage: 'none' }} // Remove default arrow if needed, or customize
                    >
                      <option value="" className="text-black/50">Select Reason for Inquiry</option>
                      <option value="franchise">Franchise Opportunity</option>
                      <option value="corporate">Corporate Events</option>
                      <option value="other">Other Queries</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-white/30">
                      <Compass className="w-5 h-5" />
                    </div>
                    {contactErrors.reason && <p className="text-red-300 text-xs absolute -bottom-5 left-1">{contactErrors.reason}</p>}
                  </div>

                  <div className="relative">
                    <textarea
                      value={suggestions} onChange={e => setSuggestions(e.target.value)} rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-white font-lato text-lg focus:border-gold-400/50 focus:bg-white/10 outline-none transition-all placeholder:text-white/20 resize-none"
                      placeholder="Anything else you'd like to add?"
                    />
                    {contactErrors.suggestions && <p className="text-red-300 text-xs absolute -bottom-5 left-1">{contactErrors.suggestions}</p>}
                  </div>
                </div>


                <div className="pt-4 flex flex-col md:flex-row gap-4 items-center">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isContactSubmitting}
                    className="
                    w-full md:w-auto px-10 py-4 bg-gold-400 text-black font-serif uppercase tracking-[0.15em] text-sm font-bold
                    hover:bg-white transition-colors shadow-lg
                  "
                  >
                    {isContactSubmitting ? "Sending..." : "Submit Inquiry"}
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => navigate('/explore')}
                    className="font-lato text-gold-400 hover:text-white transition-colors text-sm underline underline-offset-4 decoration-white/20 hover:decoration-white"
                  >
                    Explore Us
                  </button>
                </div>

              </form>
            </div>
            {!activeForm && (
              <div className="absolute inset-0 z-20 bg-black/0 hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 hover:opacity-100 pointer-events-none md:pointer-events-auto">
                <span className="bg-white/10 text-white border border-white/50 backdrop-blur-md px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest pointer-events-auto shadow-xl">
                  Click to Expand
                </span>
              </div>
            )}
          </motion.div>

        </motion.section>
      </AnimatePresence>

      {/* --- FINAL SECTION (VISIT US) --- */}
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
            <div className="space-y-8">
              <h3 className="text-2xl font-serif text-gold-400 border-b border-white/10 pb-4">Contact Info</h3>

              <div className="space-y-6">
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
            </div>

            {/* Opening Hours & Map Link */}
            <div className="space-y-8">
              <h3 className="text-2xl font-serif text-gold-400 border-b border-white/10 pb-4">
                OPENING HOURS
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-white/80">Daily</span>
                  <span className="font-serif text-2xl text-gold-400 font-bold">9:30 AM – 11:00 PM</span>
                </div>
                <div className="pt-2 pb-6">
                  <p className="italic text-white/40 font-serif">"Freshly brewed, every single day."</p>
                </div>
              </div>

              {/* --- MAP LINK PLACEHOLDER --- */}
              <div className="pt-4 border-t border-white/10">
                <a
                  href="https://maps.app.goo.gl/qDFVgg6HXRgbL8bh6" // Replace with your actual Google Maps URL
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-gold-400 hover:text-white transition-colors group cursor-pointer"
                >
                  <span className="uppercase tracking-widest font-bold text-sm border-b border-gold-400/30 pb-0.5 group-hover:border-white">
                    Get Directions on Map
                  </span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* --- MODALS (Unchanged) --- */}
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

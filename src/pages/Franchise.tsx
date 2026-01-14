import React , { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  Coffee,
  Mail,
  Phone,
  X,
  CheckCircle,
  Star,
  MapPin,
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



export default function Franchise() {
  
  console.log("FRANCHISE PAGE RENDERED");
  const navigate = useNavigate();
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; review?: string; rating?: string }>({});

  const maxCharacters = 500;
  const remainingCharacters = maxCharacters - review.length;

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; review?: string; rating?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!review.trim()) {
      newErrors.review = "Please share your experience";
    } else if (review.trim().length < 10) {
      newErrors.review = "Review must be at least 10 characters";
    }

    if (rating === 0) {
      newErrors.rating = "Please select a rating";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log({ name, email, review, rating });
    
    setIsSubmitting(false);
    setShowSuccessModal(true);
    
    // Reset form
    setName("");
    setEmail("");
    setReview("");
    setRating(0);
    setErrors({});
  };

  return (
    <div className="w-full min-h-screen">
      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-gradient-to-br from-[#6d3d47] to-[#5d2d37] p-8 md:p-12 rounded-3xl max-w-md w-full relative shadow-2xl"
              style={{
                backgroundImage: `url(${seedsBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#6d3d47]/95 to-[#5d2d37]/95 rounded-3xl" />
              
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-[#d4a574] rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>

              <h3 className="text-3xl font-serif text-[#d4a574] text-center mb-4 relative z-10">
                Thank You!
              </h3>
              
              <p className="text-white/90 text-center text-lg mb-6 leading-relaxed relative z-10">
                Your review has been submitted successfully. We truly appreciate you taking the time to share your experience with us!
              </p>

              <div className="flex items-center justify-center gap-1 mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${i < rating ? "fill-[#d4a574] text-[#d4a574]" : "text-white/30"}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-gradient-to-r from-[#d4a574] to-[#c89a5c] text-[#3d2518] py-4 rounded-xl hover:from-[#c89a5c] hover:to-[#b88a4c] transition-all duration-300 font-semibold text-lg relative z-10"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FIXED HERO BACKGROUND */}
      <section
         className="relative h-screen w-full flex items-center justify-center"
         style={{
         backgroundImage: `url(${coverimg})`,
         backgroundSize: "cover",
         backgroundPosition: "center",
         }}
>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
         className="relative z-10"

        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-6"
          >
            <Coffee className="w-16 h-16 md:w-20 md:h-20 text-[#d4a574] mx-auto mb-6" />
          </motion.div>
          <h1 className="text-white text-6xl md:text-8xl font-serif tracking-wide mb-4">
            Rabuste
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-[#d4a574] text-xl md:text-2xl font-light tracking-widest"
          >
            WHERE COFFEE MEETS COMMUNITY
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* SCROLLABLE CONTENT */}
      <div className="relative z-10 mt-[100vh]">
        {/* MAIN CONTENT SECTION */}
        <section 
          className="py-16 md:py-24 px-4 md:px-8 relative overflow-hidden min-h-screen bg-[#f5ebe0]"
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-96 h-96 bg-[#8b6f47] rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#6d4c41] rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* LEFT SIDE - SHARE YOUR STORY */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="backdrop-blur-sm rounded-3xl p-10 md:p-12 shadow-2xl relative overflow-hidden"
                  style={{
                    backgroundImage: `url(${seedsBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6d3d47]/90 to-[#5d2d37]/85" />
                  
                  <div className="relative z-10">
                    <div className="text-center mb-10">
                      <div className="inline-block p-4 bg-[#d4a574]/30 rounded-full mb-6">
                        <Coffee className="w-12 h-12 text-[#d4a574]" />
                      </div>
                      <h2 className="text-4xl md:text-5xl font-serif text-[#d4a574] mb-4">
                        Share Your Story
                      </h2>
                      <div className="w-24 h-1 bg-[#d4a574] mx-auto mb-6 rounded-full" />
                      <p className="text-white/90 text-base leading-relaxed">
                        Tell us about your Rabuste experience and help us serve you better
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name Input */}
                      <div>
                        <label htmlFor="name" className="block text-white/90 mb-3 text-base font-medium">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors({ ...errors, name: undefined });
                          }}
                          className={`w-full px-6 py-4 border-2 ${errors.name ? "border-red-400" : "border-[#d4a574]/40"} rounded-xl focus:outline-none focus:ring-3 focus:ring-[#d4a574]/50 focus:border-[#d4a574] bg-white/95 text-[#3d2518] text-base placeholder:text-gray-400 transition-all shadow-md`}
                          placeholder="Enter your name"
                        />
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-300 text-sm mt-2 flex items-center gap-1"
                          >
                            <X className="w-4 h-4" />
                            {errors.name}
                          </motion.p>
                        )}
                      </div>

                      {/* Email Input */}
                      <div>
                        <label htmlFor="email" className="block text-white/90 mb-3 text-base font-medium">
                          Your Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors({ ...errors, email: undefined });
                          }}
                          className={`w-full px-6 py-4 border-2 ${errors.email ? "border-red-400" : "border-[#d4a574]/40"} rounded-xl focus:outline-none focus:ring-3 focus:ring-[#d4a574]/50 focus:border-[#d4a574] bg-white/95 text-[#3d2518] text-base placeholder:text-gray-400 transition-all shadow-md`}
                          placeholder="your.email@example.com"
                        />
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-300 text-sm mt-2 flex items-center gap-1"
                          >
                            <X className="w-4 h-4" />
                            {errors.email}
                          </motion.p>
                        )}
                      </div>

                      {/* Star Rating */}
                      <div>
                        <label className="block text-white/90 mb-3 text-base font-medium">
                          Your Rating *
                        </label>
                        <div className="flex items-center gap-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <motion.button
                              key={star}
                              type="button"
                              whileHover={{ scale: 1.15, rotate: 10 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                setRating(star);
                                if (errors.rating) setErrors({ ...errors, rating: undefined });
                              }}
                              onMouseEnter={() => setHoveredRating(star)}
                              onMouseLeave={() => setHoveredRating(0)}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`w-10 h-10 transition-all duration-200 ${
                                  star <= (hoveredRating || rating)
                                    ? "fill-[#d4a574] text-[#d4a574]"
                                    : "text-white/30 hover:text-white/50"
                                }`}
                              />
                            </motion.button>
                          ))}
                        </div>
                        {rating > 0 && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[#d4a574] text-base font-medium mt-3 inline-block"
                          >
                            {rating === 5 ? "Excellent!" : rating === 4 ? "Great!" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Poor"}
                          </motion.span>
                        )}
                        {errors.rating && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-300 text-sm mt-2 flex items-center gap-1"
                          >
                            <X className="w-4 h-4" />
                            {errors.rating}
                          </motion.p>
                        )}
                      </div>

                      {/* Review Text */}
                      <div>
                        <label htmlFor="review" className="block text-white/90 mb-3 text-base font-medium">
                          Your Experience *
                        </label>
                        <textarea
                          id="review"
                          value={review}
                          onChange={(e) => {
                            if (e.target.value.length <= maxCharacters) {
                              setReview(e.target.value);
                              if (errors.review) setErrors({ ...errors, review: undefined });
                            }
                          }}
                          rows={8}
                          className={`w-full px-6 py-4 border-2 ${errors.review ? "border-red-400" : "border-[#d4a574]/40"} rounded-xl focus:outline-none focus:ring-3 focus:ring-[#d4a574]/50 focus:border-[#d4a574] resize-none bg-white/95 text-[#3d2518] text-base leading-relaxed placeholder:text-gray-400 transition-all shadow-md`}
                          placeholder="Share your experience with us... What made your visit memorable? What's your favorite drink? How do you feel about the ambiance?"
                        />
                        <div className="flex items-center justify-between mt-3">
                          <p className="text-white/70 text-sm italic flex items-center gap-2">
                            <span className="inline-block w-2 h-2 bg-[#d4a574] rounded-full" />
                            Your feedback helps us brew better experiences
                          </p>
                          <span className={`text-sm ${remainingCharacters < 50 ? "text-red-300" : "text-white/70"}`}>
                            {remainingCharacters} left
                          </span>
                        </div>
                        {errors.review && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-300 text-sm mt-2 flex items-center gap-1"
                          >
                            <X className="w-4 h-4" />
                            {errors.review}
                          </motion.p>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-[#d4a574] to-[#c89a5c] text-[#3d2518] py-5 rounded-xl hover:from-[#c89a5c] hover:to-[#b88a4c] transition-all duration-300 font-semibold text-lg shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-6 h-6 border-3 border-[#3d2518]/30 border-t-[#3d2518] rounded-full"
                            />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-6 h-6" />
                            Submit Review
                          </>
                        )}
                      </motion.button>
                    </form>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT SIDE - VISIT US & HOURS */}
              <div className="lg:col-span-1 space-y-8">
                {/* VISIT US */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-gradient-to-br from-[#3d2d26]/95 to-[#2d1d16]/90 backdrop-blur-sm rounded-3xl p-10 md:p-12 shadow-2xl relative overflow-hidden"
                >
                  <div className="text-center mb-10">
                    <div className="inline-block p-4 bg-[#d4a574]/20 rounded-full mb-6">
                      <MapPin className="w-12 h-12 text-[#d4a574]" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-[#d4a574] mb-4 tracking-wide">
                      Visit Us
                    </h2>
                    <div className="w-24 h-1 bg-[#d4a574] mx-auto mb-6 rounded-full" />
                    <p className="text-white/80 text-base md:text-lg leading-relaxed">
                      Experience the warmth of our café
                    </p>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-6 text-white/90">
                    <motion.div whileHover={{ x: 8 }} className="flex items-start gap-4 group">
                      <MapPin className="w-6 h-6 text-[#d4a574] flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-white/60 text-sm uppercase tracking-wide mb-1">Address</p>
                        <span className="text-base md:text-lg leading-relaxed">
                          SVNIT Campus Area, Surat, Gujarat, India
                        </span>
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ x: 8 }} className="flex items-start gap-4 group">
                      <Phone className="w-6 h-6 text-[#d4a574] flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-white/60 text-sm uppercase tracking-wide mb-1">Phone</p>
                        <span className="text-base md:text-lg">+91 63647 79727</span>
                      </div>
                    </motion.div>
                    <motion.div whileHover={{ x: 8 }} className="flex items-start gap-4 group">
                      <Mail className="w-6 h-6 text-[#d4a574] flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-white/60 text-sm uppercase tracking-wide mb-1">Email</p>
                        <a
                          href="mailto:hello@rabuste.cafe"
                          className="hover:underline text-base md:text-lg hover:text-[#d4a574] transition-colors"
                        >
                          hello@rabuste.cafe
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* OPENING HOURS */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
                  style={{
                    backgroundImage: `url(${beans1})`,
                    backgroundSize: "cover",
                    backgroundPosition: "bottom",
                  }}
                >
                  {/* Light Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#e8d5c4]/95 to-[#d4c4b0]/95" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="inline-block p-3 bg-[#8b6f47]/20 rounded-full">
                        <Coffee className="w-8 h-8 text-[#8b6f47]" />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-serif text-[#3d2518]">
                          Open Daily
                        </h3>
                        <p className="text-[#6d4c41]/70 text-sm">We're here to serve you!</p>
                      </div>
                    </div>
                    
                    <div className="bg-white/50 rounded-2xl px-8 py-6 border-2 border-[#8b6f47]/30 shadow-lg">
                      <p className="text-3xl md:text-4xl font-serif text-[#3d2518] text-center">
                        10:00 AM - 11:00 PM
                      </p>
                      <p className="text-center text-[#6d4c41] mt-2">Everyday</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Decorative Divider */}
        <div className="h-2 bg-gradient-to-r from-[#d4a574] via-[#6d3d47] to-[#d4a574]" />

        {/* MORE ABOUT RABUSTE SECTION */}
        <section 
          className="py-24 md:py-32 px-6 relative overflow-hidden bg-[#f0e6d8]"
        >
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-serif text-[#3d2518] mb-6 tracking-wider">
                  MORE ABOUT RABUSTE
                </h2>
                <div className="w-32 h-1 bg-[#6d3d47] mx-auto rounded-full" />
              </div>

              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-12 md:p-16 rounded-[2.5rem] shadow-2xl relative overflow-hidden group cursor-pointer"
                  style={{
                    backgroundImage: `url(${seedsBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => navigate('/explore')}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6d3d47]/95 to-[#5d2d37]/90" />

                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#d4a574]/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#d4a574]/10 rounded-full blur-3xl" />

                  <div className="relative z-10">
                    <div className="flex items-start gap-6 mb-8">
                      <div className="p-4 bg-[#d4a574]/20 rounded-2xl">
                        <Coffee className="w-10 h-10 text-[#d4a574]" />
                      </div>
                      <div>
                        <h3 className="text-3xl md:text-4xl font-serif text-[#d4a574] mb-4">
                          Join the Rabuste Family
                        </h3>
                        <div className="w-20 h-1 bg-[#d4a574] rounded-full mb-6" />
                      </div>
                    </div>

                    <p className="leading-relaxed mb-8 text-white/95 text-lg md:text-xl">
                      Interested in bringing Rabuste to your city? We're expanding
                      and looking for passionate partners who share our love for
                      quality coffee and community building. Let's create something
                      beautiful together.
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-4 bg-gradient-to-r from-[#d4a574] to-[#c89a5c] text-[#3d2518] px-10 py-5 rounded-full hover:from-[#c89a5c] hover:to-[#b88a4c] transition-all duration-300 font-semibold text-lg shadow-2xl"
                    >
                      Explore Franchise Opportunities
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FOOTER */}
        
                

             
      </div>
    </div>
  );
}
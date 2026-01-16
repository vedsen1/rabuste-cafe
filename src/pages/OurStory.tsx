import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Compass, Clock, MapPin, Coffee } from 'lucide-react';
import { StoryScrollSection } from '../components/sections/StoryScrollSection';
import { InstagramBanner } from '../components/sections/InstagramBanner';
import { VideoModal } from '../components/modals/VideoModal';

export default function OurStory() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="min-h-screen pb-20 overflow-hidden">

      <section className="relative h-[65vh] md:h-screen flex items-center justify-center overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80"
          alt="Cafe Interior"
          className="
    absolute inset-0 w-full h-full
    object-contain md:object-cover
    opacity-100 md:opacity-100
  "
        />

        {/* Content */}
        <div className="
    relative z-10 flex flex-col items-center justify-center text-center
    px-4 md:p-6
    text-white
  ">
          <Compass className="
      w-12 h-12 md:w-20 md:h-20
      text-white md:text-gold-400
      mb-4 md:mb-6
      md:animate-pulse
    " />

          <h2 className="
      text-3xl md:text-7xl
      font-serif
      mb-3 md:mb-4
      leading-tight
      drop-shadow-lg
    ">
            Virtual Tour
          </h2>

          <p className="
      text-sm md:text-xl
      max-w-xs md:max-w-lg
      mb-6 md:mb-8
      text-white/90 md:text-cream-200/90
    ">
            Experience the ambiance of Rabuste Cafe from the comfort of your home.
          </p>

          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="
      px-6 py-3 md:px-10 md:py-4
      rounded-full
      text-xs md:text-sm
      font-bold
      uppercase tracking-[0.2em]
      border-2
      border-white md:border-gold-400
      text-white md:text-gold-400
      bg-white/10 md:bg-black/20
      hover:bg-white hover:text-black
      md:hover:bg-gold-400 md:hover:text-brown-900
      transition-all
      backdrop-blur-sm
    ">
            Explore Space
          </button>
        </div>
      </section>



      {/* Story Sections */}
      <div className="relative bg-[#fdfbf7]">

        <StoryScrollSection
          title="Although established in 2024, the dream behind Rabuste Cafe began much earlier."
          titleClassName="text-xl md:text-3xl"
          subtitle="Our Beginning"
          year="2024"
          image="https://images.unsplash.com/photo-1442512595367-27b369296b41?q=80&w=2000&auto=format&fit=crop"
          alignment="left"
          content={[
            "It started with a simple obsession: the misunderstood Robusta bean. While the world chased Arabica, we saw untapped potential in the bold, earthy resilience of Robusta.",
            "In a small garage in 2018, we roasted our first batch. It wasn't just coffee; it was a statement. Dark, chocolatey, and unapologetically strong. We knew then that we had to share this with the world."
          ]}
        />

        <StoryScrollSection
          title="The Philosophy"
          subtitle="Craft & Soul"
          image="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2000&auto=format&fit=crop"
          alignment="right"
          content={[
            "We believe coffee is more than a morning ritual—it's a pause button for life. Our brewing philosophy centers on patience. We don't rush the roast, and we don't rush the pour.",
            "Every cup served at Rabuste is a testament to the hands that picked the berries and the baristas who craft the perfect extraction. Precision, passion, and a touch of rebelliousness against the ordinary."
          ]}
        />

        <StoryScrollSection
          title="The Community"
          subtitle="Growing Together"
          year="2024"
          image="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2000&auto=format&fit=crop"
          alignment="left"
          content={[
            "From that single garage to a bustling hub of creativity and conversation, Rabuste has grown into a sanctuary for dreamers, doers, and coffee lovers.",
            "Today, we are more than a cafe. We are a gallery for local artists, a stage for musicians, and a workspace for innovators. Our story is written daily by the people who walk through our doors."
          ]}
        />

        <InstagramBanner />

      </div>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl="https://www.youtube.com/embed/iO82p2eQ1W4"
      />
    </div>
  );
}

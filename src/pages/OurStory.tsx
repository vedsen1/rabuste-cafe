import { motion, useScroll, useTransform } from 'framer-motion';
import { Compass, Clock, MapPin, Coffee } from 'lucide-react';
import { StoryScrollSection } from '../components/sections/StoryScrollSection';
import { InstagramBanner } from '../components/sections/InstagramBanner';
import ourStoryBeginning from '../assets/our-story-beginning.jpg';

export default function OurStory() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="min-h-screen overflow-hidden">
      <section className="relative h-[65vh] md:h-screen flex items-center justify-center overflow-hidden">
        {/* ... content ... */}
      </section>

      {/* Story Sections */}
      <div className="relative bg-[#E6CCB2]">

        <StoryScrollSection
          title="Although established in 2024, the dream behind Rabuste Cafe began much earlier."
          titleClassName="text-xl md:text-3xl"
          subtitle="Our Beginning"
          year="2024"
          image={ourStoryBeginning}
          alignment="left"
          content={[
            "It started with a simple obsession: the misunderstood Robusta bean. While the world chased Arabica, we saw untapped potential in the bold, earthy resilience of Robusta.",
            "We are proud to be Surat’s first café to serve premium Robusta coffee, bringing a bold, full-bodied flavor experience to the city. Every cup reflects our commitment to quality, freshness, and redefining how Surat enjoys coffee."
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
            "From its very first day, Rabuste was envisioned as more than just a café—a place where great coffee meets meaningful connections. What began as a simple idea has grown into a vibrant hub for creativity, conversations, and community, becoming a sanctuary for dreamers, doers, and coffee lovers alike.",
            "Today, we are more than a café. We are a gallery for local artists, a welcoming space for ideas to flow, and a place where stories are shared over every cup. Our journey continues to be written each day by the people who walk through our doors."
          ]}
        />

        <InstagramBanner />

      </div>




    </div>
  );
}

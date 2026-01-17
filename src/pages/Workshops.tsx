import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';


import WorkshopEditorialRow from '../workshops/WorkshopEditorialRow';
import WorkshopRow from '../workshops/WorkshopRow';
import WorkshopRegistrationModal from '../workshops/WorkshopRegistrationModal';
import PastWorkshopExpanded from '../workshops/PastWorkshopExpanded';

import { getWorkshops, type Workshop } from '../services/workshopService';

/* 🔹 Lightweight preview type for past workshops */
interface PastWorkshopPreview {
  id: string;
  title: string;
  image: string;
  reel?: string;
  reviews?: string[];
  date?: string;
}

/* ═══════════════════════════════════════════════════════════
   FINAL CTA SECTION
   ═══════════════════════════════════════════════════════════ */
function FinalCTA({ onClick }: { onClick: () => void }) {
  return (
    <section className="py-28 px-6 bg-[#895b60] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[28rem] h-[28rem] bg-white/[0.02] rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[24rem] h-[24rem] bg-white/[0.02] rounded-full blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 leading-tight">
            Come for the coffee.
            <br />
            <span className="italic opacity-90">Stay for the experience.</span>
          </h2>

          <p className="text-white/70 text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Every workshop is more than a class—it's a moment to slow down, connect with others, and rediscover the joy of creating with your hands.
          </p>

          <motion.button
            onClick={onClick}
            className="inline-flex items-center px-10 py-4 bg-[#f6f1e8] text-brown-900 rounded-full text-xs tracking-[0.2em] uppercase shadow-lg hover:shadow-xl transition-all duration-500"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Join Our Next Workshop
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO SECTION COMPONENT
   ═══════════════════════════════════════════════════════════ */
function HeroSection({
  onExploreClick,
  imageUrl,
}: {
  onExploreClick: () => void;
  imageUrl?: string;
}) {
  /* ───────── PARALLAX & SCROLL ───────── */
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], ["0%", "20%"]);

  return (
    <section className="relative w-full h-[80vh] md:h-screen overflow-hidden bg-black">

      {/* ───────── BACKGROUND IMAGE ───────── */}
      <motion.img
        style={{ y }}
        src={
          imageUrl ??
          new URL('../assets/slideshow/workshop-hero.jpg', import.meta.url).href
        }
        alt="Rabuste workshop mood"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* ───────── OVERLAY (Readability + Depth) ───────── */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* ───────── 🌿 PLANT OVERLAYS (LUSH LAYER) ───────── */}
      {/* Hanging vines – top right */}
      <img
        src="/decor/vines.png"
        alt=""
        className="pointer-events-none absolute top-0 right-0 w-[360px] md:w-[420px] opacity-40 blur-sm z-20"
      />

      {/* Monstera – bottom left */}
      <img
        src="/decor/monstera.png"
        alt=""
        className="pointer-events-none absolute bottom-[-40px] left-[-40px] w-[420px] opacity-35 blur-md z-20"
      />

      {/* Potted plants – bottom right */}
      <img
        src="/decor/pots.png"
        alt=""
        className="pointer-events-none absolute bottom-[-30px] right-[-20px] w-[260px] opacity-30 blur-sm z-20"
      />

      {/* ───────── CONTENT ───────── */}
      <div className="relative z-30 h-full max-w-7xl mx-auto flex items-end px-10 md:px-16 pb-16 md:pb-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="max-w-xl"
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            className="text-[0.65rem] tracking-[0.35em] text-[#E2D1C3]/80 uppercase mb-4"
          >
            Workshops at Rabuste
          </motion.p>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#F6F1E8] leading-snug mb-3 drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)]"
          >
            Come for the coffee.
            <br />
            <span className="italic text-[#EAD9C8]">
              Stay for the quiet making.
            </span>
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
            className="text-sm md:text-base text-[#E2D1C3]/90 max-w-md leading-relaxed mb-7 drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)]"
          >
            A single table, a warm cup, and enough space for ink, clay, and conversation.
          </motion.p>

          {/* GOLD CTA */}
          <motion.button
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            onClick={onExploreClick}
            className="inline-flex items-center px-8 py-3 rounded-full bg-[#C9A24D] text-[#2B1B16] text-xs tracking-[0.25em] uppercase shadow-[0_12px_30px_rgba(0,0,0,0.45)] hover:bg-[#D4B15E] transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Upcoming Sessions
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.65rem] tracking-[0.3em] text-[#E2D1C3]/60 z-30"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        SCROLL
      </motion.div>
    </section>
  );
}



/* ═══════════════════════════════════════════════════════════
   WHY OUR WORKSHOPS SECTION
   ═══════════════════════════════════════════════════════════ */


function WhySection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const features = [
    {
      id: 'coffee',
      number: '01',
      title: 'Community & Coffee',
      description: 'Slow down, share stories, and enjoy a thoughtfully brewed moment between brushstrokes.',
    },
    {
      id: 'learning',
      number: '02',
      title: 'Hands-on Learning',
      description: 'From latte art to linocut prints, every session is built around a finished piece you take home.',
    },
    {
      id: 'groups',
      number: '03',
      title: 'Intimate Groups',
      description: 'Small, focused circles so you can actually talk to the instructor and the person next to you.',
    },
    {
      id: 'freedom',
      number: '04',
      title: 'Creative Freedom',
      description: 'We provide the tools and the technique, but the final expression is entirely yours to shape.',
    },
  ];

  return (
    <section className="relative py-28 px-6 bg-[#1A0F0A] overflow-hidden">
      {/* VIBRANT BACKGROUND ORBS — Ties to the plum registration form */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#581836]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#D48E55]/10 blur-[150px] rounded-full pointer-events-none" />

      {/* FLOATING PANEL */}
      <div className="relative max-w-6xl mx-auto bg-[#F6F1E8] rounded-[48px] px-8 py-20 md:px-20 md:py-24 shadow-[0_40px_100px_rgba(0,0,0,0.5)] z-10 border border-white/10">

        {/* HEADER */}
        <div className="text-center mb-16">
          {/* HIGH CONTRAST LABEL */}
          <p className="text-[0.75rem] tracking-[0.4em] uppercase text-[#D48E55] font-bold mb-4 drop-shadow-sm">
            Why Our Workshops
          </p>

          <h2 className="text-4xl md:text-6xl font-serif text-[#2B1B16] mb-6 italic">
            The Artist&apos;s Workbench
          </h2>

          <p className="text-[#2B1B16]/80 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light italic">
            A single still-life scene that holds everything we care about: coffee,
            tools, and the chairs waiting for you.
          </p>
        </div>

        {/* EDITORIAL LIST GRID */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16 max-w-5xl mx-auto">
          {features.map((feature) => {
            const isHovered = hoveredId === feature.id;

            return (
              <motion.div
                key={feature.id}
                onMouseEnter={() => setHoveredId(feature.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative group cursor-default"
              >
                {/* INTERACTIVE BACKGROUND GLOW */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className="absolute -inset-6 bg-[#D48E55]/5 rounded-[32px] blur-xl transition-opacity duration-500"
                />

                <div className="relative">
                  {/* TITLE & NUMBER HEADER */}
                  <div className="flex items-center gap-6 mb-4">
                    <span className={`
                      font-serif text-3xl transition-colors duration-500
                      ${isHovered ? 'text-[#D48E55]' : 'text-[#581836]/40'}
                    `}>
                      {feature.number}
                    </span>
                    <h3 className="text-base md:text-lg font-serif uppercase tracking-[0.25em] text-[#2B1B16]">
                      {feature.title}
                    </h3>
                  </div>

                  {/* HIGH-CONTRAST DIVIDER */}
                  <div className="relative w-full h-[1px] bg-[#2B1B16]/10 mb-6 overflow-hidden">
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: isHovered ? "0%" : "-100%" }}
                      transition={{ duration: 0.6, ease: "circOut" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D48E55] to-transparent h-full"
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <p className={`
                    transition-all duration-500 ease-out text-sm md:text-base leading-relaxed
                    ${isHovered ? 'text-[#2B1B16] translate-x-2' : 'text-[#2B1B16]/50'}
                  `}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function PastWorkshopsGrid({
  workshops,
  onSelect,
}: {
  workshops: PastWorkshopPreview[];
  onSelect: (w: PastWorkshopPreview) => void;
}) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {workshops.map((workshop, index) => {
          const review = workshop.reviews && workshop.reviews[0];
          const tiltClass =
            index % 3 === 0 ? '-rotate-1' : index % 3 === 1 ? 'rotate-1' : '-rotate-2';

          return (
            <motion.article
              key={workshop.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative cursor-pointer h-[420px] md:h-[460px]"
              onClick={() => onSelect(workshop)}
              whileHover={{ y: -6 }}
            >
              <div
                className={`absolute inset-0 rounded-[30px] bg-[#2D1B14] shadow-[0_26px_80px_rgba(0,0,0,0.75)] overflow-hidden ${tiltClass}`}
              >
                <div className="absolute inset-0">
                  <img
                    src={workshop.image}
                    alt={workshop.title}
                    className="w-full h-full object-cover opacity-90 image-sharp"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                </div>
              </div>

              <div className="relative h-full w-full flex items-center justify-center px-4">
                <div className="relative w-full max-w-md h-full">
                  <div className="absolute left-3 md:left-5 top-[10%] w-[64%] h-[62%] rounded-[26px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.55)]">
                    <div className="relative w-full h-full torn-paper-bottom">
                      <img
                        src={workshop.image}
                        alt={workshop.title}
                        className="w-full h-full object-cover image-sharp"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                    </div>
                  </div>

                  <motion.div
                    className="absolute right-1 md:right-3 bottom-4 md:bottom-6 w-[70%] max-w-sm glass-panel rounded-[26px] px-5 py-4 md:px-6 md:py-5 shadow-[0_26px_70px_rgba(0,0,0,0.75)]"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="text-[0.62rem] tracking-[0.26em] uppercase text-[#E2D1C3]/70 mb-1">
                          Past Workshop
                        </p>
                        <h3 className="font-serif text-base md:text-lg text-[#F6F1E8] leading-snug mb-1">
                          {workshop.title}
                        </h3>
                        {workshop.date && (
                          <p className="text-[0.78rem] text-[#E2D1C3]/80">
                            {workshop.date}
                          </p>
                        )}
                      </div>
                      <div className="text-[0.62rem] text-[#E2D1C3]/80 text-right min-w-[6rem]">
                        <p className="tracking-[0.22em] uppercase mb-1">
                          Journal
                        </p>
                        <p>The final masterpiece</p>
                      </div>
                    </div>

                    {review && (
                      <p className="text-[0.8rem] text-[#F6F1E8]/80 italic mb-3 line-clamp-3">
                        “{review}”
                      </p>
                    )}

                    {!review && (
                      <p className="text-[0.8rem] text-[#F6F1E8]/75 mb-3">
                        A quiet evening that ended with ink-stained hands and full hearts.
                      </p>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════
   MAIN WORKSHOPS PAGE COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function Workshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [selectedPast, setSelectedPast] = useState<PastWorkshopPreview | null>(null);
  const [compactView, setCompactView] = useState(false);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setLoading(true);
        const data = await getWorkshops();
        setWorkshops(data);
      } catch (error) {
        console.error('Failed to load workshops:', error);
        alert('Failed to load workshops: ' + error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();



  }, []);

  const refreshWorkshops = async () => {
    try {
      const data = await getWorkshops();
      setWorkshops(data);
    } catch (error) {
      console.error('Failed to refresh workshops:', error);
    }
  };

  /* ───────── Derived Data ───────── */
  const pastWorkshops = workshops.filter(
    w => String(w.status).toLowerCase() === 'past'
  );

  const upcomingWorkshops = workshops
    .filter(w => String(w.status).toLowerCase() === 'upcoming')
    .sort((a, b) => {
      // Attempt to parse "30 Nov 2025" from "30 Nov 2025 · 4:00 PM"
      const dateA = new Date(a.schedule.split(' · ')[0]);
      const dateB = new Date(b.schedule.split(' · ')[0]);
      const validA = !isNaN(dateA.getTime());
      const validB = !isNaN(dateB.getTime());
      if (validA && validB) return dateA.getTime() - dateB.getTime();
      return 0;
    });

  // Featured view shows only top 2, Compact shows all
  const displayedUpcoming = compactView ? upcomingWorkshops : upcomingWorkshops.slice(0, 2);

  const pastWorkshopPreviews: PastWorkshopPreview[] = pastWorkshops.map(w => ({
    id: w.id,
    title: w.title,
    image: w.image,
    reel: w.reel,
    reviews: w.reviews,
    date: w.schedule,
  }));

  /* ───────── Scroll Handler ───────── */
  const scrollToUpcoming = () => {
    const element = document.getElementById('upcoming-section');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Resolve hero image via Vite and log for debugging
  const heroImageUrl = new URL('../assets/slideshow/workshop-hero.jpg', import.meta.url).href;
  console.log('Workshops heroImageUrl ->', heroImageUrl);

  return (
    <div className="min-h-screen">

      {/* HERO SECTION */}
      <HeroSection onExploreClick={scrollToUpcoming} imageUrl={heroImageUrl} />

      {/* WHY OUR WORKSHOPS SECTION */}
      <WhySection />

      {/* PAST WORKSHOPS - EDITORIAL MEMORIES */}
      <section className="py-28 px-6 bg-[#f6f1e8]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-[#2b1b16] mb-4">
              Moments from Past Workshops
            </h2>
            <p className="text-[#2b1b16]/70 italic text-base md:text-lg max-w-2xl mx-auto">
              Every workshop leaves behind stories worth remembering.
            </p>
          </motion.div>

          {loading ? (
            <div className="text-center text-cream-100/50 py-20">
              Loading workshops…
            </div>
          ) : pastWorkshopPreviews.length === 0 ? (
            <p className="text-center text-cream-100/60 italic py-20">
              Past workshop moments coming soon.
            </p>
          ) : (
            <PastWorkshopsGrid
              workshops={pastWorkshopPreviews}
              onSelect={setSelectedPast}
            />
          )}
        </div>
      </section>

      {/* UPCOMING WORKSHOPS SECTION */}
      {upcomingWorkshops.length > 0 && (
        <section id="upcoming-section" className="py-24 px-6 bg-[#f6f1e8]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center mb-24"
            >
              <h2 className="text-3xl md:text-4xl font-serif text-[#2b1b16] mb-6 relative inline-block group cursor-default">
                Upcoming Workshops
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#2b1b16] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
              </h2>
              {/* <div className="w-16 h-[1px] bg-[#2b1b16]/20 mx-auto" /> REPLACED BY HOVER EFFECT */}
            </motion.div>

            <div className="flex items-center justify-center mb-8">
              <div className="inline-flex rounded-full bg-white/10 p-1">
                <button
                  onClick={() => setCompactView(false)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${!compactView ? 'bg-[#895b60] text-white' : 'text-[#2b1b16]/80'
                    }`}
                >
                  Featured
                </button>
                <button
                  onClick={() => setCompactView(true)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${compactView ? 'bg-[#895b60] text-white' : 'text-[#2b1b16]/80'
                    }`}
                >
                  Compact
                </button>
              </div>
            </div>

            {compactView ? (
              <div className="grid md:grid-cols-2 gap-8">
                {displayedUpcoming.map((workshop, index) => (
                  <WorkshopRow
                    key={workshop.id}
                    date={workshop.schedule}
                    title={workshop.title}
                    description={workshop.description || ''}
                    image={workshop.image}
                    reverse={index % 2 !== 0}
                    seatsLeft={workshop.seatsLeft}
                    onViewDetails={() => setSelectedWorkshop(workshop)}
                  />
                ))}
              </div>
            ) : (
              <div>
                {displayedUpcoming.map((workshop, index) => (
                  <WorkshopEditorialRow
                    key={workshop.id}
                    title={workshop.title}
                    schedule={workshop.schedule}
                    image={workshop.image}
                    description={workshop.description}
                    reverse={index % 2 !== 0}
                    seatsLeft={workshop.seatsLeft}
                    onRegister={() => setSelectedWorkshop(workshop)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* FINAL CTA SECTION */}
      <FinalCTA onClick={scrollToUpcoming} />

      {/* MODALS */}
      <AnimatePresence>
        {selectedPast && (
          <PastWorkshopExpanded
            title={selectedPast.title}
            image={selectedPast.image}
            reel={selectedPast.reel}
            reviews={selectedPast.reviews}
            onClose={() => setSelectedPast(null)}
          />
        )}

        {selectedWorkshop && (
          <WorkshopRegistrationModal
            workshop={selectedWorkshop}
            onClose={() => setSelectedWorkshop(null)}
            onSuccess={refreshWorkshops}
          />
        )}
      </AnimatePresence>


    </div>
  );
}

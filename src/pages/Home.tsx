import { HeroSlideshow } from '../components/sections/HeroSlideshow';
import { Hero } from '../components/sections/Hero';
import { Story } from '../components/sections/Story';

import { ExperienceReviews } from '../components/sections/ExperienceReviews';
import { WhyRobusta } from '../components/sections/WhyRobusta';
import { RobustaSeeds } from '../components/sections/RobustaSeeds';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <main className="relative z-10">
        <Navbar/>
        <HeroSlideshow />
        <Hero />
        <Story />
        <WhyRobusta />
        <RobustaSeeds />
        <ExperienceReviews />
        {/* <Footer/> */}
      </main>
    </>
  );
}

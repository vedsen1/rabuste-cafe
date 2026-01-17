import { HeroSlideshow } from '../components/sections/HeroSlideshow';
import { Hero } from '../components/sections/Hero';
import { Story } from '../components/sections/Story';

import { ExperienceReviews } from '../components/sections/ExperienceReviews';
import { WhyRobusta } from '../components/sections/WhyRobusta';
import { RobustaSeeds } from '../components/sections/RobustaSeeds';

import { Footer } from '@/components/sections/Footer';

import { FearlessCoffee } from '../components/sections/FearlessCoffee';

export default function Home() {
  return (
    <>
      <main className="relative z-10">

        <HeroSlideshow />
        <Hero />
        <Story />
        <WhyRobusta />
        <FearlessCoffee />
        <RobustaSeeds />
        <ExperienceReviews />
        {/* <Footer/> */}
      </main>
    </>
  );
}

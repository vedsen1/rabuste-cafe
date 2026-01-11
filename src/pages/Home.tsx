import { HeroSlideshow } from '../components/sections/HeroSlideshow';
import { Story } from '../components/sections/Story';

import { ExperienceReviews } from '../components/sections/ExperienceReviews';
import { WhyRobusta } from '../components/sections/WhyRobusta';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <main className="relative z-10">
        <Navbar/>
        <HeroSlideshow />
        <Story />
        <WhyRobusta />
        <ExperienceReviews />
        {/* <Footer/> */}
      </main>
    </>
  );
}

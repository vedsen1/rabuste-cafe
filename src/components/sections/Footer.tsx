import { Facebook, Instagram, Music2 } from "lucide-react";
import Logo from '../../assets/Logo.png';
import { Link } from "react-router-dom";
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};


export const Footer = () => {
  return (
    <footer className="bg-[#3b2a2a] text-[#f5efe6] w-full mt-auto">

      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-5 gap-10 justify justify-content-center">

        {/* Logo */}
        <div className="md:col-span-1 flex flex-col gap-2">
          <div className="w-45 h-45 flex items-center justify-center">
            <img
              src={Logo}
              alt="Robuste"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Address / Info */}
        <div className="flex flex-col gap-3 text-sm leading-relaxed">
          <p className="font-medium">The Robusta Coffee</p>
          <a href="#" className="underline">12302 Rd</a>
          <a href="#" className="underline">india, OH 44120</a>
          <p>(216) 291-7620</p>

          <div className="mt-4">
            <p className="font-semibold">Open Monday - Friday</p>
            <p>8am - 2pm</p>
          </div>

          <div className="flex gap-4 mt-4">
            <Instagram size={18} />
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col gap-3 text-sm">
          <Link to="/" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Home</Link>
          <Link to="/menu" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Full Menu</Link>
          <Link to="/#story" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Our Story</Link>
          <Link to="/art" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Art Gallery</Link>
          <Link to="/workshops" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Workshops</Link>
          <Link to="/franchise" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Franchise</Link>
        </div>

        {/* Description */}
        <div className="text-sm leading-relaxed opacity-90">
          <p>
            Once a neighborhood bar, now a nonprofit coffeehouse,
            The Robusta is where strong coffee fuels stronger careers
            and the strongest community. Join us in transforming
            Buckeye—one cup, one connection at a time.
          </p>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#f5efe6]/20 px-6 py-6 text-xs text-center leading-relaxed">
        ©2025. The Robusta Coffee. All Rights Reserved. Any unauthorized
        duplication of content herein will result in prosecution. The Robusta
        Coffee is a 501(c)(3) Public Charity · IN 84-2004511.
        <br />
        <span className="underline">Privacy Policy</span> |{" "}
        <span className="underline">Terms of Use</span> |{" "}
        <span className="underline">Refund Policy</span>
      </div>
    </footer>
  );
};

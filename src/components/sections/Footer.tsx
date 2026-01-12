import { Instagram } from "lucide-react";
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
            <a
              href="https://maps.app.goo.gl/2VkqhZMzNmZqVHRv7?g_st=aw"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Surat, Gujarat 395007
            </a>
          <p>123456789</p>

          <div className="mt-4">
            <p>9:30AM - 11PM</p>
          </div>

          <div className="flex gap-4 mt-4">
            <a
              href="https://www.instagram.com/rabuste.coffee?igsh=MXRnM2hhYW91Ym1lOQ=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Robusta Coffee Instagram"
            >
              <Instagram size={18} aria-hidden="false" />
            </a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col gap-3 text-sm">
          <Link to="/" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Home</Link>
          <Link to="/menu" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Full Menu</Link>
          <Link to="/our-story" onClick={scrollToTop} className="hover:text-gold-400 transition-colors">Our Story</Link>
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
        duplication of content herein will result in prosecution.
      </div>
    </footer>
  );
};

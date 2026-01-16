import { Instagram } from 'lucide-react';

export const InstagramBanner = () => {
    return (
        <section className="w-full bg-[#fdfbf7] py-16 flex items-center justify-center border-t border-[#2b1e1a]/5">
            <a
                href="https://www.instagram.com/rabuste.coffee"
                target="_blank"
                rel="noopener noreferrer"
                className="
          flex items-center gap-3
          bg-[#9d2222] text-white
          px-8 py-3
          rounded-sm
          font-medium text-sm tracking-wide uppercase
          hover:bg-[#7a1b1b] transition-colors
          shadow-md
        "
            >
                <Instagram size={20} />
                Follow on Instagram
            </a>
        </section>
    );
};

import { useState, createContext, useContext } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { ArtNavbar } from '../components/art/ArtNavbar';
import { ArtHome } from '../components/art/ArtHome';
import { ArtGallery } from '../components/art/ArtGallery';
import { ArtDetail } from '../components/art/ArtDetail';
import { ArtArtists } from '../components/art/ArtArtists';
import { ArExperience } from '../components/art/ArExperience';

type Theme = 'default' | 'yellow';

interface ArtContextType {
  navbarTheme: Theme;
  setNavbarTheme: (theme: Theme) => void;
}

export const ArtContext = createContext<ArtContextType>({
  navbarTheme: 'default',
  setNavbarTheme: () => { },
});

export const useArtContext = () => useContext(ArtContext);

export default function Art() {
  const [navbarTheme, setNavbarTheme] = useState<Theme>('default');

  return (
    <ArtContext.Provider value={{ navbarTheme, setNavbarTheme }}>
      <div className="min-h-screen bg-black/95 relative overflow-hidden">
        {/* Helper background / atmosphere if needed */}

        <ArtNavbar />

        <Routes>
          <Route element={<Outlet context={{ setNavbarTheme } satisfies { setNavbarTheme: (t: Theme) => void }} />}>
            <Route index element={<ArtHome />} />
            <Route path="gallery" element={<ArtGallery />} />
            <Route path="piece/:id" element={<ArtDetail />} />
            <Route path="artists" element={<ArtArtists />} />
            <Route path="ar" element={<ArExperience />} />
          </Route>
        </Routes>
      </div>
    </ArtContext.Provider>
  );
}

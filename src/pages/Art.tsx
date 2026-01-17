import { Routes, Route } from 'react-router-dom';
import { ArtNavbar } from '../components/art/ArtNavbar';
import { ArtHome } from '../components/art/ArtHome';
import { ArtGallery } from '../components/art/ArtGallery';
import { ArtDetail } from '../components/art/ArtDetail';
import { ArtArtists } from '../components/art/ArtArtists';
import { ArExperience } from '../components/art/ArExperience';

export default function Art() {
  return (
    <div className="min-h-screen bg-black/95 relative overflow-hidden">
      {/* Helper background / atmosphere if needed */}

      <ArtNavbar />

      <Routes>
        <Route index element={<ArtHome />} />
        <Route path="gallery" element={<ArtGallery />} />
        <Route path="piece/:id" element={<ArtDetail />} />
        <Route path="artists" element={<ArtArtists />} />
        <Route path="ar" element={<ArExperience />} />
      </Routes>
    </div>
  );
}

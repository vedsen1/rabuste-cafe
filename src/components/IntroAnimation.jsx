import { useEffect, useState } from 'react';
import './IntroAnimation.css';

export default function IntroAnimation() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = document.querySelector('video');
    if (video) {
      video.onloadeddata = () => setVideoLoaded(true);
    }
  }, []);

  return (
    <div className="intro-container">
      <video 
        autoPlay 
        muted 
        className="intro-video"
        onLoadedData={() => setVideoLoaded(true)}
      >
        <source src="/From_KlickPin_CF_Pin_di_Евгения_Кангас_su_coffee_nel_2025___Fu_1766273425602.mp4" type="video/mp4" />
      </video>
      <div className="logo-overlay">
        <img src="/Rabuste_logo_1766273484756.png" alt="Rabuste Coffee" className="intro-logo" />
      </div>
    </div>
  );
}

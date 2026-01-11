# HeroSlideshow Component - Setup & Usage Guide

## 📋 Overview

The `HeroSlideshow` component is a fullscreen, auto-playing image carousel built with React, Framer Motion, and Tailwind CSS. It appears as the first section on the homepage with smooth fade transitions, manual controls, and responsive design.

## ✨ Features

- ✅ **Fullscreen Display** – Takes up the entire viewport height
- ✅ **Auto-Play** – Automatically cycles through images every 4 seconds
- ✅ **Manual Controls** – Left/Right arrow buttons and dot indicators
- ✅ **Pause on Hover** – Stops auto-play when hovering on desktop
- ✅ **Responsive** – Works seamlessly on mobile, tablet, and desktop
- ✅ **Lazy Loading** – Images load on-demand for better performance
- ✅ **Dark Overlay** – Semi-transparent overlay for text readability
- ✅ **Accessibility** – ARIA labels, keyboard-friendly controls
- ✅ **Smooth Transitions** – Fade effect powered by Framer Motion

## 📁 Image Folder Structure

```
src/assets/slideshow/
├── slide-1.jpg
├── slide-2.jpg
├── slide-3.jpg
└── slide-4.jpg (optional - add as many as needed)
```

### Image Requirements:
- **Format:** JPG, PNG, or WebP (recommended: JPG for file size)
- **Dimensions:** 1920×1080 px (16:9 aspect ratio) - minimum
- **File Size:** Keep under 500 KB per image (compress before adding)
- **Quality:** High resolution, optimized for web

## 📝 How to Add/Update Images

### Step 1: Prepare Your Images
1. Resize images to **1920×1080 px** (or larger, maintaining 16:9 ratio)
2. Compress using tools like [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)
3. Save as JPG or WebP format

### Step 2: Add Images to Project
1. Place your images in: `src/assets/slideshow/`
2. Name them sequentially: `slide-1.jpg`, `slide-2.jpg`, `slide-3.jpg`, etc.

### Step 3: Update Component Configuration
Open `src/components/sections/HeroSlideshow.tsx` and update the `slides` array:

```tsx
const slides: SlideImage[] = [
  {
    id: 1,
    src: new URL('../../assets/slideshow/slide-1.jpg', import.meta.url).href,
    alt: 'Rabuste Cafe - Premium Coffee',
  },
  {
    id: 2,
    src: new URL('../../assets/slideshow/slide-2.jpg', import.meta.url).href,
    alt: 'Rabuste Cafe - Artisan Pastries',
  },
  {
    id: 3,
    src: new URL('../../assets/slideshow/slide-3.jpg', import.meta.url).href,
    alt: 'Rabuste Cafe - Workshop Experience',
  },
  // Add more slides here
];
```

### Step 4: Save & Test
- Images auto-update when you save changes
- Hot reload will refresh the carousel in the browser

## ⚙️ Customization

### Change Auto-Play Duration
Edit this line in `HeroSlideshow.tsx`:
```tsx
}, 4000); // Change to 3000 (3 sec), 5000 (5 sec), etc.
```

### Adjust Dark Overlay Opacity
Find this in the component:
```tsx
<div className="absolute inset-0 bg-black/30 z-10" /> 
// Change bg-black/30 to:
// bg-black/20 (lighter)
// bg-black/40 (darker)
// bg-black/50 (much darker)
```

### Customize Button Colors
Modify the arrow button styles:
```tsx
className="... bg-white/20 hover:bg-white/40 ..."
// Change to your preferred colors
```

### Modify Dot Indicator Colors
Update dot styling:
```tsx
className={`transition-all duration-300 rounded-full ${
  currentSlide === index
    ? 'bg-white w-8 ...' // Active dot color
    : 'bg-white/50 ...' // Inactive dot color
}`}
```

## 🎮 Controls

| Control | Action |
|---------|--------|
| **Left Arrow** | Go to previous slide |
| **Right Arrow** | Go to next slide |
| **Dot Indicator** | Jump to specific slide |
| **Hover (Desktop)** | Pause auto-play |
| **Manual Click** | Pause auto-play for 8 seconds, then resume |

## 🔧 Component API

### Props
Currently, `HeroSlideshow` accepts no props. To customize slide data, edit the `slides` array directly in the component.

### Future Enhancement (Optional)
If you want to make it more reusable, you could pass slides as props:

```tsx
interface HeroSlideshowProps {
  slides: SlideImage[];
  autoPlayInterval?: number;
  overlayOpacity?: string;
}

export const HeroSlideshow: React.FC<HeroSlideshowProps> = ({
  slides,
  autoPlayInterval = 4000,
  overlayOpacity = 'bg-black/30',
}) => {
  // Component logic
};
```

## 📱 Responsive Breakpoints

- **Mobile (< 768px)** – Smaller buttons, adjusted spacing
- **Tablet (768px - 1024px)** – Medium controls
- **Desktop (> 1024px)** – Full-size controls, hover effects enabled

## ⚡ Performance Optimization

- ✅ **Lazy Loading** – Only the first image loads eagerly; others load on demand
- ✅ **Image Optimization** – Framer Motion handles efficient re-renders
- ✅ **No External API Calls** – Images are local, reducing network requests
- ✅ **Efficient Animations** – Using `AnimatePresence` for smooth transitions

### Performance Tips:
1. **Compress images** before adding to the project
2. **Use WebP format** for better compression (with JPG fallback)
3. **Keep image count reasonable** (3-5 slides recommended)
4. **Monitor bundle size** if adding many high-res images

## 🐛 Troubleshooting

### Images not showing?
- Check file paths in `HeroSlideshow.tsx`
- Ensure image files exist in `src/assets/slideshow/`
- Verify file names match exactly (case-sensitive)
- Clear browser cache and refresh

### Carousel not auto-playing?
- Check if `isAutoPlay` state is `true`
- Ensure `slides.length > 1`
- Verify auto-play timer interval (default: 4000ms)

### Slow transitions?
- Reduce image file sizes
- Use JPG or WebP instead of PNG
- Enable Vite's image optimization in `vite.config.ts`

### Mobile controls not responding?
- Check touch event handling (currently uses click events for dot buttons)
- Test on actual mobile device, not just dev tools

## 📦 Used Dependencies

- `react` – Component framework
- `framer-motion` – Smooth animations (already in project)
- `lucide-react` – Arrow icons (already in project)
- `tailwindcss` – Styling (already in project)

No additional packages needed!

## 🚀 Integration with Existing Code

The `HeroSlideshow` component:
- Replaces the old `Hero` component on the homepage
- Maintains the `Navbar` above it
- Maintains the `Story`, `WhyRobusta`, and `ExperienceReviews` sections below
- Fully responsive and doesn't break existing layout

## 📖 File Locations

| File | Purpose |
|------|---------|
| `src/components/sections/HeroSlideshow.tsx` | Main carousel component |
| `src/assets/slideshow/` | Image storage directory |
| `src/pages/Home.tsx` | Homepage (updated to use HeroSlideshow) |

---

**Questions or need help?** Check the component code for additional comments and inline documentation.

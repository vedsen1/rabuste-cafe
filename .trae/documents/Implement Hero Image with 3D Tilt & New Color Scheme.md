I will implement the `HomeCover` image integration with a sophisticated 3D tilt effect and the requested color scheme.

**1. Design & Layout Updates (`Hero.tsx`)**

* **Background**: Change the Hero section background to `#e8e5cc` (Light Cream).

* **Typography**: Invert text colors from Cream → Dark Brown (`text-brown-900`) to ensure readability against the light background.

* **Layout Structure**:

  * **Desktop**: Split layout with the Image on the **Left** and Text on the **Right** (or centered/overlapping depending on the image aspect ratio).

  * **Mobile**: Stacked layout with Image top/center and Text below, fully responsive.

**2. Image Integration & Animation**

* **Asset**: Use `src/assets/HomeCover.png`.

* **Entrance Animation**: Implement the "Slide from Left" animation using `framer-motion` (`x: -100%` → `0%`) with a smooth spring transition.

* **3D Enhancement (The "Sophisticated" Touch)**:

  * **Interactive Tilt**: Create a 3D perspective effect where the image subtly tilts and follows the mouse movement.

  * **Depth**: Add a soft, dynamic shadow that moves with the tilt to enhance the floating 3D illusion.

  * **Texture**: Apply a subtle noise/grain overlay to the image to match the "Rabuste" tavern aesthetic.

**3. Implementation Steps**

1. Modify `src/components/sections/Hero.tsx`:

   * Import `HomeCover.png`.

   * Apply the `#e8e5cc` background.

   * Update text styling.

   * Add the image with the specified animations.
2. Refine `Navbar` visibility if needed (ensure it pops against the new background).


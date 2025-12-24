I will implement the requested updates by restructuring the application to support multiple pages and adding the new features.

**1. Application Restructuring & Routing**

* **Refactor** **`App.tsx`**: Move the current single-page content (Hero, Scene, SignatureBlends, OurStory, VisitUs) into a new `Home` page component.

* **Setup Routing**: Implement `react-router-dom` in `App.tsx` to handle navigation between:

  * `/` (Home)

  * `/menu` (Menu)

  * `/art` (Art Gallery)

  * `/workshops` (Workshops)

  * `/franchise` (Franchise Model)

  * `/admin` (Admin Panel)

**2. New "Experience & Reviews" Section (Home Page)**

* Create `src/components/sections/ExperienceReviews.tsx`.

* **Layout**: Two-column grid.

  * **Left**: 3 staggered image placeholders with `framer-motion` scroll animations (fade/slide/scale).

  * **Right**: Split horizontally with the specific background colors requested (`#895b60` top, `#4b2f32` bottom) and placeholder text.

* Integrate this section into the `Home` page (placed between Signature Blends and Our Story).

**3. New Pages Implementation**

* **Menu Page (`src/pages/Menu.tsx`)**:

  * Tabbed interface for categories (Beverages, Desserts, Specials).

  * Grid layout of cards with image placeholders, names, and prices.

* **Art Selling Page (`src/pages/Art.tsx`)**:

  * Gallery-style grid layout.

  * Cards displaying art pieces with image placeholders, titles, and prices.

* **Workshops Page (`src/pages/Workshops.tsx`)**:

  * Information section describing workshops.

  * Registration form (Name, Email, Workshop Type).

* **Franchise Page (`src/pages/Franchise.tsx`)**:

  * Structured cards explaining the franchise model.

* **Admin Panel (`src/pages/Admin.tsx`)**:

  * Frontend-only dashboard UI.

  * Tabs/Sections to "Manage" Menu, Art, and Workshops (visual representation/tables).

**4. Navbar Updates**

* Update `src/components/layout/Navbar.tsx` to use `Link` components.

* Add links: **Home | Menu | Art | Workshops | Franchise**.

* Add a **Profile Icon** (linking to `/admin`) on the right side.

**5. Styling & Aesthetics**

* Ensure all new pages and sections follow the "Rabuste Coffee" aesthetic (Warm, Earthy, Tavern-style).

* Use the existing Tailwind color palette (`brown`, `cream`, `gold`) alongside the specific colors requested for the reviews section.

**6. Verification**

* Verify navigation between all pages.

* Check responsiveness of the new Experience/Reviews layout.

* Ensure animations are smooth and the admin panel UI renders correctly.


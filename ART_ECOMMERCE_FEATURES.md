# Art Page E-Commerce Enhancement

## Overview
The Art page has been enhanced to support selling artwork with full e-commerce functionality including:
- Shopping cart integration
- Stock management
- Multiple viewing modes (carousel, grid, list)
- Advanced filtering and sorting
- Artwork metadata tracking

## Features Added

### 1. **Cart Integration**
- Users can add artworks to cart directly from the details modal
- Quantity selector with increment/decrement controls
- Real-time total price calculation
- Visual feedback when item is added to cart

### 2. **Stock Management**
- Each artwork has a stock quantity field
- Out-of-stock pieces display "SOLD OUT" badge in carousel view
- Out-of-stock artworks have disabled "Add to Cart" button
- Stock status displayed in list view

### 3. **Multiple Viewing Modes**

#### Showcase Mode (Carousel - Default)
- 3D coverflow effect
- Auto-rotating carousel
- Beautiful grid fallback on smaller screens
- Full-screen browsing experience

#### Grid View
- 3-column responsive grid
- Hover effects with elevated position
- Perfect for browsing multiple artworks
- Smooth animations

#### List View
- Compact tabular display
- Shows key details at a glance
- Image thumbnail
- Stock status
- Price prominently displayed

### 3. **Advanced Filtering & Sorting**

#### Sort Options:
- **Newest First** (default) - Based on creation date
- **Price: Low to High** - Budget-conscious browsing
- **Price: High to High** - Premium pieces first
- **Title A-Z** - Alphabetical organization

#### Filters:
- **Category Filter** - Filter by art category (Abstract, Contemporary, Modern, Street Art, etc.)
- **Price Range** - Filter artworks by price (future enhancement)

### 4. **Artwork Metadata**
New fields for complete artwork information:

```typescript
export interface ArtPiece {
  id?: string;
  title: string;
  artist: string;
  price: string;
  description?: string;
  imageUrl: string;
  stock?: number;              // New: Inventory management
  category?: string;           // New: Art category
  dimensions?: string;         // New: Physical dimensions (e.g., "48x36\"")
  medium?: string;             // New: Art medium (e.g., "Oil on Canvas")
  year?: string;               // New: Creation year
  imagePath?: string;
}
```

### 5. **Enhanced Details Modal**
The artwork details modal now includes:
- All metadata (year, medium, dimensions, category)
- Stock status indicator
- Quantity selector
- Real-time total price calculation
- Add to cart button with loading state
- Success feedback animation

## Modified Components

### 1. **src/pages/Art.tsx**
- Added view mode switching (carousel/grid/list)
- Added sorting and filtering logic
- Added controls bar for view/sort/filter selection
- Added ArtCard component for reusable artwork display
- Added useMemo hooks for performance optimization

### 2. **src/components/modals/ArtDetailsModal.tsx**
- Added quantity selector
- Added cart integration with useCart hook
- Added stock status checking
- Added success feedback when added to cart
- Added accessibility attributes (aria-label)

### 3. **src/services/artService.ts**
- Updated ArtPiece interface with new fields
- Added updateArtPiece function for stock/metadata updates
- Enhanced addArtPiece to handle all new fields with sanitization

### 4. **src/context/CartContext.tsx**
- Extended to support both menu items and art pieces
- Added itemType field to distinguish between products
- Added updateQuantity function for cart item quantity changes
- Improved type safety with CartableItem type

### 5. **src/components/admin/ArtManager.tsx**
- Expanded form with all new metadata fields
- Enhanced visual feedback for stock status
- Improved form layout with multiple columns
- Better field organization for data entry

## Usage

### For Admins

1. **Add Artwork:**
   - Go to Admin Dashboard → Art Manager
   - Fill in all fields (Title, Artist, Price, etc.)
   - Upload high-quality artwork image
   - Set stock quantity (default: 1)
   - Add category, medium, dimensions, year
   - Click "Add Artwork"

2. **Manage Artworks:**
   - View all artworks in grid layout
   - Delete artworks with hover trash icon
   - Stock quantity displayed on each card

### For Customers

1. **Browse Artworks:**
   - Use view toggles to switch between Showcase/Grid/List
   - Click sort dropdown to change order
   - Use category filter to narrow down
   - Hover over artworks for animations

2. **Purchase:**
   - Click on artwork to open details modal
   - View complete artwork information
   - Select quantity (if stock allows)
   - Click "Add to Cart"
   - Proceed to checkout (integrates with Razorpay)

## API Integration

### Firestore Database
- Collection: `art`
- Documents auto-indexed by title
- Images hosted on Cloudinary
- Sanitized inputs for security

### Cart System
- Uses React Context for state management
- Integrates with existing CartProvider
- Compatible with Razorpay payment gateway
- Supports both menu items and artworks

## Fallback Data
If no artworks are fetched from Firebase, the page displays sample artworks with full metadata:
- The First Roast - ₹12,000 (2 in stock)
- Midnight Brew - ₹8,500 (1 in stock)
- Steam & Dreams - ₹15,000 (3 in stock)
- Golden Pour - ₹20,000 (SOLD OUT)
- Urban Grind - ₹18,000 (2 in stock)

## Future Enhancements

1. **Advanced Filtering**
   - Price range slider
   - Multiple category selection
   - Artist filter
   - Medium filter

2. **Wishlist Feature**
   - Save artworks for later
   - Email notifications for price drops
   - Share wishlist

3. **Artwork Reviews**
   - Customer reviews and ratings
   - Verification of purchased items

4. **Inventory Management**
   - Low stock alerts
   - Automatic availability updates

5. **Artist Pages**
   - Individual artist portfolios
   - Artist biographical information
   - Artist-specific filters

## Performance Optimizations

- **useMemo** for filtered/sorted results
- **Lazy loading** for images
- **Swiper optimization** for carousel performance
- **Framer Motion** for smooth animations
- **Responsive breakpoints** for all screen sizes

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliance
- Alternative text for images

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Optimized responsive design

---

**Last Updated:** January 17, 2026

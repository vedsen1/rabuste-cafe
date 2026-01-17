# Art Page Testing Guide

## Quick Test Checklist

### 🧪 **Frontend Testing**

#### 1. **Page Load & Display**
- [ ] Art page loads without errors
- [ ] Fallback artworks display if no Firebase data
- [ ] Hero section with title and subtitle appears
- [ ] No console errors

#### 2. **Carousel/Showcase View**
- [ ] Carousel loads with 3D coverflow effect
- [ ] Auto-rotation works (changes slide every 2.5s)
- [ ] Manual navigation (previous/next buttons)
- [ ] Pagination dots work
- [ ] Scroll wheel navigation works
- [ ] Hover pauses auto-rotation
- [ ] Hover animation on cards (lift up effect)

#### 3. **Grid View**
- [ ] Click "Grid" button to switch to grid view
- [ ] 3-column responsive layout displays
- [ ] Cards show artwork with title, artist, price
- [ ] Hover effects trigger (shadow, elevation)
- [ ] Click card opens details modal

#### 4. **List View**
- [ ] Click "List" button to switch to list view
- [ ] Compact list layout displays
- [ ] Thumbnail images visible
- [ ] Stock status shows correctly
- [ ] Price displays prominently
- [ ] Category badge visible (if set)

#### 5. **Sorting**
- [ ] Sort dropdown visible in grid/list views
- [ ] "Newest First" sorts correctly
- [ ] "Price Low to High" sorts ascending
- [ ] "Price High to Low" sorts descending
- [ ] "Title A-Z" sorts alphabetically

#### 6. **Filtering**
- [ ] Category filter dropdown visible
- [ ] "All Categories" option present
- [ ] Filtering by category works
- [ ] Item count updates
- [ ] No items message shows when filtered to 0

#### 7. **Details Modal**
- [ ] Click on artwork opens modal
- [ ] Modal shows full image
- [ ] All metadata displays:
  - [ ] Title (large serif font)
  - [ ] Artist name (italic)
  - [ ] Year
  - [ ] Medium
  - [ ] Dimensions
  - [ ] Category
  - [ ] Description
  - [ ] Price
- [ ] Close button (X) works
- [ ] Click outside modal closes it
- [ ] Modal doesn't close when clicking inside

#### 8. **Stock Management**
- [ ] "SOLD OUT" badge displays for stock: 0
- [ ] "In Stock / Available" shows for stock > 0
- [ ] Add to cart button disabled for sold out
- [ ] Quantity selector visible for in-stock items

#### 9. **Quantity Selector**
- [ ] Minus button decrements quantity
- [ ] Plus button increments quantity
- [ ] Quantity can't go below 1
- [ ] Total price updates correctly
- [ ] Format: "Total: ₹X,XXX"

#### 10. **Add to Cart**
- [ ] Button changes color to gold
- [ ] Click adds item to cart
- [ ] Button changes to green with checkmark
- [ ] "ADDED TO CART" text displays
- [ ] Animation feedback (color change)
- [ ] Resets after 2 seconds
- [ ] Disabled button for out of stock
- [ ] Shows "CONTACT TO PURCHASE" if needed

#### 11. **Accessibility**
- [ ] All buttons have aria-labels
- [ ] Select dropdowns have aria-labels
- [ ] Keyboard navigation works
- [ ] Tab through controls in logical order
- [ ] Focus indicators visible

### 📱 **Responsive Testing**

Test on various screen sizes:
- [ ] Mobile (375px)
  - [ ] Single column grid
  - [ ] Stack view controls
  - [ ] Touch-friendly buttons
- [ ] Tablet (768px)
  - [ ] 2-3 columns
  - [ ] Controls visible
  - [ ] Modal responsive
- [ ] Desktop (1920px)
  - [ ] 3 columns grid
  - [ ] Carousel works smoothly
  - [ ] Full modal layout

### 🔧 **Admin Testing**

#### 1. **Add Artwork**
- [ ] Navigate to Admin → Art Manager
- [ ] Form fields visible:
  - [ ] Title input
  - [ ] Artist input
  - [ ] Price input
  - [ ] Stock input (default: 1)
  - [ ] Category input
  - [ ] Medium input
  - [ ] Dimensions input
  - [ ] Year input
  - [ ] Image upload
  - [ ] Description textarea
- [ ] Add button triggers upload
- [ ] Success: artwork appears in grid
- [ ] Error handling shows message

#### 2. **Upload Image**
- [ ] Click "Upload" button
- [ ] File picker opens
- [ ] Select valid image (.jpg, .png, .webp)
- [ ] "Selected" text appears
- [ ] Image uploads to Cloudinary
- [ ] Loading indicator shows

#### 3. **Form Validation**
- [ ] Required fields (title, artist, price, image) enforced
- [ ] Error messages display
- [ ] Can't submit with missing required fields
- [ ] Price validates as number

#### 4. **Delete Artwork**
- [ ] Hover over artwork card
- [ ] Trash icon appears
- [ ] Click trash confirms deletion
- [ ] Artwork removed from list
- [ ] Firebase record deleted

#### 5. **Display Updated Data**
- [ ] New artwork appears in public Art page
- [ ] Stock quantity shows correctly
- [ ] Category filters include new category
- [ ] All metadata visible in details modal

### 💳 **Cart Integration Testing**

#### 1. **Add Multiple Items**
- [ ] Add different artworks to cart
- [ ] Add same artwork multiple times (should increase qty)
- [ ] Cart count increases
- [ ] Total updates correctly

#### 2. **Cart Display** (if cart sidebar visible)
- [ ] Cart shows all items
- [ ] Quantities correct
- [ ] Total price correct
- [ ] Remove button works (if available)

#### 3. **Checkout Flow** (if checkout implemented)
- [ ] Checkout button appears
- [ ] Click checkout triggers payment
- [ ] Razorpay modal opens
- [ ] Payment can be tested (test mode)
- [ ] Cart clears after successful payment

### 🐛 **Error Handling**

Test error scenarios:
- [ ] No Firebase data: Shows fallback artworks
- [ ] Firebase connection lost: Shows fallback
- [ ] Image upload fails: Shows error message
- [ ] Invalid form input: Shows validation error
- [ ] Network error: Graceful error handling

### ⚡ **Performance Testing**

- [ ] Page loads quickly
- [ ] Carousel animation smooth
- [ ] Grid view scrolling smooth
- [ ] Modal opens without lag
- [ ] Filtering/sorting responsive
- [ ] No memory leaks (check DevTools)

### 🔒 **Security Testing**

- [ ] Input sanitization works
- [ ] XSS protection (no script injection)
- [ ] Firebase rules enforced
- [ ] Admin-only routes protected
- [ ] Image URLs secure (Cloudinary)

## Test Data

### Sample Artworks for Testing
```json
{
  "title": "Test Artwork",
  "artist": "Test Artist",
  "price": "₹15,000",
  "stock": 3,
  "category": "Abstract",
  "medium": "Oil on Canvas",
  "dimensions": "48x36 inches",
  "year": "2024",
  "description": "A beautiful test artwork for verification"
}
```

## Browser DevTools Checks

- [ ] No console errors
- [ ] No console warnings (except pre-existing)
- [ ] Network requests successful
- [ ] No failed image loads
- [ ] Responsive design mode shows correct layouts
- [ ] Lighthouse scores acceptable

## Automated Testing Commands

```bash
# TypeScript check (no errors expected)
npm run check

# Linting check
npm run lint

# Build test
npm run build

# Development server
npm run dev
```

## Known Limitations & Notes

1. **Cloudinary**: Images stored in Cloudinary, not Firebase Storage
2. **Razorpay Integration**: Requires API keys in .env
3. **Stock Updates**: Currently admin-only via Firebase update
4. **Categories**: Auto-populated from uploaded artworks
5. **Image Optimization**: Handled by Cloudinary

## Success Criteria ✅

All tests pass when:
- ✅ No TypeScript compilation errors
- ✅ All UI elements render correctly
- ✅ Cart adds/removes items properly
- ✅ Details modal displays complete info
- ✅ Filters/sorting work as expected
- ✅ Responsive on all screen sizes
- ✅ Firebase integrates correctly
- ✅ Admin can add/delete artworks
- ✅ No console errors in browser
- ✅ Payment flow works (if enabled)

---

**Last Updated**: January 17, 2026
**Status**: Ready for Testing ✅

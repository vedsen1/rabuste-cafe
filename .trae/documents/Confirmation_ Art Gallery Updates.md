I will redesign the Menu page and Admin panel to match your requirements.

**Implementation Plan:**

1.  **Update Data Structure (`menuService.ts`)**:
    *   Add `imageUrl` and `description` fields to the Menu Item data.

2.  **Update Admin Panel (`MenuManager.tsx`)**:
    *   Add an **Image Upload** field (connected to Cloudinary).
    *   Add a **Description** text box (for the "one line about that menu item").
    *   Ensure new items are saved with these details.

3.  **Create Shopping Cart System**:
    *   Create a `CartContext.tsx` to manage the "Add to Cart" functionality globally.
    *   Wrap your app in this provider so the cart works on the Menu page.

4.  **Redesign Menu Page (`Menu.tsx`)**:
    *   **Layout**: Vertical scrolling for main Categories (e.g., "Robusta Cold").
    *   **Sub-layouts**: Horizontal scrolling ("sidewards") for Subcategories and Menu Items.
    *   **Card Design**: Show the uploaded Image, Name, Description, Price, and an "Add to Cart" button.

5.  **Cart UI**:
    *   Add a floating "Cart" button to view added items (simple summary).

I will start by setting up the Cart Context and updating the Admin panel so you can start adding images.
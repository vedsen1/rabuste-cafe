I will update the Menu system to support the new categorization structure.

**1. Data Structure Update (`menuService.ts`)**
*   Update the `MenuItem` interface to include a `subcategory` field (optional).
*   The valid categories will be:
    *   Robusta Cold
    *   Robusta Hot
    *   Blend Cold
    *   Blend Hot
    *   Manual Brew
    *   Non Coffee
    *   Savoury
*   The valid subcategories (for applicable categories) will be:
    *   Milk
    *   Non-Milk

**2. Admin Panel Update (`MenuManager.tsx`)**
*   Update the Category dropdown with the new list.
*   Add a conditional Subcategory dropdown:
    *   It will **appear** only when one of the "Coffee" categories is selected (Robusta/Blend).
    *   It will be **hidden** for "Manual Brew", "Non Coffee", and "Savoury".
*   Update the table to display the subcategory column.

**3. Public Menu Page Update (`Menu.tsx`)**
*   Update the category navigation tabs to reflect the new list.
*   Implement a **Subcategory Filter/Toggle** on the public page:
    *   When a user clicks "Robusta Cold", they will see two subsections or a toggle for "Milk" vs "Non-Milk" items.
    *   For "Savoury" etc., it will just list items directly.

I will proceed with these changes in the order specified in the Todo list.
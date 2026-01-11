Here is the complete logic and implementation plan for the **User Cart & Order System with Firebase**:

### **1. User Login Logic (Firebase Auth)**
*   **Goal**: Users need to sign in so we know who is ordering.
*   **Implementation**:
    *   Use **Google Sign-In** (easiest for customers) or Email/Password.
    *   When they log in, we get a `uid` (User ID).

### **2. Add to Cart Logic (Firestore)**
*   **Goal**: Cart items should persist even if they close the browser.
*   **Database Structure**:
    *   Collection: `users` -> Document: `{uid}` -> Subcollection: `cart` -> Documents: `{menuItemId}`
    *   **Or simpler**: Collection: `carts` -> Document: `{uid}` -> Fields: `items: [{ menuItemId, quantity, name, price }]`
*   **Logic**:
    *   User clicks "Add to Cart".
    *   If **Guest**: Save to `localStorage`.
    *   If **Logged In**: Save to Firestore `carts/{uid}`.

### **3. Placing an Order (Checkout)**
*   **Goal**: User confirms items and sends order to kitchen/admin.
*   **Database Structure**:
    *   Collection: `orders`
    *   Document Fields:
        *   `userId`: Who ordered.
        *   `items`: Array of cart items.
        *   `totalAmount`: Final price.
        *   `status`: "pending" | "preparing" | "ready" | "completed".
        *   `createdAt`: Timestamp.
*   **Logic**:
    *   User clicks "Checkout".
    *   We create a new document in `orders` collection.
    *   We **clear** their cart (delete `carts/{uid}` or clear `localStorage`).

### **4. Admin Order Management**
*   **Goal**: Admin sees incoming orders and changes their status.
*   **Implementation**:
    *   Create a new Admin Page: **"Order Manager"**.
    *   It listens to the `orders` collection in **Realtime** (using `onSnapshot`).
    *   When a new order comes in, it pops up immediately.
    *   Admin clicks "Accept" -> Status changes to "preparing".
    *   Admin clicks "Ready" -> Status changes to "ready".

---

### **Step-by-Step Implementation Plan**

1.  **Enable Authentication**:
    *   Go to Firebase Console -> Build -> Authentication -> Sign-in method -> Enable **Google**.

2.  **Update Contexts**:
    *   Update `AuthContext.tsx` to handle Google Login.
    *   Update `CartContext.tsx` to sync with Firestore when logged in.

3.  **Create Order Service**:
    *   `placeOrder(cartItems, userId)` function.
    *   `getOrders()` function (for Admin).
    *   `updateOrderStatus(orderId, status)` function.

4.  **Create UI Pages**:
    *   **Login Modal**: For users to sign in before checkout.
    *   **Checkout Page**: Summary of cart + "Place Order" button.
    *   **Admin Order Dashboard**: Table of active orders.

**Shall I start by setting up the User Authentication and Order Database service?**
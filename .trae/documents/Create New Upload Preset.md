Perfect! I have everything I need.

**Credentials:**
*   **Cloud Name**: `dfxx86dx4`
*   **Upload Preset**: `RabusteArt`

**Execution Steps:**

1.  **Update `.env`**: I will add these two values to your environment file.
2.  **Create `src/services/cloudinaryService.ts`**: A dedicated helper to upload files to `https://api.cloudinary.com/v1_1/dfxx86dx4/image/upload`.
3.  **Update `src/services/artService.ts`**: Switch the `addArtPiece` function to use `uploadToCloudinary` instead of Firebase `uploadBytes`.

I'm starting the implementation now.
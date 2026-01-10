I will secure your API keys now by moving them to a hidden `.env` file.

**Steps I will execute:**

1.  **Update `.gitignore`**: I will add `.env` to this file so Git ignores it.
2.  **Create `.env`**: I will create this file and move your current hardcoded keys into it.
3.  **Update `firebase.ts`**: I will change the code to read the keys from the `.env` file instead of showing them directly.
4.  **Create `SETUP_GUIDE.md`**: I will add a guide explaining how your partner can set this up on their machine.

This ensures no *new* commits will expose your keys. (Note: You should still rotate your keys in the Firebase Console later to invalidate the old leaked ones).
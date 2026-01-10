# Cloudinary Setup Guide

To upload images directly from the Admin panel, you need a **Cloud Name** and an **Unsigned Upload Preset**.

## Step 1: Get Your Cloud Name
1.  Log in to your [Cloudinary Console](https://console.cloudinary.com/).
2.  On the **Dashboard** (main page), look for the **"Product Environment Credentials"** section.
3.  Copy the **Cloud Name**. (e.g., `dxyxyz123`)

## Step 2: Create an Unsigned Upload Preset
1.  Go to **Settings** (Gear icon ⚙️ at the top right).
2.  Click on the **"Upload"** tab.
3.  Scroll down to the **"Upload presets"** section.
4.  Click **"Add Upload Preset"**.
5.  **Important Settings**:
    *   **Signing Mode**: Change this to **"Unsigned"**.
    *   **Upload Preset Name**: You can keep the random name (e.g., `ml_default`) or rename it (e.g., `cafe_uploads`). *Copy this name.*
    *   (Optional) **Folder**: You can type `cafe_art` to organize images in a folder.
6.  Click **Save**.

## Step 3: Share Credentials
Please provide the following two values:
1.  **Cloud Name**: _________________
2.  **Upload Preset Name**: _________________

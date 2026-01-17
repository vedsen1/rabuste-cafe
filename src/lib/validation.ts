/**
 * Security utilities for input validation and sanitization
 */



// Allowed image MIME types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  // Check file type
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'
    };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'File size exceeds 5MB limit.'
    };
  }

  // Check file name for suspicious patterns
  if (!/^[a-zA-Z0-9\s._-]+$/.test(file.name)) {
    return {
      valid: false,
      error: 'File name contains invalid characters.'
    };
  }

  return { valid: true };
};

/**
 * Sanitize user input to prevent XSS
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .substring(0, 500); // Limit length
};

/**
 * Validate art piece data
 */
export const validateArtPiece = (art: {
  title: string;
  artist: string;
  price: string;
  description?: string;
}): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!art.title || art.title.trim().length === 0) {
    errors.push('Title is required');
  } else if (art.title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }

  if (!art.artist || art.artist.trim().length === 0) {
    errors.push('Artist is required');
  } else if (art.artist.length > 100) {
    errors.push('Artist name must be less than 100 characters');
  }

  if (!art.price || art.price.trim().length === 0) {
    errors.push('Price is required');
  } else if (!/^\d+(\.\d{2})?$/.test(art.price)) {
    errors.push('Price must be a valid number');
  }

  if (art.description && art.description.length > 1000) {
    errors.push('Description must be less than 1000 characters');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Validate menu item data
 */
export const validateMenuItem = (item: {
  name: string;
  category: string;
  subcategory?: string;
  price: string;
}): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!item.name || item.name.trim().length === 0) {
    errors.push('Item name is required');
  } else if (item.name.length > 100) {
    errors.push('Item name must be less than 100 characters');
  }

  if (!item.category || item.category.trim().length === 0) {
    errors.push('Category is required');
  }

  if (!item.price || item.price.trim().length === 0) {
    errors.push('Price is required');
  } else if (!/^\d+(\.\d{2})?$/.test(item.price)) {
    errors.push('Price must be a valid number');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

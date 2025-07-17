import type { ImageMetadata } from 'astro';

interface ImageMap {
  [filename: string]: string;
}

// Cache for the image map to avoid re-processing on each call
let imageMapCache: ImageMap | null = null;

/**
 * Loads and caches all images from src/assets/blog/ using import.meta.glob
 * Creates a robust filename-to-src mapping with multiple fallback strategies
 */
function createImageMap(): ImageMap {
  if (imageMapCache) {
    return imageMapCache;
  }

  try {
    // Load all images from the assets/blog directory
    const images = import.meta.glob<{ default: ImageMetadata }>(
      '/src/assets/blog/**/*.{png,jpg,jpeg,webp,avif,svg}',
      { eager: true }
    );

    const imageMap: ImageMap = {};

    for (const [path, module] of Object.entries(images)) {
      if (!module?.default?.src) {
        console.warn(`Invalid image module at path: ${path}`);
        continue;
      }

      // Extract filename from path (e.g., "intro.webp")
      const filename = path.split('/').pop();
      if (!filename) continue;

      // Create multiple mapping strategies for robust lookup
      const src = module.default.src;

      // 1. Direct filename mapping (most common case)
      imageMap[filename] = src;

      // 2. Filename without extension (for flexibility)
      const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
      if (nameWithoutExt !== filename) {
        imageMap[nameWithoutExt] = src;
      }

      // 3. Full relative path from assets/blog (for specific targeting)
      const relativePath = path.replace('/src/assets/blog/', '');
      imageMap[relativePath] = src;

      // 4. Directory + filename (e.g., "markdown/intro.webp")
      const pathParts = relativePath.split('/');
      if (pathParts.length >= 2) {
        const dirFilename = `${pathParts[pathParts.length - 2]}/${filename}`;
        imageMap[dirFilename] = src;
      }
    }

    imageMapCache = imageMap;
    return imageMap;
  } catch (error) {
    console.error('Failed to load images:', error);
    return {};
  }
}

/**
 * Gets an image source URL by filename with multiple fallback strategies
 * @param filename - The image filename or path to look up
 * @param fallback - Optional fallback image URL
 * @returns The image source URL or fallback
 */
export function getImageSrc(filename: string | undefined, fallback?: string): string | undefined {
  if (!filename) {
    return fallback;
  }

  const imageMap = createImageMap();

  // Try multiple lookup strategies in order of specificity
  const lookupKeys = [
    filename, // Direct filename or path
    filename.split('/').pop(), // Just the filename if a path was provided
    filename.replace(/\.[^/.]+$/, ''), // Filename without extension
  ].filter(Boolean) as string[];

  for (const key of lookupKeys) {
    const src = imageMap[key];
    if (src) {
      return src;
    }
  }

  // Log missing images for debugging (only in development)
  if (import.meta.env.DEV) {
    console.warn(`Image not found: ${filename}. Available images:`, Object.keys(imageMap));
  }

  return fallback;
}

/**
 * Gets multiple image sources by filenames
 * @param filenames - Array of image filenames to look up
 * @param fallback - Optional fallback image URL for missing images
 * @returns Array of image source URLs with same length as input
 */
export function getMultipleImageSrcs(
  filenames: (string | undefined)[],
  fallback?: string
): (string | undefined)[] {
  return filenames.map(filename => getImageSrc(filename, fallback));
}

/**
 * Preloads all images from the assets directory (useful for performance)
 * Call this early in your app lifecycle for better UX
 */
export function preloadImages(): void {
  createImageMap();
}

/**
 * Gets all available image filenames (useful for debugging or admin interfaces)
 */
export function getAllImageFilenames(): string[] {
  const imageMap = createImageMap();
  return Object.keys(imageMap);
}

/**
 * Checks if an image exists in the assets directory
 * @param filename - The image filename to check
 * @returns Whether the image exists
 */
export function imageExists(filename: string | undefined): boolean {
  if (!filename) return false;
  return getImageSrc(filename) !== undefined;
}

/**
 * Type-safe image object that matches your frontmatter structure
 */
export interface BlogImage {
  url: string;
  alt: string;
  filename?: string;
}

/**
 * Creates a BlogImage object with automatic src resolution
 * @param filename - The image filename
 * @param alt - Alt text for the image
 * @param fallback - Optional fallback image URL
 * @returns BlogImage object ready for use
 */
export function createBlogImage(
  filename: string | undefined,
  alt: string,
  fallback?: string
): BlogImage | undefined {
  const url = getImageSrc(filename, fallback);
  
  if (!url) {
    return undefined;
  }

  return {
    url,
    alt,
    filename,
  };
} 

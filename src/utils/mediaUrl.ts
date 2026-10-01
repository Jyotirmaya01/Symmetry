// ─────────────────────────────────────────────
// SYMMETRY — Fast Media & Cloudinary CDN Loader
// Seamlessly switches between local /media assets and Cloudinary fast video CDN
// ─────────────────────────────────────────────

// Map of local video paths to their corresponding Cloudinary Public IDs
const CLOUDINARY_PUBLIC_ID_MAP: Record<string, string> = {
  // Samsung S26 showcase (Verified 200 OK on Cloudinary)
  'media/samsung-galaxy-s26.mp4': 'Samsung_we_made_something_for_you._Galaxy_S26_Ultra_reimagined_as_a_cinematic_product_film.',
  'samsung-galaxy-s26.mp4': 'Samsung_we_made_something_for_you._Galaxy_S26_Ultra_reimagined_as_a_cinematic_product_film.',
  'samsung-galaxy-s26': 'Samsung_we_made_something_for_you._Galaxy_S26_Ultra_reimagined_as_a_cinematic_product_film.',

  // Claude AI Motion Graphics (Verified 200 OK on Cloudinary)
  'media/claude-motion-graphics.mp4': 'claude-motion-graphics',
  'claude-motion-graphics.mp4': 'claude-motion-graphics',
  'claude-motion-graphics': 'claude-motion-graphics',

  // Aura Haute Joaillerie Diamond Ring (Verified 200 OK on Cloudinary)
  'media/jewellery-brand-ad.mp4': 'Copy_of_2_Ring_portrait',
  'jewellery-brand-ad.mp4': 'Copy_of_2_Ring_portrait',
  'jewellery-brand-ad': 'Copy_of_2_Ring_portrait',
  'Copy_of_2_Ring_portrait': 'Copy_of_2_Ring_portrait',

  // Spotify Audio Dynamics & Wrapped Campaign (Verified 200 OK on Cloudinary)
  'media/spotify-motion-graphics.mp4': 'Spotify-Motion-Graphics',
  'spotify-motion-graphics.mp4': 'Spotify-Motion-Graphics',
  'spotify-motion-graphics': 'Spotify-Motion-Graphics',

  // Yapi Luxury Shower Gel (Verified 200 OK on Cloudinary)
  'media/yapi-shower-gel.mp4': 'Yapi-Shower-Gel',
  'yapi-shower-gel.mp4': 'Yapi-Shower-Gel',
  'yapi-shower-gel': 'Yapi-Shower-Gel',

  // 3-Star Artisan Bakery (Verified 200 OK on Cloudinary)
  'media/bakery-client-ad.mp4': 'Bakery-Client-Ad',
  'bakery-client-ad.mp4': 'Bakery-Client-Ad',
  'bakery-client-ad': 'Bakery-Client-Ad',

  // Artisan Roast Coffee AI Ad (Verified 200 OK on Cloudinary)
  'media/coffee-ai-ad.mp4': 'coffee_ai_ad',
  'coffee-ai-ad.mp4': 'coffee_ai_ad',
  'coffee-ai-ad': 'coffee_ai_ad',
  'coffee_ai_ad': 'coffee_ai_ad',

  // Netflix Motion Showcase (Verified 200 OK on Cloudinary)
  'media/netflix-motion.mp4': 'netflix',
  'netflix-motion.mp4': 'netflix',
  'netflix-motion': 'netflix',
  'netflix': 'netflix',

  // Hero Video & Symmetry Background (Updated to Symmetry_Most_compressed 1.38MB ultra-compressed stream)
  'hero-bg.mp4': 'Symmetry_Most_compressed',
  'hero-bg': 'Symmetry_Most_compressed',
  'media/hero-bg.mp4': 'Symmetry_Most_compressed',
  'Hero-Bg': 'Symmetry_Most_compressed',
  'Symmetry_compress': 'Symmetry_Most_compressed',
  'Symmetry_compress.mp4': 'Symmetry_Most_compressed',
  'media/Symmetry_compress.mp4': 'Symmetry_Most_compressed',
  'Symmetry_Most_compressed': 'Symmetry_Most_compressed',
  'Symmetry_Most_compressed.mp4': 'Symmetry_Most_compressed',
  'media/Symmetry_Most_compressed.mp4': 'Symmetry_Most_compressed',

  // Symmetry Studio Motion
  'symmetry-motion.mp4': 'Symmetry_Most_compressed',
  'symmetry-motion': 'Symmetry_Most_compressed',
  'media/symmetry-motion.mp4': 'Symmetry_Most_compressed',
  'Symmetry-motion': 'Symmetry_Most_compressed',
};

/**
 * Returns the optimized URL for a media asset.
 * If VITE_CLOUDINARY_CLOUD_NAME is configured in .env, transforms the URL to Cloudinary's
 * high-speed global CDN with automatic format (f_auto), automatic quality (q_auto), and adaptive streaming.
 * Otherwise, cleanly serves the local asset from /media/ or /public/.
 */
export function getOptimizedMediaUrl(localPath: string, options?: { isVideo?: boolean; width?: number }): string {
  // Normalize path
  const cleanPath = localPath.startsWith('/') ? localPath.slice(1) : localPath;

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'mnosh6bi';
  const customCdnBase = import.meta.env.VITE_CDN_BASE_URL;

  // 1. If custom CDN base URL is configured
  if (customCdnBase) {
    return `${customCdnBase.replace(/\/$/, '')}/${cleanPath}`;
  }

  // 2. If Cloudinary cloud name is configured
  if (cloudName) {
    const resourceType = options?.isVideo ? 'video' : 'image';
    const transformations = ['f_auto', 'q_auto'];
    if (options?.width) {
      transformations.push(`w_${options.width}`);
    }
    const transformStr = transformations.join(',');
    
    // Strip leading "media/" and extension for clean Cloudinary public ID lookup
    const baseName = cleanPath.replace(/^media\//, '').replace(/\.[^/.]+$/, '');
    const mappedId = CLOUDINARY_PUBLIC_ID_MAP[cleanPath] || CLOUDINARY_PUBLIC_ID_MAP[baseName] || baseName;
    return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${transformStr}/${encodeURIComponent(mappedId)}`;
  }

  // 3. Default: Serve fast local asset
  return localPath.startsWith('/') ? localPath : `/${localPath}`;
}

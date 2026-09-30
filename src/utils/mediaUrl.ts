// ─────────────────────────────────────────────
// SYMMETRY — Fast Media & Cloudinary CDN Loader
// Seamlessly switches between local /media assets and Cloudinary fast video CDN
// ─────────────────────────────────────────────

/**
 * Returns the optimized URL for a media asset.
 * If VITE_CLOUDINARY_CLOUD_NAME is configured in .env, transforms the URL to Cloudinary's
 * high-speed global CDN with automatic format (f_auto), automatic quality (q_auto), and adaptive streaming.
 * Otherwise, cleanly serves the local asset from /media/ or /public/.
 */
export function getOptimizedMediaUrl(localPath: string, options?: { isVideo?: boolean; width?: number }): string {
  // Normalize path
  const cleanPath = localPath.startsWith('/') ? localPath.slice(1) : localPath;

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
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
    return `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/${transformStr}/${cleanPath}`;
  }

  // 3. Default: Serve fast local asset
  return localPath.startsWith('/') ? localPath : `/${localPath}`;
}

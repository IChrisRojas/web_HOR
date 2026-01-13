// Restoration of Proxy Strategy due to Cloudflare Access restrictions on public r2.dev domain
export const getR2AssetUrl = (path: string): string => {
    // Ensure path doesn't start with slash to avoid double slashes when determining the key
    // But for the URL, we want /api/assets/path
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // Return relative URL to the internal proxy
    return `/api/assets/${cleanPath}`;
};

export const getPortfolioAssetUrl = (type: 'corporate' | 'event', filename: string): string => {
    const folder = type === 'corporate' ? 'corporate' : 'events';
    return getR2AssetUrl(`portfolio/${folder}/${filename}`);
};

export const getR2AssetUrl = (path: string): string => {
    const domain = import.meta.env.PUBLIC_R2_DOMAIN;
    if (!domain) {
        console.warn("PUBLIC_R2_DOMAIN is not defined in .env");
        return path;
    }

    // Ensure domain doesn't end with slash and path doesn't start with slash to avoid double slashes
    const cleanDomain = domain.replace(/\/$/, '');
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    return `${cleanDomain}/${cleanPath}`;
};

export const getPortfolioAssetUrl = (type: 'corporate' | 'event', filename: string): string => {
    const folder = type === 'corporate' ? 'corporate' : 'events';
    return getR2AssetUrl(`portfolio/${folder}/${filename}`);
};

import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ params, locals }) => {
    const path = params.path;
    if (!path) {
        return new Response(null, { status: 404 });
    }

    try {
        const bucket = locals.runtime?.env?.BUCKET;
        if (bucket) {
            const object = await bucket.get(path);
            if (object) {
                const headers = new Headers();
                object.writeHttpMetadata(headers);
                headers.set('etag', object.httpEtag);
                return new Response(object.body, { headers });
            }
        }
    } catch (error) {
        console.warn(`Local R2 binding failed for ${path}, attempting fallback...`, error);
    }

    // Fallback: Fetch from public R2 domain
    const publicDomain = import.meta.env.PUBLIC_R2_DOMAIN || process.env.PUBLIC_R2_DOMAIN;
    if (publicDomain) {
        try {
            const url = `${publicDomain}/${path}`;
            const response = await fetch(url);
            if (response.ok) {
                const newHeaders = new Headers(response.headers);
                // Cache for 1 year, immutable
                newHeaders.set('Cache-Control', 'public, max-age=31536000, immutable');

                return new Response(response.body, {
                    headers: newHeaders
                });
            }
        } catch (error) {
            console.error(`Fallback fetch failed for ${path}:`, error);
        }
    }

    return new Response(null, { status: 404 });
};

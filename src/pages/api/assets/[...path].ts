import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ params, locals }) => {
    const path = params.path;
    if (!path) {
        return new Response(null, { status: 404 });
    }

    // Access the R2 bucket from the Cloudflare runtime environment
    const bucket = locals.runtime?.env?.BUCKET;

    if (!bucket) {
        console.error('BUCKET binding not found');
        return new Response('Server Configuration Error: BUCKET binding missing', { status: 500 });
    }

    try {
        const object = await bucket.get(path);

        if (!object) {
            return new Response(null, { status: 404 });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);

        return new Response(object.body, {
            headers,
        });
    } catch (error) {
        console.error(`Error fetching ${path} from R2:`, error);
        return new Response('Internal Server Error', { status: 500 });
    }
};

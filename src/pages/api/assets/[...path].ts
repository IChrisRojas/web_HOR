import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ params, locals }) => {
    const path = params.path;

    if (!path) {
        return new Response('Not Found', { status: 44 });
    }

    // En Cloudflare Pages, el runtime está en locals.runtime
    const runtime = locals.runtime;

    if (!runtime || !runtime.env || !runtime.env.BUCKET) {
        console.error('R2 Bucket not found in runtime environment');
        return new Response('Environment Configuration Error', { status: 500 });
    }

    const bucket = runtime.env.BUCKET;
    const object = await bucket.get(path);

    if (!object) {
        return new Response('Object Not Found', { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers as any);
    headers.set('etag', object.httpEtag);
    headers.set('Cache-Control', 'public, max-age=31536000');

    return new Response(object.body as any, {
        headers,
    });
};

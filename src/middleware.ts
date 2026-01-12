import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
    // Only protect the /keystatic path
    if (context.url.pathname.startsWith('/keystatic')) {
        const authHeader = context.request.headers.get('Authorization');

        // Retrieve credentials from environment variables
        const adminUser = import.meta.env.ADMIN_USERNAME;
        const adminPass = import.meta.env.ADMIN_PASSWORD;

        // If credentials are not set in .env, warn (locally) or skip protection (to avoid lock-out)
        // But for security, we should enforce it if they ARE set.
        if (adminUser && adminPass) {
            const basicAuth = `Basic ${btoa(`${adminUser}:${adminPass}`)}`;

            if (authHeader !== basicAuth) {
                return new Response('Protección de Acceso: House of Ravers CMS', {
                    status: 401,
                    headers: {
                        'WWW-Authenticate': 'Basic realm="Acceso Restringido"',
                    },
                });
            }
        }
    }

    // Continue to the next middleware or the page
    return next();
});

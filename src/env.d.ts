/// <reference types="astro/client" />

interface ImportMetaEnv {
    // readonly VAR: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
    interface Locals extends Runtime { }
}

interface Env {
    BUCKET: import('@cloudflare/workers-types').R2Bucket;
    INSTAGRAM_TOKEN: string;
    PUBLIC_WEB3FORMS_KEY: string;
    ADMIN_USERNAME: string;
    ADMIN_PASSWORD: string;
}

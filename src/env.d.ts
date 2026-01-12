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
}

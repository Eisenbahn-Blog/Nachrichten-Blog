import { OAuthClient } from './oauth';

interface Env {
    GITHUB_OAUTH_ID: string;
    GITHUB_OAUTH_SECRET: string;
    GITHUB_REPO_PRIVATE?: string;
    BLOG_ACCESS_CODE: string;
}

const GITHUB_SITE = 'https://eisenbahn-blog.github.io';
const GITHUB_BASE = '/Nachrichten-Blog';

function randomHex(length: number): string {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);

    return Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
}

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

async function hmac(message: string, secret: string): Promise<string> {
    const key = await crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(secret),
        {
            name: 'HMAC',
            hash: 'SHA-256',
        },
        false,
        ['sign']
    );

    const signature = await crypto.subtle.sign(
        'HMAC',
        key,
        new TextEncoder().encode(message)
    );

    const bytes = new Uint8Array(signature);

    return Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
}

async function createSession(secret: string): Promise<string> {
    const expires = Date.now() + 7 * 24 * 60 * 60 * 1000;
    const data = String(expires);
    const signature = await hmac(data, secret);

    return `${data}.${signature}`;
}

async function verifySession(
    cookie: string | null,
    secret: string
): Promise<boolean> {
    if (!cookie) {
        return false;
    }

    const match = cookie.match(/(?:^|;\s*)blog_auth=([^;]+)/);

    if (!match) {
        return false;
    }

    const value = match[1];
    const parts = value.split('.');

    if (parts.length !== 2) {
        return false;
    }

    const expires = Number(parts[0]);
    const signature = parts[1];

    if (!Number.isFinite(expires) || expires < Date.now()) {
        return false;
    }

    const expected = await hmac(String(expires), secret);

    if (signature.length !== expected.length) {
        return false;
    }

    let difference = 0;

    for (let i = 0; i < signature.length; i++) {
        difference |= signature.charCodeAt(i) ^ expected.charCodeAt(i);
    }

    return difference === 0;
}

function loginPage(error = ''): Response {
    return new Response(
        `<!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Eisenbahn-News – Anmeldung</title>
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f7f9fa;
            color: #18212b;
            font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
        }

        .login {
            width: min(420px, calc(100% - 32px));
            background: white;
            padding: 36px;
            border-radius: 20px;
            box-shadow: 0 15px 45px rgba(20,30,40,.12);
            border: 1px solid #e2e7eb;
        }

        h1 {
            margin: 0 0 8px;
            font-size: 28px;
        }

        p {
            color: #697582;
            line-height: 1.5;
        }

        input {
            width: 100%;
            padding: 13px 14px;
            border: 1px solid #ccd3d9;
            border-radius: 10px;
            font-size: 16px;
            margin: 10px 0 14px;
        }

        button {
            width: 100%;
            padding: 13px;
            border: 0;
            border-radius: 10px;
            background: #d71920;
            color: white;
            font-size: 16px;
            font-weight: 800;
            cursor: pointer;
        }

        .private-notice {
            margin: 20px 0;
            padding: 16px;
            background: #f1f4f6;
            border: 1px solid #dce2e6;
            border-radius: 12px;
        }

        .private-notice strong {
            display: block;
            margin-bottom: 6px;
        }

        .private-notice p {
            margin: 0 0 8px;
            font-size: 14px;
        }

        .private-notice a {
            color: #c8102e;
            font-weight: 700;
            text-decoration: none;
        }

        .error {
            color: #d71920;
            font-weight: 700;
        }

        .logo {
            font-size: 38px;
            margin-bottom: 12px;
        }
    </style>
</head>
<body>
    <main class="login">
        <div class="logo">🚆</div>
        <h1>Eisenbahn-News</h1>
        <p>Dieser Blog ist nicht öffentlich zugänglich.</p>

        <div class="private-notice">
            <strong>🔐 Privater Bereich</strong>
            <p>
                Die Inhalte sind ausschließlich für einen privaten
                Personenkreis bestimmt und dürfen nicht ohne Erlaubnis
                weitergegeben oder öffentlich veröffentlicht werden.
            </p>
            <a href="https://eisenbahn-blog.github.io/Nachrichten-Blog/nutzungsbedingungen/">
                Nutzungsbedingungen →
            </a>
        </div>

        <p>Bitte Zugangscode eingeben.</p>

        ${error ? `<p class="error">${error}</p>` : ''}

        <form method="post" action="/login">
            <input
                type="password"
                name="code"
                placeholder="Zugangscode"
                autocomplete="current-password"
                required
                autofocus
            >

            <button type="submit">Anmelden</button>
        </form>
    </main>
</body>
</html>`,
        {
            status: 200,
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'no-store',
            },
        }
    );
}

const createOAuth = (env: Env) => {
    if (!env.GITHUB_OAUTH_ID) {
        throw new Error('GITHUB_OAUTH_ID fehlt.');
    }

    if (!env.GITHUB_OAUTH_SECRET) {
        throw new Error('GITHUB_OAUTH_SECRET fehlt.');
    }

    return new OAuthClient({
        id: env.GITHUB_OAUTH_ID,
        secret: env.GITHUB_OAUTH_SECRET,
        target: {
            tokenHost: 'https://github.com',
            tokenPath: '/login/oauth/access_token',
            authorizePath: '/login/oauth/authorize',
        },
    });
};

const handleAuth = async (url: URL, env: Env) => {
    try {
        const provider = url.searchParams.get('provider');

        if (provider !== 'github') {
            return new Response('Invalid provider', { status: 400 });
        }

        const repoIsPrivate =
            env.GITHUB_REPO_PRIVATE !== undefined &&
            env.GITHUB_REPO_PRIVATE !== '0';

        const repoScope = repoIsPrivate
            ? 'repo,user,read:org'
            : 'public_repo,user,read:org';

        const oauth2 = createOAuth(env);

        const state =
            url.searchParams.get('state') ||
            randomHex(16);

        const authorizationUri = oauth2.authorizeURL({
            redirect_uri:
                `https://${url.hostname}/callback?provider=github`,
            scope: repoScope,
            state,
        });

        return new Response(null, {
            status: 302,
            headers: {
                Location: authorizationUri,
                'Cache-Control': 'no-store',
            },
        });
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : String(error);

        return new Response(
            `OAuth-Fehler: ${message}`,
            {
                status: 500,
                headers: {
                    'Content-Type':
                        'text/plain; charset=utf-8',
                    'Cache-Control': 'no-store',
                },
            }
        );
    }
};

const callbackScriptResponse = (
    status: string,
    token: string
) => {
    const content = {
        token,
        provider: 'github',
    };

    return new Response(
        `<!doctype html>
<html lang="de">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Decap CMS</title>
</head>
<body>
    <p>Sie werden eingeloggt …</p>

    <script>
        const status = ${JSON.stringify(status)};
        const content = ${JSON.stringify(content)};

        function receiveMessage(event) {
            if (!window.opener) {
                return;
            }

            window.opener.postMessage(
                "authorization:github:" +
                status +
                ":" +
                JSON.stringify(content),
                event.origin
            );

            window.removeEventListener(
                "message",
                receiveMessage,
                false
            );

            setTimeout(() => {
                window.close();
            }, 300);
        }

        window.addEventListener(
            "message",
            receiveMessage,
            false
        );

        window.opener.postMessage(
            "authorizing:github",
            "*"
        );
    </script>
</body>
</html>`,
        {
            status: 200,
            headers: {
                'Content-Type':
                    'text/html; charset=utf-8',
                'Cache-Control':
                    'no-store',
                'Cross-Origin-Opener-Policy':
                    'unsafe-none',
            },
        }
    );
};

const handleCallback = async (
    url: URL,
    env: Env
) => {
    const provider =
        url.searchParams.get('provider');

    if (provider !== 'github') {
        return new Response(
            'Invalid provider',
            { status: 400 }
        );
    }

    const code =
        url.searchParams.get('code');

    if (!code) {
        return new Response(
            'Missing code',
            { status: 400 }
        );
    }

    try {
        /*
         * GitHub OAuth Authorization Code gegen
         * einen Benutzer-Access-Token tauschen.
         */
        const oauth2 = createOAuth(env);

        const accessToken =
            await oauth2.getToken({
                code,
                redirect_uri:
                    `https://${url.hostname}/callback?provider=github`,
            });

        /*
         * Der normale GitHub-OAuth-Token wird direkt an
         * Decap CMS übergeben.
         */
        return callbackScriptResponse(
            'success',
            accessToken
        );
    } catch (error) {
        const message =
            error instanceof Error
                ? error.message
                : 'Unbekannter Fehler';

        return new Response(
            `GitHub-Authentifizierung fehlgeschlagen: ${escapeHtml(message)}`,
            {
                status: 500,
                headers: {
                    'Content-Type':
                        'text/plain; charset=utf-8',
                    'Cache-Control':
                        'no-store',
                },
            }
        );
    }
};

async function proxyBlog(
    request: Request,
    url: URL
): Promise<Response> {
    let targetPath = url.pathname;

    if (
        targetPath === '/' ||
        targetPath === ''
    ) {
        targetPath = `${GITHUB_BASE}/`;
    } else if (
        targetPath.startsWith(GITHUB_BASE)
    ) {
        // Bereits korrekter GitHub-Pages-Pfad.
    } else {
        targetPath =
            `${GITHUB_BASE}${targetPath}`;
    }

    const target = new URL(
        targetPath,
        GITHUB_SITE
    );

    target.search = url.search;

    const headers = new Headers(request.headers);

    headers.delete('cookie');
    headers.delete('host');

    const response = await fetch(
        new Request(target.toString(), {
            method: request.method,
            headers,
            redirect: 'follow',
        })
    );

    const responseHeaders =
        new Headers(response.headers);

    responseHeaders.set(
        'Cache-Control',
        'no-store'
    );

    return new Response(
        response.body,
        {
            status: response.status,
            statusText: response.statusText,
            headers: responseHeaders,
        }
    );
}

export default {
    async fetch(
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response> {
        const url = new URL(request.url);

        if (url.pathname === '/worker-test') {
            return new Response(
                'WORKER_OK_VERSION_2026-08-23',
                {
                    status: 200,
                    headers: {
                        'Content-Type': 'text/plain; charset=utf-8',
                        'Cache-Control': 'no-store',
                    },
                }
            );
        }

        /*
         * Decap CMS OAuth darf den Zugangsschutz
         * passieren.
         */
        if (url.pathname === '/auth') {
            return handleAuth(url, env);
        }

        if (url.pathname === '/callback') {
            return handleCallback(url, env);
        }

        if (url.pathname === '/debug-env') {
            return new Response(
                JSON.stringify({
                    blogAccessCodeExists:
                        typeof env.BLOG_ACCESS_CODE === 'string',
                    blogAccessCodeLength:
                        env.BLOG_ACCESS_CODE?.length ?? 0,
                    method: request.method,
                }),
                {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-store',
                    },
                }
            );
        }

        /*
         * Anmeldung
         */
        if (
            url.pathname === '/login' &&
            request.method === 'POST'
        ) {
            const form =
                await request.formData();

            const code =
                String(form.get('code') || '');

            if (code !== env.BLOG_ACCESS_CODE) {
                return loginPage(
                    '❌ Der Zugangscode ist falsch.'
                );
            }

            const session =
                await createSession(
                    env.BLOG_ACCESS_CODE
                );

            const headers = new Headers();

            headers.set(
                'Location',
                '/'
            );

            headers.append(
                'Set-Cookie',
                `blog_auth=${session}; Path=/; Max-Age=604800; HttpOnly; Secure; SameSite=Lax`
            );

            return new Response(null, {
                status: 303,
                headers,
            });
        }

        /*
         * Abmelden
         */
        if (url.pathname === '/logout') {
            return new Response(
                'Abgemeldet.',
                {
                    status: 303,
                    headers: {
                        'Location': '/',
                        'Set-Cookie':
                            'blog_auth=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax',
                    },
                }
            );
        }

        /*
         * Decap CMS
         *
         * Die CMS-Dateien werden direkt aus den Worker-Assets
         * unter /admin/ ausgeliefert.
         */
        if (
            url.pathname === '/admin' ||
            url.pathname === '/admin/'
        ) {
            const assetUrl = new URL(request.url);
            assetUrl.pathname = '/admin/';

            return env.ASSETS.fetch(
                new Request(assetUrl.toString(), request)
            );
        }

        if (url.pathname.startsWith('/admin/')) {
            return env.ASSETS.fetch(
                new Request(request)
            );
        }

        /*
         * Öffentliche statische Dateien des Blogs.
         *
         * CSS, JavaScript, Bilder und sonstige Assets werden
         * direkt von GitHub Pages geladen.
         *
         * Wichtig: Der komplette /Nachrichten-Blog/-Pfad bleibt
         * erhalten, damit auch neu über Decap CMS hochgeladene
         * Dateien automatisch funktionieren.
         */
        if (
            url.pathname.startsWith('/Nachrichten-Blog/assets/') ||
            url.pathname.startsWith('/Nachrichten-Blog/images/')
        ) {
            const target = new URL(
                `https://eisenbahn-blog.github.io${url.pathname}`,
            );

            target.search = url.search;

            const assetResponse = await fetch(
                new Request(target.toString(), {
                    method: request.method,
                    headers: request.headers,
                    redirect: 'follow',
                })
            );

            const headers = new Headers(assetResponse.headers);
            headers.set('Cache-Control', 'no-store');

            return new Response(
                assetResponse.body,
                {
                    status: assetResponse.status,
                    statusText: assetResponse.statusText,
                    headers,
                }
            );
        }

        /*
         * Öffentlicher Blog
         *
         * Die normalen Blog-Seiten werden direkt von
         * GitHub Pages geladen.
         *
         * Der Redaktionsbereich /admin/ und OAuth bleiben
         * davon getrennt und funktionieren weiterhin.
         */
        return proxyBlog(
            request,
            url
        );
    },
};

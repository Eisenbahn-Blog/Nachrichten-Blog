const COOKIE_NAME = "ebw_auth";

function getCookie(request, name) {
    const cookieHeader = request.headers.get("Cookie") || "";

    const cookies = cookieHeader.split(";");

    for (const cookie of cookies) {
        const [key, ...value] = cookie.trim().split("=");

        if (key === name) {
            return decodeURIComponent(value.join("="));
        }
    }

    return null;
}

function loginPage() {
    return new Response(`
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Eisenbahn-News Baden-Württemberg</title>

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
            font-family: Arial, sans-serif;
            background: #f2f4f7;
            color: #222;
        }

        .login {
            width: min(420px, 90%);
            background: white;
            padding: 35px;
            border-radius: 18px;
            box-shadow: 0 10px 35px rgba(0,0,0,.12);
            text-align: center;
        }

        .logo {
            font-size: 48px;
            margin-bottom: 10px;
        }

        h1 {
            margin-top: 0;
        }

        input {
            width: 100%;
            padding: 14px;
            margin: 15px 0;
            border: 1px solid #ccc;
            border-radius: 10px;
            font-size: 16px;
        }

        button {
            width: 100%;
            padding: 14px;
            border: 0;
            border-radius: 10px;
            background: #222;
            color: white;
            font-size: 16px;
            cursor: pointer;
        }

        button:hover {
            opacity: .9;
        }

        .error {
            color: #c62828;
            margin-top: 15px;
        }
    </style>
</head>

<body>

<div class="login">

    <div class="logo">🚆</div>

    <h1>Eisenbahn-News</h1>

    <p>Dieser Blog ist derzeit privat.</p>

    <form method="POST">
        <input
            type="password"
            name="password"
            placeholder="Passwort"
            autocomplete="current-password"
            required
        >

        <button type="submit">
            Zugang
        </button>
    </form>

</div>

</body>
</html>
`, {
        status: 401,
        headers: {
            "Content-Type": "text/html; charset=UTF-8"
        }
    });
}

export async function onRequest(context) {

    const request = context.request;
    const env = context.env;

    /*
     * Bereits angemeldet?
     */
    const cookie = getCookie(request, COOKIE_NAME);

    if (cookie === env.SITE_PASSWORD) {
        return context.next();
    }


    /*
     * Passwort absenden
     */
    if (request.method === "POST") {

        const formData = await request.formData();

        const password = formData.get("password");

        if (
            typeof password === "string" &&
            password === env.SITE_PASSWORD
        ) {

            return new Response(null, {
                status: 302,

                headers: {
                    "Location": new URL(
                        request.url
                    ).pathname,

                   "Set-Cookie":
                        `${COOKIE_NAME}=${encodeURIComponent(env.SITE_PASSWORD)}; ` +
                        `Path=/; ` +
                        `HttpOnly; ` +
                        `Secure; ` +
                        `SameSite=Lax; ` +
                        `Max-Age=604800`
                }
            });
        }

        return new Response(`
<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Falsches Passwort</title>
</head>

<body style="
    font-family:Arial;
    text-align:center;
    padding:60px;
">

<h1>❌ Falsches Passwort</h1>

<p>Das eingegebene Passwort ist nicht korrekt.</p>

<p>
<a href="/">Zurück zum Login</a>
</p>

</body>
</html>
`, {
            status: 401,
            headers: {
                "Content-Type": "text/html; charset=UTF-8"
            }
        });
    }


    /*
     * Noch nicht angemeldet
     */
    return loginPage();
}
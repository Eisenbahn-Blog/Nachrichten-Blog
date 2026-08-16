export default {
    async fetch(request, env) {

        const url = new URL(request.url);

        // Bereits angemeldet?
        const cookie = request.headers.get("Cookie") || "";

        if (cookie.includes("blog_auth=1")) {
            return env.ASSETS.fetch(request);
        }

        // Passwort wurde abgeschickt
        if (request.method === "POST") {

            const formData = await request.formData();

            const password = formData.get("password");

            if (password === env.SITE_PASSWORD) {

                return new Response(null, {
                    status: 302,
                    headers: {
                        "Location": url.pathname,
                        "Set-Cookie":
                            "blog_auth=1; " +
                            "Path=/; " +
                            "HttpOnly; " +
                            "Secure; " +
                            "SameSite=Lax; " +
                            "Max-Age=604800"
                    }
                });
            }

            return loginPage("Falsches Passwort.");
        }

        return loginPage();
    }
};


function loginPage(error = "") {

    return new Response(`
<!DOCTYPE html>
<html lang="de">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>

<title>Eisenbahn-News – Geschützter Bereich</title>

<style>

body {
    margin: 0;
    min-height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: Arial, sans-serif;

   background:
        linear-gradient(
            135deg,
            #eeeeee,
            #ffffff
        );
}

.login {
    width: min(420px, 90%);

    background: white;

    padding: 35px;

    border-radius: 20px;

    box-shadow:
        0 15px 40px rgba(0,0,0,.15);

    text-align: center;
}

.logo {
    font-size: 50px;
}

h1 {
    margin-bottom: 10px;
}

p {
    color: #666;
}

input {
    width: 100%;
    padding: 14px;

    margin-top: 15px;
    margin-bottom: 15px;

    border: 1px solid #ccc;

    border-radius: 10px;

    font-size: 16px;

    box-sizing: border-box;
}

button {
    width: 100%;

    padding: 14px;

    border: none;

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
    font-weight: bold;
}

</style>

</head>

<body>

<div class="login">

    <div class="logo">🚆</div>

    <h1>Eisenbahn-News</h1>

    <p>
        Dieser Blog ist derzeit privat.
    </p>

    ${error ? `<p class="error">${error}</p>` : ""}

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
`,
{
    status: 401,

    headers: {
        "Content-Type":
            "text/html; charset=UTF-8"
    }
});
}
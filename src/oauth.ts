type OAuthConfig = {
    id: string;
    secret: string;
    target: {
        tokenHost: string;
        tokenPath: string;
        authorizePath: string;
    };
};

export class OAuthClient {
    private clientConfig: OAuthConfig;

    constructor(config: OAuthConfig) {
        this.clientConfig = config;
    }

    authorizeURL(options: {
        redirect_uri: string;
        scope: string;
        state: string;
    }): string {
        const { clientConfig } = this;
        const { tokenHost, authorizePath } = clientConfig.target;
        const { redirect_uri, scope, state } = options;

        const params = new URLSearchParams({
            response_type: "code",
            client_id: clientConfig.id,
            redirect_uri,
            scope,
            state,
        });

        return `${tokenHost}${authorizePath}?${params.toString()}`;
    }

    async getToken(options: {
        code: string;
        redirect_uri: string;
    }): Promise<string> {
        const { clientConfig } = this;
        const { tokenHost, tokenPath } = clientConfig.target;
        const { code, redirect_uri } = options;

        const body = new URLSearchParams({
            client_id: clientConfig.id,
            client_secret: clientConfig.secret,
            code,
            redirect_uri,
        });

        const response = await fetch(
            `${tokenHost}${tokenPath}`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type":
                        "application/x-www-form-urlencoded",
                    "User-Agent":
                        "Eisenbahn-Blog-CMS",
                },
                body: body.toString(),
            }
        );

        const text = await response.text();

        let json: {
            access_token?: string;
            token_type?: string;
            scope?: string;
            error?: string;
            error_description?: string;
            error_uri?: string;
        };

        try {
            json = JSON.parse(text);
        } catch {
            throw new Error(
                `GitHub OAuth Token-Antwort ist kein gültiges JSON: ${text}`
            );
        }

        if (!response.ok) {
            throw new Error(
                `GitHub OAuth Token-Austausch fehlgeschlagen: ` +
                `${response.status} ` +
                `${json.error || "unknown_error"} ` +
                `${json.error_description || ""}`
            );
        }

        if (!json.access_token) {
            throw new Error(
                `GitHub OAuth lieferte keinen Access-Token: ${text}`
            );
        }

        return json.access_token;
    }
}

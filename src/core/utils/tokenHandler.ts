import { Client } from './client';
import { addSeconds, isPast } from 'date-fns';

interface AHToken {
    access_token: string;
    expires_in: number;
    refresh_token: string;
}

interface LoginBody {
    password: string;
    username: string;
}

interface Tokens {
    ah?: AHToken;
    jumbo?: string;
}

export class TokenHandler {

    ready: Promise<any | undefined>;

    private request_date?: Date;
    private expiration_date?: Date;
    private tokens: Tokens = {};

    constructor(
        private readonly client: Client,
        private readonly token?: string,
    ) {

        if (token && client.id == 'jumbo') {
            this.tokens.jumbo = token;
            this.ready = Promise.resolve();
            return;
        }

        this.ready = new Promise((resolve, reject) => {
            this.generateToken()
                .then((token) => {
                    console.log(`client id: ${client.id}, token: ${token}`)
                    resolve(undefined)
                })
                .catch(reject)
        });

    }

    /**
     * Returns a token and (re-)creates one if needed
     */
    generateToken(): Promise<AHToken | string> {
        return new Promise<AHToken | string>(async (resolve, reject) => {
            switch (this.client.id) {
                case "ah":
                    // If previous token expired or we don't have 1 yet, create (a new) one
                    if (!this.tokens.ah) {
                        this.request_date = new Date();
                        this.expiration_date = addSeconds(this.request_date, 7199);
                        // Gets an anonymous token that lasts for 2 hours (7199 seconds)
                        this.tokens.ah = await this.client.post('mobile-auth/v1/auth/token/anonymous', {
                            clientId: 'appie'
                        }, undefined, true, false);
                    }
                    if (this.tokens.ah?.refresh_token && this.expiration_date && isPast(this.expiration_date)) {
                        // Token expired, refresh it
                        if (!this.tokens.ah) {
                            throw new Error('No token to refresh');
                        }
                        this.request_date = new Date();
                        this.expiration_date = addSeconds(this.request_date, 7199);
                        this.tokens.ah = await this.client.post('mobile-auth/v1/auth/token/refresh', {
                            clientId: 'appie',
                            refreshToken: this.tokens.ah?.refresh_token
                        });
                    }
                    // Return the token
                    resolve(this.tokens.ah!)
                    return;
                case "jumbo":
                    if (!this.tokens.jumbo) {
                        // To get a token, we simply initialize a POST request to /users/login with the info
                        const body: LoginBody = {
                            password: this.client.options.password!,
                            username: this.client.options.username!
                        };
                        // Send POST request with info
                        let response = await this.client.post(`users/login`, JSON.stringify(body), undefined, false, true);
                        this.tokens.jumbo = await response.headers['x-jumbo-token'];
                    }
                    // TODO: refresh token if needed
                    resolve(this.tokens.jumbo!)
                    return;
                default:
                    resolve("no_token_found")
                    return;
            }
        })
    }

}
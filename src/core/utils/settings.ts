// @node/modules
import fs from 'node:fs';

// @pnpm/modules
import { AxiosRequestConfig } from 'axios';

export type ValidStoreNames = 'ah' | 'aldi' | 'coop' | 'jumbo' | 'plus';

export interface StoreSettings {
    readonly name: string;
    readonly endpoint: string;
    readonly default: {
        readonly token?: string;
        readonly verbose?: boolean;
        readonly username?: string;
        readonly password?: string;
        readonly set_version?: boolean;
        readonly api_version?: number;
        readonly axios_config?: AxiosRequestConfig;
    };
}

export default class Settings implements StoreSettings {

    readonly name: string;
    readonly endpoint: string;
    readonly default: {
        token?: string;
        verbose?: boolean;
        username?: string;
        password?: string;
        set_version?: boolean;
        api_version?: number;
    };

    constructor(storeName: ValidStoreNames) {

        const rawmeta: Buffer = fs.readFileSync(`./settings/${storeName}.json`);
        const meta: StoreSettings = JSON.parse(rawmeta.toString());

        this.name     = meta.name;
        this.endpoint = meta.endpoint;

        // set default values if they are not provided within a meta file
        this.default              = {};
        this.default.token        = meta.default.token         || "";
        this.default.verbose      = meta.default.verbose       || false;
        this.default.username     = meta.default.username      || "";
        this.default.password     = meta.default.password      || "";
        this.default.set_version  = meta.default.set_version   || false;
        this.default.api_version  = meta.default.api_version   || 1;

    }

}

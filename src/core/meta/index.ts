// @node/modules
import fs from 'node:fs';

// @pnpm/modules
import { AxiosRequestConfig } from 'axios';

export type ValidStoreNames = 'ah' | 'aldi' | 'coop' | 'jumbo' | 'plus';

export interface StoreMetadata {
    name: string;
    endpoint: string;
    default: {
        token?: string;
        verbose?: boolean;
        username?: string;
        password?: string;
        set_version?: boolean;
        api_version?: number;
        axios_config?: AxiosRequestConfig;
    };
}

export default class Metadata implements StoreMetadata {

    name: string;
    endpoint: string;
    default: {
        token?: string;
        verbose?: boolean;
        username?: string;
        password?: string;
        set_version?: boolean;
        api_version?: number;
    };

    constructor(storeName: ValidStoreNames) {

        const rawmeta: Buffer = fs.readFileSync(`./json/${storeName}.json`);
        const meta: StoreMetadata = JSON.parse(rawmeta.toString());

        this.name     = meta.name;
        this.endpoint = meta.endpoint;

        this.default              = {};
        this.default.token        = meta.default.token         || "";
        this.default.verbose      = meta.default.verbose       || false;
        this.default.username     = meta.default.username      || "";
        this.default.password     = meta.default.password      || "";
        this.default.set_version  = meta.default?.set_version  || false;
        this.default.api_version  = meta.default?.api_version  || 1;

    }

}

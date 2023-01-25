// @node/modules
import fs from 'node:fs';

// @local/types
import { KeyValuePairs, GroceryStoreIds } from '../helpers/types';

export interface GroceryStoreSettings {
    readonly id: GroceryStoreIds;
    readonly name: string;
    readonly endpoint: string;
    readonly additional_headers: KeyValuePairs;
    readonly default: {
        readonly token?: string;
        readonly verbose?: boolean;
        readonly username?: string;
        readonly password?: string;
        readonly set_version?: boolean;
        readonly api_version?: number;
    };
}

export default class Settings implements GroceryStoreSettings {

    readonly id: GroceryStoreIds;
    readonly name: string;
    readonly endpoint: string;
    readonly additional_headers: KeyValuePairs;
    readonly default: {
        token?: string;
        verbose?: boolean;
        username?: string;
        password?: string;
        set_version?: boolean;
        api_version?: number;
    };

    constructor(storeId: GroceryStoreIds) {

        const rawmeta: Buffer = fs.readFileSync(`./settings/${storeId}.json`);
        const meta: GroceryStoreSettings = JSON.parse(rawmeta.toString());

        this.id                      = meta.id;
        this.name                    = meta.name;
        this.endpoint                = meta.endpoint;

        // validate the additional headers
        this.additional_headers      = meta.additional_headers ? (() => {
            const headers: KeyValuePairs = {};
            const keys: string[] = Object.keys(meta.additional_headers);
            for (const key in keys)
                headers[`${key}`] = meta.additional_headers[`key`];
            return headers;
        })() : {};

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

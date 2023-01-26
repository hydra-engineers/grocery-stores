// @node/modules
import EventEmitter from "node:events";

// @local/modules
import { GroceryStore } from '../GroceryStore';

interface EventEmitterOptions {
    /**
     * Enables automatic capturing of promise rejection.
     */
    captureRejections?: boolean | undefined;
}

// core class
export class GroceryStoreObject extends EventEmitter {
    constructor(
        protected readonly store: GroceryStore,
        protected readonly auth: boolean,
        protected readonly options?: EventEmitterOptions
    ) {
        super(options);
    }
}

export interface PaginationOptions {
    page?: number;
    size?: number;
    amount?: number;
    offset?: number;
    limit?: number;
}
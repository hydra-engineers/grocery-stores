// @node/modules
import EventEmitter from "node:events";

// @local/modules
import GroceryStore from './classes/groceryStore';

interface EventEmitterOptions {
    /**
     * Enables automatic capturing of promise rejection.
     */
    captureRejections?: boolean | undefined;
}

// core class
export default class Core extends EventEmitter {
    constructor(
        protected readonly store: GroceryStore,
        protected readonly authRequired: boolean,
        protected readonly eventEmitterOptions: EventEmitterOptions
    ) {
        super(eventEmitterOptions);
    }
}

export interface PaginationOptions {
    page?: number;
    size?: number;
    amount?: number;
    offset?: number;
    limit?: number;
}
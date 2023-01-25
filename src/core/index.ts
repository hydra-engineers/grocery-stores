// @node/modules
import EventEmitter from "node:events";

// @local/modules
import Store from '../store';
import { AH } from '../ah';
import { Aldi } from '../aldi';
import { Coop } from '../coop';
import { Jumbo } from '../jumbo';
import { Plus } from '../plus';

type StoreType = AH | Aldi | Coop | Jumbo | Plus | Store;

interface EventEmitterOptions {
    /**
     * Enables automatic capturing of promise rejection.
     */
    captureRejections?: boolean | undefined;
}

// core class
export default class Core extends EventEmitter {
    constructor(
        protected readonly store: StoreType,
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
import { Coop } from '../coop';

export class CoopObject {
    constructor(protected readonly coop: Coop) {}
}

export interface PaginationOptions {
    offset?: number;
    amount?: number;
}

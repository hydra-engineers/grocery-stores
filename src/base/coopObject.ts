import { Coop } from '../stores/coop';

export class CoopObject {
    constructor(protected readonly coop: Coop) {}
}

export interface PaginationOptions {
    offset?: number;
    amount?: number;
}

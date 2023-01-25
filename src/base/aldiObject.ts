import { Aldi } from '../stores/aldi';

export class AldiObject {
    constructor(protected readonly aldi: Aldi) {}
}

export interface PaginationOptions {
    offset?: number;
    limit?: number;
}

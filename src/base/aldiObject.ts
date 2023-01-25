import { Aldi } from '../aldi';

export class AldiObject {
    constructor(protected readonly aldi: Aldi) {}
}

export interface PaginationOptions {
    offset?: number;
    limit?: number;
}

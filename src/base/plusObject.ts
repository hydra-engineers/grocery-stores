import { Plus } from '../stores/plus';

export class PlusObject {
    constructor(protected readonly plus: Plus) {}
}

export interface PaginationOptions {
    limit?: number;
}

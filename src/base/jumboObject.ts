import { Jumbo } from '../stores/jumbo';

export class JumboObject {
    constructor(protected readonly jumbo: Jumbo, protected readonly authRequired: boolean) {}
}

export interface PaginationOptions {
    offset?: number;
    limit?: number;
}

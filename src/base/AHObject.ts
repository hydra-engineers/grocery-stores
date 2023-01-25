import { AH } from '../stores/ah';

export class AHObject {
    constructor(protected readonly ah: AH) {}
}

export interface PaginationOptions {
    page?: number;
    size?: number;
}

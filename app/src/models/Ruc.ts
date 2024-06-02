import type { Subsidiary } from '@/models/Subsidiary';

export interface Ruc{
    ruc: string;
    businessname: string;
    subsidiaries: Subsidiary[];
}
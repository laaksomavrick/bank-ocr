import { AccountNumberData } from '../common';

export interface AmbiguousAccountNumberData extends AccountNumberData {
    possibilities: number[][];
}

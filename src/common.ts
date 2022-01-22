import { ValidationState } from './validation';

export interface AccountNumberData {
    digits: Array<number | null>;
    buffer?: Buffer;
    validationState?: ValidationState;
    humanReadableString?: string;
}

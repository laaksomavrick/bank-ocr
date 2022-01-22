import { ValidationState } from './validation';

export interface AccountNumberData {
    digits: Array<number | null>;
    validationState: ValidationState;
}

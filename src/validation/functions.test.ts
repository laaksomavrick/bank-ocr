import { getValidationState } from './functions';
import { ValidationState } from './enums';
import { AccountNumberData } from '../common';
import { validateAccountNumbers } from '.';

describe('Validation', () => {
    describe('validateAccountNumbers', () => {
        it('validates a list of account numbers', () => {
            const accountNumberData: AccountNumberData[] = [
                {
                    digits: [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                    ],
                },
                {
                    digits: [0, 0, 0, 0, 0, 0, 0, 0, 1],
                },
                {
                    digits: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                },
            ];

            const [first, second, third] =
                validateAccountNumbers(accountNumberData);

            expect(first.validationState).toBe(ValidationState.ILLEGIBLE);
            expect(second.validationState).toBe(ValidationState.ERROR);
            expect(third.validationState).toBe(ValidationState.OK);
        });
    });

    describe('getValidationState', () => {
        it('throws on an invalid account number', () => {
            const invalid = [0, 1, 2, 3, 4, 5, 6, null];

            expect(() => getValidationState(invalid)).toThrowError();
        });

        it('validates an illegible account number', () => {
            const illegible = [0, 1, 2, 3, 4, 5, 6, 7, null];

            const validationState = getValidationState(illegible);

            expect(validationState).toBe(ValidationState.ILLEGIBLE);
        });

        it('validates an invalid checksum account number', () => {
            const badChecksum = [0, 1, 2, 3, 4, 5, 6, 7, 8];

            const validationState = getValidationState(badChecksum);

            expect(validationState).toBe(ValidationState.ERROR);
        });

        it('validates an ok account number', () => {
            const okChecksum = [3, 4, 5, 8, 8, 2, 8, 6, 5];

            const validationState = getValidationState(okChecksum);

            expect(validationState).toBe(ValidationState.OK);
        });
    });
});

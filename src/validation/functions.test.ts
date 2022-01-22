import { getValidationState } from './functions';
import { ValidationState } from './enums';

describe('Validation', () => {
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

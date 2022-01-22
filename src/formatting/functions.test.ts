import { AccountNumberData } from '../common';
import { ValidationState } from '../validation';
import { formatAccountNumbers, getHumanReadableString } from './functions';

describe('Formatting', () => {
    describe('formatAccountNumbers', () => {
        it('formats a list of account numbers', () => {
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
                    validationState: ValidationState.ILLEGIBLE,
                },
                {
                    digits: [0, 0, 0, 0, 0, 0, 0, 0, 1],
                    validationState: ValidationState.ERROR,
                },
                {
                    digits: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    validationState: ValidationState.OK,
                },
            ];

            const [first, second, third] =
                formatAccountNumbers(accountNumberData);

            expect(first.humanReadableString).toBeDefined();
            expect(second.humanReadableString).toBeDefined();
            expect(third.humanReadableString).toBeDefined();
        });
    });

    describe('getHumanReadableString', () => {
        it('formats an OK account number', () => {
            const accountNumber = {
                digits: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                validationState: ValidationState.OK,
            };

            const formatted = getHumanReadableString(accountNumber);

            expect(formatted).toBe('123456789');
        });

        it('formats an ERR account number', () => {
            const accountNumber = {
                digits: [0, 0, 0, 0, 0, 0, 0, 0, 1],
                validationState: ValidationState.ERROR,
            };

            const formatted = getHumanReadableString(accountNumber);

            expect(formatted).toBe('000000001 ERR');
        });

        it('formats an ILL account number', () => {
            const accountNumber = {
                digits: [null, 0, 0, 0, 0, 0, 0, null, null],
                validationState: ValidationState.ILLEGIBLE,
            };

            const formatted = getHumanReadableString(accountNumber);

            expect(formatted).toBe('?000000?? ILL');
        });

        it('throws when provided an account number without a validation state', () => {
            const accountNumber = { digits: [] };

            expect(() => getHumanReadableString(accountNumber)).toThrowError();
        });
    });
});

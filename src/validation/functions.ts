import { ValidationState } from './enums';

/**
 * Gets the validation state for a given account number
 * @param accountNumber The account number to assert a validation state against
 * @returns {ValidationState} The validation state for the given account number
 */
export const getValidationState = (
    accountNumber: Array<number | null>,
): ValidationState => {
    if (accountNumber.length !== 9) {
        throw new Error(
            `Invalid accountNumber provided to getValidationState: accountNumber=${accountNumber}`,
        );
    }

    const isIllegible =
        accountNumber.find((digit) => digit === null) !== undefined;

    if (isIllegible) {
        return ValidationState.ILLEGIBLE;
    }

    const isInvalidChecksum =
        isValidChecksum(accountNumber as Array<number>) === false;

    if (isInvalidChecksum) {
        return ValidationState.ERROR;
    }

    return ValidationState.OK;
};

/**
 * Validates a checksum against an account number given the following formula:
 *
 * account number:  3  4  5  8  8  2  8  6  5
 * position names:  d9 d8 d7 d6 d5 d4 d3 d2 d1
 * checksum calculation:
 * (d1+2*d2+3*d3+...+9*d9) mod 11 = 0
 * @param accountNumber The account number to validate the checksum
 * @returns {boolean} Whether the checksum is valid or not
 */
const isValidChecksum = (accountNumber: Array<number>): boolean => {
    let agg = 0;

    for (
        let i = 0, multiplier = 9;
        i < accountNumber.length;
        i++, multiplier--
    ) {
        const digit = accountNumber[i];
        const sum = digit * multiplier;
        agg += sum;
    }

    const checksumOk = agg % 11 == 0;

    return checksumOk;
};

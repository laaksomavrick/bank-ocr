import { ValidationState } from './enums';

// todo comments

export const getValidationState = (
    accountNumber: Array<number | null>,
): ValidationState => {
    if (accountNumber.length !== 9) {
        throw new Error(
            `Invalid accountNumber provided to getValidationState: accountNumber=${accountNumber}`,
        );
    }

    // TODO: type guard + isValidChecksum Array<number>
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

const isValidChecksum = (accountNumber: Array<number>): boolean => {
    /**
     *  account number:  3  4  5  8  8  2  8  6  5
        position names:  d9 d8 d7 d6 d5 d4 d3 d2 d1

        checksum calculation:
        (d1+2*d2+3*d3+...+9*d9) mod 11 = 0
     */

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

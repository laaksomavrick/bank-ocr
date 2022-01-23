import { AccountNumberData } from '../common';
import { parseAccountNumber } from '../parser';
import { PIPE, UNDERSCORE, WHITESPACE } from '../parser/constants';
import { isValidChecksum, ValidationState } from '../validation';
import { AmbiguousAccountNumberData } from './interfaces';

/**
 * Reconciles ILL or ERR account numbers where possible via adding or removing one PIPE or UNDERSCORE.
 * If no possible valid account numbers exist, set the account number as an ERR.
 * @param accountNumbers A list of account numbers
 * @returns {AccountNumberData[]} A list of account numbers that have had an attempt to reconcile them,
 * i.e. any valid permutation of an ILL or ERR account number
 */
export const reconcileAccountNumbers = (
    accountNumbers: AccountNumberData[],
): AccountNumberData[] => {
    const toReconcile = accountNumbers.filter(
        ({ validationState }) =>
            validationState === ValidationState.ERROR ||
            validationState === ValidationState.ILLEGIBLE,
    );
    const reconciled = toReconcile
        .map(reconcileAccountNumber)
        .map(({ digits, validationState, humanReadableString }) => ({
            digits,
            validationState,
            humanReadableString,
        }));

    return reconciled;
};

export const reconcileAccountNumber = (
    accountNumber: AccountNumberData,
): AmbiguousAccountNumberData => {
    const buffer = accountNumber.buffer;
    const validationState = accountNumber.validationState;

    if (buffer == null) {
        throw new Error(
            `Invalid buffer provided for accountNumber=${accountNumber.digits}`,
        );
    }

    if (
        validationState !== ValidationState.ERROR &&
        validationState !== ValidationState.ILLEGIBLE
    ) {
        throw new Error(
            `Can only reconcile ERROR or ILLEGIBLE account numbers for accountNumber=${accountNumber.digits}`,
        );
    }

    const maybeUnderscore = getAccountNumberPossibiltiesFor(buffer, UNDERSCORE);
    const maybePipe = getAccountNumberPossibiltiesFor(buffer, PIPE);
    const maybeWhitespace = getAccountNumberPossibiltiesFor(buffer, WHITESPACE);
    const possibilities = [
        ...maybeUnderscore,
        ...maybePipe,
        ...maybeWhitespace,
    ];

    switch (possibilities.length) {
        case 0:
            return {
                ...accountNumber,
                validationState: ValidationState.ERROR,
                possibilities,
            };
        case 1:
            const digits = possibilities[0];
            return {
                digits,
                validationState: ValidationState.OK,
                possibilities,
            };
        default:
            return {
                ...accountNumber,
                validationState: ValidationState.AMBIGUOUS,
                possibilities,
            };
    }
};

/**
 * Iterate over a byte representation of an account number, testing a replacementbyte such that
 * we may find a valid permutation of an account number.
 * @param accountNumber The account number
 * @param replacementByte The replacement byte to attempt (e.g. PIPE or UNDERSCORE or WHITESPACE)
 * @returns {Array<number>} A list of possible valid account numbers
 */
const getAccountNumberPossibiltiesFor = (
    accountNumber: Buffer,
    replacementByte: number,
): number[][] => {
    const possibilities = [];

    for (let i = 0; i < accountNumber.length; i++) {
        // We do a deep copy here - this is a naive approach and we could use memoization
        // or a similar caching strategy if performance were a concern
        const bufferCopy = Buffer.from(accountNumber);
        bufferCopy[i] = replacementByte;

        const parsed = parseAccountNumber(bufferCopy);
        const isOkParsed = parsed.every((x) => x !== null);

        if (isOkParsed === false) {
            continue;
        }

        const isOkChecksum = isValidChecksum(parsed as Array<number>);

        if (isOkChecksum === false) {
            continue;
        }

        possibilities.push(parsed as Array<number>);
    }

    return possibilities;
};

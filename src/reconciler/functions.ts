import { AccountNumberData } from '../common';
import { parseAccountNumber } from '../parser';
import { PIPE, UNDERSCORE, WHITESPACE } from '../parser/constants';
import { isValidChecksum, ValidationState } from '../validation';
import { AmbiguousAccountNumberData } from './interfaces';

// todo: comments

/**
 * For all ERR or ILL account numbers
 * - ADD or REMOVE just one pipe or underscore
 * - Check if is a valid number (parseAccountNumber)
 * - Check if checksum is OK (isValidChecksum)
 * - If both of these conditions, add to AMB array
 * - If AMB.length === 1, use that, report as OK
 * - If AMB.length > 1, report as AMB
 * - If AMB.length === 0, report ILL
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

const getAccountNumberPossibiltiesFor = (
    accountNumber: Buffer,
    replacementByte: number,
): number[][] => {
    const possibilities = [];

    for (let i = 0; i < accountNumber.length; i++) {
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

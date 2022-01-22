import { AccountNumberData } from '../common';
import { ValidationState } from '../validation';

/**
 * Formats a given list of account numbers
 * @param accountNumbers A list of account numbers
 * @returns {AccountNumberData[]} A list of account numbers with formatting added
 */
export const formatAccountNumbers = (
    accountNumbers: AccountNumberData[],
): AccountNumberData[] => {
    return accountNumbers.map((x) => ({
        ...x,
        humanReadableString: getHumanReadableString(x),
    }));
};

/**
 * Formats a given account number data entry to be human readable
 * @param accountNumber An account number
 * @returns {string} A human readable account number + validation state
 */
export const getHumanReadableString = (
    accountNumber: AccountNumberData,
): string => {
    const digits = accountNumber.digits;
    const validationState = accountNumber.validationState;

    if (validationState == null) {
        throw new Error(
            `Missing validation state for accountNumber=${accountNumber.digits}`,
        );
    }

    switch (validationState) {
        case ValidationState.OK:
            return digits.join('');
        case ValidationState.ERROR:
            return `${digits.join('')} ERR`;
        case ValidationState.AMBIGUOUS:
            return `${digits.join('')} AMB`;
        case ValidationState.ILLEGIBLE:
            return `${digits.map((x) => (x != null ? x : '?')).join('')} ILL`;
        default:
            return 'ERROR';
    }
};

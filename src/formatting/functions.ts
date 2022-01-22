import { AccountNumberData } from '../common';
import { ValidationState } from '../validation';

export const formatAccountNumbers = (
    accountNumbers: AccountNumberData[],
): AccountNumberData[] => {
    return accountNumbers.map((x) => ({
        ...x,
        humanReadableString: getHumanReadableString(x),
    }));
};

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
        case ValidationState.ILLEGIBLE:
            return `${digits.map((x) => (x != null ? x : '?')).join('')} ILL`;
        default:
            return 'ERROR';
    }
};

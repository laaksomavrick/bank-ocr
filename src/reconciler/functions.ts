import { AccountNumberData } from '../common';

/**
 * For all ERR or ILL account numbers
 * - ADD or REMOVE just one pipe or underscore
 * - Check if is a valid number
 * - Check if checksum is OK
 * - If both of these conditions, add to AMB array
 * - If AMB.length === 1, use that, report as OK
 * - If AMB.length > 1, report as AMB
 * - If AMB.length === 0, report ILL
 */

export const reconcileAccountNumbers = (
    accountNumbers: AccountNumberData[],
): AccountNumberData[] => {
    return [];
};

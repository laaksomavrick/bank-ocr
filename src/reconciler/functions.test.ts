import { join } from 'path';
import { ValidationState } from '../validation';
import { reconcileAccountNumber, reconcileAccountNumbers } from './functions';
import { readAccountsFile } from '../io';
import { AccountNumberData } from '../common';

describe('Reconciler', () => {
    const unambErrAccNumberPath = join(
        __dirname,
        '..',
        '..',
        'sample',
        'use_case_4',
        'unambiguous_err',
    );

    const unambIllAccNumberPath = join(
        __dirname,
        '..',
        '..',
        'sample',
        'use_case_4',
        'unambiguous_ill',
    );

    let unambErrAccNumber: Buffer;
    let unambIllAccNumber: Buffer;

    beforeAll(async () => {
        unambErrAccNumber = await readAccountsFile(unambErrAccNumberPath);
        unambIllAccNumber = await readAccountsFile(unambIllAccNumberPath);
    });

    describe('reconcileAccountNumbers', () => {
        it('reconciles ERR and ILL account numbers', () => {
            const errAccNumber = {
                buffer: unambErrAccNumber,
                digits: [1, 1, 1, 1, 1, 1, 1, 1, 1],
                validationState: ValidationState.ERROR,
            };
            const illAccNumber = {
                buffer: unambIllAccNumber,
                digits: [null, 1, 1, 1, 1, 1, 1, 1, 1],
                validationState: ValidationState.ILLEGIBLE,
            };
            const validAccNumber = {
                buffer: Buffer.from('foo', 'utf8'),
                digits: [3, 4, 5, 8, 8, 2, 8, 6, 5],
                validationState: ValidationState.OK,
            };

            const accountNumbers: AccountNumberData[] = [
                errAccNumber,
                illAccNumber,
                validAccNumber,
            ];

            const reconciled = reconcileAccountNumbers(accountNumbers);

            expect(reconciled.length).toBe(3);
        });
    });

    describe('reconcileAccountNumber', () => {
        it('throws when no buffer exists for an account number', () => {
            const accountNumber = {
                digits: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            };

            expect(() => reconcileAccountNumber(accountNumber)).toThrowError();
        });

        it('throws when account number validation state is not ERR or ILL', () => {
            const accountNumber = {
                buffer: Buffer.from('', 'utf8'),
                digits: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                validationState: ValidationState.OK,
            };

            expect(() => reconcileAccountNumber(accountNumber)).toThrowError();
        });

        it('can reconcile an unambiguous account number with an ERR state', async () => {
            const accountNumber = {
                buffer: unambErrAccNumber,
                digits: [1, 1, 1, 1, 1, 1, 1, 1, 1],
                validationState: ValidationState.ERROR,
            };

            const reconciled = reconcileAccountNumber(accountNumber);

            expect(reconciled.digits).toEqual([7, 1, 1, 1, 1, 1, 1, 1, 1]);
            expect(reconciled.validationState).toEqual(ValidationState.OK);
        });

        it('can reconcile an unambiguous account number with an ILL state', async () => {
            const accountNumber = {
                buffer: unambIllAccNumber,
                digits: [null, 1, 1, 1, 1, 1, 1, 1, 1],
                validationState: ValidationState.ILLEGIBLE,
            };

            const reconciled = reconcileAccountNumber(accountNumber);

            expect(reconciled.digits).toEqual([7, 1, 1, 1, 1, 1, 1, 1, 1]);
            expect(reconciled.validationState).toEqual(ValidationState.OK);
        });

        it('can reconcile an ambiguous account number with an ERR state', async () => {
            const filepath = join(
                __dirname,
                '..',
                '..',
                'sample',
                'use_case_4',
                'ambiguous_err',
            );
            const buffer = await readAccountsFile(filepath);

            const accountNumber = {
                buffer,
                digits: [8, 8, 8, 8, 8, 8, 8, 8, 8],
                validationState: ValidationState.ERROR,
            };

            const reconciled = reconcileAccountNumber(accountNumber);
            const [firstPos, secondPos, thirdPos] = reconciled.possibilities;

            expect(reconciled.digits).toEqual([8, 8, 8, 8, 8, 8, 8, 8, 8]);
            expect(reconciled.validationState).toEqual(
                ValidationState.AMBIGUOUS,
            );
            expect(firstPos).toEqual([8, 8, 8, 8, 8, 6, 8, 8, 8]);
            expect(secondPos).toEqual([8, 8, 8, 8, 8, 8, 8, 8, 0]);
            expect(thirdPos).toEqual([8, 8, 8, 8, 8, 8, 9, 8, 8]);
        });
    });
});

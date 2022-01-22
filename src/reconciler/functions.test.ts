import { join } from 'path';
import { ValidationState } from '../validation';
import { reconcileAccountNumber } from './functions';
import { readAccountsFile } from '../io';

describe('Reconciler', () => {
    describe('reconcileAccountNumbers', () => {
        it.todo('reconciles account numbers');
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
            const filepath = join(
                __dirname,
                '..',
                '..',
                'sample',
                'use_case_4',
                'unambiguous_err',
            );
            const buffer = await readAccountsFile(filepath);

            const accountNumber = {
                buffer,
                digits: [1, 1, 1, 1, 1, 1, 1, 1, 1],
                validationState: ValidationState.ERROR,
            };

            const reconciled = reconcileAccountNumber(accountNumber);

            expect(reconciled.digits).toEqual([7, 1, 1, 1, 1, 1, 1, 1, 1]);
            expect(reconciled.validationState).toEqual(ValidationState.OK);
        });

        it('can reconcile an unambiguous account number with an ILL state', async () => {
            const filepath = join(
                __dirname,
                '..',
                '..',
                'sample',
                'use_case_4',
                'unambiguous_ill',
            );
            const buffer = await readAccountsFile(filepath);

            const accountNumber = {
                buffer,
                digits: [null, 1, 1, 1, 1, 1, 1, 1, 1],
                validationState: ValidationState.ILLEGIBLE,
            };

            const reconciled = reconcileAccountNumber(accountNumber);

            expect(reconciled.digits).toEqual([7, 1, 1, 1, 1, 1, 1, 1, 1]);
            expect(reconciled.validationState).toEqual(ValidationState.OK);
        });

        it.todo('can reconcile an ambiguous account number with an ERR state');
        it.todo('can reconcile an ambiguous account number with an ILL state');
    });
});

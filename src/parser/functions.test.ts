import { join } from 'path';
import { readAccountsFile } from '../io';
import { parseAccountNumbersFrom, validateFile } from './functions';

describe('Parser', () => {
    describe('validateFile', () => {
        it('validates an account number file', async () => {
            const filepath = join(__dirname, '..', '..', 'sample', '111111111');
            const accountNumberFileBuffer = await readAccountsFile(filepath);

            const isValid = validateFile(accountNumberFileBuffer);

            expect(isValid).toBeTruthy();
        });

        it('invalidates an invalid account number file', () => {
            const invalidAccountNumberFileBuffer = Buffer.from('foo', 'utf8');

            const isValid = validateFile(invalidAccountNumberFileBuffer);

            expect(isValid).toBeFalsy();
        });
    });

    describe('parseAccountNumbersFrom', () => {
        it('parses an account number file with every digit', async () => {
            const filepath = join(
                __dirname,
                '..',
                '..',
                'sample',
                '123456789_123456780',
            );
            const accountNumberFileBuffer = await readAccountsFile(filepath);

            const accountNumberData = parseAccountNumbersFrom(
                accountNumberFileBuffer,
            );
            const [accountOne, accountTwo] = accountNumberData;

            expect(accountOne.digits).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
            expect(accountTwo.digits).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 0]);
        });
    });
});

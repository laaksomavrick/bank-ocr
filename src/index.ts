import { join } from 'path';
import { readAccountsFile } from './io';
import { parseAccountNumbersFrom } from './parser';
import { isError } from './util';
import { validateAccountNumbers } from './validation';

const main = async () => {
    try {
        const args = process.argv;

        if (args.length !== 3) {
            throw new Error(
                'Error parsing arguments. Please specify only one path to a file, e.g. ./bankOcr accountNumbers.txt',
            );
        }

        const [accountsFilePath] = process.argv.slice(2);
        const filepath = join(accountsFilePath);

        const file = await readAccountsFile(filepath);

        let accountNumbers = parseAccountNumbersFrom(file);
        accountNumbers = validateAccountNumbers(accountNumbers);

        console.log(accountNumbers);
    } catch (e) {
        if (isError(e)) {
            console.error(e.message);
        } else {
            console.error('Oops! Something went wrong.');
        }
    }
};

main();

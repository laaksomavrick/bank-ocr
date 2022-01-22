import { join } from 'path';
import { readAccountsFile } from './io/functions';
import { parseAccountNumbersFrom } from './parser';
import { isError } from './util';

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

        const accountNumbers = parseAccountNumbersFrom(file);

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

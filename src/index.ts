import { join } from 'path';
import { formatAccountNumbers } from './formatting';
import { readAccountsFile } from './io';
import { writeAccountNumberDataToFile } from './io/functions';
import { parseAccountNumbersFrom } from './parser';
import { isError } from './util';
import { validateAccountNumbers } from './validation';

const main = async () => {
    try {
        const args = process.argv;

        if (args.length !== 4) {
            throw new Error(
                'Error parsing arguments. Please specify an input and outputh path e.g. ./bankOcr inputFilePath outputFilePath',
            );
        }

        const [readPath] = process.argv.slice(2);
        const [writePath] = process.argv.slice(3);

        const file = await readAccountsFile(readPath);

        let accountNumbers = parseAccountNumbersFrom(file);
        accountNumbers = validateAccountNumbers(accountNumbers);
        accountNumbers = formatAccountNumbers(accountNumbers);

        await writeAccountNumberDataToFile(accountNumbers, writePath);
    } catch (e) {
        if (isError(e)) {
            console.error(e.message);
        } else {
            console.error('Oops! Something went wrong.');
        }
    }
};

main();

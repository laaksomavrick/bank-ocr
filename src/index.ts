import { readFile } from 'fs/promises';
import { join } from 'path';
import { parseAccountNumber, validateFile } from './parser';

const main = async () => {
    const args = process.argv;

    if (args.length !== 3) {
        throw new Error(
            'Error parsing arguments. Please specify only one path to a file, e.g. ./bankOcr accountNumbers.txt',
        );
    }

    const [accountsFilePath] = process.argv.slice(2);

    const filepath = join(__dirname, '..', accountsFilePath);
    const file = await readFile(filepath);

    const isFileValid = validateFile(file);

    if (isFileValid === false) {
        throw new Error(
            'Invalid input provided - inputs must be compromised of whitespace, newlines, pipes, or underscores.',
        );
    }

    const accountNumber = parseAccountNumber(file);

    console.log(accountNumber);
};

try {
    main();
} catch (e) {
    console.error(e);
}

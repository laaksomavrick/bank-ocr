import { readFile } from 'fs/promises';
import { createWriteStream } from 'fs';
import { validateFile } from '../parser';
import { AccountNumberData } from '../common';

/**
 * Read and validate a given account number file via the provided path
 * @param path The path to the account number file
 * @returns {Buffer} The byte array representation of the file
 */
export const readAccountsFile = async (path: string): Promise<Buffer> => {
    const file = await readFile(path);

    const isFileValid = validateFile(file);

    if (isFileValid === false) {
        throw new Error(
            'Invalid input provided - inputs must be compromised of whitespace, newlines, pipes, or underscores.',
        );
    }

    return file;
};

export const writeAccountNumberDataToFile = (
    accountNumbers: AccountNumberData[],
    outputhPath: string,
): Promise<void> => {
    const writeStream = createWriteStream(outputhPath);

    for (const accNumber of accountNumbers) {
        const toWrite = accNumber.humanReadableString;
        writeStream.write(toWrite, 'utf8');
        writeStream.write('\n', 'utf8');
    }

    return Promise.resolve();
};

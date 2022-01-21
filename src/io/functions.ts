import { readFile } from 'fs/promises';
import { validateFile } from '../parser';

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
}
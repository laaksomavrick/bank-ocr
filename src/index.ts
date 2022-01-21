import { readFile } from 'fs/promises';
import { join } from 'path';
import { INPUTS, VALID_BYTE_CHARACTERS } from './parser';

/**
 * 27 characters + a newline character
 */
const LINE_LENGTH = 28;
const DIGIT_LENGTH = 3;

const parseAccountNumber = (file: Buffer): Array<number | null> => {

    // Acc numbers are 4 lines each
    // Acc numbers are 27 characters in length 
    // Acc numbers have 9 digits

    let agg = [];

    // First number
    // 0..3 (0, 1, 2, 3)
    // 26..29 (26, 27, 28, 29)
    // 52..55 (52, 53, 54, 55)
    // 78..81 (78, 79, 80, 81)

    // Second number
    // 4..7 (4, 5, 6, 7)


    for (let i = 0; i < LINE_LENGTH - 1; i += DIGIT_LENGTH) {
        const firstLineByteIndex = i;
        const secondLineByteIndex = i + LINE_LENGTH;
        const thirdLineByteIndex = i + (LINE_LENGTH * 2);
        const fourthLineByteIndex = i + (LINE_LENGTH * 3);

        const firstLineChunk = file.slice(firstLineByteIndex, firstLineByteIndex + DIGIT_LENGTH)
        const secondLineChunk = file.slice(secondLineByteIndex, secondLineByteIndex + DIGIT_LENGTH)
        const thirdLineChunk = file.slice(thirdLineByteIndex, thirdLineByteIndex + DIGIT_LENGTH)
        const fourthLineChunk = file.slice(fourthLineByteIndex, fourthLineByteIndex + DIGIT_LENGTH)

        const chunks = [firstLineChunk, secondLineChunk, thirdLineChunk, fourthLineChunk];
        const chunk = Buffer.concat(chunks);

        const match = parseAccountNumberDigit(chunk);

        agg.push(match);

    }

    return agg;
}

const parseAccountNumberDigit = (chunk: Buffer): number | null => {
    for (const input of INPUTS)
    {
        const match = chunk.equals(input.hex)

        if (match === true) {
            return input.number;
        } 
    }

    return null;
}

const main = async () => {

    const args = process.argv;

    if (args.length !== 3)
    {
        throw new Error("Error parsing arguments. Please specify only one path to a file, e.g. ./bankOcr accountNumbers.txt")
    }

    const [accountsFile] = process.argv.slice(2);

    const filepath = join(__dirname, '..', accountsFile);
    const file = await readFile(filepath);

    const isFileValid = file.every(byte => VALID_BYTE_CHARACTERS.includes(byte));

    if (isFileValid === false)
    {
        throw new Error("Invalid input provided - inputs must be compromised of whitespace, newlines, pipes, or underscores.")
    }

    const accountNumber = parseAccountNumber(file);

    console.log(accountNumber);

}

try {
    main();
} catch (e) {
    console.error(e);
}

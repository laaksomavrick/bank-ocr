import { INPUTS, VALID_BYTE_CHARACTERS } from './constants';

/**
 * 27 characters and a newline character
 */
const LINE_LENGTH = 28;

/**
 * The length of a line entry for a digit
 */
const DIGIT_LINE_LENGTH = 3;

/**
 * Parses an account number from a given Buffer.
 * @param accountNumberBytes An account number entry
 * @returns {(Array<number | null>)} An array representation of each digit of the account number. Null indicates a value which cannot be parsed (i.e., is invalid)
 */
export const parseAccountNumber = (
    accountNumberBytes: Buffer,
): Array<number | null> => {
    let agg = [];

    /**
      * General overview of this strategy:
      * We want to parse each digit as a "3x4" character slice sequentially in order to parse the account number.
      * Since our input data is a byte array of characters and we have known constraints around the input format (4 lines, 27 characters long)
      * we can use some math to find the relevant line entries for each digit.
      * 
      * For example:
      * 
      * First number indices
      * Line 1: 0..3 (0, 1, 2, 3)
      * Line 2: 26..29 (26, 27, 28, 29)
      * Line 3: 52..55 (52, 53, 54, 55)
      * Line 4: 78..81 (78, 79, 80, 81)
    
      * Second number indices
      * Line 1: 4..7 (4, 5, 6, 7)
      * Line 2: 30..33 (30, 31, 32, 33)
      * ..etc..
      * 
      * Then, we can compare the byte array representation of that number against the known byte array representation from a 
      * pre-defined constant. See /number-schemas for more information on those constants.
      * 
      * This strategy has a nice side-effect of retrying parsing against ERR or ILL inputs (user story #4) easier later on.
      */
    for (let i = 0; i < LINE_LENGTH - 1; i += DIGIT_LINE_LENGTH) {
        const firstLineByteIndex = i;
        const secondLineByteIndex = i + LINE_LENGTH;
        const thirdLineByteIndex = i + LINE_LENGTH * 2;
        const fourthLineByteIndex = i + LINE_LENGTH * 3;

        const firstLineChunk = accountNumberBytes.slice(
            firstLineByteIndex,
            firstLineByteIndex + DIGIT_LINE_LENGTH,
        );
        const secondLineChunk = accountNumberBytes.slice(
            secondLineByteIndex,
            secondLineByteIndex + DIGIT_LINE_LENGTH,
        );
        const thirdLineChunk = accountNumberBytes.slice(
            thirdLineByteIndex,
            thirdLineByteIndex + DIGIT_LINE_LENGTH,
        );
        const fourthLineChunk = accountNumberBytes.slice(
            fourthLineByteIndex,
            fourthLineByteIndex + DIGIT_LINE_LENGTH,
        );

        const chunks = [
            firstLineChunk,
            secondLineChunk,
            thirdLineChunk,
            fourthLineChunk,
        ];
        const chunk = Buffer.concat(chunks);

        const match = parseAccountNumberDigit(chunk);

        agg.push(match);
    }

    return agg;
};

export const parseAccountNumberDigit = (chunk: Buffer): number | null => {
    for (const input of INPUTS) {
        const match = chunk.equals(input.hex);

        if (match === true) {
            return input.number;
        }
    }

    return null;
};

export const validateFile = (file: Buffer) =>
    file.every((byte) => VALID_BYTE_CHARACTERS.includes(byte));

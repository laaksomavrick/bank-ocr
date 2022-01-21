import { INPUTS, VALID_BYTE_CHARACTERS } from "./constants";

/**
 * 27 characters + a newline character
 */
 const LINE_LENGTH = 28;

 /**
  * The length of a line entry for a digit
  */
 const DIGIT_LINE_LENGTH = 3;
 
export const parseAccountNumber = (file: Buffer): Array<number | null> => {
 
     let agg = [];
 
     // First number
     // 0..3 (0, 1, 2, 3)
     // 26..29 (26, 27, 28, 29)
     // 52..55 (52, 53, 54, 55)
     // 78..81 (78, 79, 80, 81)
 
     // Second number
     // 4..7 (4, 5, 6, 7)
 
 
     for (let i = 0; i < LINE_LENGTH - 1; i += DIGIT_LINE_LENGTH) {
         const firstLineByteIndex = i;
         const secondLineByteIndex = i + LINE_LENGTH;
         const thirdLineByteIndex = i + (LINE_LENGTH * 2);
         const fourthLineByteIndex = i + (LINE_LENGTH * 3);
 
         const firstLineChunk = file.slice(firstLineByteIndex, firstLineByteIndex + DIGIT_LINE_LENGTH)
         const secondLineChunk = file.slice(secondLineByteIndex, secondLineByteIndex + DIGIT_LINE_LENGTH)
         const thirdLineChunk = file.slice(thirdLineByteIndex, thirdLineByteIndex + DIGIT_LINE_LENGTH)
         const fourthLineChunk = file.slice(fourthLineByteIndex, fourthLineByteIndex + DIGIT_LINE_LENGTH)
 
         const chunks = [firstLineChunk, secondLineChunk, thirdLineChunk, fourthLineChunk];
         const chunk = Buffer.concat(chunks);
 
         const match = parseAccountNumberDigit(chunk);
 
         agg.push(match);
 
     }
 
     return agg;
 }
 
 export const parseAccountNumberDigit = (chunk: Buffer): number | null => {
     for (const input of INPUTS)
     {
         const match = chunk.equals(input.hex)
 
         if (match === true) {
             return input.number;
         } 
     }
 
     return null;
 }


 export const validateFile = (file: Buffer) => file.every(byte => VALID_BYTE_CHARACTERS.includes(byte));
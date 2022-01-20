import { readFile } from 'fs/promises';
import { join } from 'path';
import { INPUTS } from './ascii';

const parseAccountNumber = (file: Buffer): Array<number | null> => {
    let agg = [];

    for (let i = 0; i < file.byteLength; i += 16)
    {
        const chunkStart = i;
        const chunkEnd = i + (16 - 1);

        const chunk = file.slice(chunkStart, chunkEnd); 
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

    const filepath = join(__dirname, '..', 'sample', '1');
    const file = await readFile(filepath);

    // TODO: defensive input (4 lines, 27 characters in each line)

    // iterate over file 16 bytes at a time
    // if match, num
    // if no match, discard for now

    const accountNumber = parseAccountNumber(file);

    console.log(accountNumber);

}

try {
    main();
} catch (e)
{
    console.error(e);
}
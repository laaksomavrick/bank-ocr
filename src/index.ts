import fs from 'fs/promises';
import path from 'path';

try {
    const filepath = path.join(__dirname, 'sample', '123456789');
    const file = await fs.readFile(filepath);
} catch (e)
{
    console.error(e);
}

// read file
// map file to integers
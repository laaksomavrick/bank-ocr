import { INPUT_EIGHT } from './number-schemas/eight';
import { INPUT_FIVE } from './number-schemas/five';
import { INPUT_FOUR } from './number-schemas/four';
import { INPUT_NINE } from './number-schemas/nine';
import { INPUT_ONE } from './number-schemas/one';
import { INPUT_SEVEN } from './number-schemas/seven';
import { INPUT_SIX } from './number-schemas/six';
import { INPUT_THREE } from './number-schemas/three';
import { INPUT_TWO } from './number-schemas/two';
import { INPUT_ZERO } from './number-schemas/zero';

export const WHITESPACE = 0x20;
export const NEWLINE = 0x0a;
export const PIPE = 0x7c;
export const UNDERSCORE = 0x5f;

export const VALID_BYTE_CHARACTERS = [WHITESPACE, NEWLINE, PIPE, UNDERSCORE];

export const INPUTS = [
    INPUT_ZERO,
    INPUT_ONE,
    INPUT_TWO,
    INPUT_THREE,
    INPUT_FOUR,
    INPUT_FIVE,
    INPUT_SIX,
    INPUT_SEVEN,
    INPUT_EIGHT,
    INPUT_NINE,
];

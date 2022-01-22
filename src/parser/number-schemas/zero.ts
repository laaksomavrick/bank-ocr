// prettier-ignore
const INPUT_ZERO_ASCII = [
    ' _ ',
    '| |',
    '|_|',
    '   '
  ].join('');

const INPUT_ZERO_HEX = Buffer.from(INPUT_ZERO_ASCII, 'utf8');

const INPUT_ZERO_NUM = 0;

export const INPUT_ZERO = {
    ascii: INPUT_ZERO_ASCII,
    hex: INPUT_ZERO_HEX,
    number: INPUT_ZERO_NUM,
};

// prettier-ignore
const INPUT_EIGHT_ASCII = [
    ' _ ',
    '|_|',
    '|_|',
    '   '
  ].join('');

const INPUT_EIGHT_HEX = Buffer.from(INPUT_EIGHT_ASCII, 'utf8');

const INPUT_EIGHT_NUM = 8;

export const INPUT_EIGHT = {
    ascii: INPUT_EIGHT_ASCII,
    hex: INPUT_EIGHT_HEX,
    number: INPUT_EIGHT_NUM,
};

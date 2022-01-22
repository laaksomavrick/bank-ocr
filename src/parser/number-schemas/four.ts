// prettier-ignore
const INPUT_FOUR_ASCII = [
    '   ',
    '|_|',
    '  |',
    '   '
  ].join('');

const INPUT_FOUR_HEX = Buffer.from(INPUT_FOUR_ASCII, 'utf8');

const INPUT_FOUR_NUM = 4;

export const INPUT_FOUR = {
    ascii: INPUT_FOUR_ASCII,
    hex: INPUT_FOUR_HEX,
    number: INPUT_FOUR_NUM,
};

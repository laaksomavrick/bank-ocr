// prettier-ignore
const INPUT_FIVE_ASCII = [
    ' _ ',
    '|_ ',
    ' _|',
    '   '
  ].join('');

const INPUT_FIVE_HEX = Buffer.from(INPUT_FIVE_ASCII, 'utf8');

const INPUT_FIVE_NUM = 5;

export const INPUT_FIVE = {
    ascii: INPUT_FIVE_ASCII,
    hex: INPUT_FIVE_HEX,
    number: INPUT_FIVE_NUM,
};

// prettier-ignore
const INPUT_TWO_ASCII = [
    ' _ ',
    ' _|',
    '|_ ',
    '   '
  ].join('');

const INPUT_TWO_HEX = Buffer.from(INPUT_TWO_ASCII, 'utf8');

const INPUT_TWO_NUM = 2;

export const INPUT_TWO = {
    ascii: INPUT_TWO_ASCII,
    hex: INPUT_TWO_HEX,
    number: INPUT_TWO_NUM,
};

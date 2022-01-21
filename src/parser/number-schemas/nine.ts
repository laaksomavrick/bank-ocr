// prettier-ignore
const INPUT_NINE_ASCII = [
    ' _ ',
    '|_|',
    ' _|',
    '   '
  ].join('');

const INPUT_NINE_HEX = Buffer.from(INPUT_NINE_ASCII, 'utf8');

const INPUT_NINE_NUM = 9;

export const INPUT_NINE = {
    ascii: INPUT_NINE_ASCII,
    hex: INPUT_NINE_HEX,
    number: INPUT_NINE_NUM,
};

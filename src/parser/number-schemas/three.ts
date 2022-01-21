// prettier-ignore
const INPUT_THREE_ASCII = [
    ' _ ',
    ' _|',
    ' _|',
    '   '
  ].join('');

const INPUT_THREE_HEX = Buffer.from(INPUT_THREE_ASCII, 'utf8');

const INPUT_THREE_NUM = 3;

export const INPUT_THREE = {
    ascii: INPUT_THREE_ASCII,
    hex: INPUT_THREE_HEX,
    number: INPUT_THREE_NUM,
};

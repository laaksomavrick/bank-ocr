// prettier-ignore
const INPUT_SEVEN_ASCII = [
    ' _ ',
    '  |',
    '  |',
    '   '
  ].join('');

const INPUT_SEVEN_HEX = Buffer.from(INPUT_SEVEN_ASCII, 'utf8');

const INPUT_SEVEN_NUM = 7;

export const INPUT_SEVEN = {
    ascii: INPUT_SEVEN_ASCII,
    hex: INPUT_SEVEN_HEX,
    number: INPUT_SEVEN_NUM,
};

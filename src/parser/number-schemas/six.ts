// prettier-ignore
const INPUT_SIX_ASCII = [
    ' _ ',
    '|_ ',
    '|_|',
    '   '
  ].join('');

const INPUT_SIX_HEX = Buffer.from(INPUT_SIX_ASCII, 'utf8');

const INPUT_SIX_NUM = 6;

export const INPUT_SIX = {
    ascii: INPUT_SIX_ASCII,
    hex: INPUT_SIX_HEX,
    number: INPUT_SIX_NUM,
};

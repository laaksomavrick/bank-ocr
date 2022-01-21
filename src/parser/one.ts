const INPUT_ONE_ASCII = [
  '   ',
  '  |',
  '  |',
  '   '
].join('')

const INPUT_ONE_HEX = Buffer.from(INPUT_ONE_ASCII, 'utf8')

const INPUT_ONE_NUM = 1;

export const INPUT_ONE = {
  ascii: INPUT_ONE_ASCII,
  hex: INPUT_ONE_HEX,
  number: INPUT_ONE_NUM
}
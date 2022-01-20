const WHITESPACE = 0x20
const NEWLINE = 0x0a
const PIPE = 0x7c;

export const INPUT_ONE_ASCII =
`   
  |
  |
   `

export const INPUT_ONE_HEX = Buffer.from(INPUT_ONE_ASCII, 'utf8')

export const INPUT_ONE_NUM = 1;

export const INPUT_ONE = {
  ascii: INPUT_ONE_ASCII,
  hex: INPUT_ONE_HEX,
  number: INPUT_ONE_NUM
}

export interface InputData {
  ascii: string;
  hex: Buffer;
  number: number;
}

export const INPUTS = [INPUT_ONE]

// export const INPUT_TWO =
// ` _ 
//  _| 
// |_ 
   
// `

// export const INPUT_THREE =
// ` _ 
//  _|
//  _|
   
// `
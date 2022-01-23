# Bank-kata

A simple cli made with the intention of solving the [Bank OCR](http://codingdojo.org/kata/BankOCR/) code kata.

## How do I use this?

`./bankOcrBinary INPUT_FILE_PATH OUTPUT_FILE_PATH`

## How do I dev on this?

This project has the following development environment dependencies:
* `yarn`
* `nodejs 16` - you can use `nvm` or `fnm` given the existence of a `.nvmrc`

In order to set up the environment, follow these steps:
* `git clone` the repository
* `nvm use` (optional)
* `yarn`

Code formatting exists as a pre-commit hook.

To run the tests, run the following command:
* `yarn test`

To run the program, run the following command:
* `yarn start INPUT_FILE_PATH OUTPUT_FILE_PATH`

A number of sample files exist for manual testing purposes in the `sample/` directory

## How do I distribute this?

A binary can be distributed via the `pkg` package. After going through the dev environment setup, run the following command:

* `yarn package`

This will build the program and package it into a binary which can be freely distributed on `macos`, `linux` and `windows`. Observe the `out` directory for the binaries.
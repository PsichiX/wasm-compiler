#!/usr/bin/env node
import yargs from 'yargs';
import fs from 'fs';
import { wat2wasm, wasm2wat } from './index';

const args = yargs
  .usage('Usage: wasmc [options]')
  .describe('i', 'Input file path')
  .describe('o', 'Output file path')
  .describe('s', 'Silent')
  .describe('p', 'Pretty output')
  .describe('m', 'Compilation mode')
  .describe('t', 'Print error stack trace')
  .describe('e', 'Log explained WASM output')
  .describe('d', 'Debug symbols')
  .boolean([
    'help',
    'silent',
    'pretty',
    'trace',
    'explain',
    'debug',
  ])
  .string([
    'input',
    'output'
  ])
  .default('m', 'wat-wasm')
  .alias('v', 'version')
  .alias('h', 'help')
  .alias('i', 'input')
  .alias('o', 'output')
  .alias('s', 'silent')
  .alias('p', 'pretty')
  .alias('m', 'mode')
  .alias('t', 'trace')
  .alias('e', 'explain')
  .alias('d', 'debug')
  .demandOption([ 'i', 'o' ])
  .help('h')
  .epilog('Copyright (c) 2018')
  .argv;

function compile(filename, source, mode, args) {
  if (mode === 'wat-wasm') {
    return wat2wasm(filename, source.toString('utf8'), args);
  } else if (mode === 'wasm-wat') {
    return wasm2wat(source, args);
  } else {
    throw new Error(`Unknown compilation mode: ${mode}`);
  }
}

const { input, output, silent, mode, trace } = args;
if (!fs.existsSync(input)) {
  throw new Error(`File does not exists: ${input}`);
}
compile(input, fs.readFileSync(input), mode, args)
  .then(result => fs.writeFileSync(output, Buffer.from(result)))
  .catch(e => !silent && console.error(!!trace ? e : e.message));

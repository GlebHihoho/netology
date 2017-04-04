'use strict';

// Домашнее задание к лекции 1.4 «Потоки Stream»
// Часть 1

const fs        = require(`fs`);
const crypto    = require('crypto');

const hash      = crypto.createHash('MD5');
const input     = fs.createReadStream(__filename);
const output    = fs.createWriteStream('first.txt');
const outputHex = fs.createWriteStream('second.txt');

input.on('error', err => console.error(`Error with "createReadStream". ${err}`));
output.on('error', err => console.error(`Error with "createWriteStream". ${err}`));

input.pipe(hash).pipe(process.stdout);
input.pipe(hash).pipe(output);

// Часть 2

const Transform = require('stream').Transform;

class Trans extends Transform {
  constructor(value) {
    super(value);
  }

  _transform(chunk, enencodingc, cb) {
    const dataHex = chunk.toString('hex');
    this.push(dataHex);
    cb();
  }
}

input.pipe(hash).pipe(new Trans).pipe(process.stdout);
input.pipe(hash).pipe(new Trans).pipe(output);

// Дополнительное задание

const Readable  = require('stream').Readable;
const Writable  = require('stream').Writable;

const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

class Read extends Readable {
  constructor(value) {
    super(value);
  }

  _read() {
    const random = randomRange(1, 10);
    const str = random.toString();
    this.push(str);
  }
}

class Write extends Writable {
  constructor(value) {
    super(value);
  }

  _write(chunk, enc, cb) {
    const data = chunk.toString();
    console.log(data);
    cb();
  }
}

class NewTrans extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, enc, cb) {
    setTimeout(() => {
      const toNumber = Number(chunk);
      const sqr = Math.pow(toNumber, 5);
      const data = sqr.toString();
      this.push(data);
      cb();
    }, 1000);
  }
}

const read  = new Read();
const write = new Write();
const trans = new NewTrans();

read.pipe(trans).pipe(write);

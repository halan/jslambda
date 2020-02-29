#!/usr/bin/env node

const lambda = require("./lambda");
const compute = require("./compute");

let data = "";

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {
  data += chunk;
});

process.stdin.on('end', function() {
  console.log(compute(lambda.parse(data)));
  process.exit();
});

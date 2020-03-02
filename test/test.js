const fs = require("fs");
const grammar = fs.readFileSync("./lambda.pegjs", "utf8");
const peg = require("pegjs");
const parser = peg.generate(grammar);
const compute = require("../compute");
const { expect } = require("chai");

describe("Lambda compiler", () => {
  const execute = code =>
    compute(parser.parse(code))

  it("\\x.x -> λx.x", () => {
    expect(execute("\\x.x"))
      .to.equal("λx.x");
  });

  it("(\\x.x \\y.\\x.x) -> λy.λx.x", () => {
    expect(execute("(\\x.x \\y.\\x.x)"))
      .to.equal("λy.λx.x");
  });

  it("(\\x.x anything) -> anything", () => {
    expect(execute("(\\x.x anything)"))
      .to.equal("anything");
  });

  it("def true = \\x.x def false = \\y.\\x.x (true false) -> false", () => {
    expect(execute("def true = \\x.x def false = \\y.\\x.x (true false)"))
      .to.equal("false");
  });

  it.skip("def true = \\y.y def false = \\y.\\x.x (false false) -> true", () => {
    // TODO
    expect(execute("def true = \\y.y def false = \\y.\\x.x (false false)"))
      .to.equal("true"); // it's returning λx.x
    // λx.x should to be equal λy.y
  });
});

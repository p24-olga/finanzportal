const {format} = require('../src/formatter');
var assert = require('assert');

describe("number formatting", () => {
  it("it handles undefined", () => {
    assert.equal("0,00", format(undefined));
  })
  it("returns 2 decimal points by default", () => {
    assert.equal("2,56", format(2.555));
  })
  it("returns specified number of decimal points", () => {
    assert.equal("10.000,556", format(10000.5555, 3));
  })
  it("it works with default separators", () => {
    assert.equal("100.000,28", format(100000.28374, 2, ",", "."));
  })
  it("it allows to override separators", () => {
    assert.equal("100,000.6", format(100000.55555, 1, ".", ","));
  })
  it("works on a very large number of decimal points", () => {
    assert.equal("1,5550000000", format(1.555, 10, ",", "."));
  })
  it("works with negative numbers", () => {
    assert.equal("-1,5555", format(-1.55555, 4));
  })
  it("with with strings of negative numbers", () => {
    assert.equal("-1,5555", format("-1.55555", 4));
  })
  it("does not round when specified", () => {
    assert.equal("1,555", format(1.55555, 3, ",", ".", false));
  })
  it("does not round even if it is close", () => {
    assert.equal("1,999", format(1.999, 3, ",", ".", false));
  })
  it('rounds the number by default', () => {
    assert.equal("1,56", format("1.5555", 2));
  })
})

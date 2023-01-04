const toCaseValues = ['SNAKE', 'KEBAB', 'CAMEL', 'PASCAL', 'UPPER'];

function toCaseValidator(value) {
  if (value) {
    if (toCaseValues.some(item => item === value)) {
      return true;
    }

    return false;
  }
};

module.exports = { toCaseValidator };

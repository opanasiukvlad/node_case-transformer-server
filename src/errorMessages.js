const textIsMissingError = {
  message: 'Text to convert is required. Correct request is: '
  + '"/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
};

const toCaseIsMissingError = {
  message: '"toCase" query param is required. Correct request '
 + 'is: "/<TEXT_TO_CONVERT>?toCase=<CASE_NAME>".',
};

const toCaseValueError = {
  message: 'This case is not supported. Available '
 + 'cases: SNAKE, KEBAB, CAMEL, PASCAL, UPPER.',
};

module.exports = { textIsMissingError, toCaseIsMissingError, toCaseValueError };

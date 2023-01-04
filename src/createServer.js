// Write code here
// Also, you can create additional files in the src folder
// and import (require) them here
const http = require('http');
const { toCaseValidator } = require('./toCaseValidator');
const {
  textIsMissingError,
  toCaseIsMissingError,
  toCaseValueError,
} = require('./errorMessages');
const { convertToCase } = require('./convertToCase/index');

function createServer() {
  const server = http.createServer((req, res) => {
    const queryBody = req.url.split('?')[0].slice(1);
    const queryParams = new URLSearchParams(req.url.split('?')[1]);

    const toCase = queryParams.get('toCase');
    const isCaseValid = toCaseValidator(toCase);

    const arrayWithErrors = [];
    const errorPayload = { errors: arrayWithErrors };

    // response header
    res.setHeader('Content-Type', 'application/json');

    // 200 response code
    if (queryBody && isCaseValid) {
      const { originalCase, convertedText } = convertToCase(
        queryBody,
        toCase,
      );

      res.statusCode = 200;
      res.statusMessage = 'OK';

      const responsePayload = {
        originalCase,
        targetCase: toCase,
        originalText: queryBody,
        convertedText,
      };

      res.end(JSON.stringify(responsePayload));
    }

    // collecting errors
    if (!queryBody) {
      arrayWithErrors.push(textIsMissingError);
    }

    if (!toCase) {
      arrayWithErrors.push(toCaseIsMissingError);
    }

    if (!isCaseValid && toCase) {
      arrayWithErrors.push(toCaseValueError);
    }

    // 400 response code
    if (arrayWithErrors.length > 0) {
      res.statusCode = 400;
      res.statusMessage = 'Bad request';

      res.end(JSON.stringify(errorPayload));
    }
  });

  return server;
}

module.exports = { createServer };

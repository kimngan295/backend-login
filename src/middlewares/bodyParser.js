import bodyParser from 'body-parser';

const { json, urlencoded } = bodyParser;
export const bodyParserMiddleware = json();
export const bodyParserMiddlewareUrlencoded = urlencoded({ extended: true });
import config from './config';
import logger from './logger';

import app from './app';

// exports for the library
export * from './lib';

let port;
process.argv.forEach((value, _) => {
  if (value.split('=')[0] === 'port') {
    port = value.split('=')[1];
  }
});
if (port === undefined) {
  port = config.PORT;
}


app.listen(port, '0.0.0.0', () => {
  logger.info(`🚀 Server ready at http://0.0.0.0:${port}`);
});

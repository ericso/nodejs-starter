import express from 'express';

import config from './config';
import logger from './logger';

// exports for the library
export * from './lib';


const app = express();

// health check api for liveness probe
app.get('/health', (_, res) => res.send('Still alive.'));


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

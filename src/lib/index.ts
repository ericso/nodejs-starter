import logger from '../logger';

type HelloResponse = {
  text: string,
};

/**
 * The usual hello world.
 *
 * @returns string: a greeting
 */
export function greet(): HelloResponse {
  logger.info(`hello world`);
  
  return {
    text: 'hello world',
  };
}
// tslint:disable:no-expression-statement
import test from 'ava';
import { greet } from '.';

test('greeting', async t => {
  t.deepEqual(greet(), { text: 'hello world' });
});

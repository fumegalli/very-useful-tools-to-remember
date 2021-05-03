import * as database from '../src/database';

beforeAll(async () => {
  await database.connect();
});

afterAll(async () => {
  await database.close();
});

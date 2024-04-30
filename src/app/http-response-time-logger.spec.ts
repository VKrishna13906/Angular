import { HttpResponseTimeLogger } from './http-response-time-logger';

describe('HttpResponseTimeLogger', () => {
  it('should create an instance', () => {
    expect(new HttpResponseTimeLogger()).toBeTruthy();
  });
});

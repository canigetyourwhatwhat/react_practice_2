import {randomInt, format, convert} from '../src/helper';

test('The output is within the range', () => {
  const result = randomInt(-30, 20);
  expect(result).toBeGreaterThanOrEqual(-30);
  expect(result).toBeLessThanOrEqual(20);
});

test('The output of temperature is well-formatted', () => {
  const result = format(30);
  expect(result).toBe('30°C');
});

test('converted to F from C', () => {
  const result = convert(10);
  expect(result).toBe('50.00');
});

import test from 'ava';
import { objectContainsFields } from './object';

test('objectContainsFields success with same key and value', t => {
  const a = { a: 1, b: 2, c: 3 };
  const b = { a: 1, b: 2 };
  const bInA = objectContainsFields(a, b);
  t.is(bInA, true);
});

test('objectContainsFields fail with different key', t => {
  const a = { a: 1, b: 2, c: 3 };
  const b = { z: 3, y: 5 };
  const bInA = objectContainsFields(a, b);
  t.is(bInA, false);
});

test('objectContainsFields fail with same key but diff value', t => {
  const a = { a: 1, b: 2, c: 3 };
  const b = { a: 3, b: 4 };
  const bInA = objectContainsFields(a, b);
  t.is(bInA, false);
});

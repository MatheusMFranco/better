import {sort, gameFormat, numberFormat} from '../FormatUtils';

describe('FormatUtils functions', () => {
  describe('sort', () => {
    test('should sort an array of numbers as strings in ascending order', () => {
      const numbers = ['10', '02', '03', '01'];
      expect(sort(numbers)).toEqual(['01', '02', '03', '10']);
    });

    test('should return an empty array when given an empty array', () => {
      expect(sort([])).toEqual([]);
    });
  });

  describe('gameFormat', () => {
    test('should return a string of sorted numbers joined by spaces', () => {
      const numbers = ['10', '02', '03', '01'];
      expect(gameFormat(numbers)).toBe('01 02 03 10');
    });

    test('should return an empty string when given an empty array', () => {
      expect(gameFormat([])).toBe('');
    });
  });

  describe('numberFormat', () => {
    test('should format a single-digit number with leading zero', () => {
      expect(numberFormat(5)).toBe('05');
    });

    test('should format a two-digit number without modification', () => {
      expect(numberFormat(15)).toBe('15');
    });

    test('should format a number greater than two digits without modification', () => {
      expect(numberFormat(123)).toBe('123');
    });
  });
});

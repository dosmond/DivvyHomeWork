import { removeCommas, addCommas, toRomanNumerals } from '../src/common/common.js'

test('Roman Numerals', () => {
  expect(toRomanNumerals(5)).toBe('\u2164') // V
  expect(toRomanNumerals(1)).toBe('\u2160') // I
  expect(toRomanNumerals(9)).toBe('\u2160\u2169') // IX
  expect(toRomanNumerals(30)).toBe('\u2169\u2169\u2169') // XXX
})

test('Remove Commas', () => {
  expect(removeCommas('123,123,123.00')).toBe('123123123.00')
})

test('AddCommas', () => {
  expect(addCommas('123123123.00')).toBe('123,123,123.00')
})

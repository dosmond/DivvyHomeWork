/**
 * Removes all commas.
 * @param input
 * @returns {*}
 */
export function removeCommas (input) {
  return input.replace(/,/g, '')
}

/**
 * Returns whether or not the number is valid.
 * @param text
 * @param allowBlank - Allow an empty string
 * @returns {boolean}
 */
export function isValidNumber (text, allowBlank) {
  if (text === '' || text === undefined) {
    return !!allowBlank
  }
  if (text === '-') {
    return true
  }

  var regex = /(^[-]?[0](\.[0-9]{0,2})?$)|(^[-]?[1-9][0-9]{0,4}?(\.[0-9]{0,2})?$)/
  return !!text.match(regex)
}

/**
   * Adds commas in currency fashion
   * @param input
   * @returns {*}
   */
export function addCommas (input) {
  return input
    .toString()
    .replace(/,/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function toRomanNumerals (num) {
  let isNegative = false

  if (num === 0) {
    return '0'
  }

  if (num < 0) {
    isNegative = true
    num = Math.abs(num)
  }

  var romNumerals = [
    ['\u2188', 100000], ['\u2182\u2188', 90000],
    ['\u2187', 50000], ['\u2182\u2187', 40000],
    ['\u2182', 10000], ['\u216F\u2182', 9000],
    ['\u2181', 5000], ['\u216F\u2181', 4000],
    ['\u216F', 1000], ['\u216D\u216F', 900],
    ['\u216E', 500], ['\u216D\u216E', 400],
    ['\u216D', 100], ['\u2169\u216D', 90],
    ['\u216C', 50], ['\u2169\u216C', 40],
    ['\u2169', 10], ['\u2160\u2169', 9],
    ['\u2164', 5], ['\u2160\u2164', 4],
    ['\u2160', 1]
  ]
  var runningTotal = 0
  var roman = ''
  for (var i = 0; i < romNumerals.length; i++) {
    while (runningTotal + romNumerals[i][1] <= num) {
      runningTotal += romNumerals[i][1]
      roman += romNumerals[i][0]
    }
  }

  if (isNegative) {
    return `-${roman}`
  } else {
    return roman
  }
}

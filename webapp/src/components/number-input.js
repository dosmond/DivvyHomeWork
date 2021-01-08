import React, { useState } from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'

var prevValue = ''

NumInput.propTypes = {
  placeholder: PropTypes.string,
  id: PropTypes.string
}

function NumInput ({ placeholder, id }) {
  const [value, setValue] = useState('')

  const validate = (e) => {
    let curVal = removeCommas(e.target.value)

    // If the new value doesn't match our pattern, return to prevValue
    if (!isOnlyNumbers(curVal, true) || !isGreaterThanZero(curVal, true)) {
      setValue(prevValue)
    } else {
      let newValue = addCommas(e.target.value)
      setValue(newValue)
      prevValue = newValue
    }
  }

  const getCurValue = () => {
    prevValue = value
  }

  return <Input addonBefore='$' id={id} onChange={validate} onFocus={getCurValue} placeholder={placeholder} value={value} />
}

export default NumInput

/**
 * Returns whether or not only numbers exist with up to two decimal places.
 * @param text
 * @param allowBlank - Allow an empty string
 * @returns {boolean}
 */
function isOnlyNumbers (text, allowBlank) {
  if (text === '' || text === undefined) {
    return !!allowBlank
  }

  var regex = /(^[0](\.[0-9]{0,2})?$)|(^[1-9][0-9]{0,10}?(\.[0-9]{0,2})?$)/
  return !!text.match(regex)
}

/**
 * Determines if a number is greater than zero
 * @param number
 * @param allowBlank - Allow an empty string
 * @returns {boolean}
 */
function isGreaterThanZero (number, allowBlank) {
  if (number === '' || number === undefined) {
    return !!allowBlank
  }

  return number >= 0
}

/**
 * Removes all commas.
 * @param input
 * @returns {*}
 */
function removeCommas (input) {
  return input.replace(/,/g, '')
}

/**
 * Adds commas in currency fashion
 * @param input
 * @returns {*}
 */
function addCommas (input) {
  return input
    .toString()
    .replace(/,/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

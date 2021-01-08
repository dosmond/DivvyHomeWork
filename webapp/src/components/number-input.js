import React, { useState } from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'

var prevValue = ''

NumInput.propTypes = {
  placeholder: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}

function NumInput ({ placeholder, id, value = '', onChange }) {
  const [curValue, setValue] = useState('')

  const validate = (e) => {
    let curVal = removeCommas(e.target.value)

    // If the new value doesn't match our pattern, return to prevValue
    if (!isValidNumber(curVal, true)) {
      setValue(prevValue)
    } else {
      let newValue = addCommas(e.target.value)
      setValue(newValue)
      prevValue = newValue
      value = newValue
    }

    onChange(value)
  }

  const getCurValue = () => {
    prevValue = curValue
    value = curValue
  }

  return <Input addonBefore='$' id={id} onChange={validate} onFocus={getCurValue} placeholder={placeholder} value={curValue} />
}

export default NumInput

/**
 * Returns whether or not the number is valid.
 * @param text
 * @param allowBlank - Allow an empty string
 * @returns {boolean}
 */
function isValidNumber (text, allowBlank) {
  if (text === '' || text === undefined) {
    return !!allowBlank
  }
  if (text === '-') {
    return true
  }

  var regex = /(^[-]?[0](\.[0-9]{0,2})?$)|(^[-]?[1-9][0-9]{0,10}?(\.[0-9]{0,2})?$)/
  return !!text.match(regex)
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

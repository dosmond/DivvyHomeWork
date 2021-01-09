import React, { useState } from 'react'
import { Input } from 'antd'
import { removeCommas, addCommas, isValidNumber } from '../common/common'
import PropTypes from 'prop-types'

var prevValue = ''

NumInput.propTypes = {
  placeholder: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  initialValue: PropTypes.string
}

function NumInput ({ placeholder, id, initialValue = '', value = '', onChange }) {
  const [curValue, setValue] = useState(initialValue)

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

import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { Space, Card } from 'antd'
import PropTypes from 'prop-types'
import { toRomanNumerals } from '../../common/common'

TransactionTotal.propTypes = {
  transactions: PropTypes.array,
  roman: PropTypes.bool
}

function TransactionTotal ({ transactions, roman }) {
  const [balance, setBalance] = useState(0)
  const [color, setColor] = useState('#limegreen')

  useEffect(() => {
    if (transactions.length !== 0) {
      let result = transactions.reduce((acc, val) => {
        return acc + val.amount
      }, 0)

      if (result < 0) {
        setColor('red')
      } else {
        setColor('limegreen')
      }

      if (roman) {
        setBalance(toRomanNumerals(result / 100))
      } else {
        setBalance(result / 100)
      }
    }
  })

  return (
    <Space css={totalTransactionStyle} direction='vertical'>
      <Card title='Total'>
        <h1 style={{ color: color }}>${balance}</h1>
      </Card>
    </Space>
  )
}

export default TransactionTotal

const totalTransactionStyle = css`
  margin-top: 2vh;
  min-width: 100%;
  box-shadow: -1px 0px 5px 0px rgba(0, 0, 0, 0.14);
`

import React from 'react'
import { css } from '@emotion/core'
import { Space, Card } from 'antd'
import PropTypes from 'prop-types'

TransactionTotal.propTypes = {
  transactions: PropTypes.array
}

function TransactionTotal ({ transactions }) {
  let balance = 0
  let color = '#ffffff'
  if (transactions.length !== 0) {
    let result = transactions.reduce((acc, val) => {
      return acc + val.amount
    }, 0)

    if (result < 0) {
      color = 'red'
    } else {
      color = 'limegreen'
    }

    balance = result / 100
  }

  return (
    <Space css={totalTransactionStyle} direction='vertical'>
      <Card title='Balance'>
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

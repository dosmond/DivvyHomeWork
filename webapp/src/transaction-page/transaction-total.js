import React from 'react'
import { css } from '@emotion/core'
import { Space, Card } from 'antd'

function TransactionTotal () {
  return (
    <Space css={totalTransactionStyle} direction='vertical'>
      <Card title='Totals'>
        <p>Totals here</p>
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

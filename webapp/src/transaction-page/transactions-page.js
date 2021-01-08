import React from 'react'
import { css } from '@emotion/core'
import { Space, Card, Col, Row } from 'antd'
import AddTransaction from './add-transaction'

function Transaction () {
  return <p>This is a transaction</p>
}

export function Transactions () {
  const transactions = ['first', 'second', 'third'].map((item) => <Transaction key={item} />)

  return (
    <Row>
      <Col span={17}>
        <Space css={transactionStyle} direction='vertical'>
          <Card title='Transactions'>{ transactions }</Card>
        </Space>
      </Col>
      <Col offset={1} span={6}>
        <AddTransaction />
      </Col>
    </Row>
  )
}

const transactionStyle = css`
  width: 100%;
  box-shadow: -1px 0px 5px 0px rgba(0, 0, 0, 0.14);
`

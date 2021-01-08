import React from 'react'
import { css } from '@emotion/core'
import { Space, Col, Row, Card } from 'antd'
import AddTransaction from './add-transaction'
import { useQuery } from '@apollo/react-hooks'
import { GET_TRANSACTIONS } from '../network/queries'
import TransactionTable from './transaction-table'

export function Transactions () {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  let transactions = data.transactions

  return (
    <Row>
      <Col span={17}>
        <Space css={transactionStyle} direction='vertical'>
          <Card title='Transactions'><TransactionTable transactions={transactions} /> </Card>
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

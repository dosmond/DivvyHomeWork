import React, { useState } from 'react'
import { css } from '@emotion/core'
import { Space, Col, Row, Card, Switch } from 'antd'
import AddTransaction from './add-transaction'
import { useQuery } from '@apollo/react-hooks'
import { GET_TRANSACTIONS } from '../network/queries'
import TransactionTable from './transaction-table'

export function Transactions () {
  const { loading, error, data, refetch } = useQuery(GET_TRANSACTIONS)
  const [roman, setRoman] = useState(false)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  let transactions = data.transactions

  const handleRomanChange = () => {
    setRoman(!roman)
  }

  return (
    <Row>
      <Col span={17}>
        <Space css={transactionStyle} direction='vertical'>
          <Card extra={<div>Use Roman Numerals <Switch checked={roman} onChange={handleRomanChange} /></div>} title='Transactions'>
            <TransactionTable refetch={refetch} roman={roman} transactions={transactions} />
          </Card>
        </Space>
      </Col>
      <Col offset={1} span={6}>
        <AddTransaction refetch={refetch} />
      </Col>
    </Row>
  )
}

const transactionStyle = css`
  width: 100%;
  box-shadow: -1px 0px 5px 0px rgba(0, 0, 0, 0.14);
`

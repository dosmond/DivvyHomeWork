import React, { useState } from 'react'
import { css } from '@emotion/core'
import { Space, Col, Row, Card, Switch, Button } from 'antd'
import AddTransaction from './add-transaction'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { GET_TRANSACTIONS } from '../network/queries'
import { DELETE_TRANSACTION } from '../network/mutations'
import TransactionTable from './transaction-table'
import TransactionTotal from './transaction-total'

export function Transactions () {
  const { loading, error, data, refetch } = useQuery(GET_TRANSACTIONS)
  const [roman, setRoman] = useState(false)
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  let transactions = data.transactions

  const handleRomanChange = () => {
    setRoman(!roman)
  }

  const handleDeleteAll = () => {
    const deleteAll = new Promise(() => {
      transactions.forEach((item) => {
        deleteTransaction({
          variables: {
            id: item.id
          }
        }).then(() => {
          refetch()
        })
      })
    })

    deleteAll.then()
  }

  return (
    <Row css={noMarginTop}>
      <Col span={17}>
        <Space css={transactionStyle} direction='vertical'>
          <Card extra={<div>Use Roman Numerals <Switch checked={roman} id='roman-switch' onChange={handleRomanChange} /></div>} title='Transactions'>
            <TransactionTable refetch={refetch} roman={roman} transactions={transactions} />
          </Card>
        </Space>
      </Col>
      <Col offset={1} span={6}>
        <Row>
          <AddTransaction refetch={refetch} />
        </Row>
        <Row>
          <TransactionTotal />
        </Row>
        <Row>
          <Space css={deleteStyle} direction='vertical'>
            <Card title='Delete all transactions'>
              <Button
                danger
                id='delete-transactions'
                onClick={handleDeleteAll}
              >
                Delete
              </Button>
            </Card>
          </Space>
        </Row>
      </Col>
    </Row>
  )
}

const transactionStyle = css`
  width: 100%;
  box-shadow: -1px 0px 5px 0px rgba(0, 0, 0, 0.14);
`

const deleteStyle = css`
  margin-top: 15px;
  width: 100%;
  box-shadow: -1px 0px 5px 0px rgba(0, 0, 0, 0.14);
`

const noMarginTop = css`
  margin-top: 0;
`

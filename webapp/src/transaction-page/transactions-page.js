import React from 'react'
import { css } from '@emotion/core'
import { Space, Card, Col, Row } from 'antd'
import { gql, useQuery } from '@apollo/client'
import AddTransaction from './add-transaction'

const GET_TRANSACTIONS = gql`
  query transactions {
    id
    amount
    credit
    debit
    description
    insertedAt
    merchant {
      id
      name
    }
    updatedAt
    user {
      id
      firstName
      lastName
    }
  }
`

function Transaction () {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  console.log(data)
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

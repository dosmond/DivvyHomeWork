import React from 'react'
import PropTypes from 'prop-types'
import { Table, Space, Checkbox } from 'antd'

const { Column } = Table

function TransactionTable ({ transactions }) {
  transactions.forEach(item => {
    item['merchantName'] = item.merchant.name
    item['fixedAmount'] = '$' + parseFloat(item.amount).toFixed(2)
  })

  return (
    <Table dataSource={transactions}>
      <Column dataIndex='fixedAmount' key='id' title='Amount' />
      <Column dataIndex='description' key='id' title='Description' />
      <Column dataIndex='merchantName' key='id' title='Merchant'>test</Column>
      <Column
        key='id'
        render={(text, record) => {
          return (
            <Checkbox checked={text.credit} readonly />
          )
        }}
        title='Credit'
      />
      <Column
        key='id'
        render={(text, record) => {
          return (
            <Checkbox checked={text.debit} readonly />
          )
        }}
        title='Debit'
      />
      <Column
        key='id'
        render={(text, record) => (
          <Space size='middle'>
            <a href='/'>Edit</a>
            <a href='/'>Delete</a>
          </Space>
        )}
        title='Action'
      />
    </Table>
  )
}

TransactionTable.propTypes = {
  transactions: PropTypes.array
}

export default TransactionTable

import React from 'react'
import PropTypes from 'prop-types'
import { Table, Space } from 'antd'

const { Column } = Table

function TransactionTable ({ transactions }) {
  console.log(transactions)

  return (
    <Table dataSource={transactions}>
      <Column dataIndex='amount' key='id' title='Amount' />
      <Column dataIndex='lastName' key='lastName' title='Last Name' />
      <Column dataIndex='dob' key='dob' title='DOB' />
      <Column
        key='action'
        render={(text, record) => (
          <Space size='middle'>
            <a href='/'>Invite {record.lastName}</a>
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

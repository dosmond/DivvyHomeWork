import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Table, Space } from 'antd'
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons'

const { Column } = Table

function TransactionTable ({ transactions }) {
  transactions.forEach(item => {
    item['merchantName'] = item.merchant.name
    item['fixedAmount'] = '$' + parseFloat(item.amount).toFixed(2)
  })

  return (
    <Table dataSource={transactions} rowKey={record => record.id}>
      <Column dataIndex='description' key='description' title='Description' />
      <Column dataIndex='merchantName' key='merchant' title='Merchant' />
      <Column
        key='type'
        render={(text, record) => (
          <label>{record.credit ? 'Credit' : 'Debit'}</label>
        )}
        title='Type'
      />
      <Column dataIndex='fixedAmount' key='amount' title='Amount' />
      <Column
        key='action'
        render={(text, record) => (
          <Space size='middle'>
            <button css={actionButtonStyle}><EditTwoTone /></button>
            <button css={actionButtonStyle}><DeleteTwoTone twoToneColor='#eb2f96' /></button>
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

const actionButtonStyle = css`
  background-color: transparent;
  border: none;
  outline: none;
  
  &:hover {
      cursor: pointer;
  }
`

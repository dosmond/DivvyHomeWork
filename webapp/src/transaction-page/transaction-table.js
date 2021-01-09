import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Table, Space, Modal } from 'antd'
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons'
import EditTransaction from './edit-transaction'

const { Column } = Table

TransactionTable.propTypes = {
  transactions: PropTypes.array,
  refetch: PropTypes.func
}

function TransactionTable ({ transactions, refetch }) {
  transactions.forEach(item => {
    item['merchantName'] = item.merchant.name
    item['fixedAmount'] = '$' + addCommas(parseFloat(item.amount).toFixed(2))
    item['userName'] = `${item.user.firstName} ${item.user.lastName}`
  })

  console.log(transactions)

  const [visible, setVisible] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [merchant, setMerchant] = useState('')
  const [user, setUser] = useState('')
  const [type, setType] = useState('')

  const showEditModal = (record) => {
    setVisible(true)
    setTransactionId(record.id)
    setAmount(record.amount.toString())
    setDescription(record.description)
    setMerchant(record.merchant.id)
    setUser(record.user.id)
    setType(() => record.credit ? 'Credit' : 'Debit')
  }

  const showDelteModal = (record) => {
    setDeleteVisible(true)
    setTransactionId(record.id)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <>
      <Table dataSource={transactions} rowKey={record => record.id}>
        <Column dataIndex='description' key='description' title='Description' />
        <Column dataIndex='userName' key='userName' title='User' />
        <Column dataIndex='merchantName' key='merchant' title='Merchant' />
        <Column
          key='type'
          render={(text, record) => (
            <label>{record.credit ? 'Credit' : 'Debit'}</label>
          )}
          title='Type'
        />
        <Column
          key='amount'
          render={(text, record) => (
            <label style={{ color: `${record.amount < 0 ? 'red' : 'limegreen'}` }}>{record.fixedAmount}</label>
          )}
          title='Amount'
        />
        <Column
          key='action'
          render={(text, record) => (
            <Space size='middle'>
              <button css={actionButtonStyle} onClick={() => showEditModal(record)}><EditTwoTone /></button>
              <button css={actionButtonStyle} onClick={() => showDelteModal(record)}><DeleteTwoTone twoToneColor='#eb2f96' /></button>
            </Space>
          )}
          title='Action'
        />
      </Table>
      <Modal
        footer={null}
        onCancel={handleCancel}
        title='Edit Transaction'
        visible={visible}
      >
        <EditTransaction
          amount={amount}
          closeModal={handleCancel}
          description={description}
          merchant={merchant}
          refetch={refetch}
          transactionId={transactionId}
          type={type}
          user={user}
        />
      </Modal>
      <Modal
        footer={null}
        onCancel={handleCancel}
        title='Delete Transaction'
        visible={deleteVisible}
      >
        {/* <DeleteTransaction
          closeModal={handleCancel}
          refetch={refetch}
          transactionId={transactionId}
        /> */}
      </Modal>
    </>
  )
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

/**
 * Adds commas in currency fashion
 * @param input
 * @returns {*}
 */
function addCommas (input) {
  return input
    .toString()
    .replace(/,/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

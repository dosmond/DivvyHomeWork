import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Table, Space, Modal, Button } from 'antd'
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_TRANSACTION } from '../network/mutations'
import EditTransaction from './edit-transaction'
import DeleteTransaction from './delete-transaction'

const { Column } = Table

TransactionTable.propTypes = {
  transactions: PropTypes.array,
  refetch: PropTypes.func,
  roman: PropTypes.bool
}

function TransactionTable ({ transactions, refetch, roman }) {
  transactions.forEach(item => {
    item['merchantName'] = item.merchant.name

    if (!roman) {
      item['fixedAmount'] = '$' + addCommas(parseFloat(item.amount).toFixed(2))
    } else {
      item['fixedAmount'] = '$' + ToRomanNumerals(Math.round(item.amount))
    }

    item['userName'] = `${item.user.firstName} ${item.user.lastName}`
    let options = { year: 'numeric', month: 'short', day: 'numeric' }
    let [date] = new Date(item.insertedAt).toLocaleDateString('en-US', options).split('/')
    item['date'] = `${date}`
  })

  const [visible, setVisible] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [transactionId, setTransactionId] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [merchant, setMerchant] = useState('')
  const [user, setUser] = useState('')
  const [type, setType] = useState('')
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION)

  const showEditModal = (record) => {
    setVisible(true)
    setTransactionId(record.id)
    setAmount(record.amount.toString())
    setDescription(record.description)
    setMerchant(record.merchant.id)
    setUser(record.user.id)
    setType(() => record.credit ? 'Credit' : 'Debit')
  }

  const showDeleteModal = (record) => {
    setDeleteVisible(true)
    setTransactionId(record.id)
  }

  const handleCancel = () => {
    setVisible(false)
    setDeleteVisible(false)
    setDeleteLoading(false)
  }

  const handleDelete = () => {
    setDeleteLoading(true)
    deleteTransaction({
      variables: {
        id: transactionId
      }
    }).then(() => {
      refetch()
      handleCancel()
    })
  }

  const getTypeByCredit = (credit) => {
    return credit ? 'Credit' : 'Debit'
  }

  return (
    <>
      <Table dataSource={transactions} rowKey={record => record.id}>
        <Column dataIndex='description' ellipsis key='description' title='Description' />
        <Column dataIndex='date' key='date' sorter={(a, b) => a - b} title='Date' />
        <Column dataIndex='userName' key='userName' sorter={(a, b) => a.userName.toLowerCase().localeCompare(b.userName.toLowerCase())} title='User' />
        <Column dataIndex='merchantName' key='merchant' sorter={(a, b) => a.merchantName.toLowerCase().localeCompare(b.merchantName.toLowerCase())} title='Merchant' />
        <Column
          key='type'
          render={(text, record) => (
            <label>{getTypeByCredit(record.credit)}</label>
          )}
          sorter={(a, b) => getTypeByCredit(a.credit).toLowerCase().localeCompare(getTypeByCredit(b.credit))}
          title='Type'
        />
        <Column
          key='amount'
          render={(text, record) => (
            <label style={{ color: `${record.amount < 0 ? 'red' : 'limegreen'}` }}>{record.fixedAmount}</label>
          )}
          sorter={(a, b) => a.amount - b.amount}
          title='Amount'
        />
        <Column
          key='action'
          render={(text, record) => (
            <Space size='middle'>
              <button css={actionButtonStyle} data-cy='edit' onClick={() => showEditModal(record)}><EditTwoTone /></button>
              <button css={actionButtonStyle} data-cy='delete' onClick={() => showDeleteModal(record)}><DeleteTwoTone twoToneColor='#eb2f96' /></button>
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
        footer={[
          <Button
            danger
            key='back'
            onClick={handleCancel}>
              Return
          </Button>,
          <Button
            css={submitButtonStyle}
            id='delete-transaction-submit'
            key='submit'
            loading={deleteLoading}
            onClick={handleDelete}
            type='primary'>
              Submit
          </Button>
        ]}
        title='Delete Transaction'
        visible={deleteVisible}
      >
        <DeleteTransaction
        />
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

const submitButtonStyle = css`
  margin-right: 2%;

  background: white;
  border-color: limegreen;
  color: limegreen;

  &:hover {
    background: white;
    border-color: #a5ed93;
    color: #a5ed93;
  }
`

function addCommas (input) {
  return input
    .toString()
    .replace(/,/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function ToRomanNumerals (num) {
  let isNegative = false
  if (num < 0) {
    isNegative = true
    num = Math.abs(num)
  }

  var romNumerals = [
    ['\u2188', 100000], ['\u2182\u2188', 90000],
    ['\u2187', 50000], ['\u2182\u2187', 40000],
    ['\u2182', 10000], ['\u216F\u2182', 9000],
    ['\u2181', 5000], ['\u216F\u2181', 4000],
    ['\u216F', 1000], ['\u216D\u216F', 900],
    ['\u216E', 500], ['\u216D\u216E', 400],
    ['\u216D', 100], ['\u2169\u216D', 90],
    ['\u216C', 50], ['\u2169\u216C', 40],
    ['\u2169', 10], ['\u2160\u2169', 9],
    ['\u2164', 5], ['\u2160\u2164', 4],
    ['\u2160', 1]
  ]
  var runningTotal = 0
  var roman = ''
  for (var i = 0; i < romNumerals.length; i++) {
    while (runningTotal + romNumerals[i][1] <= num) {
      runningTotal += romNumerals[i][1]
      roman += romNumerals[i][0]
    }
  }

  if (isNegative) {
    return `-${roman}`
  } else {
    return roman
  }
}

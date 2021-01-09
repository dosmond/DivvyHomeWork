import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { Form, Input, Radio, Button, Select } from 'antd'
import NumInput from '../components/number-input'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { EDIT_TRANSACTION } from '../network/mutations'
import { GET_MERCHANTS_AND_USERS } from '../network/queries'
import { removeCommas } from '../common/common'
import PropTypes from 'prop-types'
const { Option } = Select

EditTransaction.propTypes = {
  refetch: PropTypes.func,
  transactionId: PropTypes.string,
  closeModal: PropTypes.func,
  amount: PropTypes.string,
  description: PropTypes.string,
  merchant: PropTypes.string,
  user: PropTypes.string,
  type: PropTypes.string
}

function EditTransaction ({ refetch, transactionId, closeModal, amount, description, merchant, user, type }) {
  const [radioValue, setRadioValue] = useState('Credit')
  const [submitLoading, setSubmitLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [form] = Form.useForm()
  const [editTransaction] = useMutation(EDIT_TRANSACTION)
  const { loading, error, data } = useQuery(GET_MERCHANTS_AND_USERS)

  useEffect(() => {
    form.resetFields()
  })

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const onRadioChange = (e) => {
    setRadioValue(e.target.value)
  }

  const handleClear = (close) => {
    form.resetFields()
    setRadioValue('Credit')
    if (close) {
      closeModal()
    }
  }

  const finishTransaction = () => {
    handleClear(false)
    setIsDisabled(false)
    setSubmitLoading(false)
  }

  const handleSubmit = () => {
    setIsDisabled(true)
    setSubmitLoading(true)

    var addAmount = form.getFieldValue('amount')
    var addType = form.getFieldValue('type')
    var addDescription = form.getFieldValue('description')
    var addMerchant = form.getFieldValue('merchant')
    var addUser = form.getFieldValue('user')

    if (addDescription === undefined || addMerchant === undefined || addUser === undefined || addType === undefined) {
      finishTransaction()
      return
    }

    addAmount = parseFloat(removeCommas(addAmount))

    editTransaction(
      {
        variables:
          {
            id: transactionId,
            amount: addAmount,
            credit: addType === 'Credit',
            debit: addType === 'Debit',
            description: addDescription,
            merchantId: addMerchant,
            userId: addUser
          }
      }
    ).then(() => {
      refetch()
      finishTransaction()
      closeModal()
    })
  }

  return (
    <Form form={form}>
      <Form.Item
        initialValue={amount}
        name='amount'
        rules={[{ required: true, message: 'Please input an amount' }]}>
        <NumInput id='edit-amount' initialValue={amount} placeholder='Amount' />
      </Form.Item>
      <Form.Item
        initialValue={merchant}
        name='merchant'
        rules={[{ required: true, message: 'Please select a merchant' }]}>
        <Select
          id='edit-merchant'
          optionFilterProp='children'
          placeholder='Select a merchant'
          showSearch
        >
          { data && data.merchants.map((merchant) => <Option key={merchant.id} value={merchant.id} >{merchant.name}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item
        initialValue={user}
        name='user'
        rules={[{ required: true, message: 'Please select a user' }]}>
        <Select
          id='edit-user'
          optionFilterProp='children'
          placeholder='Select a user'
          showSearch
        >
          { data && data.users.map((user) => <Option key={user.id} value={user.id} >{user.firstName} {user.lastName}</Option>)}
        </Select>
      </Form.Item>
      <Form.Item initialValue={description} name='description' rules={[{ required: true, message: 'Please enter a description' }]}>
        <Input id='edit-description' placeholder='Description' />
      </Form.Item>
      <Form.Item
        initialValue={type}
        name='type'
        rules={[{ required: true, message: 'Please select a card type' }]}>
        <Radio.Group onChange={onRadioChange} value={radioValue}>
          <Radio id='edit-radio-credit' value='Credit'>
                      Credit
          </Radio>
          <Radio id='edit-radio-debit' value='Debit'>Debit</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button
          css={submitButtonStyle}
          disabled={isDisabled}
          htmlType='submit'
          id='edit-transaction-submit'
          loading={submitLoading}
          onClick={handleSubmit}
          type='primary'>
                    Submit
        </Button>
        <Button
          danger
          disabled={isDisabled}
          id='edit-transaction-cancel'
          onClick={() => handleClear(true)}>
                    Clear
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EditTransaction

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

import React, { useState } from 'react'
import { css } from '@emotion/core'
import { Space, Card, Form, Input, Radio, Button, Select } from 'antd'
import NumInput from '../components/number-input'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { CREATE_TRANSACTION } from '../network/mutations'
import { GET_MERCHANTS_AND_USERS } from '../network/queries'
import PropTypes from 'prop-types'
const { Option } = Select

AddTransaction.propTypes = {
  refetch: PropTypes.func
}

function AddTransaction ({ refetch }) {
  const [radioValue, setRadioValue] = useState('Credit')
  const [form] = Form.useForm()
  const [createTransaction] = useMutation(CREATE_TRANSACTION)
  const { loading, error, data } = useQuery(GET_MERCHANTS_AND_USERS)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const onRadioChange = (e) => {
    setRadioValue(e.target.value)
  }

  const handleClear = () => {
    form.resetFields()
    setRadioValue('Credit')
  }

  const handleSubmit = () => {
    var addAmount = form.getFieldValue('amount')
    if (addAmount === undefined) {
      return
    } else {
      addAmount = parseFloat(removeCommas(addAmount))
    }

    var addType = form.getFieldValue('type')
    var addDescription = form.getFieldValue('description')
    var addMerchant = form.getFieldValue('merchant')
    var addUser = form.getFieldValue('user')

    if (addDescription === undefined || addMerchant === undefined || addUser === undefined || addType === undefined) {
      return
    }

    createTransaction(
      {
        variables:
        {
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
    })
  }

  let returnValue = ''

  return (
    <Space css={addTransactionStyle} direction='vertical'>
      <Card title='Add Transaction'>
        <Form form={form}>
          <Form.Item name='amount' rules={[{ required: true, message: 'Please input an amount' }]} value={returnValue}>
            <NumInput id='amount' placeholder='Amount' value={returnValue} />
          </Form.Item>
          <Form.Item name='merchant' rules={[{ required: true, message: 'Please select a merchant' }]}>
            <Select
              optionFilterProp='children'
              placeholder='Select a merchant'
              showSearch
            >
              { data && data.merchants.map((merchant) => <Option key={merchant.id} value={merchant.id} >{merchant.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name='user' rules={[{ required: true, message: 'Please select a user' }]}>
            <Select
              optionFilterProp='children'
              placeholder='Select a user'
              showSearch
            >
              { data && data.users.map((user) => <Option key={user.id} value={user.id} >{user.firstName} {user.lastName}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item name='description' rules={[{ required: true, message: 'Please enter a description' }]}>
            <Input id='description' placeholder='Description' />
          </Form.Item>
          <Form.Item name='type' rules={[{ required: true, message: 'Please select a card type' }]}>
            <Radio.Group onChange={onRadioChange} value={radioValue}>
              <Radio id='radio-credit' value='Credit'>
                      Credit
              </Radio>
              <Radio id='radio-debit' value='Debit'>Debit</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button css={submitButtonStyle} htmlType='submit' id='add-transaction-submit' onClick={handleSubmit} type='primary'>
                    Submit
            </Button>
            <Button danger id='add-transaction-cancel' onClick={handleClear}>
                    Clear
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Space>
  )
}

export default AddTransaction

const addTransactionStyle = css`
  min-width: 100%;
  box-shadow: -1px 0px 5px 0px rgba(0, 0, 0, 0.14);
`

// const merchantInputStyle = css`
//   min-width: 100%;
// `

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

/**
 * Removes all commas.
 * @param input
 * @returns {*}
 */
function removeCommas (input) {
  return input.replace(/,/g, '')
}

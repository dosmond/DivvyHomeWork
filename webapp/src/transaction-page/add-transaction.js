import React, { useState } from 'react'
import { css } from '@emotion/core'
import { Space, Card, Form, Input, Radio, Button } from 'antd'
import NumInput from '../components/number-input'

function AddTransaction () {
  const [radioValue, setRadioValue] = useState('Credit')
  const [form] = Form.useForm()

  const onRadioChange = (e) => {
    setRadioValue(e.target.value)
  }

  const handleClear = () => {
    form.resetFields()
    setRadioValue('Credit')
  }

  return (
    <Space css={addTransactionStyle} direction='vertical'>
      <Card title='Add Transaction'>
        <Form form={form}>
          <Form.Item name='amount'>
            <NumInput placeholder='Amount' />
          </Form.Item>
          <Form.Item name='merchant'>
            <Input placeholder='Merchant' />
          </Form.Item>
          <Form.Item name='description'>
            <Input placeholder='Description' />
          </Form.Item>
          <Form.Item name='type'>
            <Radio.Group onChange={onRadioChange} value={radioValue}>
              <Radio checked value='Credit'>
                      Credit
              </Radio>
              <Radio value='Debit'>Debit</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button css={submitButtonStyle} type='primary'>
                    Submit
            </Button>
            <Button danger onClick={handleClear}>
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

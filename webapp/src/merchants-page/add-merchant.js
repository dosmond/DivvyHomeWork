import React, { useState } from 'react'
import { css } from '@emotion/core'
import { Space, Card, Form, Input, Button } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_MERCHANT } from '../mutations/merchant_mutations'
import PropTypes from 'prop-types'

AddMerchant.propTypes = {
  refetch: PropTypes.func
}

function AddMerchant ({ refetch }) {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [form] = Form.useForm()
  const [createMerchant] = useMutation(CREATE_MERCHANT)

  const handleClear = () => {
    form.resetFields()
  }

  const finishTransaction = () => {
    handleClear()
    setIsDisabled(false)
    setSubmitLoading(false)
  }

  const handleSubmit = () => {
    setIsDisabled(true)
    setSubmitLoading(true)

    var addDescription = form.getFieldValue('description')
    var addName = form.getFieldValue('name')

    if (addDescription === undefined || addName === undefined) {
      finishTransaction()
      return
    }

    createMerchant(
      {
        variables:
        {
          name: addName,
          description: addDescription
        }
      }
    ).then(() => {
      refetch()
      finishTransaction()
    })
  }

  return (
    <Space css={addTransactionStyle} direction='vertical'>
      <Card title='Add Merchant'>
        <Form form={form}>
          <Form.Item name='name' rules={[{ required: true, message: 'Please enter a name' }]}>
            <Input id='add-name' placeholder='Name' />
          </Form.Item>
          <Form.Item name='description' rules={[{ required: true, message: 'Please enter a description' }]}>
            <Input id='add-description' placeholder='Description' />
          </Form.Item>
          <Form.Item>
            <Button
              css={submitButtonStyle}
              disabled={isDisabled}
              htmlType='submit'
              id='add-merchant-submit'
              loading={submitLoading}
              onClick={handleSubmit}
              type='primary'>
                    Submit
            </Button>
            <Button
              danger
              disabled={isDisabled}
              id='add-merchant-cancel'
              onClick={() => handleClear(true)}>
                    Clear
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Space>
  )
}

export default AddMerchant

const addTransactionStyle = css`
  margin-top: 15px;
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

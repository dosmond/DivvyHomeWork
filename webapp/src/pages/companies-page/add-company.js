import React, { useState } from 'react'
import { css } from '@emotion/core'
import { Space, Card, Form, Input, Button } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_COMPANY } from '../../mutations/company_mutations'
import PropTypes from 'prop-types'
import NumInput from '../../components/number-input'

AddCompany.propTypes = {
  refetch: PropTypes.func
}

function AddCompany ({ refetch }) {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [form] = Form.useForm()
  const [createCompany] = useMutation(CREATE_COMPANY)

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

    var addCreditLine = form.getFieldValue('creditLine')
    var addName = form.getFieldValue('name')

    if (addCreditLine === undefined || addName === undefined) {
      finishTransaction()
      return
    }

    createCompany(
      {
        variables:
        {
          name: addName,
          available_credit: addCreditLine,
          credit_line: addCreditLine
        }
      }
    ).then(() => {
      refetch()
      finishTransaction()
    })
  }

  return (
    <Space css={addTransactionStyle} direction='vertical'>
      <Card title='Add Company'>
        <Form form={form}>
          <Form.Item name='name' rules={[{ required: true, message: 'Please enter a name' }]}>
            <Input id='add-name' placeholder='Name' />
          </Form.Item>
          <Form.Item name='creditLine' rules={[{ required: true, message: 'Please enter an amount' }]}>
            <NumInput id='add-credit-line' placeholder='Credit Amount' />
          </Form.Item>
          <Form.Item>
            <Button
              css={submitButtonStyle}
              disabled={isDisabled}
              htmlType='submit'
              id='add-company-submit'
              loading={submitLoading}
              onClick={handleSubmit}
              type='primary'>
                    Submit
            </Button>
            <Button
              danger
              disabled={isDisabled}
              id='add-company-cancel'
              onClick={() => handleClear(true)}>
                    Clear
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Space>
  )
}

export default AddCompany

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

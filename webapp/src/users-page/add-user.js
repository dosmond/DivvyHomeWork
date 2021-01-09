import React, { useState } from 'react'
import { css } from '@emotion/core'
import { Space, Card, Form, Input, Button, DatePicker } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_USER } from '../network/mutations'
import PropTypes from 'prop-types'

AddUser.propTypes = {
  refetch: PropTypes.func
}

function AddUser ({ refetch }) {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [form] = Form.useForm()
  const [createUser] = useMutation(CREATE_USER)

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

    var addFirstName = form.getFieldValue('firstName')
    var addLastName = form.getFieldValue('lastName')
    var addDOB = form.getFieldValue('dob').format('MM/DD/YYYY')

    if (addFirstName === undefined || addLastName === undefined || addDOB === undefined) {
      finishTransaction()
      return
    }

    createUser(
      {
        variables:
        {
          firstName: addFirstName,
          lastName: addLastName,
          dob: addDOB
        }
      }
    ).then(() => {
      refetch()
      finishTransaction()
    })
  }

  return (
    <Space css={addTransactionStyle} direction='vertical'>
      <Card title='Add User'>
        <Form form={form}>
          <Form.Item name='firstName' rules={[{ required: true, message: 'Please enter a first name' }]}>
            <Input id='add-firstName' placeholder='First Name' />
          </Form.Item>
          <Form.Item name='lastName' rules={[{ required: true, message: 'Please enter a last name' }]}>
            <Input id='add-lastName' placeholder='Last Name' />
          </Form.Item>
          <Form.Item name='dob' rules={[{ required: true, message: 'Please enter a date of birth' }]}>
            <DatePicker css={fullWidthStyle} placeholder='Select a DOB' />
          </Form.Item>
          <Form.Item>
            <Button
              css={submitButtonStyle}
              disabled={isDisabled}
              htmlType='submit'
              id='add-user-submit'
              loading={submitLoading}
              onClick={handleSubmit}
              type='primary'>
                    Submit
            </Button>
            <Button
              danger
              disabled={isDisabled}
              id='add-user-cancel'
              onClick={() => handleClear(true)}>
                    Clear
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Space>
  )
}

export default AddUser

const addTransactionStyle = css`
  margin-top: 15px;
  min-width: 100%;
  box-shadow: -1px 0px 5px 0px rgba(0, 0, 0, 0.14);
`

const fullWidthStyle = css`
  width: 100%;
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

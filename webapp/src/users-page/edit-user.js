import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { Form, Input, Button, DatePicker } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { EDIT_USER } from '../mutations/user_mutations'
import PropTypes from 'prop-types'

EditUser.propTypes = {
  refetch: PropTypes.func,
  userId: PropTypes.string,
  closeModal: PropTypes.func,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  dob: PropTypes.object
}

function EditUser ({ refetch, userId, closeModal, firstName, lastName, dob }) {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [form] = Form.useForm()
  const [editUser] = useMutation(EDIT_USER)

  useEffect(() => {
    form.resetFields()
  })

  const handleClear = (close) => {
    form.resetFields()
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

    var editFirstName = form.getFieldValue('firstName')
    var editLastName = form.getFieldValue('lastName')
    var editDOB = form.getFieldValue('dob').format('DD/MM/YYYY')

    if (editFirstName === undefined || editLastName === undefined || editDOB === undefined) {
      finishTransaction()
      return
    }

    editUser(
      {
        variables:
          {
            id: userId,
            firstName: editFirstName,
            lastName: editLastName,
            dob: editDOB
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
      <Form.Item initialValue={firstName} name='firstName' rules={[{ required: true, message: 'Please enter a first name' }]}>
        <Input id='edit-firstName' placeholder='First Name' />
      </Form.Item>
      <Form.Item initialValue={lastName} name='lastName' rules={[{ required: true, message: 'Please enter a last name' }]}>
        <Input id='edit-lastName' placeholder='Last Name' />
      </Form.Item>
      <Form.Item initialValue={dob} name='dob' rules={[{ required: true, message: 'Please enter a date of birth' }]}>
        <DatePicker css={fullWidthStyle} placeholder='Select a DOB' />
      </Form.Item>
      <Form.Item>
        <Button
          css={submitButtonStyle}
          disabled={isDisabled}
          htmlType='submit'
          id='edit-user-submit'
          loading={submitLoading}
          onClick={handleSubmit}
          type='primary'>
                    Submit
        </Button>
        <Button
          danger
          disabled={isDisabled}
          id='edit-user-cancel'
          onClick={() => handleClear(true)}>
                    Cancel
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EditUser

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
const fullWidthStyle = css`
  width: 100%;
`

import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { Form, Input, Button } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { EDIT_MERCHANT } from '../network/mutations'
import PropTypes from 'prop-types'

EditMerchant.propTypes = {
  refetch: PropTypes.func,
  merchantId: PropTypes.string,
  closeModal: PropTypes.func,
  name: PropTypes.string,
  description: PropTypes.string
}

function EditMerchant ({ refetch, merchantId, closeModal, name, description }) {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [form] = Form.useForm()
  const [editMerchant] = useMutation(EDIT_MERCHANT)

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

    var editDescription = form.getFieldValue('description')
    var editName = form.getFieldValue('name')

    if (editDescription === undefined || editName === undefined) {
      finishTransaction()
      return
    }

    editMerchant(
      {
        variables:
          {
            id: merchantId,
            name: editName,
            description: editDescription
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
      <Form.Item initialValue={name} name='name' rules={[{ required: true, message: 'Please enter a name' }]}>
        <Input id='edit-name' placeholder='Name' />
      </Form.Item>
      <Form.Item initialValue={description} name='description' rules={[{ required: true, message: 'Please enter a description' }]}>
        <Input id='edit-description' placeholder='Description' />
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

export default EditMerchant

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

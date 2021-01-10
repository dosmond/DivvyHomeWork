import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import { Form, Input, Button } from 'antd'
import { useMutation } from '@apollo/react-hooks'
import { EDIT_COMPANY } from '../../mutations/company_mutations'
import PropTypes from 'prop-types'
import NumInput from '../../components/number-input'
import { removeCommas } from '../../common/common'

EditCompany.propTypes = {
  refetch: PropTypes.func,
  companyId: PropTypes.string,
  closeModal: PropTypes.func,
  name: PropTypes.string,
  creditLine: PropTypes.number
}

function EditCompany ({ refetch, companyId, closeModal, name, creditLine }) {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [form] = Form.useForm()
  const [editCompany] = useMutation(EDIT_COMPANY)

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

    var editCreditLine = form.getFieldValue('creditLine')
    var editName = form.getFieldValue('name')

    if (editCreditLine === undefined || editName === undefined) {
      finishTransaction()
      return
    }

    editCreditLine = parseFloat(removeCommas(editCreditLine)) * 100

    editCompany(
      {
        variables:
          {
            id: companyId,
            name: editName,
            credit_line: editCreditLine
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
      <Form.Item initialValue={creditLine} name='creditLine' rules={[{ required: true, message: 'Please enter an amount' }]}>
        <NumInput id='edit-credit-line' placeholder='Credit Amount' />
      </Form.Item>
      <Form.Item>
        <Button
          css={submitButtonStyle}
          disabled={isDisabled}
          htmlType='submit'
          id='edit-merchant-submit'
          loading={submitLoading}
          onClick={handleSubmit}
          type='primary'>
                    Submit
        </Button>
        <Button
          danger
          disabled={isDisabled}
          id='edit-merchant-cancel'
          onClick={() => handleClear(true)}>
                    Cancel
        </Button>
      </Form.Item>
    </Form>
  )
}

export default EditCompany

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

import React, { useState } from 'react'
import { css } from '@emotion/core'
import { Space, Card, Form, Input, Button, DatePicker, Select } from 'antd'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { CREATE_USER } from '../../mutations/user_mutations'
import { GET_COMPANIES } from '../../queries/queries'
import PropTypes from 'prop-types'

const { Option } = Select

AddUser.propTypes = {
  refetch: PropTypes.func
}

function AddUser ({ refetch }) {
  const [submitLoading, setSubmitLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [form] = Form.useForm()
  const [createUser] = useMutation(CREATE_USER)
  const { loading, error, data } = useQuery(GET_COMPANIES)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  let companies = data.companies

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
    var addCompany = form.getFieldValue('company')

    if (addFirstName === undefined || addLastName === undefined || addDOB === undefined || addCompany === undefined) {
      finishTransaction()
      return
    }

    createUser(
      {
        variables:
        {
          firstName: addFirstName,
          lastName: addLastName,
          dob: addDOB,
          company_id: addCompany
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
          <Form.Item
            name='company'
            rules={[{ required: true, message: 'Please select a company' }]}>
            <Select
              optionFilterProp='children'
              placeholder='Select a company'
              showSearch
            >
              { companies && companies.map((company) => <Option key={company.id} value={company.id} >{company.name}</Option>)}
            </Select>
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

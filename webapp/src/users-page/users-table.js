import React, { useState } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Table, Space, Modal, Button } from 'antd'
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_USER } from '../network/mutations'
import EditUser from './edit-user'
import DeleteUser from './delete-user'

const { Column } = Table

UsersTable.propTypes = {
  users: PropTypes.array,
  refetch: PropTypes.func
}

function UsersTable ({ users, refetch }) {
  users.forEach(item => {
    let options = { year: 'numeric', month: 'short', day: 'numeric' }
    let [date] = new Date(item.insertedAt).toLocaleDateString('en-US', options).split('/')
    item['date'] = `${date}`
  })

  const [visible, setVisible] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [userId, setUserId] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDOB] = useState(moment())
  const [deleteUser] = useMutation(DELETE_USER)

  const showEditModal = (record) => {
    setVisible(true)
    setUserId(record.id)
    setFirstName(record.firstName)
    setLastName(record.lastName)
    let dob = moment(record.dob)
    setDOB(dob)
  }

  const showDeleteModal = (record) => {
    setDeleteVisible(true)
    setUserId(record.id)
  }

  const handleCancel = () => {
    setVisible(false)
    setDeleteVisible(false)
    setDeleteLoading(false)
  }

  const handleDelete = () => {
    setDeleteLoading(true)
    deleteUser({
      variables: {
        id: userId
      }
    }).then(() => {
      refetch()
      handleCancel()
    })
  }

  return (
    <>
      <Table dataSource={users} rowKey={record => record.id}>
        <Column dataIndex='firstName' key='firstName' sorter={(a, b) => a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase())} title='First Name' />
        <Column dataIndex='lastName' key='lastName' sorter={(a, b) => a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase())} title='Last Name' />
        <Column dataIndex='dob' key='dob' sorter={(a, b) => a - b} title='Date of Birth' />
        <Column dataIndex='date' key='date' sorter={(a, b) => a - b} title='Date Created' />
        <Column
          key='action'
          render={(text, record) => (
            <Space size='middle'>
              <button css={actionButtonStyle} data-cy='edit' onClick={() => showEditModal(record)}><EditTwoTone /></button>
              <button css={actionButtonStyle} data-cy='delete' onClick={() => showDeleteModal(record)}><DeleteTwoTone twoToneColor='#eb2f96' /></button>
            </Space>
          )}
          title='Action'
        />
      </Table>
      <Modal
        footer={null}
        onCancel={handleCancel}
        title='Edit User'
        visible={visible}
      >
        <EditUser
          closeModal={handleCancel}
          dob={dob}
          firstName={firstName}
          lastName={lastName}
          refetch={refetch}
          userId={userId}
        />
      </Modal>
      <Modal
        footer={[
          <Button
            danger
            key='back'
            onClick={handleCancel}>
              Return
          </Button>,
          <Button
            css={submitButtonStyle}
            id='delete-user-submit'
            key='submit'
            loading={deleteLoading}
            onClick={handleDelete}
            type='primary'>
              Submit
          </Button>
        ]}
        title='Delete User'
        visible={deleteVisible}
      >
        <DeleteUser />
      </Modal>
    </>
  )
}

export default UsersTable

const actionButtonStyle = css`
  background-color: transparent;
  border: none;
  outline: none;

  &:hover {
      cursor: pointer;
  }
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

import React, { useState } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Table, Space, Modal } from 'antd'
import { EditTwoTone } from '@ant-design/icons'
import EditUser from './edit-user'

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
  const [userId, setUserId] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDOB] = useState(moment())

  const showEditModal = (record) => {
    setVisible(true)
    setUserId(record.id)
    setFirstName(record.firstName)
    setLastName(record.lastName)
    let dob = moment(record.dob)
    setDOB(dob)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <>
      <Table dataSource={users} rowKey={record => record.id}>
        <Column dataIndex='firstName' key='firstName' sorter={(a, b) => a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase())} title='First Name' />
        <Column dataIndex='lastName' key='lastName' sorter={(a, b) => a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase())} title='Last Name' />
        <Column dataIndex='dob' key='dob' sorter={(a, b) => moment(a.dob).isBefore(moment(b.dob))} title='Date of Birth' />
        <Column dataIndex='date' key='date' sorter={(a, b) => moment(a.date).isBefore(b.date)} title='Date Created' />
        <Column
          key='action'
          render={(text, record) => (
            <Space size='middle'>
              <button css={actionButtonStyle} data-cy='edit' onClick={() => showEditModal(record)}><EditTwoTone /></button>
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

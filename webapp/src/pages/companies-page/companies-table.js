import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { css } from '@emotion/core'
import { Table, Space, Modal } from 'antd'
import { EditTwoTone } from '@ant-design/icons'
import { addCommas } from '../../common/common'
import EditCompany from './edit-company'

const { Column } = Table

CompaniesTable.propTypes = {
  companies: PropTypes.array,
  refetch: PropTypes.func
}

function CompaniesTable ({ companies, refetch }) {
  companies.forEach(item => {
    let options = { year: 'numeric', month: 'short', day: 'numeric' }
    let [date] = new Date(item.insertedAt).toLocaleDateString('en-US', options).split('/')
    item['date'] = `${date}`
  })

  const [visible, setVisible] = useState(false)
  const [companyId, setCompanyId] = useState('')
  const [name, setName] = useState('')
  const [creditLine, setCreditLine] = useState(0)
  const [availableCredit, setAvailableCredit] = useState(0)

  const showEditModal = (record) => {
    setVisible(true)
    setCompanyId(record.id)
    setName(record.name)
    setCreditLine(record.credit_line)
    setAvailableCredit(record.available_credit)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <>
      <Table dataSource={companies} rowKey={record => record.id}>
        <Column dataIndex='name' key='Name' sorter={(a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())} title='Company' />
        <Column
          key='credit_line'
          render={(text, record) => (
            <label>${addCommas((record.credit_line / 100).toFixed(2))}</label>
          )}
          title='Credit Line' />
        <Column
          key='availableCredit'
          render={(text, record) => (
            <label style={{ color: record.available_credit > 0 ? 'limegreen' : 'red' }}>${addCommas((record.available_credit / 100).toFixed(2))}</label>
          )}
          title='Available Credit' />
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
        title='Edit Company'
        visible={visible}
      >
        <EditCompany
          availableCredit={availableCredit}
          closeModal={handleCancel}
          companyId={companyId}
          creditLine={creditLine}
          name={name}
          refetch={refetch}
        />
      </Modal>
    </>
  )
}

export default CompaniesTable

const actionButtonStyle = css`
  background-color: transparent;
  border: none;
  outline: none;

  &:hover {
      cursor: pointer;
  }
`

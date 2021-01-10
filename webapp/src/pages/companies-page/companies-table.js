import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { css } from '@emotion/core'
import { Table, Space, Modal } from 'antd'
import { EditTwoTone } from '@ant-design/icons'
import EditMerchant from './edit-company'
import { addCommas } from '../../common/common'

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
  const [description, setDescription] = useState('')

  const showEditModal = (record) => {
    setVisible(true)
    setCompanyId(record.id)
    setName(record.name)
    setDescription(record.description)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <>
      <Table dataSource={companies} rowKey={record => record.id}>
        <Column dataIndex='name' key='Name' sorter={(a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())} title='Merchant' />
        <Column
          key='credit_line'
          render={(text, record) => (
            <label>${addCommas(record.credit_line / 100)}</label>
          )}
          title='Credit Line' />
        <Column
          key='availableCredit'
          render={(text, record) => (
            <label>${addCommas(record.available_credit / 100)}</label>
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
        <EditMerchant
          closeModal={handleCancel}
          description={description}
          merchantId={companyId}
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

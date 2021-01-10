import React, { useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { css } from '@emotion/core'
import { Table, Space, Modal } from 'antd'
import { EditTwoTone } from '@ant-design/icons'
import EditMerchant from './edit-merchant'

const { Column } = Table

MerchantsTable.propTypes = {
  merchants: PropTypes.array,
  refetch: PropTypes.func
}

function MerchantsTable ({ merchants, refetch }) {
  merchants.forEach(item => {
    let options = { year: 'numeric', month: 'short', day: 'numeric' }
    let [date] = new Date(item.insertedAt).toLocaleDateString('en-US', options).split('/')
    item['date'] = `${date}`
  })

  const [visible, setVisible] = useState(false)
  const [merchantId, setMerchantId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const showEditModal = (record) => {
    setVisible(true)
    setMerchantId(record.id)
    setName(record.name)
    setDescription(record.description)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <>
      <Table dataSource={merchants} rowKey={record => record.id}>
        <Column dataIndex='name' key='Name' sorter={(a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())} title='Merchant' />
        <Column dataIndex='description' ellipsis key='description' title='Description' />
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
        title='Edit Merchant'
        visible={visible}
      >
        <EditMerchant
          closeModal={handleCancel}
          description={description}
          merchantId={merchantId}
          name={name}
          refetch={refetch}
        />
      </Modal>
    </>
  )
}

export default MerchantsTable

const actionButtonStyle = css`
  background-color: transparent;
  border: none;
  outline: none;

  &:hover {
      cursor: pointer;
  }
`

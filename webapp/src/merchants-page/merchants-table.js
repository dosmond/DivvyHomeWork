import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Table, Space, Modal, Button } from 'antd'
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_MERCHANT } from '../network/mutations'
import EditMerchant from './edit-merchant'
import DeleteMerchant from './delete-merchant'

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
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [merchantId, setMerchantId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [deleteMerchant] = useMutation(DELETE_MERCHANT)

  const showEditModal = (record) => {
    setVisible(true)
    setMerchantId(record.id)
    setName(record.name)
    setDescription(record.description)
  }

  const showDeleteModal = (record) => {
    setDeleteVisible(true)
    setMerchantId(record.id)
  }

  const handleCancel = () => {
    setVisible(false)
    setDeleteVisible(false)
    setDeleteLoading(false)
  }

  const handleDelete = () => {
    setDeleteLoading(true)
    deleteMerchant({
      variables: {
        id: merchantId
      }
    }).then(() => {
      refetch()
      handleCancel()
    })
  }

  return (
    <>
      <Table dataSource={merchants} rowKey={record => record.id}>
        <Column dataIndex='name' key='Name' sorter={(a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())} title='Merchant' />
        <Column dataIndex='description' ellipsis key='description' title='Description' />
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
            id='delete-merchant-submit'
            key='submit'
            loading={deleteLoading}
            onClick={handleDelete}
            type='primary'>
              Submit
          </Button>
        ]}
        title='Delete Merchant'
        visible={deleteVisible}
      >
        <DeleteMerchant />
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

import React from 'react'
import { css } from '@emotion/core'
import { Space, Col, Row, Card } from 'antd'
import AddUser from './add-user'
import { useQuery } from '@apollo/react-hooks'
import { GET_USERS } from '../../queries/queries'
import UsersTable from './users-table'

export function Users () {
  const { loading, error, data, refetch } = useQuery(GET_USERS)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  let users = data.users

  return (
    <Row css={noMarginTop}>
      <Col span={17}>
        <Space css={transactionStyle} direction='vertical'>
          <Card title='Merchants'>
            <UsersTable refetch={refetch} users={users} />
          </Card>
        </Space>
      </Col>
      <Col offset={1} span={6}>
        <Row>
          <AddUser refetch={refetch} />
        </Row>
      </Col>
    </Row>
  )
}

const transactionStyle = css`
  width: 100%;
  box-shadow: -1px 0px 5px 0px rgba(0, 0, 0, 0.14);
`

const noMarginTop = css`
  margin-top: 0;
`

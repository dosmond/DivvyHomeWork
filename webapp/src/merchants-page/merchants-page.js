import React from 'react'
import { css } from '@emotion/core'
import { Space, Col, Row, Card } from 'antd'
import AddMerchant from './add-merchant'
import { useQuery } from '@apollo/react-hooks'
import { GET_MERCHANTS } from '../network/queries'
import MerchantsTable from './merchants-table'

export function Merchants () {
  const { loading, error, data, refetch } = useQuery(GET_MERCHANTS)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  let merchants = data.merchants

  return (
    <Row css={noMarginTop}>
      <Col span={17}>
        <Space css={transactionStyle} direction='vertical'>
          <Card title='Merchants'>
            <MerchantsTable merchants={merchants} refetch={refetch} />
          </Card>
        </Space>
      </Col>
      <Col offset={1} span={6}>
        <Row>
          <AddMerchant refetch={refetch} />
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

import React, { useState } from 'react'
import { css } from '@emotion/core'
import { Space, Col, Row, Card, Switch } from 'antd'
import AddCompany from './add-company'
import { useQuery } from '@apollo/react-hooks'
import { GET_COMPANIES } from '../../queries/queries'
import CompaniesTable from './companies-table'

export function Companies () {
  const { loading, error, data, refetch } = useQuery(GET_COMPANIES)
  const [roman, setRoman] = useState(false)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  let companies = data.companies

  const handleRomanChange = () => {
    setRoman(!roman)
  }

  return (
    <Row css={noMarginTop}>
      <Col span={17}>
        <Space css={transactionStyle} direction='vertical'>
          <Card extra={<div>Use Roman Numerals <Switch checked={roman} id='roman-switch' onChange={handleRomanChange} /></div>} title='Companies'>
            <CompaniesTable companies={companies} refetch={refetch} roman={roman} />
          </Card>
        </Space>
      </Col>
      <Col offset={1} span={6}>
        <Row>
          <AddCompany refetch={refetch} />
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

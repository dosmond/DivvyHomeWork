import React from 'react'
import { css } from '@emotion/core'
import { Space, Card } from 'antd'

// function Transaction() {

// }

export function Transactions () {
  return (
    <>
      <Space css={cardStyle} direction='vertical'>
        <Card title='Transactions'>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Space>
    </>
  )
}

const cardStyle = css`
    min-width: 100%;
`

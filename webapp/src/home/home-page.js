import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import PieChart from '../components/pie-chart'
import LineChart from '../components/line-chart'
import { GET_TRANSACTIONS } from '../network/queries'
import { Space, Card, Row, Col } from 'antd'

export function Home () {
  const { loading, error, data } = useQuery(GET_TRANSACTIONS)

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  let transactions = data.transactions

  transactions.forEach((item) => {
    item['fullName'] = `${item.user.firstName} ${item.user.lastName.substring(0, 1)}`
  })

  let merchantPieChartData = convertTransactionsToMerchantPieChartData(transactions)
  let userPieChartData = convertTransactionsToUserPieChartData(transactions)
  let lineChartData = convertTransactionsToLineChartData(transactions)

  return (
    <Row>
      <Col span={6}>
        <Space direction='vertical'>
          <Card title='Transactions By Merchant'>
            <div style={{ height: '15vw', width: '15vw' }}>
              <PieChart data={merchantPieChartData} />
            </div>
          </Card>
        </Space>
      </Col>
      <Col offset={1} span={6}>
        <Space direction='vertical'>
          <Card title='Transactions By User'>
            <div style={{ height: '15vw', width: '15vw' }}>
              <PieChart data={userPieChartData} />
            </div>
          </Card>
        </Space>
      </Col>
      <Col offset={1} span={10}>
        <Space direction='vertical'>
          <Card title='Transaction History'>
            <div style={{ height: '15vw', width: '30vw' }}>
              <LineChart data={lineChartData} />
            </div>
          </Card>
        </Space>
      </Col>
    </Row>
  )
}

function convertTransactionsToMerchantPieChartData (transactions) {
  let merchantCount = {}

  transactions.forEach((item) => {
    if (merchantCount[item.merchant.name] !== undefined) {
      merchantCount[item.merchant.name] += 1
    } else {
      merchantCount[item.merchant.name] = 1
    }
  })

  return Object.keys(merchantCount).map((item) => {
    return {
      id: item,
      label: item,
      value: merchantCount[item]
    }
  })
}

function convertTransactionsToUserPieChartData (transactions) {
  let userCount = {}

  transactions.forEach((item) => {
    if (userCount[item.fullName] !== undefined) {
      userCount[item.fullName] += 1
    } else {
      userCount[item.fullName] = 1
    }
  })

  return Object.keys(userCount).map((item) => {
    return {
      id: item,
      label: item,
      value: userCount[item]
    }
  })
}

function convertTransactionsToLineChartData (transactions) {
  let monthCount = {}
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  months.forEach((month) => {
    monthCount[month] = 0
  })

  transactions.forEach((item) => {
    let curMonth = new Date(item.insertedAt).toLocaleString('default', { month: 'long' })
    monthCount[curMonth] += 1
  })

  let data = Object.keys(monthCount).map((item) => {
    return {
      x: item,
      y: monthCount[item]
    }
  })

  return [
    {
      id: 'transactions',
      data: data
    }
  ]
}

import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './home'
import { Menu } from 'antd'
import { Transactions } from './transaction-page/transactions-page'

function AppRouter () {
  return (
    <div css={container}>
      <Router>
        <Menu css={menuStyle} mode='horizontal'>
          <Menu.Item key='home'>
            <Link to='/'>Home</Link>
          </Menu.Item>
          <Menu.Item key='transactions'>
            <Link to='/transactions'>Transactions</Link>
          </Menu.Item>
        </Menu>
        <div className='main-content' css={contentStyle}>
          <Route component={Home} exact path='/' />
          <Route component={Transactions} exact path='/transactions' />
        </div>
      </Router>
    </div>
  )
}

export default AppRouter

const contentStyle = css`
  grid-row: 2;
`

const menuStyle = css`
  height: 50px;
  text-align: center;
`
const container = css`
  margin-left: 15%;
  margin-right: 15%;
`

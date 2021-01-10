import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { css } from '@emotion/core'
import { Overview } from './pages/overview/overview-page'
import { Menu } from 'antd'
import { Transactions } from './pages//transaction-page/transactions-page'
import { Merchants } from './pages/merchants-page/merchants-page'
import { Users } from './pages/users-page/users-page'
import { Companies } from './pages/companies-page/companies-page'

function AppRouter () {
  return (
    <div css={container}>
      <Router>
        <Menu css={menuStyle} mode='horizontal'>
          <Menu.Item key='overview'>
            <Link to='/'>Overview</Link>
          </Menu.Item>
          <Menu.Item key='transactions'>
            <Link to='/transactions'>Transactions</Link>
          </Menu.Item>
          <Menu.Item key='merchants'>
            <Link to='/merchants'>Merchants</Link>
          </Menu.Item>
          <Menu.Item key='users'>
            <Link to='/users'>Users</Link>
          </Menu.Item>
          <Menu.Item key='companies'>
            <Link to='/companies'>Companies</Link>
          </Menu.Item>
        </Menu>
        <div className='main-content' css={contentStyle}>
          <Route component={Overview} exact path='/' />
          <Route component={Transactions} exact path='/transactions' />
          <Route component={Merchants} exact path='/merchants' />
          <Route component={Users} exact path='/users' />
          <Route component={Companies} exact path='/companies' />
        </div>
      </Router>
    </div>
  )
}

export default AppRouter

const contentStyle = css`
  grid-row: 2;
  margin-top: 15px;
`

const menuStyle = css`
  height: 50px;
  text-align: center;
`
const container = css`
  margin-left: 15%;
  margin-right: 15%;
`

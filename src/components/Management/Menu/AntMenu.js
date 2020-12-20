import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Layout, Menu } from 'antd'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined
} from '@ant-design/icons'

const { Sider } = Layout

class AntMenu extends Component {
  state = {
    collapsed: false,
  }

  onCollapse = collapsed => {
    this.setState({ collapsed })
  }

  render() {
    const { collapsed } = this.state
    return (
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/admin">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/admin/classes">Classes</Link>
          </Menu.Item>
          <Menu.Item key="9" icon={<FileOutlined />}>
            <Link to="/admin/reports">Reports</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default AntMenu

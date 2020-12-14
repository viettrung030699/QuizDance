import React from 'react'

import 'antd/dist/antd.css';
import { Layout } from 'antd';

import AntMenu from '../../components/Management/Menu/AntMenu'
import Classes from './Classes/Classes';

const { Header, Content, Footer } = Layout;

class Management extends React.Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <AntMenu />
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Classes />
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Management
import React from 'react'
import { Switch, Route } from "react-router-dom";

import 'antd/dist/antd.css';
import { Layout } from 'antd';

import AntMenu from '../../components/Management/Menu/AntMenu'
import Classes from './Classes/Classes';
import Sessions from './Sessions/Sessions';
import Dashboard from './Dashboard/Dashboard';

const { Header, Content, Footer } = Layout;

class Management extends React.Component {
  render() {
    const { path } = this.props.match
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <AntMenu />
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              <Route path={`${path}`} exact component={Dashboard} />
              <Route path={`${path}/classes`} exact component={Classes} />
              <Route path={`${path}/sessions/:classId`} exact component={Sessions} />
              <Route path={`${path}/reports`} exact component={()=><h2>Currently under development D:</h2>} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Management
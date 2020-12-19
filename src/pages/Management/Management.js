import React from 'react'
import { Switch, Route } from "react-router-dom";

import 'antd/dist/antd.css';
import { Layout, Avatar, Badge } from 'antd';

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
          <Header className="site-layout-background" style={{ padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >

            <h5 style={{ margin: '0 1.5rem', color: '#FFFFFF' }}>QuizDance</h5>
            <Badge count={5} style={{ margin: '0 1.5rem' }}>
              <Avatar
                size={{ xs: 10, sm: 14, md: 18, lg: 30, xl: 34, xxl: 36 }}
                style={{ color: '#f56a00', backgroundColor: '#fde3cf', margin: '0 1.5rem' }}
              >C</Avatar>
            </Badge>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              <Route path={`${path}`} exact component={Dashboard} />
              <Route path={`${path}/classes`} exact component={Classes} />
              <Route path={`${path}/sessions/:classId`} exact component={Sessions} />
              <Route path={`${path}/reports`} exact component={() => <h2>Currently under development D:</h2>} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', padding: '12px 50px' }}>QuizDance ©2020 Created by SPM8</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Management
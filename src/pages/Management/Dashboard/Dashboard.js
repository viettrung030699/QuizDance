import React, { Component } from 'react'
import { Bar } from '@ant-design/charts'
import { Button, Card, Table, Space, Carousel, Row, Col } from 'antd';
import Column from 'antd/lib/table/Column';
import { CheckCircleTwoTone, CloseCircleTwoTone, WarningTwoTone } from '@ant-design/icons';

import AntBreadcrumb from '../../../components/Management/Breadcrumb/AntBreadcrumb';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const labChartData = [
  { week: 'Week 5', key: 'SPM', value: 30 },
  { week: 'Week 6', key: 'SPM', value: 10 },
  { week: 'Week 7', key: 'SPM', value: 15 },
  { week: 'Week 8', key: 'SPM', value: 21 },
  { week: 'Week 9', key: 'SPM', value: 23 },
  { week: 'Week 10', key: 'SPM', value: 25 },
  { week: 'Week 11', key: 'SPM', value: 29 }
]

const labChartConfig = {
  data: labChartData,
  width: 1000,
  height: 300,
  autoFit: false,
  isGroup: true,
  xField: 'value',
  yField: 'week',
  seriesField: 'key',
  marginRatio: 0,
  label: {
    position: 'left',
    style: {
      fill: '#fff',
    },
  },
}

const theoryChartData = [
  { week: 'Week 1', key: 'OOAD', value: 60 },
  { week: 'Week 1', key: 'Entre', value: 60 },
  { week: 'Week 2', key: 'OOAD', value: 30 },
  { week: 'Week 2', key: 'Entre', value: 20 },
  { week: 'Week 3', key: 'OOAD', value: 15 },
  { week: 'Week 3', key: 'Entre', value: 20 },
  { week: 'Week 4', key: 'OOAD', value: 55 },
  { week: 'Week 4', key: 'Entre', value: 45 },
  { week: 'Week 5', key: 'OOAD', value: 43 },
  { week: 'Week 5', key: 'Entre', value: 43 },
  { week: 'Week 6', key: 'OOAD', value: 12 },
  { week: 'Week 6', key: 'Entre', value: 20 },
  { week: 'Week 7', key: 'OOAD', value: 30 },
  { week: 'Week 7', key: 'Entre', value: 37 },
  { week: 'Week 8', key: 'OOAD', value: 57 },
  { week: 'Week 8', key: 'Entre', value: 59 },
  { week: 'Week 9', key: 'OOAD', value: 10 },
  { week: 'Week 9', key: 'Entre', value: 23 },
  { week: 'Week 10', key: 'OOAD', value: 30 },
  { week: 'Week 10', key: 'Entre', value: 25 },
  { week: 'Week 11', key: 'OOAD', value: 21 },
  { week: 'Week 11', key: 'Entre', value: 29 }
]

const theoryChartConfig = {
  data: theoryChartData,
  width: 1000,
  height: 300,
  autoFit: false,
  isGroup: true,
  xField: 'value',
  yField: 'week',
  seriesField: 'key',
  marginRatio: 0,
  label: {
    position: 'left',
    style: {
      fill: '#fff',
    },
  },
}

const tableData = [
  { id: 1, name: 'Software Project Management', room: 'A1.606', type: 'Laboratory', weekday: 'Monday', time: '13:15', useQuiz: true },
  { id: 2, name: 'Entrepreneurship', room: 'L.202', type: 'Theory', weekday: 'Wednesday', time: '10:30', useQuiz: false },
  { id: 3, name: 'Object-Oriented Analysis & Design', room: 'A1.409', type: 'Theory', weekday: 'Wednesday', time: '13:15', useQuiz: false }
]

export default class Dashboard extends Component {
  render() {
    const table = (
      <Table dataSource={tableData} pagination={false} rowKey='id'>
        <Column title='Room' dataIndex='room' key='room' />
        <Column title='Course Name' dataIndex='name' key='name' />
        <Column title='Type' dataIndex='type' key='type' />
        <Column title='Weekday' dataIndex='weekday' key='weekday' />
        <Column title='Time' dataIndex='time' key='time' />
        <Column title='Available Quiz' dataIndex='useQuiz' key='useQuiz'
          render={useQuiz => useQuiz ?
            <CheckCircleTwoTone twoToneColor="#52c41a" />
            : <CloseCircleTwoTone twoToneColor="#FF0000" />}
        />
        <Column title="Action" key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button type='link' onClick={() => { }}>Edit Session</Button>
              <Button type='link' onClick={() => { }}>View Question</Button>
            </Space>
          )}
        />
      </Table>
    )

    return (
      <Fragment>
        <Row>
          <AntBreadcrumb
            elements={[
              { key: 1, text: 'Admin', to: '/admin' },
              { key: 2, text: 'Dashboard' },
            ]}
          />
        </Row>
        <Row>
          <Col span={18}>
            <Carousel autoplay dotPosition={'right'} style={{ padding: '1.5rem' }}>
              <Bar {...labChartConfig} />
              <Bar {...theoryChartConfig} />
            </Carousel>
          </Col>
          <Col span={6}>
            <Card style={{ height: 'auto', margin: '1.5rem', textAlign: 'center' }} title='Upcoming Class'>
              <h4>A1.606</h4>
              <h5>Software Project Management Laboratory</h5>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'baseline' }}>
                <WarningTwoTone twoToneColor='#AAAA00' />
                <p>5 absent students for 2 sessions</p>
              </div>
              <Button type='primary'><Link to={'/instruct/LVhUVP'}>Open Session</Link></Button>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {table}
          </Col>
        </Row>
      </Fragment>
    )
  }
}

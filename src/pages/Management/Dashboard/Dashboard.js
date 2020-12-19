import React, { Component } from 'react'
import { Bar } from '@ant-design/charts'
import AntBreadcrumb from '../../../components/Management/Breadcrumb/AntBreadcrumb';
import { Button, Card } from 'antd';

const data = [
  { week: '5', key: 'OOAD', value: 29 },
  { week: '5', key: 'SPM', value: 30 },
  { week: '6', key: 'OOAD', value: 15 },
  { week: '6', key: 'SPM', value: 10 },
  { week: '7', key: 'OOAD', value: 20 },
  { week: '7', key: 'SPM', value: 15 },
  { week: '8', key: 'OOAD', value: 17 },
  { week: '8', key: 'SPM', value: 21 },
  { week: '9', key: 'OOAD', value: 27 },
  { week: '9', key: 'SPM', value: 23 },
  { week: '10', key: 'OOAD', value: 30 },
  { week: '10', key: 'SPM', value: 25 },
  { week: '11', key: 'OOAD', value: 21 },
  { week: '11', key: 'SPM', value: 29 }
]

const config = {
  data: data,
  width: 1400,
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
};

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <AntBreadcrumb
          elements={[
            { text: 'Admin', to: '/admin' },
            { text: 'Dashboard' },
          ]}
        />
        <div style={{display:'flex', flexDirection:'row'}}>
          <Bar {...config} />
          <Card style={{width:'100%', textAlign:'center'}} title='Upcoming Class'>
            <h4>A1.606</h4>
            <h5>Software Project Management Laboratory</h5>

            <Button type='primary' onClick={()=>{}}>Open Session</Button>
          </Card>
        </div>
      </div>
    )
  }
}

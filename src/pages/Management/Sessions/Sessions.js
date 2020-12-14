import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Table, Breadcrumb, Space } from 'antd'
import Column from 'antd/lib/table/Column'

import { API } from '../../../services/api'

class Sessions extends Component {
  state = {
    sessionData: [],
    loading: false
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({ loading: true })
    const result = await API.get('/all-session')
    this.setState({ sessionData: result.data.map(s => s.useQuiz ? {...s, useQuiz: "Yes"} : {...s, useQuiz: "No"}), loading: false })
  }

  render() {
    const { sessionData, loading } = this.state
    return (
      <div>
        <Breadcrumb style={{ margin: '1rem 0' }}>
          <Breadcrumb.Item>
            <Link to='/admin'>Admin</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Sessions</Breadcrumb.Item>
        </Breadcrumb>
        <Table dataSource={sessionData} loading={loading} pagination={true} >
          <Column title='Session Id' dataIndex='id' key='id' />
          <Column title='Week Number' dataIndex='weekNo' key='weekNo'
            defaultSortOrder='ascend'
            sorter={(a, b) => a.weekNo - b.weekNo}
          />
          <Column title='Quiz' dataIndex='useQuiz' key='useQuiz' />
          <Column title='Class Id' dataIndex='classId' key='classId' />
          <Column title="Action" key="action"
            render={(text, record) => (
              <Space size="middle">
                <Link to='/admin/sessions'>View detail</Link>
                <a href='/delete'>Delete</a>
              </Space>
            )}
          />
        </Table>
      </div>
    )
  }
}

export default Sessions

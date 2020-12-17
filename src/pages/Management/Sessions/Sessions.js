import React, { Component } from 'react'

import { Table, Space, Button, Divider, List, Modal } from 'antd'
import Column from 'antd/lib/table/Column'
import { CheckCircleTwoTone } from '@ant-design/icons';

import AntBreacrumb from '../../../components/Management/Breadcrumb/AntBreadcrumb'

import { API } from '../../../services/api'

class Sessions extends Component {
  state = {
    sessionData: [],
    loading: false,
    isModalOpen: false,
    modalLoading: false,
    isEditing: false,
    viewedSessionId: '',
    viewedSessionData: []
  }

  componentDidMount() {
    this.fetchData(this.props.match.params.classId)
  }

  fetchData = async (classId) => {
    this.setState({ loading: true })
    const result = await API.get(`/search-session-class/${classId}`)
    const mappedResult = Object.values(result.data).map(s => s.useQuiz ? { ...s, useQuiz: "Yes" } : { ...s, useQuiz: "No" })
    this.setState({ sessionData: mappedResult, loading: false })
  }

  toggleModal = async (sessionId) => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
    if (sessionId !== this.state.viewedSessionId) {
      this.setState({ modalLoading: true })
      const result = await API.get(`/list-question/${sessionId}`)
      this.setState({
        viewedSessionId: sessionId,
        viewedSessionData: result.data,
        modalLoading: false
      })
    }
  }

  render() {
    const { sessionData, loading, isModalOpen, modalLoading, viewedSessionId, viewedSessionData } = this.state

    const breadcrumb = (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <AntBreacrumb 
          elements={[
            {text: 'Admin', to: '/admin'}, 
            {text: 'Classes', to: '/admin/classes'},
            {text: `${this.props.match.params.classId} Sessions`}
          ]}
        />
        <Button type='primary' onClick={this.toggleModal} style={{ margin: '1rem 0' }}>Create New Session</Button>
      </div>
    )

    const table = (
      <Table dataSource={sessionData} loading={loading} pagination={true} rowKey='id'>
        <Column title='Session Id' dataIndex='id' key='id' />
        <Column title='Week Number' dataIndex='weekNo' key='weekNo'
          defaultSortOrder='ascend'
          sorter={(a, b) => a.weekNo - b.weekNo}
        />
        <Column title='Quiz' dataIndex='useQuiz' key='useQuiz' />
        <Column title="Action" key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button type='link' onClick={() => this.toggleModal(record.id)}>View Question</Button>
              <a href='/delete'>Delete</a>
            </Space>
          )}
        />
      </Table>
    )

    const sessionDetail = (
      !modalLoading &&
      <Modal style={{ top: '0' }} width={'90%'} visible={isModalOpen} onOk={this.toggleModal} onCancel={this.toggleModal}>
        <Divider orientation="left">{viewedSessionId} questions</Divider>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={viewedSessionData}
          renderItem={data => (
            <List.Item>
              <h6>{data.question}</h6>
              <List
                dataSource={data.answers}
                renderItem={answer => (
                  <List.Item>
                    <p>{answer.answerText}</p>
                    { answer.isCorrect && <CheckCircleTwoTone twoToneColor="#52c41a" />}
                  </List.Item>
                )}
              />
            </List.Item>
          )}
        />
      </Modal>
    )

    return (
      <div>
        {breadcrumb}
        {table}
        {sessionDetail}
      </div>
    )
  }
}

export default Sessions

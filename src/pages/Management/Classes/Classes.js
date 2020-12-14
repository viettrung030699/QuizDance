import React, { Component } from 'react'

import { Table, Space, Breadcrumb } from 'antd'

import { API } from '../../../services/api'
import ColumnGroup from 'antd/lib/table/ColumnGroup'
import Column from 'antd/lib/table/Column'
import { Link } from 'react-router-dom'

const weekdayIds = {
    Monday: 2,
    Tuesday: 3,
    Wednesday: 4,
    Thursday: 5,
    Friday: 6,
    Saturday: 7
}

export default class Classes extends Component {
    state = {
        classData: [],
        loading: false
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData = async () => {
        this.setState({ loading: true })
        const result = await API.get('/all-class')
        this.setState({ classData: result.data, loading: false })
    }

    render() {
        const { classData, loading } = this.state
        return (
            <div>
                <Breadcrumb style={{margin:'1rem 0'}}>
                    <Breadcrumb.Item>
                        <Link to='/admin'>Admin</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Classes</Breadcrumb.Item>
                </Breadcrumb>
                <Table dataSource={classData} loading={loading} pagination={true} >
                    <Column title='Class Id' dataIndex='id' key='id' />
                    <Column title='Type' dataIndex='classType' key='classType' />
                    <Column title='Room' dataIndex='room' key='room' />
                    <Column title='Weekday' dataIndex='weekDay' key='weekDay'
                        defaultSortOrder='ascend'
                        sorter={(a, b) => weekdayIds[a.weekDay] - weekdayIds[b.weekDay]}
                    />
                    <ColumnGroup title='Period'>
                        <Column title='Start' dataIndex='periodStart' key='periodStart'
                            defaultSortOrder='ascend'
                            sorter={(a, b) => a.periodStart - b.periodStart}
                        />
                        <Column title='End' dataIndex='periodEnd' key='periodEnd'
                            defaultSortOrder='ascend'
                            sorter={(a, b) => a.periodEnd - b.periodEnd}
                        />
                    </ColumnGroup>
                    <Column title="Action" key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <Link to='/admin/sessions'>View sessions</Link>
                                <a href='/delete'>Delete</a>
                            </Space>
                        )}
                    />
                </Table>
            </div>
        )
    }
}

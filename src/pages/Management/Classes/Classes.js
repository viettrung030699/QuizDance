import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Table, Space, Form, Input, InputNumber, Button, Select, Modal } from 'antd'
import ColumnGroup from 'antd/lib/table/ColumnGroup'
import Column from 'antd/lib/table/Column'

import { API } from '../../../services/api'
import AntBreadcrumb from '../../../components/Management/Breadcrumb/AntBreadcrumb'

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
        loading: false,
        isModalOpen: false,
        isEditing: false,
        editClassData: {},
        editClassId: ''
    }

    componentDidMount() { this.fetchData() }

    fetchData = async () => {
        this.setState({ loading: true })
        const result = await API.get('/all-class')
        this.setState({ classData: result.data, loading: false })
    }

    toggleModal = (isEditing = false, classId = null) => {
        if (isEditing) {
            const editingClass = this.state.classData.find(aclass => aclass.id === classId)
            this.setState({
                isModalOpen: !this.state.isModalOpen,
                isEditing: isEditing,
                editClassData: editingClass,
                editClassId: classId
            })
        } else {
            this.setState({
                isModalOpen: !this.state.isModalOpen,
                isEditing: isEditing
            })
        }
    }

    onFinish = (values) => {
        if (this.state.isEditing) {
            API.put(`/edit-class/${values.id}`, values)
                .then(result => {
                    this.toggleModal()
                    this.fetchData()
                })
                .catch(err => this.onFinishFailed(err))
        } else {
            API.post('/new-class', { ...values, lecturerId: '17067' })
                .then(result => {
                    this.toggleModal()
                    this.fetchData()
                })
                .catch(err => this.onFinishFailed(err))
        }
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    };

    render() {
        const { classData, loading, isModalOpen, editClassData, isEditing } = this.state

        const header = (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <AntBreadcrumb 
                    elements={[
                        {text: 'Admin', to: '/admin'},
                        {text: 'Classes'}
                    ]}
                />
                <Button type='primary' onClick={()=>this.toggleModal()} style={{ margin: '1rem 0' }}>Create New Class</Button>
            </div>
        )

        const table = (
            <Table dataSource={classData} loading={loading} pagination={true} rowKey='id'>
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
                            <Link to={`/admin/sessions/${record.id}`}>View sessions</Link>
                            <Button type='link' onClick={() => this.toggleModal(true, record.id)}>Edit Class</Button>
                            <a href='/delete'>Delete</a>
                        </Space>
                    )}
                />
            </Table>
        )

        const form = (
            <Modal title={isEditing ? 'Update Class' : 'Create New Classes'} visible={isModalOpen} onCancel={this.toggleModal}
                footer={[
                    <Button onClick={this.toggleModal}>
                        Cancel
                    </Button>,
                    <Button form="classForm" type='primary' key="submit" htmlType="submit">
                        Submit
                    </Button>
                ]}
            >
                <Form
                    initialValues={isEditing && editClassData}
                    id='classForm' layout='vertical'
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item label='Class ID' name='id'
                        rules={[
                            {
                                required: true,
                                message: 'Please input the class ID D:'
                            },
                            {
                                max: 7,
                                message: 'Input must not exceed 7 characters'
                            }
                        ]}
                    >
                        <Input placeholder='SPM102' />
                    </Form.Item>
                    <Form.Item label="Class Type" name='classType'>
                        <Select placeholder='Theory or lab?'>
                            <Select.Option value="Theory">Theory</Select.Option>
                            <Select.Option value="Lab">Laboratory</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='Room' name='room'
                        rules={[
                            {
                                required: true,
                                message: 'Please input the room number D:'
                            },
                            {
                                max: 6,
                                message: 'Input must not exceed 6 characters'
                            }
                        ]}
                    >
                        <Input placeholder='A1.202' />
                    </Form.Item>
                    <Form.Item label="Weekday" name='weekDay'>
                        <Select placeholder='Monday to Saturday'>
                            <Select.Option value="Monday">Monday</Select.Option>
                            <Select.Option value="Tuesday">Tuesday</Select.Option>
                            <Select.Option value="Wednesday">Wednesday</Select.Option>
                            <Select.Option value="Thursday">Thursday</Select.Option>
                            <Select.Option value="Friday">Friday</Select.Option>
                            <Select.Option value="Saturday">Saturday</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='Period'>
                        <Input.Group compact>
                            <Form.Item name='periodStart'>
                                <InputNumber style={{ width: 100, textAlign: 'center' }} placeholder="Start" />
                            </Form.Item>
                            <Input
                                className="site-input-split"
                                style={{
                                    width: 30,
                                    borderLeft: 0,
                                    borderRight: 0,
                                    pointerEvents: 'none',
                                    backgroundColor: '#fff'
                                }}
                                placeholder="~"
                                disabled
                            />
                            <Form.Item name='periodEnd'>
                                <InputNumber
                                    className="site-input-right"
                                    style={{
                                        width: 100,
                                        textAlign: 'center',
                                        borderLeft: '0'
                                    }}
                                    name='periodEnd'
                                    placeholder="End"
                                />
                            </Form.Item>
                        </Input.Group>
                    </Form.Item>
                </Form>
            </Modal>
        )
        return (
            <div>
                {header}
                {table}
                {form}
            </div>
        )
    }
}

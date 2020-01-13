import React, { Component } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Row, Button, Popconfirm } from 'antd';
import { connect } from 'dva';
import styles from './index.less'


@connect(({ cpu, loading }) => ({
    // cpuData: cpu.cpuData,
    loading: loading.models['cpu'],
}))
class index extends Component {

    state = {
        pageSize: 10,
        pageNum: 1,
        total: 1,
        cpuData: [],
    }

    componentDidMount() {
        this.getData()
    }

    handleOnDelete = (item) => {
        const { dispatch } = this.props
        dispatch({
            type: 'cpu/fetchItemDelete',
            payload: item.ip,
            callback: res => {
                console.log("res1", res)
                if (res._code == 200) {
                    console.log("res", res)
                    this.getData()
                }
            }
        })
    }

    getData = (page) => {
        const { dispatch } = this.props;
        const { pageNum, pageSize } = this.state;
        let data = {}
        if (page) {
            data.pageSize = page.pageSize
            data.pageNum = page.pageNum
        } else {
            data.pageSize = pageSize
            data.pageNum = pageNum
        }
        dispatch({
            type: 'cpu/fetchGetList',
            payload: data,
            callback: res => {
                if (res._code == 200) {
                    console.log("res", res)
                    this.setState({
                        cpuData: res.items,
                        pageNum: res.pageNum,
                        pageSize: res.pageSize,
                        total: res.total
                    })
                }
            }
        })
    }

    handleOnChangeTable = (pagination) => {
        let data = {
            pageSize: pagination.pageSize,
            pageNum: pagination.current
        }
        this.getData(data)
    }

    handleOnCancel = () => {
        console.log("cancel")
    }

    render() {
        const { loading } = this.props
        const { pageSize, pageNum, total, cpuData } = this.state
        const pagination = {
            current: pageNum,
            total: total,
            pageSize: pageSize,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} 记录`,
        };
        const colums = [{
            title: 'ip',
            dataIndex: 'ip',
        }, {
            title: 'cpu_user',
            dataIndex: 'cpu_user',
        }, {
            title: 'cpu_system',
            dataIndex: 'cpu_system',
        }, {
            title: 'memtotal',
            dataIndex: 'memtotal',
        }, {
            title: 'memfree',
            dataIndex: 'memfree',
        }, {
            title: 'memavailable',
            dataIndex: 'memavailable',
        },
        //     {
        //     title: 'size',
        //     dataIndex: 'size',
        // }, {
        //     title: 'used',
        //     dataIndex: 'used',
        // }, {
        //     title: 'avaliable',
        //     dataIndex: 'avaliable',
        //     },
        {
            title: '操作',
            dataIndex: 'opt',
            render: (test, record) => {
                return (<Row>
                    <Popconfirm
                        title="确定删除该数据吗?"
                        onConfirm={() => this.handleOnDelete(record)}
                        onCancel={this.handleOnCancel}
                        okText="是"
                        cancelText="否"
                    > <Button type="danger" shape="circle" ghost icon="delete" />
                    </Popconfirm>
                    <Button style={{ marginLeft: 10 }} type="primary" shape="circle" ghost icon="redo" />
                </Row>)
            }
        }]
        return (
            <PageHeaderWrapper>
                <div className={styles.page}>
                    <Table
                        columns={colums}
                        loading={loading}
                        dataSource={cpuData}
                        pagination={pagination}
                        onChange={this.handleOnChangeTable}
                    />
                </div>
            </PageHeaderWrapper>
        );
    }
}

export default index;
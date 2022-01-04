import React, { useState, useEffect } from 'react'
import { Table, Divider, Icon } from 'antd';


const ListUsers = (props) => {
    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Data',
            dataIndex: 'data',
            key: 'data',
        },
        {
            title: 'Valor',
            dataIndex: 'buy',
            key: 'buy',
        },
        {
            title: 'Já é cliente?',
            dataIndex: 'renovation',
            key: 'renovation',
        },
        {
            title: 'Ações',
            key: 'id',
            render: (text, record) => (
                <span>
                <a><Icon style={{fontSize: 16}} type="edit" /></a>
                <Divider type="vertical" />
                <a><Icon style={{fontSize: 16}} type="delete" onClick={(e) => console.log(record.id)} /></a>
            </span>
            ),
        },
    ];
    useEffect(() => {
        console.log('asdasd')
        console.log(props)
    }, [])


    return (
        <div>
            <Table columns={columns} dataSource={props.users} />
        </div>
    )
}

export default ListUsers
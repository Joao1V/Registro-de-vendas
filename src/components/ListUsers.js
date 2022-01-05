import React, { useState, useEffect } from 'react'
import { Table, Divider, Icon } from 'antd';


const ListUsers = (props) => {
    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name', //Define o que será escrito na minha linha
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
            key: 'Acoes',
            render: (text, record) => (
                <span>
                <a><Icon title={"Editar"} style={{fontSize: 16}} type="edit" /></a>
                <Divider type="vertical" />
                <a><Icon title={"Deletar"} style={{fontSize: 16}} type="delete" onClick={() => props.deleteUser(record.id)} /></a>
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
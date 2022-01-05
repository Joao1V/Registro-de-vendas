import React, {useState } from "react";
import {Modal, Icon} from 'antd';

const ModalEdit = () => {

    const [modal, setModal] = useState(false)

    const showModal = () => {
        setModal(true)
    }

    const handleOk = e => {
        console.log(e);
        setModal(false)
    }

    const handleCancel = e => {
        console.log(e)
        setModal(false)
    }

    return(
        <div>
            <a onClick={showModal}>
                <Icon title={"Editar"} style={{fontSize: 16}} type="edit" />
            </a>
            <Modal
                title="Basic Modal"
                visible={modal}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}

export default ModalEdit
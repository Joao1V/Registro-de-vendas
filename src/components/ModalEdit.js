import React, {useState} from "react";
import {Modal, Icon, Select} from 'antd';

const ModalEdit = (props) => {

    function onBlur() {
        console.log('blur');
    }

    function onFocus() {
        console.log('focus');
    }

    function onSearch(val) {
        console.log('search:', val);
    }

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

    console.log(props)
    return (
        <div>
            <a onClick={showModal}>
                <Icon title={"Editar"} style={{fontSize: 16}} type="edit"/>
            </a>
            <Modal
                title="Editar Usuário"
                visible={modal}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <span style={{}} className={""}>
                  <form style={{width:"100%"}}>
                    <div>
                        <div style={{marginTop:-10}}>
                            <label htmlFor="name"/> Nome
                            <input style={{width:"100%"}} className="input-field" placeholder="Nome" id={"name"} type="text"/>
                        </div>

                        <div style={{marginTop:10}}>
                            <label htmlFor="buy"/>Valor
                            <input style={{width:"100%"}} className="input-field" placeholder="Valor" id={"buy"} type="text"/>
                        </div>

                        <div style={{marginTop:10}}>
                            <label htmlFor="renovation"/> Já é cliente?
                            <Select
                                showSearch
                                placeholder="Já é cliente?"
                                optionFilterProp="children"
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                            >
                                <Option value="Sim">Sim</Option>
                                <Option value="Não">Não</Option>
                            </Select>
                        </div>
                    </div>
                  </form>
                </span>
            </Modal>
        </div>
    )
}

export default ModalEdit
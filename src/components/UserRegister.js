import React, {useState} from "react";
import {Button, Select} from "antd";
import {maskBRL} from "./mask";

const {Option} = Select;

const UserRegister = props => {

    const initialFormState = {
        id: null,
        name: "",
        buy: "",
        renovation: "",
    }

    const [user, setUser] = useState(initialFormState)
    const [loading, setLoading] = useState()

    function handleChange(value) {
        console.log(`selected ${value}`);

    }

    const onClick = (e) =>{

        console.log('ta clicando')
        e.preventDefault()
        if (
            !user.name ||
            !user.buy ||
            !user.renovation)
        return
        props.addUser(user)
        setUser(initialFormState)
        console.log('ta salvando')
    }

    return (
        <div>
            <div>
                <form
                    className="wrap"
                    onSubmit={event => {
                        event.preventDefault()
                        if (
                            !user.name ||
                            !user.buy ||
                            !user.renovation
                        ) props.addUser(user)
                        setUser(initialFormState)
                    }}
                >

                    <div className={"field"}>
                        <input className="input-field" placeholder="Nome" type="text"
                               onChange={e => setUser({...user, name: e.target.value})} value={user.name}/>
                    </div>
                    <div className={"field"}>
                        <input className="input-field" placeholder="Digite o valor" type="text"
                               onChange={e => setUser({...user, buy:maskBRL(e.target.value)})} value={user.buy}/>
                    </div>
                    <div className={"field w-12"}>
                        <Select value={user.renovation} placeholder="Selecione" onChange={e =>  setUser({...user, renovation: e}) }>
                            <Option value="Sim">Sim</Option>
                            <Option value="Nao">Não</Option>
                        </Select>
                    </div>
                    <div className={"field"}>
                        <Button onClick={(e) => onClick(e)} type="primary">Salvar</Button>
                    </div>
                </form>

            </div>
        </div>
    )
}
export default UserRegister

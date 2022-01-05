import React, {useState} from "react";
import {Button, Select} from "antd";
import {maskBRL} from "./mask";
import moment from "moment";

const {Option} = Select;

const UserRegister = props => {
    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onBlur() {
        console.log('blur');
    }

    function onFocus() {
        console.log('focus');
    }

    function onSearch(val) {
        console.log('search:', val);
    }

    const initialFormState = {
        id: null,
        name: "",
        buy: "",
        renovation: "",
    }

    const [user, setUser] = useState(initialFormState)

    function handleChange(value) {
        console.log(`selected ${value}`);

    }

    const onClick = (e) => {
        e.preventDefault()
        console.log('ta clicando')
        console.log(user)
        if (user.name && user.buy && user.renovation) {
            user.data = moment().format('DD/MMM/YYYY');
            props.addUser(user)
            setUser(initialFormState)
            console.log('ta salvando')
        }
    }

    return (
        <div>
            <form
                className="d-flex"
            >
                <div className={"field"}>
                    <input className="input-field" placeholder="Nome" type="text"
                           onChange={e => setUser({...user, name: e.target.value})} value={user.name}/>
                </div>
                <div className={"field"}>
                    <input className="input-field" placeholder="Digite o valor" type="text"
                           onChange={e => setUser({...user, buy: maskBRL(e.target.value)})} value={user.buy}/>
                </div>
                <div className={"field w-12"}>
                    <Select
                        showSearch
                        onChange={e => setUser({...user, renovation: e})}
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
                <div className={"field"}>
                    <Button onClick={(e) => onClick(e)} type="primary">Salvar</Button>
                </div>
            </form>
        </div>
    )
}
export default UserRegister

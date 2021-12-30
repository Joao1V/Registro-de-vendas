import React, {useRef, useState} from 'react'
import {maskBRL} from "./components/mask";
import './custom.less';
import ListUsers from "./components/ListUsers";
import UserRegister from "./components/UserRegister";
import 'antd/dist/antd.css';

const App = () => {
    const usersData = [{
        id:1,
        name: 'Joao',
        buy: 'R$ 40,00',
        renovation: 'Sim'
    },
        {
            id:2,
            name: 'cebola',
            buy: 'R$ 40,00',
            renovation: 'Sim'
        }
    ]


    const users = useRef(usersData);
    const [counter, setCounter] = useState(users.current.length)

    const addUser = (user) => {
        user.id = users.length + 1;
        users.current.push(user);
        setCounter(counter+1)
    }
    console.log(users)
    return (
        <div>
            <h1>Registro de vendas</h1>
            <div> cade {counter}</div>
            <div>
                <UserRegister addUser={addUser}/>
            </div>
            <div>
             <ListUsers users={users.current} />
            </div>
        </div>
    )
}
export default App;

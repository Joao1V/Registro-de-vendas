import React from 'react'
import { Icon } from 'antd';

const AsideOptions = () => {

    return(
        <div>
            <div className="icons-list">
                <ul style={{}} >
                    <li>
                       <a><Icon type="pie-chart"/> Dashboard</a>
                    </li>
                    <li>
                        <a><Icon type="usergroup-add"/> Cadastrar Cliente</a>
                    </li>
                    <li>
                        <a><Icon type="solution" /> Listar Usuário</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default AsideOptions

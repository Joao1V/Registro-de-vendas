import React, {useRef, useState} from 'react'
import '../custom.less';
import { Layout, Menu, Icon, Dropdown, Button } from 'antd';
import ListUsers from "../components/ListUsers";
import UserRegister from "../components/UserRegister";
import 'antd/dist/antd.css';
import moment from "moment";

const HomePage = () => {
const now = moment().format('DD/MMM/YYYY');
    const usersData = [{
        id:1,
        name: 'Joao',
        data: now,
        buy: 'R$ 40,00',
        renovation: 'Sim'
    },
        {
            id:2,
            name: 'cebola',
            data: now,
            buy: 'R$ 40,00',
            renovation: 'Sim'
        }
    ]


    const users = useRef(usersData); //está usando o current por causa do ref
    const [counter, setCounter] = useState(users.current.length)

    const addUser = (user) => {
        user.id = users.current.length +1;
        users.current.push(user);
        setCounter(counter +1)
    }

    const deleteUser = (id) => {
        users.current = users.current.filter((user) => user.id !== id)
        console.log(users.current)
        console.log(id)
        setCounter(counter -1)

    }

    const { Header, Content, Sider } = Layout;

    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    <Icon type="logout" /> Sair
                </a>
            </Menu.Item>
        </Menu>);

    return (
        <Layout style={{height:"100%"}}>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}

            >
                <Menu style={{marginTop:80}} theme="dark" mode="inline" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">
                        <Icon type="pie-chart" />
                        <span className="nav-text">Dashboard</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="dollar" />
                        <span className="nav-text">Registrar Venda</span>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <div>
                        <h1 style={{textDecoration: "overline", marginLeft: 25, fontSize:25}}>Registrar Venda</h1>
                            <Dropdown overlay={menu}  style = {{ backgroundColor: "blue", position:"relative" }} >
                                <Button className={"p-userHeader"}
                                        style={{position:"absolute", marginTop:7}}><Icon type="user" />JoaoVictor
                                </Button>
                            </Dropdown>
                    </div>
                </Header>
                <Content style={{ margin: '24px 16px 0' , minHeight: 600}}>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <UserRegister addUser={addUser}/>
                        <ListUsers users={users.current} deleteUser={deleteUser}/>
                       
                    </div>
                </Content>
                <footer style={{textAlign:"center"}}>JoaoV ©2022 Created by JoaoV</footer>
            </Layout>
        </Layout>
    )
}
export default HomePage;

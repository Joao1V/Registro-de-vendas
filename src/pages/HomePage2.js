import React, {useRef, useState} from 'react'
import {maskBRL} from "../components/mask";
import '../custom.less';
import ListUsers from "../components/ListUsers";
import UserRegister from "../components/UserRegister";
import 'antd/dist/antd.css';

const HomePage = () => {

    return (
        <div className={"container"}>
            <header className={"o-header"}>
                <div>header</div>
            </header>
            <aside className={"o-aside"}>
                <div>aside</div>
            </aside>
            <main className={"o-main"}>

            </main>
            <footer className={"o-footer"}>
                <div>footer</div>
            </footer>
        </div>
    )
}
export default HomePage;

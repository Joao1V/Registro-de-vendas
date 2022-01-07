import React from 'react'
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import './custom.less';
import 'antd/dist/antd.css';
import HomePage from "./pages/HomePage";
import Login from "./pages/Login"

const App = () => {

    return (
        <div style={{height:"100%"}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/homepage" element={<HomePage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default App;


import React from 'react'

import './custom.less';
import 'antd/dist/antd.css';
import HomePage from "./pages/HomePage";
import Login from "./pages/Login"
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import RegisterNewUser from "./pages/RegisterNewUser";

const App = () => {

    return (
        <div style={{height:"100%"}}>
            <Router>
                <Switch>
                    <Route exact path="/"> <Login/> </Route>
                    <Route path="/homepage"> <HomePage/> </Route>
                    <Route path="/userRegister"> <RegisterNewUser/> </Route>
                </Switch>
            </Router>

        </div>
    )
}
export default App;


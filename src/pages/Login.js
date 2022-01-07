import React, {useState} from "react";
import useLocalStorage from "../hooks/Storage";
import {useHistory, Link} from "react-router-dom";


const Login = () => {

    const [email, setEmail] = useState(undefined)
    const [password, setPassword] = useState(undefined)
    let history = useHistory()
    const storage = useLocalStorage("userData")

    const randomLogin = () => {
        if ( email.length >= 3 && password.length >= 4) {
          let userObject = {
              username: "jose",
              email: email,
              password: password
          }
          storage.setObject(userObject)
            history.push("/homepage");
        }
    }

    return(
        <div style={{}}>
            <div className={"card-login"}>

                <h1 style={{color: "#FFFFFF", fontSize:44, fontFamily: "Lexend Deca", fontWeight: 400}}> Login</h1>
                <h2 style={{color: "#FFFFFF", fontSize:16, fontFamily: "Lexend Deca", fontWeight: 200, marginTop:-16}}>Entre e gerencie suas vendas</h2>

                <div className={""} style={{display: "flex", alignItems:"center", justifyContent: "center", flexDirection: "column" }} >
                    <input onChange={(e) => { setEmail (e.target.value)}} className={"field-login"} value={email} type="email" placeholder={"Usuário"}/>
                    <input onChange={(e) => { setPassword (e.target.value)}} className={"field-login"} value={password} type="password" placeholder={"Senha"}/>
                </div>

                <button className="button-login" role="button" onClick={randomLogin}> Entrar </button>

                <span style={{marginTop:"2rem", fontSize:12, color:"#FFFFFF"}}>Não tem conta?
                 <Link to="/userRegister">
                    <a className={"a-login"} href="">Registrar-se</a>
                 </Link>
                </span>
            </div>
        </div>
    )

}

export default Login

import React, {useState} from "react";
import useLocalStorage from "../hooks/Storage";
import {useHistory, Link} from "react-router-dom";


const Login = () => {

    const [nameUser, setNameUser] = useState(undefined)
    const [email, setEmail] = useState (undefined)
    const [password, setPassword] = useState(undefined)

    let history = useHistory()

    const storage = useLocalStorage("userData")

    const randomRegister = () => {
        if ( nameUser.length >= 3 && email.includes("@") && password.length >= 4) {
            let userObject = {
                username: nameUser,
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

                <h1 style={{color: "#FFFFFF", fontSize:44, fontFamily: "Lexend Deca", fontWeight: 400}}>Cadastro</h1>
                <h2 style={{color: "#FFFFFF", fontSize:16, fontFamily: "Lexend Deca", fontWeight: 200, marginTop:-16}}>Comece a registrar suas vendas!</h2>

                <div className={""} style={{display: "flex", alignItems:"center", justifyContent: "center", flexDirection: "column" }} >
                    <input onChange={(e) => { setNameUser (e.target.value)}} className={"field-login"} title={"Nome de Usuário"} value={nameUser} type="email" placeholder={"Escolha o nome de usuário"}/>
                    <input onChange={(e) => { setEmail (e.target.value)}} className={"field-login"} title={"E-mail"} value={email} type="email" placeholder={"E-mail"}/>
                    <input onChange={(e) => { setPassword (e.target.value)}} className={"field-login"} title={"Senha"} value={password} type="password" placeholder={"Senha"}/>
                </div>

                <button className="button-login" role="button" onClick={randomRegister}> Registrar </button>

                <span style={{marginTop:"2rem", fontSize:12, color:"#FFFFFF"}}>Já tem conta?
                    <Link to={"/"}>
                        <a className={"a-login"} href=""> Faça o Login</a>
                    </Link>
                </span>
            </div>
        </div>
    )

}

export default Login

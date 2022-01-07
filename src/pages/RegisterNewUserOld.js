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
            <div className={"card-register"} style={{backgroundColor:"grey", margin:"auto"}}>

                <h1 style={{color: "#FFFFFF", fontSize:44, fontFamily: "Lexend Deca", fontWeight: 400}}>Cadastro</h1>
                <h2 style={{color: "#FFFFFF", fontSize:16, fontFamily: "Lexend Deca", fontWeight: 200, marginTop:-16}}>Comece a registrar suas vendas!</h2>

                <div className={"card-register"} style={{flexDirection:"column",}} >
                    <div className={"card-register-inputs"}>
                        <label className={"label-register"} htmlFor="nome">Nome
                            <input id={"nome"} onChange={(e) => { setNameUser (e.target.value)}} className={"field-login"} title={"Nome de Usuário"} value={nameUser} type={"email"}/>
                        </label>

                        <label className={"label-register"} htmlFor="sexo">Sexo
                            <input id={"sexo"} onChange={(e) => { setPassword (e.target.value)}} className={"field-login"} title={"Senha"} value={password} type="password"/>
                        </label>

                        <label className={"label-register"} htmlFor="email">Email
                            <input id={"email"} onChange={(e) => { setPassword (e.target.value)}} className={"field-login"} title={"Senha"} value={password} type="password"/>
                        </label>
                    </div>

                    <div className={"card-register-inputs"}>
                        <label className={"label-register"} htmlFor="cpf">CPF
                            <input id={"cpf"} onChange={(e) => { setPassword (e.target.value)}} className={"field-login"} title={"Senha"} value={password} type="password"/>
                        </label>

                        <label className={"label-register"} htmlFor="celular">Celular
                            <input id={"celular"} onChange={(e) => { setPassword (e.target.value)}} className={"field-login"} title={"Senha"} value={password} type="password"/>
                        </label>

                        <label className={"label-register"} htmlFor="data_nascimento">Data de Nascimento
                            <input c id={"data_nascimento"} onChange={(e) => { setPassword (e.target.value)}} className={"field-login"} title={"Senha"} value={password} type="password"/>
                        </label>
                    </div>

                    <label  htmlFor="avatar"> Avatar
                        <input id={"avatar"} onChange={(e) => { setPassword (e.target.value)}} className={"field-login"} title={"Senha"} value={password} type="password"/>
                    </label>
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

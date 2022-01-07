import React from "react";


const Login = () => {

    console.log("alguma coisa")

    return(
        <div style={{}}>
            <div className={"card-login"}>

                <h1 style={{color: "#FFFFFF", fontSize:44, fontFamily: "Lexend Deca", fontWeight: 400}}> Login</h1>
                <h2 style={{color: "#FFFFFF", fontSize:16, fontFamily: "Lexend Deca", fontWeight: 200}}>Entre e gerencie suas vendas</h2>

                <div className={""} style={{display: "flex", alignItems:"center", justifyContent: "center", flexDirection: "column" }} >
                    <input className={"field-login"} type="email" placeholder={"Usuário"}/>
                    <input className={"field-login"} type="password" placeholder={"Senha"}/>
                </div>

                <button className="button-login" role="button"> Entrar </button>

            </div>
        </div>
    )

}

export default Login

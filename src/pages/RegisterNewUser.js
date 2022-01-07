import React, {useState} from "react";
import useLocalStorage from "../hooks/Storage";
import {useHistory, Link} from "react-router-dom";
import axios from "axios";


const Login = () => {

    const [address, setAddress] = useState({})
    const [dataUsers, setDataUsers] = useState({})


    let history = useHistory()

    const getCEP = (cep) => {
        setAddress({...address, cep:cep})
        if (cep.length === 8) {
        axios.get(`https://apidev-club.crafty.work/app/cep/${cep}`, {headers: {
                Accept: 'application/json',
                'Content-Type': "application/json"
            },})
            .then(function (res) {
                console.log(res);
                setAddress({
                    cep: cep,
                    rua: res.data.object.rua,
                    bairro:res.data.object.bairro,
                    cidade: res.data.object.nome_cidade,
                    uf: res.data.object.uf_estado,
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    const sendData = () => {
        axios.post(`https://apidev-club.crafty.work/clube/register`, dataUsers, {headers: {
                Accept: 'application/json',
                'Content-Type': "application/json"
            },})
            .then(function (res) {
                console.log(res);
            })
            .catch(function (error) {
                console.log(error);
            });}

    return(
        <div style={{display: "flex"}}>
            <div style={{ margin:"auto", display: "flex", marginTop: `10%`, border: `1px solid gainsboro`, borderRadius: 10}}>
                <div style={{backgroundColor:"grey", display: "flex", flexDirection: "column", justifyContent: "center", padding: 20, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
                    <div>
                        <h1 style={{color: "#FFFFFF", fontSize:44, fontFamily: "Lexend Deca", fontWeight: 400}}>Cadastro</h1>
                    </div>
                    <div>
                        <h2 style={{color: "#FFFFFF", fontSize:16, fontFamily: "Lexend Deca", fontWeight: 200, marginTop:-16}}>Comece a registrar suas vendas!</h2>
                    </div>
                </div>
               <div style={{padding: 20, flexDirection: "column"}}>
                   <div>
                       <h1>Crie sua conta</h1>
                       <span> Crie sua conta e acesse as melhores ofertas do craft. </span>
                   </div>
                   <div style={{flexDirection:"column", marginTop: 20, border: `1px solid gainsboro`, padding: 5, borderRadius: 10}} >
                       <div className={"card-register-inputs"}>
                           <label className={"label-register"} htmlFor="nome">Nome
                               <input id={"nome"} onChange={(e) => { setDataUsers (e.target.value)}} className={"border-input"} title={"Nome de Usuário"} value={dataUsers?.nome} type={"text"}/>
                           </label>

                           <label className={"label-register"} htmlFor="sexo">Sexo
                               <input id={"sexo"} onChange={(e) => { setDataUsers (e.target.value)}} className={"border-input"} title={"Sexo"} value={dataUsers?.sexo} type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor="email">Email
                               <input id={"email"} onChange={(e) => { setDataUsers (e.target.value)}} className={"border-input"} title={"Email"} value={dataUsers?.email} type="email"/>
                           </label>
                       </div>

                       <div className={"card-register-inputs"}>
                           <label className={"label-register"} htmlFor="cpf">CPF
                               <input id={"cpf"} onChange={(e) => { setDataUsers (e.target.value)}} className={"border-input"} title={"CPF"} value={dataUsers?.cpf} type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor="celular">Celular
                               <input id={"celular"} onChange={(e) => { setDataUsers (e.target.value)}} className={"border-input"} title={"Senha"} value={dataUsers?.celular} type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor="data_nascimento">Data de Nascimento
                               <input c id={"data_nascimento"} onChange={(e) => { setDataUsers (e.target.value)}} className={"border-input"} title={"Senha"} value={dataUsers?.datadenascimento} type="text"/>
                           </label>
                       </div>

                       <div className={"card-register-inputs"}>
                           <label className={"label-register"} htmlFor="cpf">CEP
                               <input id={"cpf"} onChange={(e) => { getCEP (e.target.value)}} className={"border-input"} title={"CEP"} value={address?.cep} type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor="celular">Rua
                               <input disabled={true} id={"celular"} onChange={(e) => { setDataUsers (e.target.value)}} className={"border-input"} title={"Senha"} value={address?.rua} type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor="data_nascimento">Número
                               <input id={"data_nascimento"} onChange={(e) => { setDataUsers (e.target.value)}} className={"border-input"} title={"Senha"} value={dataUsers?.numero} type="text"/>
                           </label>
                       </div>

                       <div className={"card-register-inputs"}>
                           <label className={"label-register"} htmlFor="cpf">Bairro
                               <input disabled={true} id={"cpf"} onChange={(e) => { setDataUsers (e.target.value)}} className={"border-input"} title={"Senha"} value={address?.bairro} type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor="data_nascimento">Cidade
                               <input disabled={true} id={"data_nascimento"} onChange={(e) => { setDataUsers (e.target.value)}} className={"border-input"} title={"Senha"} value={address?.cidade} type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor="data_nascimento">UF
                               <input disabled={true} id={"data_nascimento"} onChange={(e) => { setDataUsers (e.target.value)}} className={"border-input"} title={"Senha"} value={address?.uf} type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor="celular">Complemento
                               <input  id={"celular"} onChange={(e) => { setDataUsers() (e.target.value)}} className={"border-input"} title={"Senha"} value={dataUsers?.complemento} type="text"/>
                           </label>
                       </div>

                   </div>

                   <div style={{display: "flex", justifyContent: "space-between"}}>
                       <button className="button-login" role="button" onClick={sendData}> Registrar </button>

                       <span style={{marginTop:"2rem", fontSize:12, color:"#FFFFFF"}}>Já tem conta?
                        <Link to={"/"}>
                            <a className={"a-login"} href=""> Faça o Login</a>
                        </Link>
                    </span>
                   </div>

               </div>

            </div>
        </div>
    )

}

export default Login

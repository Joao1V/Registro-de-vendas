import React, {useEffect, useRef, useState} from "react";
import {useHistory, Link} from "react-router-dom";
import axios from "axios";
import {maskCEP, maskCNPJ, maskCPF, maskPhone} from "../components/mask";
import CheckBoxComp from "../components/CheckBoxComp";
import {Checkbox} from "antd";
import moment from "moment";
import log from "tailwindcss/lib/util/log";


const Login = () => {

    const categories = useRef([])
    const dayWeek = useRef([])
    const [counter, setCounter] = useState(0)
    const [dataUsers, setDataUsers] = useState({})
    const [days, setDays] = useState([{
        day: `Domingo`,
        init_hour: undefined,
        end_hour:undefined,
        checked: false,
    },{
        day: `Segunda`,
        init_hour: undefined,
        end_hour:undefined,
        checked: false,
    },{
        day: `Terça`,
        init_hour: undefined,
        end_hour:undefined,
        checked: false,
    },{
        day: `Quarta`,
        init_hour: undefined,
        end_hour:undefined,
        checked: false,
    },{
        day: `Quinta`,
        init_hour: undefined,
        end_hour:undefined,
        checked: false,
    },{
        day: `Sexta`,
        init_hour: undefined,
        end_hour:undefined,
        checked: false,

    },{
        day: `Sábado`,
        init_hour: undefined,
        end_hour:undefined,
        checked: false,
    },])


    console.log(days)

    let history = useHistory()

    const getDay = (e) => {
        let aux = days;
        aux[e].checked = !aux[e].checked;
        setDays(aux);
        console.log(e.target.value)
    }

    const getCategory = () => {
        axios.get(`https://apidev-club.crafty.work/app/categoria/all`, {headers: {
                Accept: 'application/json',
                'Content-Type': "application/json"
            },})
            .then (function (res) {
                categories.current = res.data.object
                setCounter(counter+1)
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
     getCategory()
    }, []);

    const getCEP = (cep) => {
        setDataUsers({...dataUsers, estabelecimento_cep:cep}) // não estava digitando por que a variavel estava, cep, mas o certo é estabelecimento_cep
        if (cep.length === 8) {
        axios.get(`https://apidev-club.crafty.work/app/cep/${cep}`, {headers: {
                Accept: 'application/json',
                'Content-Type': "application/json"
            },})
            .then(function (res) {
                console.log(res);
                setDataUsers({...dataUsers,
                    estabelecimento_cep: cep,
                    estabelecimento_rua: res.data.object.rua,
                    estabelecimento_bairro:res.data.object.bairro,
                    estabelecimento_cidade: res.data.object.nome_cidade,
                    estabelecimento_uf: res.data.object.uf_estado,
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    const sendData = () => {
        axios.post(`https://apidev-club.crafty.work/app/cadastra-estabelecimento`, dataUsers, {headers: {
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
            <div style={{ margin:"auto", display: "flex", marginTop: `2%`, border: `1px solid gainsboro`, borderRadius: 10}}>
                <div style={{backgroundColor:"grey", display: "flex", flexDirection: "column", justifyContent: "center", padding: 20, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
                   <div>
                       <img src="../assets/undraw_personal_data_re_ihde.svg" alt=""/>
                   </div>
                </div>
               <div style={{padding: 20, flexDirection: "column"}}>
                   <div>
                       <h1>Crie sua conta</h1>
                       <span>Crie sua conta e acesse as melhores ofertas do craft. </span>
                   </div>
                   <div style={{flexDirection:"column", marginTop: 10, border: `1px solid gainsboro`, padding: 5, borderRadius: 10}} >
                       <div className={"card-register-inputs"}>
                           <label className={"label-register"} htmlFor="nomeFantasia">Nome Fantasia
                               <input id={"nomeFantasia"} onChange={(e) => {setDataUsers ({...dataUsers, estabelecimento_nome_fantasia: e.target.value})}} value={dataUsers.estabelecimento_nome_fantasia} className={"border-input"} title={"Nome de Fantasia"} type={"text"}/>
                           </label>

                           <label className={"label-register"} htmlFor="razaoSocial">Razão Social
                               <input id={"razaoSocial"} onChange={(e) => { setDataUsers ({...dataUsers, estabelecimento_razao_social: e.target.value})}} value={dataUsers.estabelecimento_razao_social} className={"border-input"} title={"Razão Social"} type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor="cnpj">CNPJ
                               <input id={"cnpj"} onChange={(e) => {setDataUsers ({...dataUsers, estabelecimento_CNPJ: e.target.value})}} value={dataUsers.estabelecimento_CNPJ && maskCNPJ(dataUsers.estabelecimento_CNPJ)} className={"border-input"} title={"CNPJ"} type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor="CategoriaEmpresa">Categoria da Empresa
                               <select id={"categoriaEmpresa"} onChange={(e) => { setDataUsers ({...dataUsers, estabelecimento_categoria_empresa: e.target.value})}} value={dataUsers.estabelecimento_categoria_empresa} className={"border-input"} title={"Categoria da Empresa"} type="text">
                                   <option></option>
                                   {categories.current.map((item, index) => // item referencia o que quero colocar - o index é o id do array
                                       <option key={index} value={item.estabelecimento_categoria_id} > {item.descricao} </option>
                                   )}
                               </select>
                           </label>
                       </div>

                       <div className={"card-register-inputs"}>
                           <label className={"label-register"} htmlFor="descricao">Descrição
                               <input id={"descricao"} onChange={(e) => { setDataUsers ({dataUsers, estabelecimento_descricao:e.target.value})}} value={dataUsers.estabelecimento_descricao} className={"border-input"} title={"Descrição"} type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor="telefoneComercial">Telefone Comercial
                               <input id={"telefoneComercial"} onChange={(e) => { setDataUsers ({dataUsers, estabelecimento_telefone_comercial: e.target.value})}} value={dataUsers?.estabelecimento_telefone_comercial && maskPhone(dataUsers?.estabelecimento_telefone_comercial)} className={"border-input"} title={"Telefone Comercial"} type="text"/>
                               {/*//foi necessário uma validacao com && (Se estiver com isso, faz isso), por que o value começava vazio e dava pal, por que o replace no mask.js, pede pra retornar um valor*/}
                           </label>

                           <label className={"label-register"} htmlFor="cep">CEP
                               <input id={"cep"} onChange={(e) => {getCEP (e.target.value)}} className={"border-input"} title={"CEP"} value={dataUsers?.estabelecimento_cep && maskCEP(dataUsers?.estabelecimento_cep)} type="text"/>
                           </label>
                       </div>

                       <div className={"card-register-inputs"}>
                           <label className={"label-register"} htmlFor="rua">Rua
                               <input disabled={true} id={"rua"} onChange={(e) => { (e.target.value)}} className={"border-input"} title={"Rua"} value={dataUsers?.estabelecimento_rua} type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor="numero">Número
                               <input id={"numero"} onChange={(e) => { setDataUsers ({dataUsers, estabelecimento_numero:e.target.value})}} className={"border-input"} title={"Número"} value={dataUsers?.estabelecimento_numero} type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor={"bairro"}>Bairro
                               <input disabled={true} id={"bairro"} className={"border-input"} title={"Bairro"} value={dataUsers?.estabelecimento_bairro} type="text"/>
                           </label>
                       </div>

                       <div className={"card-register-inputs"}>
                           <label className={"label-register"} htmlFor="complemento">Complemento
                               <input id={"complemento"} onChange={(e) => { setDataUsers ({...dataUsers, estabelecimento_complemento: e.target.value})}} className={"border-input"} title={"Complemento"}  type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor="cidade">Cidade
                               <input disabled={true} id={"cidade"} className={"border-input"} title={"Cidade"} value={dataUsers?.estabelecimento_cidade} type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor="uf">UF
                               <input disabled={true} id={"uf"} className={"border-input"} title={"Unidade Federativa"} value={dataUsers?.estabelecimento_uf} type="text"/>
                           </label>
                       </div>
                       <div style={{marginTop:16}}>
                           <span>Selecione os horários de funcionamento da sua empresa.</span>
                           <div style={{marginTop:12, display:"flex"}} className={""}>
                               <label style={{marginRight:8}} htmlFor="horarioFuncionamento">Horário de Funcionamento de:
                                       <input style={{marginLeft:8}} id={"horarioFuncionamento"} className={"border-input"} type="text" />
                               </label>
                               <label htmlFor={"a"}>a
                                   <input style={{marginLeft:8}} id={"a"} className={"border-input"} onChange={(e) => {
                                       setDataUsers( [{...dataUsers.horarios.horas_final(e.target.value)}])}} type="text"/>
                               </label>
                           </div>
                           <div className={"card-register-inputs"} style={{marginTop:12}}>
                                   <Checkbox type="checkbox" onChange={() => getDay(0)} checked={days[0].checked} className={"checkbox"} id={"domingo"}/>
                                    <label htmlFor="domingo">Domingo</label>

                                   <Checkbox type="checkbox" value={"Segunda"} className={"checkbox"} onChange={getDay} id={"segunda"}/>
                                   <label htmlFor="segunda">Segunda-feira</label>

                                   <Checkbox type="checkbox" value={"Terça"} className={"checkbox"} onChange={getDay} id={"terca"}/>
                                   <label htmlFor="terca">Terça-feira</label>

                                   <Checkbox type="checkbox"  className={"checkbox"} onChange={getDay} id={"quarta"}/>
                                   <label htmlFor="quarta">Quarta-feira</label>

                                   <Checkbox type="checkbox" className={"checkbox"} onChange={getDay} id={"quinta"}/>
                                   <label htmlFor="quinta">Quinta-feira</label>

                                   <Checkbox type="checkbox"  className={"checkbox"} onChange={getDay} id={"sexta"}/>
                                   <label htmlFor="sexta">Sexta-feira</label>

                                   <Checkbox type="checkbox"  className={"checkbox"} onChange={getDay} id={"sabado"}/>
                                   <label htmlFor="sabado">Sábado</label>
                               <button>printa</button>
                           </div>
                       </div>
                       <div style={{padding: 20, flexDirection: "column"}}>
                           <div >
                               <h2>Dados do responsável</h2>
                           </div>
                           <div style={{flexDirection:"column"}}>
                               <div className={"card-register-inputs"} style={{marginLeft:-17}}>
                                   <label className={"label-register"} htmlFor="nomeResponsavel">Nome
                                       <input  id={"nomeResponsavel"} onChange={(e) => { setDataUsers ({...dataUsers, responsavel_nome: e.target.value})}} value={dataUsers?.responsavel_nome} className={"border-input"} title={"Nome do Responsável"} type="text"/>
                                   </label>
                                   <label className={"label-register"} htmlFor="CPF">CPF
                                       <input  id={"CPF"} onChange={(e) => { setDataUsers ({...dataUsers, responsavel_cpf: e.target.value})}} value={dataUsers?.responsavel_cpf && maskCPF(dataUsers?.responsavel_cpf)} className={"border-input"} title={"CPF"} type="text"/>
                                   </label>

                                   <label className={"label-register"} htmlFor="senhaAcesso">Senha de acesso
                                       <input  id={"senhaAcesso"} onChange={(e) => { setDataUsers ({...dataUsers, responsavel_senha_acesso: e.target.value})}} value={dataUsers?.responsavel_senha_acesso} className={"border-input"} title={"Senha"} type="password"/>
                                   </label>
                               </div>

                               <div className={"card-register-inputs"} style={{marginLeft:-17}}>
                                   <label className={"label-register"} htmlFor="email">Email
                                       <input  id={"email"} onChange={(e) => { setDataUsers ({...dataUsers, responsavel_email: e.target.value})}} value={dataUsers?.responsavel_email} className={"border-input"} title={"E-mail"} type="email"/>
                                   </label>

                                   <label className={"label-register"} htmlFor="celular">Celular
                                     <input  id={"celular"} onChange={(e) => { setDataUsers ({...dataUsers, responsavel_celular: e.target.value})}} value={dataUsers?.responsavel_celular && maskPhone(dataUsers?.responsavel_celular)} className={"border-input"} title={"Celular"} type="text"/>
                                   </label>
                               </div>


                           </div>
                       </div>
                       <div style={{display: "flex", justifyContent: "space-between"}}>
                           <button className="button-login" role="button" onClick={sendData}> Registrar </button>

                           <span style={{marginTop:"2rem", fontSize:12, color:"#FFFFFF"}}>Já tem conta?
                        <Link to={"/"}>
                            <a className={"a-login"} href="">Faça o Login</a>
                        </Link>
                    </span>
                       </div>
                   </div>

               </div>

            </div>
        </div>
    )

}

export default Login

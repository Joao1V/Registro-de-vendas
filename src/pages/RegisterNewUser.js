import React, {useEffect, useRef, useState} from "react";
import {useHistory, Link} from "react-router-dom";
import axios from "axios";
import {maskCEP, maskCNPJ, maskCPF, maskPhone} from "../components/mask";
import {Checkbox} from "antd";


const Login = () => {

    const categories = useRef([])
    const dayWeek = useRef([])
    const hourDay = useRef({})
    const [counter, setCounter] = useState(0)
    const [dataUsers, setDataUsers] = useState({})

    let history = useHistory()

    const getDay = (e) => {
        if (dayWeek.current.includes(e.target.value)) { // Verificou se o meu dia existe dentro do array
            let index ; // criado para armazenar o indice que quero remover
            for (let i = 0; i < dayWeek.current.length ; i++ ) { //É pra funcionar enquanto o meu i for menor que o tamanho do meu vetor ; O for é executado do
                //primeiro para o terceiro parametro, até que eu encontre o meu valor, na posição.
                if (e.target.value === dayWeek.current[i]) { //verificando se a posição do vetor é igual ao valor
                    index = i //armazena a posição que está no meu index
                    break
                }
            }
            dayWeek.current.splice(index, 1) //removo a posição que está meu value.
        } else {
            dayWeek.current.push(e.target.value)
        }
        console.log(dayWeek.current)
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
                    estabelecimento_cidade_id: res.data.object.cidade_id,
                    estabelecimento_uf: res.data.object.uf_estado,
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    const sendData = () => {

        let aux = []
        for (let i=0 ; i < dayWeek.current.length ; i++) {
            aux.push({dia_semana:dayWeek.current[i],
            hora_inicial:hourDay.current.hora_inicial,
                hora_final:hourDay.current.hora_final,
            })
        }
        setDataUsers ({...dataUsers, horarios:aux})
        console.log(dataUsers)

        axios.post(`https://apidev-club.crafty.work/app/cadastra-estabelecimento`, dataUsers, {headers: {
                Accept: 'application/json',
                'Content-Type': "application/json"
            },})

            .then(function (res) {
                console.log(res);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

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
                               <input id={"nomeFantasia"}
                                      onChange={(e) => {setDataUsers ({...dataUsers, estabelecimento_nome_fantasia: e.target.value})}}
                                      value={dataUsers?.estabelecimento_nome_fantasia}
                                      className={"border-input"}
                                      title={"Nome de Fantasia"}
                                      type={"text"}/>
                           </label>

                           <label className={"label-register"} htmlFor="razaoSocial">Razão Social
                               <input id={"razaoSocial"}
                                      onChange={(e) => { setDataUsers ({...dataUsers, estabelecimento_razao_social: e.target.value})}}
                                      value={dataUsers?.estabelecimento_razao_social}
                                      className={"border-input"}
                                      title={"Razão Social"}
                                      type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor="cnpj">CNPJ
                               <input id={"cnpj"}
                                      onChange={(e) => {setDataUsers ({...dataUsers, estabelecimento_cnpj: e.target.value})}}
                                      value={dataUsers?.estabelecimento_cnpj && maskCNPJ(dataUsers?.estabelecimento_cnpj)}
                                      className={"border-input"}
                                      title={"CNPJ"}
                                      type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor="CategoriaEmpresa">Categoria da Empresa
                               <select id={"categoriaEmpresa"}
                                       onChange={(e) => { setDataUsers ({...dataUsers, estabelecimento_categoria_id: e.target.value})}}
                                       value={dataUsers?.estabelecimento_categoria_id}
                                       className={"border-input"}
                                       title={"Categoria da Empresa"}
                                       type="text">
                                   <option/>
                                   {categories.current.map((item, index) => // item referencia o que quero colocar - o index é o id do array
                                       <option key={index} value={item.estabelecimento_categoria_id} > {item.descricao} </option>
                                   )}
                               </select>
                           </label>
                       </div>

                       <div className={"card-register-inputs"}>
                           <label className={"label-register"} htmlFor="descricao">Descrição
                               <input id={"descricao"}
                                      onChange={(e) => { setDataUsers ({...dataUsers, estabelecimento_descricao:e.target.value})}}
                                      className={"border-input"}
                                      title={"Descrição"}
                                      value={dataUsers?.estabelecimento_descricao}
                                      type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor="telefoneComercial">Telefone Comercial
                               <input id={"telefoneComercial"}
                                      onChange={(e) => { setDataUsers ({...dataUsers, estabelecimento_telefone_comercial: e.target.value})}}
                                      className={"border-input"}
                                      title={"Telefone Comercial"}
                                      value={dataUsers?.estabelecimento_telefone_comercial && maskPhone(dataUsers?.estabelecimento_telefone_comercial)}
                                      type="text"/>
                               {/*//foi necessário uma validacao com && (Se estiver com isso, faz isso), por que o value começava vazio e dava pal, por que o replace no mask.js, pede pra retornar um valor*/}
                           </label>

                           <label className={"label-register"} htmlFor="cep">CEP
                               <input id={"cep"}
                                      onChange={(e) => {getCEP (e.target.value)}}
                                      className={"border-input"}
                                      title={"CEP"}
                                      value={dataUsers?.estabelecimento_cep && maskCEP(dataUsers?.estabelecimento_cep)}
                                      type="text"/>
                           </label>
                       </div>

                       <div className={"card-register-inputs"}>
                           <label className={"label-register"} htmlFor="rua">Rua
                               <input disabled={true}
                                      id={"rua"}
                                      onChange={(e) => {setDataUsers ({...dataUsers, estabelecimento_rua:e.target.value})}}
                                      className={"border-input"}
                                      title={"Rua"}
                                      value={dataUsers?.estabelecimento_rua}
                                      type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor="numero">Número
                               <input
                                   id={"numero"}
                                   onChange={(e) => {setDataUsers ({...dataUsers, estabelecimento_numero:e.target.value})}}
                                   className={"border-input"}
                                   title={"Número"}
                                   value={dataUsers?.estabelecimento_numero}
                                   type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor={"bairro"}>Bairro
                               <input disabled={true}
                                      onChange={(e) => {setDataUsers({...dataUsers, estabelecimento_bairro:e.target.value})}}
                                      id={"bairro"}
                                      className={"border-input"}
                                      title={"Bairro"}
                                      value={dataUsers?.estabelecimento_bairro}
                                      type="text"/>
                           </label>
                       </div>

                       <div className={"card-register-inputs"}>
                           <label className={"label-register"} htmlFor="complemento">Complemento
                               <input id={"complemento"}
                                      onChange={(e) => { setDataUsers ({...dataUsers, estabelecimento_complemento: e.target.value})}}
                                      className={"border-input"}
                                      title={"Complemento"}
                                      type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor="cidade">Cidade
                               <input disabled={true}
                                      id={"cidade"}
                                      onChange={(e) =>{ setDataUsers({...dataUsers, estabelecimento_cidade:e.target.value})}}
                                      className={"border-input"}
                                      title={"Cidade"}
                                      value={dataUsers?.estabelecimento_cidade}
                                      type="text"/>
                           </label>

                           <label className={"label-register"} htmlFor="uf">UF
                               <input disabled={true}
                                      id={"uf"}
                                      onChange={(e) => { setDataUsers({...dataUsers, estabelecimento_uf})}}
                                      className={"border-input"}
                                      title={"Unidade Federativa"}
                                      value={dataUsers?.estabelecimento_uf}
                                      type="text"/>
                           </label>
                       </div>
                       <div style={{marginTop:16}}>
                           <span>Selecione os horários de funcionamento da sua empresa.</span>
                           <div style={{marginTop:12, display:"flex"}}>
                               <label style={{marginRight:8}}
                                      htmlFor="horarioFuncionamento">Abre as
                                       <input style={{marginLeft:8}}
                                              id={"horarioFuncionamento"}
                                              className={"border-input"}
                                              type="text"
                                              onChange={(e) => { hourDay.current = {...hourDay.current, hora_inicial:e.target.value} }}
                                              value={hourDay.current?.hora_inicial}
                                       />
                               </label>
                               <label htmlFor={"a"}>Fecha
                                   <input style={{marginLeft:8}}
                                          id={"a"}
                                          className={"border-input"}
                                          type="text"
                                          onChange={(e) => { hourDay.current = {...hourDay.current, hora_final:e.target.value}}}
                                          value={hourDay.current?.hora_final}

                                   />
                               </label>
                           </div>
                           <div className={"card-register-inputs"} style={{marginTop:12}}>
                                   <Checkbox type="checkbox"
                                             value={0}
                                             onChange={getDay}
                                             className={"checkbox"}
                                             id={"domingo"}/>
                                    <label htmlFor="domingo">Domingo</label>

                                   <Checkbox type="checkbox"
                                             value={1}
                                             className={"checkbox"}
                                             onChange={getDay}
                                             id={"segunda"}/>
                                   <label htmlFor="segunda">Segunda-feira</label>

                                   <Checkbox type="checkbox"
                                             value={2}
                                             className={"checkbox"}
                                             onChange={getDay}
                                             id={"terca"}/>
                                   <label htmlFor="terca">Terça-feira</label>

                                   <Checkbox type="checkbox"
                                             value={3}
                                             className={"checkbox"}
                                             onChange={getDay}
                                             id={"quarta"}/>
                                   <label htmlFor="quarta">Quarta-feira</label>

                                   <Checkbox type="checkbox"
                                             value={4}
                                             className={"checkbox"}
                                             onChange={getDay}
                                             id={"quinta"}/>
                                   <label htmlFor="quinta">Quinta-feira</label>

                                   <Checkbox type="checkbox"
                                             value={5}
                                             className={"checkbox"}
                                             onChange={getDay}
                                             id={"sexta"}/>
                                   <label htmlFor="sexta">Sexta-feira</label>

                                   <Checkbox type="checkbox"
                                             value={6}
                                             className={"checkbox"}
                                             onChange={getDay}
                                             id={"sabado"}/>
                                   <label htmlFor="sabado">Sábado</label>
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
                                       <input  id={"CPF"}
                                               onChange={(e) => { setDataUsers ({...dataUsers, responsavel_cpf: e.target.value})}}
                                               value={dataUsers?.responsavel_cpf && maskCPF(dataUsers?.responsavel_cpf)}
                                               className={"border-input"}
                                               title={"CPF"}
                                               type="text"/>
                                   </label>

                                   <label className={"label-register"} htmlFor="senhaAcesso">Senha de acesso
                                       <input  id={"senhaAcesso"}
                                               onChange={(e) => { setDataUsers ({...dataUsers, responsavel_senha_acesso: e.target.value})}}
                                               value={dataUsers?.responsavel_senha_acesso}
                                               className={"border-input"}
                                               title={"Senha"}
                                               type="password"/>
                                   </label>
                               </div>

                               <div className={"card-register-inputs"} style={{marginLeft:-17}}>
                                   <label className={"label-register"} htmlFor="email">Email
                                       <input  id={"email"}
                                               onChange={(e) => { setDataUsers ({...dataUsers, responsavel_email: e.target.value})}}
                                               value={dataUsers?.responsavel_email}
                                               className={"border-input"}
                                               title={"E-mail"}
                                               type="email"/>
                                   </label>

                                   <label className={"label-register"} htmlFor="celular">Celular
                                     <input  id={"celular"}
                                             onChange={(e) => { setDataUsers ({...dataUsers, responsavel_celular: e.target.value})}}
                                             value={dataUsers?.responsavel_celular && maskPhone(dataUsers?.responsavel_celular)}
                                             className={"border-input"}
                                             title={"Celular"}
                                             type="text"/>
                                   </label>
                               </div>


                           </div>
                       </div>
                       <div style={{display: "flex", justifyContent: "space-between"}}>
                           <button className="button-login" role="button" onClick={sendData}> Registrar </button>
                           <button className="button-login" role="button" onClick={
                               () => console.log(dataUsers)}> Print </button>


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

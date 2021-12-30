import React, {useRef, useState} from 'react'
import {maskBRL} from "../components/mask";
import '../custom.less';
import ListUsers from "../components/ListUsers";
import UserRegister from "../components/UserRegister";
import 'antd/dist/antd.css';
import {Col, Row} from "antd";

const HomePage = () => {

    return (
        <div style={{height: "100%"}}>
            <Row style={{backgroundColor: "red"}}>
                <div>header</div>
            </Row>
            <Row>
                <Col xs={0} sm={8} style={{backgroundColor: "black"}}>
                    <div>aside</div>
                </Col>
                <Col xs={24} sm={16} style={{backgroundColor: "pink"}}>
                    <Row gutter={24}>
                        <Col span={8} >
                            <div style={{backgroundColor: "blue",  height: 200}}/>
                        </Col>
                        <Col span={8} >
                            <div style={{backgroundColor: "blue",  height: 200}}/>
                        </Col>
                        <Col span={8} >
                            <div style={{backgroundColor: "blue",  height: 200}}/>
                        </Col>
                    </Row>
                </Col>

            </Row>
            <Row>
                <div>footer</div>
            </Row>
        </div>
    )
}
export default HomePage;

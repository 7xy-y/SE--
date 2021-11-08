import React, { Component } from 'react'
import { Form, Input, Button, Radio } from 'antd'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom';
import axios from 'axios';

//example

var code;
var msg;

const transformFormData = (obj) => {
    let formData = new FormData()

    for (let k in obj) {
        formData.append(k, obj[k])
        console.log(k,obj[k])
    }

    console.log(formData)
    return formData
}


export default class LoginInterface extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            psw: "",
        };
    }

    onFinish = (values) => {
        /*
        if (this.state.type === 1) {
            this.props.history.push({ pathname: '/StudentCenter/StudentInfo', state: { username: name, psw: passw } });
        }
        else if (this.state.type === 2) {
            this.props.history.push({ pathname: '/TeacherCenter/TeacherInfo', state: { username: name, psw: passw } });
        }
        else if (this.state.type === 3) {
            this.props.history.push({ pathname: '/ManagerCenter/ManagerInfo', state: { username: name, psw: passw } });
        }*/
        const naame = this.state.username;
        const passw = this.state.psw;
        console.log('a',naame,passw)
        axios
            .post('http://127.0.0.1:1060/api/auth/login',
                transformFormData({
                    Name: naame,
                    Password: passw,
                }),{
                    headers: { 'content-type': 'application/x-www-form-urlencoded' }
                }
            ).then((response) => {
                // get response
                console.log(response);
                code = response.data.code
                msg = response.data.msg
                if (code!=200)
                {
                    alert(msg)
                }
                else
                {
                this.props.history.push({pathname:'/TeacherCenter/TApplication' ,state:{username:naame,psw:passw}})
                alert(msg)
                }
            }).catch(function(error) {
        alert('意外错误');
    })
 };



    nameChange = (e) => {
        let value = e.target.value;
        this.setState({
            username: value
        })
    }
    
    pswChange = (e) => {
        let value = e.target.value;
        console.log(value);
        this.setState({
            psw: value
        })
    }
    render() {
        const { username } = this.state;
        const { psw } = this.state;
        return (
            <div className="login">
                <div className="login-content-wrap">
                    <div className="login-content">
                        <img className="logo" src="resources/logo.png" />

                        <div id="body" className="login-from">
                            <Form initialValues={{ remember: true }}
                            onFinish={this.onFinish}>
                            <Form.Item>
                                <Input value={username} onChange={this.nameChange} placeholder="用户名" />
                            </Form.Item>

                            <Form.Item>
                                <Input value={psw} onChange={this.pswChange} type="password" placeholder="密码" />
                            </Form.Item>

                            <Form.Item>
                                 <br />
                            <Button className="login-form-button"  htmlType="submit" type="primary" shape="round" size='large'>
                            登录
                        </Button>
                     </Form.Item>

                    <Form.Item>
                    <Link to="/Signup">
                        <Button className="login-form-button" type="primary" shape="round" size='large'>
                            注册账号
                        </Button>
                    </Link>
                </Form.Item>
                </Form>

                        
                    </div>
                </div>
            </div>
        </div>
        )
    }

 


}

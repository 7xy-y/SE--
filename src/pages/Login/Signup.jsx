import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css'
import axios from 'axios'
import Password from 'antd/lib/input/Password';

function App() {

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
    margin:"auto",
  };

  const tailLayout = {
    wrapperCol: { offset: 11, span: 13 },
  };

  const transformFormData = (obj) => {
    let formData = new FormData()

    for (let k in obj) {  
        formData.append(k, obj[k])
        console.log(k,obj[k])
    }

    console.log(formData)
    return formData
}

  

  const onFinish = values => {
    axios.post('http://127.0.0.1:1060/api/auth/signup', transformFormData({
      Name:values.username,
      Password:values.password,
      Email:values.email
    }),
    {
      headers: { 'content-type': 'application/x-www-form-urlencoded' }          
    })
    .then(function (response) {
      if (response.data.code === 1) {
        alert(response.data.msg);
      } else {
          alert(response.data.msg);
      }
    })
    .catch(function (error) {
      console.log(error.message);
    });
  };
  
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      
    <Form
    {...layout}
    name="basic"
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >
    <br/>
    <br/><br/><br/><br/>
    <br/><br/><br/><br/>
    <br/><br/><br/><br/>
    <br/>
    <br/>
    
    <label style={{
      marginLeft:"45%",
      fontSize:"1.9em",
    }}>
      注册账号
      </label>
    <br/>
    <br/>
    <Form.Item    
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input style={{ width:300}}/>
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password style={{ width:300}}/>
    </Form.Item>

    <Form.Item
      label="email"
      name="email"
      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input style={{ width:300}}/>
    </Form.Item>
  

    <Form.Item {...tailLayout}>
      <Button type="primary" htmlType="submit">
        sign up
      </Button>
    </Form.Item>

  </Form>
  </div>
  );
}

export default App;

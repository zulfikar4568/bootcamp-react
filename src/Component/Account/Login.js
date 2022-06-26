import React, { useContext, useState } from 'react';
import mylogo from '../../Assets/logotext.png'
import ilustrator from '../../Assets/login.svg'
import { Link, useHistory } from "react-router-dom"
import Cookies from 'js-cookie';
import axios from 'axios';
import { Col, Row, Form, Input, Button, Card, message } from 'antd';
import { LoginContext } from './LoginContext';


const Login = () => {
  let history = useHistory();
  const { setLoginStatus } = useContext(LoginContext);
  const [input, setInput] = useState({
    email: "",
    password: ""
  })

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name] : event.target.value
    })
  }

  const handleSubmit = (event) => {
    axios.post("https://backendexample.sanbersy.com/api/user-login", {
        email: input.email,
        password: input.password
    }).then(
        (res) => {
          console.log(res)
            let user = res.data.user
            Cookies.set('user', user.name, {expires: 1})
            Cookies.set('email', user.email, {expires: 1})
            Cookies.set('token', res.data.token, {expires: 1})
            message.success('Login Success!');
            history.push('/')
            setLoginStatus(true)
        }
    ).catch((err) => {
      message.error('Login Failed!');
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Row>
        <Col span={14} style={{textAlign: "center", padding: "50px"}}>
          <img alt="ilustrator" src={ilustrator} style={{height: "70%"}}/>
        </Col>
        <Col span={10} style={{padding: "20px"}}>
          <Card style={{borderRadius: "20px"}}>
              <div style={{textAlign: "center"}}>
                <img alt="logo" src={mylogo} style={{height: "3%", margin: "50px"}}/><br/>
              </div>
              <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={handleSubmit}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >

              {/* form Email */}

              <Form.Item
                label="Email"
                name="email"
                onChange={handleChange}
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input name="email" value={input.email} onChange={handleChange}/>
              </Form.Item>

              {/* Form Password */}
              <Form.Item
                label="Password"
                name="password"
                onChange={handleChange}
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password name="password" value={input.password} onChange={handleChange}/>
              </Form.Item>
              
              {/* FItem Button */}
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" shape="round" htmlType="submit" style={{width: "100%"}}>
                  Login
                </Button>
                <small>Don't have an account yet? <Link to="/register">Click here to register</Link></small>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Login;
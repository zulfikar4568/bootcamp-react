import React, { useState } from 'react';
import mylogo from '../../Assets/logotext.png'
import ilustrator from '../../Assets/register.svg'
import { Link, useHistory } from "react-router-dom"
import axios from 'axios';
import { Col, Row, Form, Input, Button, Card, message } from 'antd';

const Register = () => {
  let history = useHistory();
  const [input, setInput] = useState({
    name: "",
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
    axios.post("https://backendexample.sanbersy.com/api/register", {
      name: input.name,
      email: input.email,
      password: input.password
    }).then(
        (res) => {
            message.success('Register Success!');
            history.push('/login')
        }
    ).catch((err) => {
      message.error(`Register Failed! ${err}`);
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

              <Form.Item
                label="Name"
                name="name"
                tooltip="Your Fullname"
                onChange={handleChange}
                rules={[
                  {
                    required: true,
                    message: 'Please input your name!',
                  },
                ]}
              >
                <Input name="name" value={input.name} onChange={handleChange}/>
              </Form.Item>

              {/* form Email */}

              <Form.Item
                label="Email"
                name="email"
                onChange={handleChange}
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
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
                  { type: 'string', min: 8 },
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
                <Button type="primary" shape="round" htmlType="submit" style={{width: "100%", backgroundColor: "#f50", border: "none"}}>
                  Register
                </Button>
                <small>Have an account? <Link to="/login">Click here to login</Link></small>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Register;
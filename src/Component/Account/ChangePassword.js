import React, { useState } from 'react';
import mylogo from '../../Assets/logotext.png'
import ilustrator from '../../Assets/changepassword.svg'
import { useHistory } from "react-router-dom"
import axios from 'axios';
import { Row, Col, Form, Input, Button, Card, message, Empty } from 'antd';
import Cookies from 'js-cookie';
import prohibited from '../../Assets/prohibited.svg'

const ChangePassword = () => {

  let history = useHistory();
  const [input, setInput] = useState({
    current_password: "",
    new_password: "",
    new_confirm_password: ""
  })

  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name] : event.target.value
    })
  }

  const handleSubmit = (event) => {
    axios.post("https://backendexample.sanbersy.com/api/change-password", 
    {
      current_password: input.current_password,
      new_password: input.new_password,
      new_confirm_password: input.new_confirm_password
    },
    {
      headers: { "Authorization" : "Bearer "+ Cookies.get('token') }
    }).then(
        (res) => {
            message.success('Change Password Success!');
            history.push('/')
        }
    ).catch((err) => {
      message.error(`Change Password Failed!`);
    })
  }

  return (
    <>
      {
        Cookies.get('token') !== undefined ?
        <Row>
          <Col span={10} style={{textAlign: "center", padding: "50px"}}>
            <img alt="ilustrator" src={ilustrator} style={{height: "40%"}}/>
          </Col>
          <Col span={14} style={{padding: "20px"}}>
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
            autoComplete="off"
          >

            {/* Form Password */}
            <Form.Item
              label="Current Password"
              name="current_password"
              onChange={handleChange}
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                { type: 'string', min: 8 },
              ]}
            >
              <Input.Password name="current_password" value={input.current_password} onChange={handleChange}/>
            </Form.Item>

            {/* Form Password */}
            <Form.Item
              label="New Password"
              name="new_password"
              hasFeedback
              onChange={handleChange}
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                { type: 'string', min: 8 },
              ]}
            >
              <Input.Password name="new_password" value={input.new_password} onChange={handleChange}/>
            </Form.Item>

            {/* Form Password */}
            <Form.Item
              label="New Confirm Password"
              name="new_confirm_password"
              dependencies={['new_password']}
              onChange={handleChange}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('new_password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password name="new_confirm_password" value={input.new_confirm_password} onChange={handleChange}/>
            </Form.Item>
            
            {/* FItem Button */}
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" shape="round" htmlType="submit" style={{width: "100%", backgroundColor: "#87d068", border: "none"}}>
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
          </Col>
        </Row>
        : 
        <Empty 
          image={prohibited}
          imageStyle={{
            height: 90,
            marginTop: "200px"
          }}
          description={
            <b>
              You must Login First!
            </b>
          }
        />

      }
    </>
  );
}

export default ChangePassword;
import Cookies from 'js-cookie';
import { GameContext } from './GameContext';
import React, { useContext, useEffect } from 'react';
import prohibited from '../../Assets/prohibited.svg'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Button, Card, Divider, Empty, Form, Input, InputNumber, message, Switch } from 'antd';

const GameForm = () => {
  let history = useHistory();
  const [form] = Form.useForm();
  const { game, currentIdGame, setGame, inputGame, setInputGame } = useContext(GameContext);

  useEffect(() => {
    form.setFieldsValue(inputGame);
  }, [inputGame])

  const handleChange = (event) => {
    setInputGame({
      ...inputGame,
      [event.target.name] : event.target.value
    })
  }

  const releaseChange = (value) => {
    setInputGame({
      ...inputGame,
      release : value
    })
  } 

  const onChangeSwitch = (checked, event) => {
    setInputGame({...inputGame, [event.target.name] : Number(checked)})
  }

  const handleSubmit = () => {
    if (currentIdGame === null) {
      axios.post(`https://backendexample.sanbersy.com/api/data-game`, {name : inputGame.name, genre : inputGame.genre, image_url: inputGame.imageUrl, platform: inputGame.platform, release: inputGame.release, singlePlayer: inputGame.singlePlayer, multiplayer: inputGame.multiplayer}, {headers: { "Authorization" : "Bearer "+ Cookies.get('token') }})
      .then(res => {
        let value = res.data;
        setGame([...game, {no: game.length+1 ,id: value.id, name: value.name, genre: value.genre, imageUrl: value.image_url, platform: value.platform, release: value.release, singlePlayer: value.singlePlayer, multiplayer: value.multiplayer}])
        history.push("/games/list");
        message.success('Added Succes!');
      })
    }else {
      axios.put(`https://backendexample.sanbersy.com/api/data-game/${currentIdGame}`, {name : inputGame.name, genre : inputGame.genre, image_url: inputGame.imageUrl, platform: inputGame.platform, release: inputGame.release, singlePlayer: inputGame.singlePlayer, multiplayer: inputGame.multiplayer}, {headers: { "Authorization" : "Bearer "+ Cookies.get('token') }})
      .then(res => {
        let gameSingle = game.find(el => el.id === currentIdGame);
        gameSingle.name = inputGame.name
        gameSingle.genre = inputGame.genre
        gameSingle.imageUrl = inputGame.imageUrl
        gameSingle.platform = inputGame.platform
        gameSingle.release = inputGame.release
        gameSingle.singlePlayer = inputGame.singlePlayer
        gameSingle.multiplayer = inputGame.multiplayer
        setGame([...game ])
        history.push("/games/list");
        message.success('Edited Success!');
      })
    }
  }

  return (
    <>
      {
        Cookies.get('token') !== undefined ?
          <Card style={{borderRadius: "20px"}}>
            <Divider orientation="center" style={{fontWeight: "bold", fontSize: "30px", color: "#6e6e6e"}}>Game Form</Divider>
            <Form 
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              form={form}
              autoComplete="off"
              onFinish={handleSubmit}
              initialValues={inputGame}
            >
              <Form.Item label="Name of Game" name="name" hasFeedback 
                rules={[
                  { type: 'string', required: true }
                ]}
              >
                <Input name="name" onChange={handleChange} value={inputGame.name}/>
              </Form.Item>

              <Form.Item label="Genre" name="genre" hasFeedback
                rules={[
                  { type: 'string', required: true }
                ]}>
                <Input.TextArea rows={6} name="genre" onChange={handleChange} value={inputGame.genre}/>
              </Form.Item>

              <Form.Item label="Image URL" name="imageUrl" hasFeedback
                rules={[
                  { type: 'url', warningOnly: true},
                  { type: 'string', required: true }
                ]}>
                <Input placeholder="https://" name="imageUrl" onChange={handleChange} value={inputGame.imageUrl}/>
              </Form.Item>

              <Form.Item label="Release" name="release" rules={[{required: true}]} hasFeedback>
                
                <InputNumber min={2000} max={2021} name="release" onChange={releaseChange} value={inputGame.release}/>
              </Form.Item>

              <Form.Item label="Platform" name="platform"
              rules={[
                { type: 'string', required: true }
              ]}
              >
                <Input.TextArea rows={7} name="platform" onChange={handleChange} value={inputGame.platform}/>
              </Form.Item>

              <Form.Item label="Single Player" name="singlePlayer" hasFeedback>
              <Switch defaultChecked onChange={onChangeSwitch } name="singlePlayer" checked={inputGame.singlePlayer}/>
              </Form.Item>

              <Form.Item label="Multiplayer" name="multiplayer" hasFeedback>
                <Switch checked={inputGame.multiplayer} onClick={onChangeSwitch } name="multiplayer"/>
              </Form.Item>

              <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" shape="round" htmlType="submit" style={{backgroundColor: "#87d068", border: "none"}}>
                Submit
              </Button>
            </Form.Item>
            </Form>
          </Card>
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
  )
}

export default GameForm;
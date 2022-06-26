import React, { useContext, useState, useEffect } from "react";
import { GameContext } from "./GameContext";
import { Button, Col, Collapse, Empty, Image, Input, InputNumber, message, Radio, Row, Table, Tag } from 'antd'
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { FaCheckCircle, FaBan } from "react-icons/fa";
import Cookies from "js-cookie";
import prohibited from '../../Assets/prohibited.svg'
import { useHistory } from "react-router";

const GameList = () => {
  let history = useHistory();
  
  const { game, setGame, axios, setCurrentIdGame, inputGame, setInputGame } = useContext(GameContext);
  const [inputFilter, setInputFilter] = useState({
    release: null,
    singlePlayer: null,
    multiplayer: null
  });
  
  const sortNumber = ( a, b ) => {
    if ( a.no < b.no ){
      return -1;
    }
    if ( a.no > b.no ){
      return 1;
    }
    return 0;
  }
  const [ currentGame, setCurrentGame ] = useState([])

  useEffect(() => {
    setCurrentGame(game.sort(sortNumber));
  }, [game])

  const resetFilter = () => {
    setCurrentGame(game.sort(sortNumber));
  }

  const onSearchChange = (event) => {
    let dataSearch = game.sort(sortNumber).filter(val => {
      return Object.values(val).join(" ").toLowerCase().includes(event.target.value.toLowerCase())
    })
    setCurrentGame(dataSearch)
  }

  const filterData = () => {
    let newData = game.sort(sortNumber).filter(
      val => (inputFilter.release !== null ? val.release === `${inputFilter.release}` : 1) && 
      (inputFilter.singlePlayer !== null ? val.singlePlayer === inputFilter.singlePlayer : (val.singlePlayer === 0 ? 1 : 1 )) && 
      (inputFilter.multiplayer !== null ? val.multiplayer === inputFilter.multiplayer : (val.multiplayer === 0 ? 1 : 1 ))
    )
    setCurrentGame(newData)
    console.log(newData, inputFilter)
  }

  const releaseChange = (value) => {
    setInputFilter({
      ...inputFilter,
      release : value
    })
    console.log(inputFilter)
  } 

  const radioChange = (event) => {
    setInputFilter({
      ...inputFilter,
      [event.target.name] : event.target.value
    })
    console.log(inputFilter)
  }

  const handleEdit = (Id) => {
    setCurrentIdGame(Id)
    axios.get(`https://backendexample.sanbersy.com/api/data-game/${Id}`)
      .then( res => {
        let value = res.data;
        setInputGame({
          ...inputGame,
          genre: value.genre,
          imageUrl: value.image_url,
          multiplayer: value.multiplayer,
          name: value.name,
          platform: value.platform,
          release: value.release,
          singlePlayer: value.singlePlayer
        });
        history.push(`/game/edit/${Id}`);
      })
  }

  const handleDelete = (Id) => {
    console.log(Id)
    axios.delete(`https://backendexample.sanbersy.com/api/data-game/${Id}`, { headers: { "Authorization" : "Bearer "+ Cookies.get('token')} }
    ).then(() => {
      let newGame = game.filter((res) => {
        return parseInt(res.id) !== parseInt(Id);
      })
      setGame(newGame);
      message.success('Success deleted!')
    })
  }

  const columns = [
    {
      title: <b>No</b>,
      dataIndex: 'no',
      key: 'no',
      sorter: (a, b) => a.no - b.no
    },
    {
      title: <b>Cover</b>,
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text, result) => {
        return (
          <Image alt={result.name} src={result.imageUrl} style={{width: "65px", borderRadius: "5px"}}/>
        );
      }
    },
    {
      title: <b>Name</b>,
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length
    },
    {
      title: <b>Genre</b>,
      dataIndex: 'genre',
      key: 'genre',
      sorter: (a, b) => a.genre.length - b.genre.length,
      render: (text, result) => {
        let genreArr = result.genre !== null ? result.genre.split(",") : [];
        return (
          <>
            {
              genreArr.map((x, i) => {
                return (
                  <Tag style={{margin: 2}} color={`#${Math.floor(Math.random()*16777215).toString(16)}`}>{x}</Tag>
                )
              })
            }
          </>
        )
      }
    },
    {
      title: <b>Release</b>,
      dataIndex: 'release',
      key: 'release',
      sorter: (a, b) => a.release - b.release
    },
    {
      title: <b>Platform</b>,
      dataIndex: 'platform',
      key: 'platform',
      sorter: (a, b) => a.platform.length - b.platform.length,
      render: (text, result) => {
        let platformArr = result.platform ? result.platform.split(","): [];
        return (
          <>
            {
              platformArr.map((x, i) => {
                return (
                  <Tag style={{margin: 2}} color={`#${Math.floor(Math.random()*16777215).toString(16)}`}>{x}</Tag>
                )
              })
            }
          </>
        )
      }
    },
    {
      title: <b>Single Player</b>,
      dataIndex: 'singlePlayer',
      key: 'singlePlayer',
      sorter: (a, b) => a.singlePlayer - b.singlePlayer,
      render: (text, result) => {
        return (
          <>
            {result.singlePlayer === 1 ? <FaCheckCircle style={{color: "green"}}/> : <FaBan style={{color: "red" }}/>}
          </>
        );
      }
    },
    {
      title: <b>Multiplayer</b>,
      dataIndex: 'multiplayer',
      key: 'multiplayer',
      sorter: (a, b) => a.multiplayer - b.multiplayer,
      render: (text, result) => {
        return (
          <>
            {result.multiplayer === 1 ? <FaCheckCircle style={{color: "green"}}/> : <FaBan style={{color: "red" }}/>}
          </>
        );
      }
    },
    {
      title: <b>Action</b>,
      dataIndex: 'action',
      key: 'action',
      render: (text, result)=> {
        return (
          <>
            <Button style={{backgroundColor: " #1890ff", color: "white"}} icon={<EditOutlined/>} onClick={() => handleEdit(result.id)}/><br/>
            <Button type="danger" style={{marginTop: "10px"}} icon={<DeleteOutlined/>} onClick={() => handleDelete(result.id)}/>
          </>
        );
      }
    }
  ]
  
  return (
    <>
      {
        Cookies.get('token') !== undefined ?
        <>
          <Collapse style={{borderBottom: "none", fontWeight: "bold"}}>
            <Collapse.Panel header="Games Filter">
              <Row>
                <Col span={3} style={{padding: "10px"}}>
                  <b>Search</b><br/>
                  <Input suffix={<SearchOutlined />} onChange={onSearchChange}></Input>
                </Col>
                <Col span={21}>
                  <Row style={{marginLeft: "1%"}}>
                    <Col span={3} style={{padding: "10px"}}>
                      <b>Release</b><br/>
                      <InputNumber name="release" min={2000} max={2021} onChange={releaseChange}/>
                    </Col>
                    <Col span={8} style={{padding: "10px"}}>
                      <b>Single Player</b><br/>
                      <Radio.Group name="singlePlayer" style={{marginTop: "10px"}} onChange={radioChange}>
                        <Radio value={null}>Not Selected</Radio>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={0}>No</Radio>
                      </Radio.Group>
                    </Col>
                    <Col span={8} style={{padding: "10px"}}>
                      <b>Multiplayer</b><br/>
                      <Radio.Group name="multiplayer" style={{marginTop: "10px"}} onChange={radioChange}>
                        <Radio value={null}>Not Selected</Radio>
                        <Radio value={1}>Yes</Radio>
                        <Radio value={0}>No</Radio>
                      </Radio.Group>
                    </Col>
                    <Col span={5} style={{padding: "10px", marginTop: "2%"}}>
                      <Button shape="round" onClick={resetFilter}>Reset</Button>
                      <Button style={{marginLeft: "10px"}} type="primary" shape="round" onClick={filterData}>Filter</Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Collapse.Panel>
          </Collapse>
          <Table columns={columns} dataSource={currentGame}/>
        </>
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

export default GameList;
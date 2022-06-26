import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
  useParams
} from "react-router-dom";
import { Col, Image, PageHeader, Row, Spin, Tag } from "antd";
import { FaCheckCircle, FaBan } from "react-icons/fa";
import { FaGamepad } from "react-icons/fa";

const DetailGame = () => {
  const [ currentGame, setCurrentGame ] = useState();
  let { Id } = useParams();
  let history = useHistory();
  
  useEffect(() => {
    const abortController = new AbortController();
    const DataGame = async() => {
      try {
        const response= await axios.get(`https://backendexample.sanbersy.com/api/data-game/${Id}`, { signal: abortController.signal })
        setCurrentGame({
          id: response.data.id,
          genre: response.data.genre,
          imageUrl: response.data.image_url,
          multiplayer: response.data.multiplayer,
          name: response.data.name,
          platform: response.data.platform,
          release: response.data.release,
          singlePlayer: response.data.singlePlayer
        })
      }catch(e){
        console.log(e)
      }
    }
    DataGame();
    return () => {
      abortController.abort();
    }
  }, [])
  return (
    <>
      {
        currentGame !== undefined ?
        <>
          <PageHeader
            className="site-page-header"
            onBack={() => history.push("/games")}
            title={<b style={{fontSize: "30px"}}>{`${currentGame.name} (${currentGame.release})`}</b>}
            
          />
          <Row >
            <Col span={14}>
              <Image
                style={{borderRadius: "20px", height: "500px", objectFit: "cover"}}
                src={currentGame.imageUrl}
              />
            </Col>
            <Col span={10} style={{padding: "20px"}}>
              <b style={{textTransform: "uppercase", fontWeight: "bold"}}>Platform</b>
              <p>{currentGame.platform}</p>
              <Tag color="#f50" style={{fontWeight: "bold"}} icon={<FaGamepad  style={{fontSize: "14px", color: "yellow"}} />} >{` Genre ${currentGame.genre}`}</Tag>
              <Row>
                <Col span={24} style={{margin: "5px"}}>
                  <p style={{fontSize: "15px", borderRadius: "10px", margin: 0}} color="#f50"><b style={{fontSize: "17px", textTransform: "uppercase" }}>Multiplayer:</b> {currentGame.multiplayer === 1 ? <FaCheckCircle style={{color: "green"}}/> : <FaBan style={{color: "red", fontSize: "15px"}}/>}</p>
                </Col>
                <Col span={24} style={{margin: "5px"}}>
                  <p style={{fontSize: "15px", borderRadius: "10px", margin: 0}} color="#f50"><b style={{fontSize: "17px", textTransform: "uppercase" }}>singlePlayer:</b> {currentGame.singlePlayer === 1 ? <FaCheckCircle style={{color: "green"}}/> : <FaBan style={{color: "red", fontSize: "15px"}}/>}</p>
                </Col>
              </Row>  
            </Col>
          </Row>
        </>
        : <div style={{textAlign: "center", marginTop: "200px"}}><Spin size="large"/></div>
      }
    </>
  )
}

export default DetailGame;
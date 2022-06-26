import React, { useContext } from "react";
import { GameContext } from "../Games/GameContext";
import { useHistory } from "react-router-dom";
import { Card, Avatar, Col, Row, Divider, Image, Tag, Spin } from 'antd';

const { Meta } = Card;

const HomeGame = () => {
  const { game, rowGame } = useContext(GameContext);
  let history = useHistory();
  
  const handleDetail = (Id) => {
    history.push(`/game/${Id}`)
  }

  return (
    <>
      <Divider orientation="left" style={{fontWeight: "bold", fontSize: "30px", color: "#6e6e6e"}}>Games</Divider>
      {
        game.length !== 0 ?
        [...Array(rowGame)].map((x,i) => {
          return (
            <Row key={`row-${i+1}`} gutter={16}>
              {
                game.slice(i*4, (i+1)*4).map((value, index) => {
                  return (
                    <Col key={value.id} className="gutter-row" span={6}>
                      <Card
                        hoverable={true}
                        style={{ width: "100%", borderRadius: "20px", marginBottom: "30px"}}
                        cover={
                          <Image
                            style={{borderRadius: "20px 20px 0 0", height: "300px", objectFit: "cover"}}
                            alt={`${value.genre}`}
                            src={`${value.imageUrl}`}
                          />
                        }
                      >
                        <Meta
                          className="my-meta"
                          onClick={() => handleDetail(value.id)}
                          style={{ borderRadius: "20px"}}
                          avatar={<Avatar src={`${value.imageUrl}`} />}
                          title={<><b>{`${value.release} - ${value.name}`}</b></>}
                          description=
                          {
                            <>
                              <Tag color="#f50">{value.genre}</Tag>
                            </>
                          }
                        />
                      </Card>
                    </Col>
                  );
                })
              }
            </Row>
          )
        }) : <div style={{textAlign: "center", marginTop: "200px"}}><Spin size="large"/></div>
      }
    </>
  );
}

export default HomeGame;
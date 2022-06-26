import React, { useContext } from "react";
import { GameContext } from "../Games/GameContext";
import { Card, Avatar, Col, Row, Divider, Image, Tag, Spin, Button, Carousel } from 'antd';
import { Link, useHistory } from "react-router-dom";

const { Meta } = Card;

const HomeLatestGame = () => {
  const { game, rowGame, compare } = useContext(GameContext);
  let history = useHistory();
  
  const handleDetail = (Id) => {
    history.push(`/game/${Id}`)
  }

  return (
    <>
      <Divider orientation="left" style={{fontWeight: "bold", fontSize: "30px", color: "#6e6e6e"}}>Latest Games</Divider>
      <Carousel autoplay>
      {
        game.length !== 0 ?
        [...Array(rowGame)].map((x,i) => {
          return (
            <div>
              <Row key={`row-${i+1}`} gutter={16}>
                {
                  game.sort(compare).slice(i*4, (i+1)*4).map((value, index) => {
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
                            onClick={() => handleDetail(value.id)}
                            className="my-meta"
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
            </div>
          )
        }) : <div style={{textAlign: "center", marginTop: "200px"}}><Spin size="large"/></div>
        
      }
      </Carousel>
      <Link to="/games">
        <Divider orientation="center"><Button style={{fontWeight: "bold"}} size="large" type="primary" shape="round">See all</Button></Divider>
      </Link>
    </>
  );
}

export default HomeLatestGame;
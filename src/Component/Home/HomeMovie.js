import React, { useContext } from "react";
import { MovieContext } from "../Movie/MovieContext";
import { useHistory } from "react-router-dom";
import { Card, Avatar, Col, Row, Divider, Image, Tag, Spin } from 'antd';
import { StarFilled } from '@ant-design/icons';
const { Meta } = Card;

const HomeMovie = () => {
  const { movie, rowMovie } = useContext(MovieContext);
  let history = useHistory();
  const handleDetail = (Id) => {
    history.push(`/movie/${Id}`)
  }
  return (
    <>
      <Divider orientation="left" style={{fontWeight: "bold", fontSize: "30px", color: "#6e6e6e"}}>Movies</Divider>
      {
        movie.length !== 0 ?
        [...Array(rowMovie)].map((x,i) => {
          return (
            <Row key={`row-${i+1}`} gutter={16}>
              {
                movie.slice(i*4, (i+1)*4).map((value, index) => {
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
                          title={<><b>{`${value.year}`}</b><b>{` - ${value.title}`}</b></>}
                          description=
                          {
                            <>
                              <Tag color="#f50">{value.genre}</Tag>
                              <Tag color="#87d068" style={{fontWeight: "bold"}} icon={<StarFilled style={{fontSize: "14px", color: "yellow"}} />} >{`Rating ${value.rating}/10`}</Tag>
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

export default HomeMovie;
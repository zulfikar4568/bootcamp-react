import React, { useState, useEffect } from "react";
import axios from 'axios'
import {
  useParams,
  useHistory
} from "react-router-dom";
import { Col, Image, PageHeader, Row, Spin, Tag } from "antd";
import { ClockCircleFilled, StarFilled, VideoCameraFilled } from '@ant-design/icons';

const DetailMovie = () => {
  let { Id } = useParams();
  let history = useHistory();
  const [currentMovie, setCurrentMovie] = useState();
  useEffect(() => {
    const abortController = new AbortController();
    const DataMovie = async() => {
      try {
        const response = await axios.get(`https://backendexample.sanbersy.com/api/data-movie/${Id}`, { signal: abortController.signal })
        let value = response.data;
        setCurrentMovie({
          description: value.description,
          duration: value.duration,
          genre: value.genre,
          id: value.id,
          imageUrl: value.image_url,
          rating: value.rating,
          review: value.review,
          title: value.title,
          year: value.year
        })
      }catch(e){
        console.log(e)
      }
    }
    DataMovie();
    return () => {
      abortController.abort();
    }
  }, [])

  return (
    <>
      {
        currentMovie !== undefined ?
        <>
          <PageHeader
            className="site-page-header"
            onBack={() => history.push("/movies")}
            title={<b style={{fontSize: "30px"}}>{`${currentMovie.title} (${currentMovie.year})`}</b>}
          />
          <Row>
            <Col span={14} style={{textAlign: "center"}}>
              <Image
                  style={{borderRadius: "20px", height: "500px", objectFit: "cover"}}
                  src={currentMovie.imageUrl}
                />
            </Col>
            <Col span={10} style={{padding: "20px"}}>
              <b style={{textTransform: "uppercase", fontWeight: "bold"}}>Description</b>
              <p>{currentMovie.description}</p>
              <Row justify="end">
                <Col span={24} style={{margin: "5px"}}>
                <Tag color="#1477d3" style={{fontWeight: "bold"}} icon={<ClockCircleFilled style={{fontSize: "14px", color: "yellow"}} />} >{`Duration ${currentMovie.duration}min`}</Tag>
                </Col>
                <Col span={24} style={{margin: "5px"}}>
                  <Tag color="#87d068" style={{fontWeight: "bold"}} icon={<StarFilled style={{fontSize: "14px", color: "yellow"}} />} >{`Rating ${currentMovie.rating}/10`}</Tag>
                </Col>
                <Col span={24}style={{margin: "5px"}}>
                  <Tag color="#f50" style={{fontWeight: "bold"}} icon={<VideoCameraFilled  style={{fontSize: "14px", color: "yellow"}} />} >{`Genre ${currentMovie.genre}`}</Tag>
                </Col>
              </Row>
              <b style={{textTransform: "uppercase", fontWeight: "bold"}}>Review</b>
              <p style={{fontStyle: "italic"}}>{`" ${currentMovie.review} "`}</p>
            </Col>
          </Row>
        </>
        :
        <div style={{textAlign: "center", marginTop: "200px"}}><Spin size="large"/></div>
      }
    </>
  )
}

export default DetailMovie;
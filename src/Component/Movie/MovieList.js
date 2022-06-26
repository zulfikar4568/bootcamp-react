import React, { useContext, useEffect, useState } from "react";
import { MovieContext } from "./MovieContext";
import { Button, Col, Collapse, Empty, Image, Input, InputNumber, message, Row, Table, Tag, Typography } from 'antd'
import { DeleteOutlined, EditOutlined, SearchOutlined, StarFilled } from '@ant-design/icons';
import Cookies from "js-cookie";
import prohibited from '../../Assets/prohibited.svg'
import { useHistory } from "react-router";

const MovieList = () => {
  let history = useHistory();
  const {  movie, setMovie, axios, setCurrentIdMovie, setInputMovie, inputMovie } = useContext(MovieContext);
  const [inputFilter, setInputFilter] = useState({
    year: null,
    rating: null,
    duration: null
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
  const [ currentMovie, setCurrentMovie ] = useState([])

  useEffect(() => {
    setCurrentMovie(movie.sort(sortNumber));
  }, [movie])

  const onSearchChange = (event) => {
    let dataSearch = movie.sort(sortNumber).filter(val => {
      return Object.values(val).join(" ").toLowerCase().includes(event.target.value.toLowerCase())
    })
    setCurrentMovie(dataSearch)
  }

  const resetFilter = () => {
    setCurrentMovie(movie.sort(sortNumber));
  }

  const filterData = () => {
    let newData = movie.sort(sortNumber).filter(
      val => (inputFilter.year !== null ? val.year === inputFilter.year : 1) && 
      (inputFilter.rating !== null ? val.rating === inputFilter.rating : 1) && 
      (inputFilter.duration !== null ? val.duration === inputFilter.duration : 1)
    )
    setCurrentMovie(newData)
  }

  const durationChange = (value) => {
    setInputFilter({
      ...inputFilter,
      duration : value
    })
  } 

  const ratingChange = (value) => {
    setInputFilter({
      ...inputFilter,
      rating : value
    })
  } 

  const yearChange = (value) => {
    setInputFilter({
      ...inputFilter,
      year : value
    })
  } 

  const handleEdit = (Id) => {
    setCurrentIdMovie(Id)
    axios.get(`https://backendexample.sanbersy.com/api/data-movie/${Id}`)
      .then (res => {
        let value = res.data;
        setInputMovie({
          ...inputMovie,
          description: value.description,
          duration: value.duration,
          genre: value.genre,
          imageUrl: value.image_url,
          rating: value.rating,
          review: value.review,
          title: value.title,
          year: value.year
        })
        history.push(`/movie/edit/${Id}`);
      });
  }

  const handleDelete = (Id) => {
    console.log(Id)
    axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${Id}`, { headers: { "Authorization" : "Bearer "+ Cookies.get('token')} }
    ).then(() => {
      let newMovie = movie.filter((res) => {
        return parseInt(res.id) !== parseInt(Id);
      })
      setMovie(newMovie);
      message.success('Success deleted!')
    })
  }

  const columns = [
    {
      title: <b>No </b>,
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
      title: <b>TItle</b>,
      dataIndex: 'title',
      key: 'title',
      sorter: true,
      sorter: (a, b) => a.title.length - b.title.length,
      render: (text, result) => {
        return (
          <Typography.Paragraph ellipsis={{ rows: 2, expandable: false, symbol: 'more' }} style={{width: 100}}>{result.title}</Typography.Paragraph>
        )
      }
    },
    {
      title: <b>Description</b>,
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a.description.length - b.description.length,
      render: (text, result) => {
        return (
          <Typography.Paragraph ellipsis={{ rows: 2, expandable: false, symbol: 'more' }} style={{width: 120}}>{result.description}</Typography.Paragraph>
        )
      }
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
      title: <b>Year</b>,
      dataIndex: 'year',
      key: 'year',
      sorter: (a, b) => a.year - b.year
    },
    {
      title: <b>Rating</b>,
      dataIndex: 'rating',
      key: 'rating',
      sorter: (a, b) => a.rating - b.rating,
      render: (text, result) => {
        let mycolor = "yellow"
        if (result.rating <= 5) {
          mycolor = "red"
        } else {
          mycolor = "yellow"
        }
        return (
          <>
            <Tag color="#87d068" style={{fontWeight: "bold"}} icon={<StarFilled style={{fontSize: "14px", color: `${mycolor}`}} />} >{`Rating ${result.rating}/10`}</Tag>
          </>
        )
      }
    },
    {
      title: <b>Review</b>,
      dataIndex: 'review',
      key: 'review',
      sorter: (a, b) => a.review.length - b.review.length,
      render: (text, result) => {
        return (
          <Typography.Paragraph ellipsis={{ rows: 2, expandable: false, symbol: 'more' }} style={{width: 120}}>{result.review}</Typography.Paragraph>
        )
      }
    },
    {
      title: <b>Duration</b>,
      dataIndex: 'duration',
      key: 'duration',
      sorter: (a, b) => a.duration - b.duration,
      render: (text, value) => {
        return (
          <b>{value.duration} min</b>
        )
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
            <Collapse.Panel header="Movies Filter">
              <Row>
                <Col span={7} style={{padding: "10px"}}>
                  <b>Search</b><br/>
                  <Input suffix={<SearchOutlined />} onChange={onSearchChange}></Input>
                </Col>
                <Col span={17}>
                  <Row >
                    <Col offset={6} span={4} style={{padding: "10px"}}>
                      <b>Rating</b><br/>
                      <InputNumber name="rating" min={0} max={10} onChange={ratingChange}/>
                    </Col>
                    <Col span={4} style={{padding: "10px"}}>
                      <b>Year</b><br/>
                      <InputNumber name="year" min={1980} max={2021} onChange={yearChange}/>
                    </Col>
                    <Col span={4} style={{padding: "10px"}}>
                      <b>Duration</b><br/>
                      <InputNumber name="duration" min={0} onChange={durationChange}/>
                    </Col>
                    <Col span={6} style={{padding: "10px", marginTop: "2%"}}>
                      <Button shape="round" onClick={resetFilter}>Reset</Button>
                      <Button style={{marginLeft: "10px"}} type="primary" shape="round" onClick={filterData}>Filter</Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Collapse.Panel>
          </Collapse>
          <Table columns={columns} dataSource={currentMovie}/>
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

export default MovieList;
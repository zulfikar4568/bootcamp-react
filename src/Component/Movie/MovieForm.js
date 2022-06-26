import React, { useContext, useEffect } from 'react';
import prohibited from '../../Assets/prohibited.svg'
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { MovieContext } from './MovieContext';
import { Button, Card, Divider, Empty, Form, Input, InputNumber, message } from 'antd';
import axios from 'axios';

const MovieForm = () => {
  let history = useHistory();
  const [form] = Form.useForm();
  const { movie, currentIdMovie, setMovie, inputMovie, setInputMovie } = useContext(MovieContext);

  useEffect(() => {
    form.setFieldsValue(inputMovie);
  }, [inputMovie])

  const handleChange = (event) => {
    setInputMovie({
      ...inputMovie,
      [event.target.name] : event.target.value
    })
    console.log(inputMovie)
  }
  const durationChange = (value) => {
    setInputMovie({
      ...inputMovie,
      duration : value
    })
  } 
  const ratingChange = (value) => {
    setInputMovie({
      ...inputMovie,
      rating : value
    })
  } 

  const yearChange = (value) => {
    setInputMovie({
      ...inputMovie,
      year : value
    })
  } 

  const handleSubmit = () => {
    if (currentIdMovie == null) {
      axios.post(`https://backendexample.sanbersy.com/api/data-movie`,{description: inputMovie.description, duration: inputMovie.duration, genre: inputMovie.genre, image_url: inputMovie.imageUrl, rating: inputMovie.rating, review: inputMovie.review, title: inputMovie.title, year: inputMovie.year}, {headers: { "Authorization" : "Bearer "+ Cookies.get('token') }})
      .then(res => {
        let value = res.data;
        console.log(res)
        setMovie([...movie, {no: movie.length+1, id: value.id, description: value.description, duration: value.duration, imageUrl: value.image_url, genre: value.genre, rating: value.rating, review: value.review, title: value.title, year: value.year}])
        console.log(inputMovie)
        history.push("/movies/list");
        message.success('Added Success!');
      }).catch(res => {
        console.log(res)
      })
    }else {
      axios.put(`https://backendexample.sanbersy.com/api/data-movie/${currentIdMovie}`, {description: inputMovie.description, duration: inputMovie.duration, genre: inputMovie.genre, image_url: inputMovie.imageUrl, rating: inputMovie.rating, review: inputMovie.review, title: inputMovie.title, year: inputMovie.year}, {headers: { "Authorization" : "Bearer "+ Cookies.get('token') }})
      .then(res => {
        let movieSingle = movie.find(el => el.id === currentIdMovie);
        movieSingle.description = inputMovie.description
        movieSingle.duration = inputMovie.duration
        movieSingle.genre = inputMovie.genre
        movieSingle.imageUrl = inputMovie.imageUrl
        movieSingle.rating = inputMovie.rating
        movieSingle.review = inputMovie.review
        movieSingle.title = inputMovie.title
        movieSingle.year = inputMovie.year
        setMovie([...movie])
        history.push("/movies/list");
        message.success("Edited Success!")
      })
    }
  }

  return (
    <>
      {
        Cookies.get('token') !== undefined ?
          <Card style={{borderRadius: "20px"}}>
            <Divider orientation="center" style={{fontWeight: "bold", fontSize: "30px", color: "#6e6e6e"}}>Movie Form</Divider>
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
              initialValues={inputMovie}
            >
              <Form.Item label="Title" name="title" hasFeedback 
                rules={[
                  { type: 'string', required: true }
                ]}
              >
                <Input name="title" onChange={handleChange} value={inputMovie.title}/>
              </Form.Item>
              
              <Form.Item label="Description" name="description" hasFeedback 
                rules={[
                  { type: 'string', required: true }
                ]}
              >
                <Input.TextArea rows={5} name="description" onChange={handleChange} value={inputMovie.description}/>
              </Form.Item>

              <Form.Item label="Duration (minutes)" name="duration" rules={[{required: true}]} hasFeedback>
                
                <InputNumber name="duration" onChange={durationChange} value={inputMovie.duration}/>
              </Form.Item>

              <Form.Item label="Genre" name="genre" hasFeedback 
                rules={[
                  { type: 'string', required: true }
                ]}
              >
                <Input name="genre" onChange={handleChange} value={inputMovie.genre}/>
              </Form.Item>

              <Form.Item label="Rating" name="rating" rules={[{required: true}]} hasFeedback>
                
                <InputNumber min={0} max={10} name="rating" onChange={ratingChange} value={inputMovie.rating}/>
              </Form.Item>

              <Form.Item label="Year" name="year" rules={[{required: true}]} hasFeedback>
                
                <InputNumber min={1980} max={2021} name="rating" onChange={yearChange} value={inputMovie.year}/>
              </Form.Item>

              <Form.Item label="Review" name="review" hasFeedback 
                rules={[
                  { type: 'string', required: true }
                ]}
              >
                
                <Input.TextArea rows={5} name="review" onChange={handleChange} value={inputMovie.review}/>
              </Form.Item>

              <Form.Item label="Image URL" name="imageUrl" hasFeedback
                rules={[
                  { type: 'url', warningOnly: true},
                  { type: 'string', required: true }
                ]}>
                  
                <Input placeholder="https://" name="imageUrl" onChange={handleChange} value={inputMovie.imageUrl}/>
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

export default MovieForm;
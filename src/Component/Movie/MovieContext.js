import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const MovieContext = createContext();

export const MovieProvider = (props) => {
  const [movie, setMovie] = useState([]);
  const [inputMovie, setInputMovie] = useState({
    description: "",
    duration: null,
    genre: "",
    imageUrl: "",
    rating: null,
    review: "",
    title: "",
    year: null
  })
  const [currentIdMovie, setCurrentIdMovie] = useState(null);
  const [rowMovie, setRowMovie] = useState(null);

  const setInitialInputMovie = () => {
    setInputMovie({
      description: "",
      duration: "",
      genre: "",
      imageUrl: "",
      rating: null,
      review: "",
      title: "",
      year: null
    })
  }

  const compare = ( a, b ) => {
    if ( a.year < b.year ){
      return 1;
    }
    if ( a.year > b.year ){
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    const abortController = new AbortController();
    const getDataMovie = async() => {
      try {
        const result = await axios.get(`https://backendexample.sanbersy.com/api/data-movie`, { signal: abortController.signal });
        setMovie(result.data.map((value, index) => {
          return {
            no: index + 1,
            description: value.description,
            duration: value.duration,
            genre: value.genre,
            id: value.id,
            imageUrl: value.image_url,
            rating: value.rating,
            review: value.review,
            title: value.title,
            year: value.year
          }
        }));
        console.log(result.data)
        setRowMovie(Math.ceil(result.data.length / 4));
      } catch(e){
        console.log(e);
      }
    }
    getDataMovie();
    return () => {
      abortController.abort();
    }
  }, [])

  return (
    <MovieContext.Provider value={{
      axios,
      movie,
      setMovie,
      currentIdMovie,
      setCurrentIdMovie,
      rowMovie,
      setRowMovie,
      compare,
      setInitialInputMovie, inputMovie, setInputMovie
    }}>
      {props.children}
    </MovieContext.Provider>
  )
}
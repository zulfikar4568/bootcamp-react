import React, { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const GameContext = createContext();

export const GameProvider = (props) => {
  const [game, setGame] = useState([]);
  const [inputGame, setInputGame] = useState({
    genre: "",
    imageUrl: "",
    multiplayer: 0,
    name: "",
    platform: "",
    release: null,
    singlePlayer: 0
  })

  const [currentIdGame, setCurrentIdGame] = useState(null);
  const [rowGame, setRowGame] = useState(null);

  const setInitialInputGame = () => {
    setInputGame({
      genre: "",
      imageUrl: "",
      multiplayer: 0,
      name: "",
      platform: "",
      release: null,
      singlePlayer: 0
    })
  }
  const compare = ( a, b ) => {
    if ( a.release < b.release ){
      return 1;
    }
    if ( a.release > b.release ){
      return -1;
    }
    return 0;
  }
  useEffect(() => {
    const abortController = new AbortController();
    const getDataGame = async() => {
      try {
        const result = await axios.get(`https://backendexample.sanbersy.com/api/data-game`, { signal: abortController.signal });
        setGame(result.data.map((value, index) => {
          return {
            no: index + 1,
            id: value.id,
            genre: value.genre,
            imageUrl: value.image_url,
            multiplayer: value.multiplayer,
            name: value.name,
            platform: value.platform,
            release: value.release,
            singlePlayer: value.singlePlayer
          }
        }));
        console.log(result.data)
        setRowGame(Math.ceil(result.data.length / 4));
      } catch(e){
        console.log(e);
      }
    }
    getDataGame();
    return () => {
      abortController.abort();
    }
  }, [])

  return (
    <GameContext.Provider value={{
      axios,
      game,
      setGame,
      currentIdGame,
      setCurrentIdGame,
      rowGame,
      setRowGame,
      compare,
      inputGame, setInputGame, setInitialInputGame
    }}>
      {props.children}
    </GameContext.Provider>
  )
}
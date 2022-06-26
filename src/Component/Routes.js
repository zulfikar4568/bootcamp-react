import React from "react";
import { Switch, Route } from "react-router-dom";
import ChangePassword from "./Account/ChangePassword";
import Login from "./Account/Login";
import Register from "./Account/Register";
import GameForm from "./Games/GameForm";
import GameList from "./Games/GameList";
import DetailGame from "./Home/DetailGame";
import DetailMovie from "./Home/DetailMovie";
import Home from "./Home/Home";
import HomeGame from "./Home/HomeGame";
import HomeMovie from "./Home/HomeMovie";
import MovieForm from "./Movie/MovieForm";
import MovieList from "./Movie/MovieList";


const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/movies" exact component={HomeMovie}/>
      <Route path="/movies/list" exact component={MovieList}/>
      <Route path="/movies/create" exact component={MovieForm}/>
      <Route path="/movie/:Id" exact component={DetailMovie}/>
      <Route path="/movie/edit/:Id" exact component={MovieForm}/>
      <Route path="/games" exact component={HomeGame}/>
      <Route path="/game/:Id" exact component={DetailGame}/>
      <Route path="/game/edit/:Id" exact component={GameForm}/>
      <Route path="/games/list" exact component={GameList}/>
      <Route path="/games/create" exact component={GameForm}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
      <Route path="/changepassword" exact component={ChangePassword}/>

    </Switch>
  )
}

export default Routes
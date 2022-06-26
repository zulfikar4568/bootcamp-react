import React, {useContext} from 'react';
import { FaGamepad, FaFilm } from "react-icons/fa";
import { useHistory } from 'react-router';
import { GameContext } from './Games/GameContext';
import { Button, Menu } from 'antd';
import { LaptopOutlined, VideoCameraFilled, PlusSquareFilled, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { MovieContext } from './Movie/MovieContext';
import { LoginContext } from './Account/LoginContext';
const { SubMenu } = Menu;

const Sidebar = () => {
  let history = useHistory();
  const { setCurrentIdGame, setInitialInputGame } = useContext(GameContext);
  const { setCurrentIdMovie, setInitialInputMovie } = useContext(MovieContext);
  const { expandSidebar, setExpandSidebar } = useContext(LoginContext);
  const onHandleCreateGame = () => {
    setInitialInputGame();
    setCurrentIdGame(null);
    history.push("/games/create")
  }

  const onHandleCreateMovie = () => {
    setInitialInputMovie();
    setCurrentIdMovie(null);
    history.push("/movies/create")
  }
  const toggle = () => {
    setExpandSidebar(!expandSidebar)
  }
  return (
    <>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ borderRight: 0, borderRadius: "20px", border: "1px solid #d6d6d6", padding: "10px" }}
      >
        <Button onClick={toggle} type="text" className="custom-class" style={{textAlign: "center", fontSize: "20px", padding: "15px 3px", marginBottom: "30px", marginLeft: "5px"}}>{expandSidebar ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}</Button>
        <b style={expandSidebar ? {visibility:"hidden", opacity:0, transition:"visibility 0s linear,opacity 0s linear"} : {visibility: "visible", opacity:1, transition:"visibility 2s linear,opacity 2.6s linear", fontSize: "20px", marginLeft: "10px"}} >Configuration</b>
        <hr style={{margin: "0 10px 0 10px"}}/> 
        <SubMenu key="SubMovies" icon={<FaFilm/>} title="Setting Movies">
          <Menu.Item icon={<VideoCameraFilled />} key="1" onClick={() => history.push("/movies/list")} style={{backgroundColor: "#fff"}}>Movies List</Menu.Item>
          <Menu.Item icon={<PlusSquareFilled />} key="2" onClick={onHandleCreateMovie} style={{backgroundColor: "#fff"}}>Create Movie</Menu.Item>
        </SubMenu>
        <SubMenu key="SubGames" icon={<FaGamepad/>} title="Setting Games">
          <Menu.Item icon={<LaptopOutlined />}key="5" onClick={() => history.push("/games/list")} style={{backgroundColor: "#fff"}}>Game List</Menu.Item>
          <Menu.Item style={{marginBottom: "20px"}} icon={<PlusSquareFilled />} key="6" onClick={onHandleCreateGame} style={{backgroundColor: "#fff"}}>Create Game</Menu.Item>
        </SubMenu>
      </Menu>
    </>
  );
}

export default Sidebar;
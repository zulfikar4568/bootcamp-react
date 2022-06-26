import React, { useContext, useEffect } from 'react';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { FaGamepad, FaHome, FaFilm } from "react-icons/fa";
import mylogo from '../Assets/logo.png'
import Cookies from "js-cookie";
import { LoginContext } from './Account/LoginContext';
import { DownOutlined, UserOutlined, SettingFilled, CloseCircleFilled } from '@ant-design/icons';

const HeaderNav = () => {
  const { setLoginStatus, loginStatus } = useContext(LoginContext)
  let history = useHistory();
  const handleLogout = () => {
    setLoginStatus(false)
    Cookies.remove('user')
    Cookies.remove('email')
    Cookies.remove('token')
    history.push('/login')
  }

  useEffect(() => {
    if(loginStatus === false && Cookies.get('token') !== undefined ){
      setLoginStatus(true)
    }
  }, [loginStatus])

  const menu = (
    <Menu >
      <Menu.Item key="logout" icon={<CloseCircleFilled />} onClick={handleLogout}>Logout</Menu.Item>
      <Menu.Item key="changepassword" icon={<SettingFilled />} onClick={() => history.push('/changepassword')}>Change Password</Menu.Item>
    </Menu>
  );

  return (
    <>
      <div style={{display: "flex", backgroundColor: "white",borderBottom: "1px solid #d6d6d6"}}>
        <img alt="logo" src={mylogo}  style={{height: "35px", margin: "15px 20px 10px 30px"}}/>
        <Menu theme="light" mode="horizontal" style={{width: "80%", fontWeight: "bold"}}>
          <Menu.Item key={"home"}>
            <FaHome className="my-icon"/>
            <Link to="/" className="my-link">Home</Link>
          </Menu.Item>
          <Menu.Item key={"movies"}>
            <FaFilm className="my-icon"/>
            <Link to="/movies" className="my-link">Movie</Link>
          </Menu.Item>
          <Menu.Item key={"games"}>
            <FaGamepad className="my-icon"/>
            <Link to="/games" className="my-link">Games</Link>
          </Menu.Item>
        </Menu>
        <div style={{width: "20%", backgroundColor: "white", textAlign: "end"}}>
          {
            Cookies.get('token') !== undefined && loginStatus === true &&
            <>
              <Dropdown overlay={menu}>
                <Button size="large" type="text" style={{ fontWeight: "bold", marginRight: "30px", textDecoration: "none", fontSize: "20px", color: "#1890ff"}} ><Avatar style={{backgroundColor: "#f50", marginRight: "10px"}} icon={<UserOutlined/>}/>Hi, {Cookies.get('user')} <DownOutlined style={{fontSize: "14px"}}/></Button>
              </Dropdown>
            </>
          }
          {
            Cookies.get('token') === undefined && loginStatus === false &&
            <>
              <Link to="/login" style={{fontWeight: "bold", marginRight: "30px", textDecoration: "none", fontSize: "20px"}}>Login</Link>
            </>
          }
        </div>
      </div>
    </>
  );
}

export default HeaderNav;
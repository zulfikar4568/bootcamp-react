import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GameProvider } from './Component/Games/GameContext';
import HeaderNav from './Component/HeaderNav';
import Routes from './Component/Routes';
import './Assets/Style.scss'
import Cookies from "js-cookie";
import { MovieProvider } from './Component/Movie/MovieContext';
import { LoginContext } from './Component/Account/LoginContext';
import Sidebar from './Component/Sidebar';

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

function App() {
  const { loginStatus, expandSidebar } = useContext(LoginContext)
  return (
    <Router>
      <GameProvider>
        <MovieProvider>
          <Layout>
            <Header style={{padding: 0, position: 'fixed', zIndex: 10, width: '100%'}}>
              <HeaderNav/>
            </Header>
            <Layout>
              {
                Cookies.get('token') !== undefined && loginStatus === true &&
                <Sider className="site-layout-background" trigger={null} width={300} collapsible collapsed={expandSidebar} style={{backgroundColor: "white", padding: "80px 0 0 20px"}}>
                  <Sidebar/>
                </Sider>
              }
              <Content style={{backgroundColor: "white", padding: "6% 4% 4% 4%"}}>
                <Routes/>
              </Content>
            </Layout>
            <Footer style={{backgroundColor: "#f50", padding: 0, color: "white"}}>
              <div style={{textAlign: "center", borderTop: '2px solid #d6d6d6', display: "flex", justifyContent: "center", alignItems: "center", height: "60px", width: "100%"}}>
                <b style={{display: "inline-block", verticalAlign: "middle"}}>Copyright © 2021 by Zulfikar Isnaen | All Right Reserved</b>
              </div>
            </Footer>
          </Layout>
        </MovieProvider>
      </GameProvider>
    </Router>
  );
}

export default App;

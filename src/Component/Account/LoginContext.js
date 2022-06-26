import React, { createContext, useState } from 'react';

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [ loginStatus, setLoginStatus] = useState(false);
  const [ expandSidebar, setExpandSidebar] = useState(true);
  
  return (
    <LoginContext.Provider value={{loginStatus, setLoginStatus, expandSidebar, setExpandSidebar}}>
      {props.children}
    </LoginContext.Provider>
  );
}
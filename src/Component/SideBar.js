import React, {useContext} from "react";
import { Layout, Menu, Avatar, Typography } from "antd";
import styled from "styled-components";
import {} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from '../Context/AuthProvider';
import { googleLogout } from '@react-oauth/google';

import {
  faBook,
  faGamepad,
  faFilm,
  faUser,
  // faCircleInfo,
  faRightFromBracket,
  // faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import {RouteContext} from "../Context/RouteProvider";
const items = [
  {
    label: "Books",
    key: "0",
    icon: <FontAwesomeIcon icon={faBook} />,
  },
  {
    label: "Games",
    key: "1",
    icon: <FontAwesomeIcon icon={faGamepad} />,
  },
  {
    label: "Films",
    key: "2",
    icon: <FontAwesomeIcon icon={faFilm} />,
  },
  // {
  //   label: "Schedule",
  //   key: "3",
  //   icon: <FontAwesomeIcon icon={faCalendarDays} />,
  // },
  {
    label: "Account",
    key: "4",
    icon: <FontAwesomeIcon icon={faUser} />,
    children: [
      // {
      //   label: "Information",
      //   key: "4.1",
      //   icon: <FontAwesomeIcon icon={faCircleInfo} />,
      // },
      {
        label: "Log out",
        key: "4.2",
        icon: <FontAwesomeIcon icon={faRightFromBracket} />,
      },
    ],
  },
];

const WrappedStyled = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: center;
  align-items: center;
`;
// style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }}
export default function SideBar() {
  const {setRoute} = useContext(RouteContext);
  const { user, profile, setProfile, setUser, setToken } = useContext(AuthContext);
  const { 
    given_name,
    picture
  } = profile;
  const handleSelect = (key)=>{
    if(key.key==='4.2'){
      if(user){
        googleLogout();
        setUser(null);
        setProfile({});
      }
      else{
        setToken(null);
      }
      return;
    }
    setRoute(items[key.key[0]].label)
  }

  const { Sider } = Layout;
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => {
        setCollapsed(value);
      }}
    >
      <WrappedStyled>
        <Avatar
          style={{
            backgroundColor: "#7265e6",
            marginRight: collapsed ? "0" : "0.5rem",
          }}
          size="default"
          src= {picture ? picture:'#'}
          alt="avatar"
        >{picture?'':(given_name?given_name[0].toUpperCase():'?')}</Avatar>
        {collapsed ? (
          " "
        ) : (
          <Typography.Text
            disabled
            style={{ color: "white", fontSize: "16px" }}
          >
            Hello, {given_name}
          </Typography.Text>
        )}
      </WrappedStyled>
      <Menu
        theme="dark"
        defaultSelectedKeys={["0"]}
        onSelect={handleSelect}
        mode="inline"
        items={items}
      />
    </Sider>
  );
}

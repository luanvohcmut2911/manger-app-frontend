import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Layout, Breadcrumb, Card, Spin, Empty } from "antd";
import { RouteContext } from "../Context/RouteProvider";
import { AuthContext } from "../Context/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Buffer } from "buffer";


const WrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;
const CardStyled = styled(Card)`
  margin-bottom: 2rem;
  margin-right: 3rem;
`;

export default function Content() {
  const { Content } = Layout;
  const { Meta } = Card;
  const { setInfoModalVisible, setAddModalVisible, route, update } = useContext(RouteContext);
  const {profile} = useContext(AuthContext);
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    setLoading(true);
    if(profile?.id){
      axios.get(process.env.REACT_APP_GETDATA_URL,{
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        params: {
          genre: route,
          userID: profile.id
        }
      }).then((response)=>{
        setCollection(response.data.data);
        setLoading(false);
      }).catch((err)=>{
        console.log(err);
      })
    }
  }, [route, profile, update]);

  return (
    <Layout style={{ maxHeight: "100%", maxWidth: "100%" }}>
      <Content
        style={{ margin: "0 16px", maxHeight: "100vh", overflowY: "scroll" }}
      >
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={[
            {
              title: "Home",
            },
            {
              title: route,
            },
          ]}
        />
        <WrapperStyled>
        {
          loading? <Spin size="large"></Spin> :
          collection?.length?collection.map((item)=>{
            let base64Image= '';
            if(item.image){
              const buffer = Buffer.from(item.image.data.data);
              const base64 = buffer.toString('base64');
              base64Image = `data:image/png;base64,${base64}`
            }
            return (
              <CardStyled
                key={item._id}
                hoverable
                style={{ width: 300, maxHeight: 500, overflowX: 'hidden', overflowY: 'hidden' }}
                cover={<img style={{
                  minHeight: 250
                }} src={base64Image} alt={item.title} />}
                onClick={() => {
                  setInfoModalVisible({
                    title:
                      item.title,
                    image: base64Image,
                    description:item.description,
                  });
                }}
              >
                <Meta
                  title={item.title}
                  description={item.description}
                ></Meta>
              </CardStyled>
            )
          }): <Empty />
          
        }
        </WrapperStyled>
        <FontAwesomeIcon
          onClick={() => {
            setAddModalVisible(true);
          }}
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            fontSize: "5rem",
            padding: "1rem",
          }}
          icon={faCirclePlus}
        />
      </Content>
    </Layout>
  );
}
import React, { useContext } from "react";
import { RouteContext } from "../../Context/RouteProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { Modal, Row, Col, Button, notification } from "antd";
import axios from "axios";

export default function InfoModal() {
  const { infoModalVisible, setInfoModalVisible, update, setUpdate, route } = useContext(RouteContext);
  const { profile } = useContext(AuthContext);
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (msg, msgType)=>{
    if(msgType==='success'){
      api.success({
        message: msg,
        duration: 5
      })
    }
    else if(msgType ==='error'){
      api.error({
        message: msg,
        duration: 5
      })
    }
    else if(msgType ==='warning'){
      api.warning({
        message: msg,
        duration: 5
      })
    }
    else{
      api.info({
        message: msg,
        duration: 5
      })
    }
  }
  const handleDelete = ()=>{
    axios.delete(process.env.REACT_APP_DELETEDATA_URL, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      params: {
        title: infoModalVisible.title,
        description: infoModalVisible.description,
        type: route,
        userID: profile.id
      }
      
    }).then(()=>{
      setUpdate(!update);
      openNotification('Deleted item successfully', 'success');
      setInfoModalVisible(null);
    }).catch(()=>{
      openNotification('Error', 'error');
    })
  }

  return (
    <div>
      {contextHolder}
      <Modal
        title={infoModalVisible ? infoModalVisible.title : ""}
        open={infoModalVisible}
        footer={<Button type="primary" danger onClick={handleDelete}>Xoá mục này</Button>}
        onCancel={() => {
          setInfoModalVisible(null);
        }}
      >
        <Row>
          <Col span={8}>
            <img
              src={infoModalVisible?.image}
              alt="modalImage"
              style={{ maxHeight: "13rem" }}
            />
          </Col>
          <Col span={16}>{infoModalVisible?.description}</Col>
        </Row>
      </Modal>
    </div>
  );
}

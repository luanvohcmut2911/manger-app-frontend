import React, { useContext, useState } from "react";
import { RouteContext } from "../../Context/RouteProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { Button, Form, Input, Modal, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from 'axios';

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function AddModal() {
  const [ api , contextHolder ] = notification.useNotification();
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
  const { addModalVisible, setAddModalVisible, route, setUpdate, update } = useContext(RouteContext);
  const {profile} = useContext(AuthContext);
  const [previewImage, setPreviewImage] = useState(null);
  const [submitImage, setSubmitImage] = useState({});
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
    setPreviewImage(null);
  };
  return (
    <div>
      {contextHolder}
      <Modal
        title="Điền thông tin mới"
        open={addModalVisible}
        cancelText="HỦY"
        footer={null}
        onCancel={() => {
          setAddModalVisible(null);
        }}
      >
        <Form
          {...layout}
          form={form}
          onFinish={(value) => {
            let formData = new FormData();
            formData.append('title', value.Title);
            formData.append('description', value.Description);
            formData.append('image', submitImage);
            formData.append('type', route);
            formData.append('userID', profile.id);
            axios.post(process.env.REACT_APP_POSTDATA_URL, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                'Access-Control-Allow-Origin': '*',
              },
              
              // title: value.Title,
              // description: value.Description,
              // image: submitImage,
              // type: route,
              // userID: profile.id
            }).then(()=>{
              setAddModalVisible(null);
              form.resetFields();
              setPreviewImage(null);
              setUpdate(!update);
              openNotification('Added new item successfully', 'success');
            }).catch(()=>{
              openNotification('Error', 'error');
            })
          }}
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="Title" label="Tiêu đề" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="Description"
            label="Mô tả"
            rules={[{ required: true }]}
          >
            <TextArea />
          </Form.Item>
          <Form.Item name="image" label="Ảnh" rules={[{ required: true }]}>
            <Input
              type="file"
              onChange={(e) => {
                const [file] = e?.target.files;
                console.log(file);
                const data = new FileReader();
                data.addEventListener('load', ()=>{
                  setPreviewImage(data.result);
                })  
                data.readAsDataURL(file);
                setSubmitImage(file);
                // console.log(file);
              }}
            />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
          {previewImage ? (
            <img
              style={{ maxWidth: "25rem", maxHeight: "20rem" }}
              src={previewImage ? previewImage : "#"}
              alt="preview"
            />
          ) : (
            ""
          )}
        </Form>
      </Modal>
    </div>
  );
}

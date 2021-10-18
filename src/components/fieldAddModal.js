// import { Button } from "antd";
import React, { useState } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  Form,
  Input,
  Checkbox,
} from "antd";

const InputFieldModal = (props) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    const task = {
      userId: values.userid,
      title: values.description,
      completed: false,
    };
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      task
    );
    if (response) {
      alert("Task Added Successully!!!");
      // props.handleCancel();
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    alert("Failed:", errorInfo);
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Modal
        visible={props.visible}
        title='Enter the Task Details'
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={[
          <Button key='back' onClick={props.handleCancel}>
            Return
          </Button>,
        ]}
      >
        <Form
          name='basic'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='UserId'
            name='userid'
            rules={[{ required: true, message: "Please input your userid!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='Description'
            name='description'
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name='remember' valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              onClick={() => setLoading(true)}
              loading={loading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default InputFieldModal;

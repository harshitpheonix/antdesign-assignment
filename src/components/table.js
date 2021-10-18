import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Button,
} from "antd";
import FieldModal from "./fieldAddModal";
import axios from "axios";

var originData = [];

// for (let i = 0; i < 100; i++) {
//   originData.push({
//     key: i.toString(),
//     name: `Edrward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const [visible, setVisible] = useState(false);
  //  useEffect()

  const showModal = () => {
    setVisible(true);
    console.log("Helllo");
  };

  const handleCancel = () => {
    // this.setState({ visible: false });
    console.log("hjkhdsakjlhjl");
    setVisible(false);
  };

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      userId:"",
      title:"",
      completed:"",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
useEffect(async()=>{
const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
if(response){
// originData=response.data;
setData(response.data)
}
console.log(response)
})
  const columns = [
    {
      title: "UserId",
      dataIndex: "userId",
      width: "15%",
      editable: true,
    },
    {
      title: "Description",
      dataIndex: "title",
      width: "45%",
      editable: true,
     
    },
    {
      title: "Status",
      dataIndex: "completed",
      width: "20%",
      editable: true,
      render:(value)=><p>{value?"true":"false"}</p>
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href='javascript:;'
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title='Sure to cancel?' onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
    <h1>Todo List</h1>
      <FieldModal
        visible={visible}
        handleCancel={handleCancel}
        // handleOk={handleOk}
        // onFinishFailed={onFinishFailed}
        // onFinish={onFinish}
      />
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName='editable-row'
          pagination={{
            onChange: cancel,
          }}
        />
        <Button type='primary' onClick={showModal}>
          Add Task
        </Button>
      </Form>
    </>
  );
};
export default EditableTable;
// ReactDOM.render(<EditableTable />, mountNode);

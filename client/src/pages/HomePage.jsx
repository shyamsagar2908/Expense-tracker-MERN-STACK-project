import React, { useState, useEffect, useReducer } from "react";
import Layout from "../components/Layout/Layout";
import { Modal, Form, Input, Select, message, Table, DatePicker } from "antd";
import { UnorderedListOutlined, AreaChartOutlined,EditOutlined,DeleteOutlined} from "@ant-design/icons";
import axios from "axios";
import Spinner from "../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable,setEditable]=useState(null)
  const [reducerValue,forceUpdate]=useReducer(x => x+1,0);

  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "refrence",
    },
    {
      title: "Action",
      render: (text,record)=>(
        <div>
          <EditOutlined  onClick={()=>{
            setEditable(record)
            setShowModel(true)
          }}/>
          <DeleteOutlined 
           className="mx-2"
             onClick={()=>{
               handleDelete(record)
               }} 
               />
        </div>
      )
    },
  ];

  // get transections
  const getAllTransection = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      const res = await axios.post(
        "/api/transections/get-transection",
        {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        }
      );
      setLoading(false);
      setAllTransection(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      message.error("fetch issue with transection");
    }
  };
  //useEffect hookies
  useEffect(() => {
    getAllTransection();
  }, [frequency, selectedDate, type,reducerValue]);

  //delete handler
const handleDelete =async(record)=>{
try {
  setLoading(true)
  await axios.post("/api/transections/delete-transection",{transectionId:record._id})
  setLoading(false)
  message.success('Transection Deleted!');
} catch (error) {
  setLoading(false)
  console.log(error)
  message.error('unable to delete');
}
forceUpdate();
};


  // form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if(editable){
        await axios.post(
          "/api/transections/edit-transection",
          { 
            payload:{
              ...values,
              userId:user._id
            },
            transectionId:editable._id,
           }
        );
        setLoading(false);
        message.success("Transection Added Successfully");
      }
      else{
        await axios.post(
          "/api/transections/add-transection",
          { ...values, userid: user._id }
        );
        setLoading(false);
        message.success("Transection Added Successfully");
      }
      forceUpdate();
      setShowModel(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("failed to add transection");
    }
  };
 

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 Year</Select.Option>
            <Select.Option value="custom">custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedate(values)}
            />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">INCOME</Select.Option>
            <Select.Option value="expense">EXPENSE</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedate(values)}
            />
          )}
        </div>
        <div className="switch-icons">
          <UnorderedListOutlined className={`mx-2 ${viewData ==='table' ?'active-icon' : 'inactive-icon'}`} onClick={()=> setViewData('table')} />
          <AreaChartOutlined className={`mx-2 ${viewData ==='analytics' ?'active-icon' : 'inactive-icon'}`} onClick={()=> setViewData('analytics')}/>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModel(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content">
          {viewData === 'table' ? (<Table columns={columns} rowKey="_id" dataSource={allTransection} />) : ( 
          <Analytics allTransection={allTransection} /> )}
      </div>
      <Modal
        title={editable ? 'edit Transection' : 'Add Transection'}
        open={showModal}
        onCancel={() => setShowModel(false)}
        destroyOnClose={true}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
              <Select.Option value="Rent">Rent</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Reference" name="refrence">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">
              {" "}
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;

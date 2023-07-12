import React,{useEffect, useState} from 'react';
import {Form,Input,message} from "antd";
import { Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import '../pages/register.css';
import img from '../images/registration-image.jpg'

const Register = () =>{
    const navigate=useNavigate();
    const [loading,setLoading] = useState(false);
    //form submit 

    const submitHandler=async (values)=>{

        try {
            setLoading(true);
            console.log(values);
            await axios.post("/api/users/register",values);
            message.success("registeration successfull");
            setLoading(false);
            navigate("/login")
            
        } catch (error) {
            setLoading(false);
            message.error("something went wrong");
        }
    };
    //prevent for login user
    useEffect(()=>{
        if(localStorage.getItem("user")){
            navigate("/");
        }
    },[navigate]);

    return (
    <div className='register-container'>
    <div className='register-image-container'>
        <img className='register-image' src={img}/>
    </div>
        <div className="register-page">
            {loading && <Spinner />}
            <Form layout='vertical' className="w-50 p-2" onFinish={submitHandler}>
                <h1>Register form</h1>
                <Form.Item label="Name"  name="name">
                    <Input  />
                </Form.Item>
                <Form.Item label="Email"  name="email">
                    <Input type="email" />
                </Form.Item>
                <Form.Item label="Password"  name="password">
                    <Input type="password" />
                </Form.Item>
                        <Link to='/login'>Already register? click here to login</Link>
                <div className='d-flex justify-content-center mt-2'>
                <button className="btn btn-primary">Register</button>
                </div>
                </Form>
                </div>
    </div>
    );
};

export default Register;
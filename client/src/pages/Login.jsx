import React,{useEffect, useState} from "react";
import {Form,Input,message} from "antd";
import { Link,useNavigate } from 'react-router-dom';
import Axios from "axios";
import Spinner from "../components/Spinner";
import '../pages/login.css';
import img from '../images/login-image.jpg'

const Login=()=>{
    const [loading,setLoading] = useState(false);
    const navigate =useNavigate();
        //form submit 
        const submitHandler =async(values)=>{
        try {
            setLoading(true);
          const { data } = await Axios.post("/api/users/login",values);  
        setLoading(false);
          message.success('Login successful')
        localStorage.setItem('user',JSON.stringify({...data.user,password:''})
        );
        navigate('/');
        } catch (error) {
            setLoading(false);
            message.error('something went wrong');
        }
        };
         //prevent for login user
    useEffect(()=>{
        if(localStorage.getItem("user")){
            navigate("/");
        }
    },[navigate]);
    return (
        <div className="login-container d-flex">
        <div className='login-image-container'>
        <img className='login-image img-fluid' src={img}/>
    </div>
<div className="register-page">
    {loading && <Spinner/>}
            <Form layout='vertical' className="w-50 p-2" onFinish={submitHandler}>
                <h1>Login form</h1>
                <Form.Item label="Email" name="email" >
                    <Input type="email" required/>
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type="password"  required/>
                </Form.Item>
                        <Link to='/register'>Not user? click here to register</Link>
                <div className='d-flex justify-content-center mt-2'>
                <button className="btn btn-primary">Login</button>
                </div>
                </Form>
                </div>
        </div>
    );
} 

export default Login;
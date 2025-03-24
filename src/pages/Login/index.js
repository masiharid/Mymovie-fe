import React, { useEffect } from 'react'
import { Form, message } from 'antd'
import Button from '../../components/Button.js'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../../apicalls/user';
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loadersSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading())
     const response = await LoginUser(values);
     dispatch(HideLoading())
      if(response.success){
       message.success(response.message)
       localStorage.setItem("token", response.data);
        //window.location.href = "/";
        console.log(localStorage.getItem('token'))
        navigate("/");
    
      } else {
        message.error(response.message)
      }
    } catch(error){
      dispatch(HideLoading())
      message.error(error.message);
  }
}
useEffect(() => {
  if(localStorage.getItem('token')){
    navigate("/");
  }
}
, [navigate])
  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1">Mymovies- Login</h1>
        <hr />
        <Form
          layout="vertical"
          className="mt-1"
          onFinish={onFinish}>
          
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}>
            <input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}>
            <input type="password" />
          </Form.Item>
         <div className="flex flex-col mt-2 gap-1 "> 
          <Button title="LOGIN" type="submit" fullWidth />
           <Link to="/register"
           className="text-primary">{" "}Don't have an account? Register</Link>
           </div>
        </Form>
      </div>
    </div>
  )
}

export default Login



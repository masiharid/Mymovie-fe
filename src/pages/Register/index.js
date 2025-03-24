import React, { useEffect } from 'react'
import { Form, message } from 'antd'
import Button from '../../components/Button.js'
import { Link } from 'react-router-dom'
import { RegisterUser } from '../../apicalls/user';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loadersSlice';
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
try{
  dispatch(ShowLoading())
  const response = await RegisterUser(values)
  dispatch(HideLoading())
  if(response.success){
    message.success('User created successfully')
   
  } else {
    message.error(response.message)
  }
} catch(error){
  dispatch(HideLoading())
  message.error('An error occured')
  }
};
useEffect(() => {
  if(localStorage.getItem("token")){
    navigate("/");
  }
}
, [navigate])
  return (
    <div className="flex justify-center items-center h-screen bg-primary">
      <div className="card p-3 w-400">
        <h1 className="text-xl mb-1">Mymovies- Register</h1>
        <hr />
        <Form
          layout="vertical"
          className="mt-1"
          onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}>
            <input type="text" />
          </Form.Item>
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
          <Button title="REGISTER" type="submit" fullWidth />
           <Link to="/login"
           className="text-primary">{" "}Already have an account? Login</Link>
           </div>
        </Form>
      </div>
    </div>
  )
}

export default Register

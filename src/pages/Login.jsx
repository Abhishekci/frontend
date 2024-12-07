import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../store/auth'
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {
    const history = useNavigate();

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    if(isLoggedIn === true){
        history('/')
    }

    const [Data, setData] = useState({username : "", password: ""});
    const dispatch = useDispatch();
    const change = (e) => {
    const {name, value} = e.target;
    setData({...Data, [name]: value});
    };

    const submit = async () => {
        try {
            if(Data.username === "" || Data.password === "" ) {
                alert("Please fill all the fields")
            } else {
                const res = await axios.post("https://expressbackend-one.vercel.app/api/v1/log-in", Data);
                setData({username: "", email: "", password: ""})
                // console.log(res)
                localStorage.setItem("id", res.data.id);
                localStorage.setItem("token", res.data.token)
                dispatch(authActions.login())
                history('/')
            }
        } catch (err) {
            alert(err.response.data.message)
        }
        
    }

  return (
    <div className='h-[98vh] flex items-center justify-center'>
    <div className='p-4 w-1/3 rounded bg-gray-800'>
      <div className='text-2xl font-semibold'>Login</div>
      <input className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
      type='text'
      placeholder='Username'
      name='username' onChange={change} value={Data.username} required />
      <input className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
      type='password'
      placeholder='Password'
      name='password' onChange={change} value={Data.password} required />
      <div className='w-full flex items-center justify-between'>
        <button className='bg-blue-400 font-semibold px-3 py-2 rounded' onClick={submit}>Login </button>
        <Link to='/signup' className='text-gray-400 hover:text-gray-200'> Not Having an account ? SignUp! </Link>
      </div>
    </div> 
  </div>
  )
}

export default Login

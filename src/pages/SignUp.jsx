import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const SignUp = () => {
const history = useNavigate();

const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
if(isLoggedIn === true){
    history('/')
}

const [Data, setData] = useState({username : "", email: "", password: ""});

const change = (e) => {
    const {name, value} = e.target;
    setData({...Data, [name]: value});
};

const submit = async () => {
    try {
        if(Data.username === "" || Data.email === "" || Data.password === "" ) {
            alert("Please fill all the fields")
        } else {
            const res = await axios.post("http://localhost:1000/api/v1/sign-in", Data);
            console.log(res)
            setData({username: "", email: "", password: ""})
            history('/login')
        }
    } catch (err) {
        alert(err.response.data.message)
    }
    
}
  return (
    <div className='h-[98vh] flex items-center justify-center'>
      <div className='p-4 w-1/3 rounded bg-gray-800'>
        <div className='text-2xl font-semibold'>SignUp</div>
        <input className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
        type='text'
        placeholder='Username'
        name='username' onChange={change} value={Data.username} required />
        <input className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
        type='email'
        placeholder='Email'
        name='email' onChange={change} value={Data.email} required />
        <input className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
        type='password'
        placeholder='Password'
        name='password' onChange={change} value={Data.password} required />
          <div className='w-full flex items-center justify-between'>
        <button className='bg-blue-400 font-semibold px-3 py-2 rounded' onClick={submit}>SignUp</button>
        <Link to='/login' className='text-gray-400 hover:text-gray-200'> Already have an account ? Login! </Link>
      </div>
      </div>
    </div>
  )
}

export default SignUp

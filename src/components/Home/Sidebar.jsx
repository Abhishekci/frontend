import React, { useEffect, useState } from 'react'
import { FaTasks } from "react-icons/fa";
import { SiGoogletasks } from "react-icons/si";
import { MdPendingActions } from "react-icons/md";
import { FaMapPin } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';


export const Sidebar = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const data = [
        {
            title: "All Tasks",
            icon: <FaTasks/>,
            link: "/"
        },
        {
            title: "Completed Tasks",
            icon: <SiGoogletasks/>,
            link: "/completedtask"
        },
        {
            title: "Pending Tasks",
            icon: <MdPendingActions/>,
            link: "/pendingtask"
        },
        {
            title: "Important Tasks",
            icon: <FaMapPin/>,
            link: "/importanttask"
        }
    ]

    const [Data, setData] = useState();

    const logout = () =>{
        dispatch(authActions.logout())
        localStorage.clear("id");
        localStorage.clear("token");
        history('/login')
    }

    const headers = {
        id:localStorage.getItem('id'),
        authorization: `Bearer ${localStorage.getItem('token')}`
    }
    // console.log(headers)

    useEffect(() => {
      const fetch = async ()=>{
        try {
            const res = await axios.get('https://expressbackend-one.vercel.app/api/v2/get-tasks', {headers})
            console.log(res.data.data)
            setData(res.data.data)
        } catch(err){
            console.log(err)
        }
      }
      fetch()
    }, [])
    

  return (
    <>
        {Data && (
                <div >
                    <h2 className='text-xl font-semibold'>{Data.username}</h2>
                    <h4 className='mb-1 text-[12px] text-gray-400'>{Data.email}</h4>
                    <hr />
                </div>
        )}
        
        <div>
            {data.map((item,index)=>(
                <Link to={item.link} className='my-2 flex items-center gap-3 hover:bg-gray-600 p-2 rounded transition-all duration-300' key={index} >{item.icon} {item.title}</Link>
            ))}
        </div>
        <div>
            <button className='bg-gray-600 w-full p-2 rounded hover:bg-gray-500 transition-all duration-200' onClick={logout}>Logout</button>
        </div>
        </>
  )
}

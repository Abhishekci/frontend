import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { IoClose } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const InputData = ({InputDiv, setInputDiv, editData, seteditData}) => {
const [Data, setData] = useState({title: "", desc: ""});
const history = useNavigate()

const change = (e)=>{
    const {name, value} = e.target;
    setData({...Data, [name] : value});
    console.log(Data)
}
useEffect(() => {
    setData({title: editData.title, desc: editData.desc})
    // alert(editData.title)
    
}, [editData])


const headers = {
    id:localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`
}

const updateData = async () => {
    try {
        if(Data.title === "" || Data.desc === "" ) {
            alert("Please fill all the fields")
        } else {
            const res = await axios.put(`http://localhost:1000/api/v2/update-tasks/${editData.id}`, Data, {headers});
            console.log(res)
            setData({title: "", desc: ""})
            setInputDiv('hidden')
        }
    }
    catch (error) {
        alert(error.response.data.message)
    }
}

const submit = async () => {
    try {
        if(Data.title === "" || Data.desc === "" ) {
            alert("Please fill all the fields")
        } else {
            const res = await axios.post(`http://localhost:1000/api/v2/create-task`, Data, {headers});
            console.log(res)
            setData({title: "", desc: ""})
            setInputDiv('hidden')
        }
    } catch (err) {
        alert(err.response.data.message)
    }
    
}

  return (
    <>
        <div className={`${InputDiv } top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}>
        </div>
        <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
            <div className='w-2/6 bg-gray-900 rounded p-4'>
                <div className='flex justify-end'>
                    <button className='text-2xl'  onClick={()=>{setInputDiv('hidden'); seteditData({title: "", desc: ""}) }}><IoClose /></button>
                </div>
                <input type='text' 
                    placeholder='Title' onChange={change} value={Data.title}
                    name='title' 
                    className='px-3 py-2 rounded w-full bg-gray-700 my-3' />
                <textarea placeholder='Enter your Task.' 
                    name='desc' 
                    cols="30"
                    rows="10"
                    onChange={change} value={Data.desc}
                    className='px-3 py-2 rounded w-full bg-gray-700 my-3'></textarea>
                {editData.title === "" ? 
                (<button className='px-3 py-2 bg-blue-400 rounded text-black text-xl' onClick={submit}>Submit</button>) : 
                (<button className='px-3 py-2 bg-blue-400 rounded text-black text-xl' onClick={updateData}>Update</button>)
                }
            </div>
        </div>
    </>
  )
}

export default InputData

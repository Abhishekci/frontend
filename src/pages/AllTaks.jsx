import React, { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards'
import { IoIosAddCircle } from "react-icons/io";
import InputData from '../components/Home/InputData';
import axios from 'axios';

const AllTaks = () => {
const [InputDiv, setInputDiv] = useState('hidden')
const [Data, setData] = useState();
const [editData, seteditData] = useState({id:"", title:"", desc:""});

const headers = {
  id:localStorage.getItem('id'),
  authorization: `Bearer ${localStorage.getItem('token')}`
}

useEffect(() => {
  const fetch = async ()=>{
    try {
        const res = await axios.get('http://localhost:1000/api/v2/get-tasks', {headers})
        console.log(res.data.data)
        setData(res.data.data)
    } catch(err){
        console.log(err)
    }
  }
  fetch()
})

  return (
    <>
      <div>
        <div className='w-full flex justify-end px-4 py-2'>
          <button onClick={()=>setInputDiv('fixed')}>
            <IoIosAddCircle  className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
          </button>
        </div>
        {Data && <Cards home={"true"} setInputDiv={setInputDiv} data={Data.tasks} seteditData={seteditData} />}
      </div>
      <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} editData={editData} seteditData={seteditData} />
    </>
  )
}

export default AllTaks

import React, { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios';


const ImportantTasks = () => {

  const [Data, setData] = useState();

  const headers = {
    id:localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`
  }
  
  useEffect(() => {
    const fetch = async ()=>{
      try {
          const res = await axios.get('https://expressbackend-one.vercel.app/api/v2/get-imp-tasks', {headers})
          console.log(res.data.data)
          setData(res.data.data)
      } catch(err){
          console.log(err)
      }
    }
    fetch()
  },[])


  return (
    <div>
      <Cards home={"false"} data={Data} />
    </div>
  )
}

export default ImportantTasks

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards';


const PendingTasks = () => {
  const [Data, setData] = useState(); 

  const headers = {
    id:localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`
  }
  
  useEffect(() => {
    const fetch = async ()=>{
      try {
          const res = await axios.get('https://expressbackend-one.vercel.app/api/v2/get-incomp-tasks', {headers})
          console.log(res.data.data)
          setData(res.data.data)
      } catch(error){
          console.log(error) 
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

export default PendingTasks

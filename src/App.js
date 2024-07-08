import React, { useEffect } from 'react'
import Home from './pages/Home'
import AllTaks from './pages/AllTaks'

import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import ImportantTasks from './pages/ImportantTasks'
import PendingTasks from './pages/PendingTasks'
import CompletedTasks from './pages/CompletedTasks'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'

const App = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  console.log(isLoggedIn)
  useEffect(()=>{
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      dispatch(authActions.login()); 
    } else if(!isLoggedIn){
      navigate('/signup')
    }
  }, []);

  return (
    <div className='bg-gray-900 text-white h-screen p-2 relative'>
  
      <Routes>
        <Route path='/' element={<Home />} >
          <Route index element={<AllTaks />} />
          <Route path='/importanttask' element={<ImportantTasks />} />
          <Route path='/pendingtask' element={<PendingTasks />}/>
          <Route path='/completedtask' element={<CompletedTasks />} />
        </Route>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App

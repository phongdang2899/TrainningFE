import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'    
 
import Dashboard from '../../../Page/Dashboard'
import Customer from '../../../Page/Customer'
import User from '../../../Page/User'      
import FormUser from '../../../Page/FormUser'
import FormCustomer from '../../../Page/FormCustomer'

const AppRoutes = () => {
  return (
    <div className='Routes'> 
            <Routes>
                <Route path="/" element={<Dashboard/>}/>  
                <Route path="/customers" element={<Customer/>}/>   
                <Route path="/customers/detail/:id" element={<FormCustomer/>}/>   
                <Route path="/users" element={<User/>}/>   
                <Route path="/users/create" element={<FormUser/>}/>
                <Route path="/users/edit/:id" element={<FormUser/>}/>      
            </Routes> 
    </div>
  )
}

export default AppRoutes
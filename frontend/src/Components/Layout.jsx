import { getAuth } from 'firebase/auth'
import React, { useContext, useEffect } from 'react'
import { useMutation } from 'react-query'
import { Outlet } from 'react-router-dom'
import UserDetailContext from '../Context/UserDetailContext'
import { createUser } from '../Utils/api'
import Footer from './Footer'
import Header from './Header'

const Layout = () => {

  const {setIsAuthenticated,user,getAccessTokenWithPopup} = getAuth();
  const {setUserDetails} = useContext(UserDetailContext)
  const {mutate} = useMutation({
    mutationKey:[user?.email],
    mutationFn: () => createUser(user?.email)
  })

  useEffect(() => {
    setIsAuthenticated && mutate()
  },[setIsAuthenticated])
  

  return (
    <>
    <div>
        <Header />
        <Outlet />
    </div>
    <Footer/>
    </>
  )
}

export default Layout
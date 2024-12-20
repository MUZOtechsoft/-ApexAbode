import { Suspense, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "react-toastify/ReactToastify.css"
import Layout from './Components/Layout'
import UserDetailContext from './Context/UserDetailContext'
import AddProperty from './Pages/addProperty'
import Bookings from './Pages/Bookings'
import Favorite from './Pages/Favorite'
import Home from './Pages/Home'
import Listing from './Pages/Listing'
import Property from './Pages/Property'

export default function App() {

  const queryClient = new QueryClient();
  const [userDetails, setUserDetails] = useState({
    favorites: [],
    bookings: [],
    token: null,
  })

  return (
    <UserDetailContext.Provider value={{ userDetails, setUserDetails }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route element={<Layout />}>
                <Route path='/' element={<Home />} />
                <Route path='/listing'>
                  <Route index element={<Listing />} />
                  <Route path=':propertyId' element={<Property />} />
                </Route>
                <Route path='/addproperty' element={<AddProperty />} />
                <Route path='/bookings' element={<Bookings />} />
                <Route path='/favorite' element={<Favorite />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <ToastContainer />
      </QueryClientProvider>
    </UserDetailContext.Provider>
  )
}
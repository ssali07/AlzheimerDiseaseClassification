import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import About from './components/About/About.jsx'
import Home from './components/Home/Home.jsx'
import Contact from './components/Contact/Contact.jsx'
import Diagnose from './components/Diagnose/Diagnose.jsx'
import Login from './components/Login/Login.jsx'
import Register from './components/Register/Register.jsx'
// import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'

const router= createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>} >
      <Route path='' element={<Home/>} />
      <Route path='About' element={<About/>} />
      <Route path='Contact' element={<Contact/>} />
      <Route path='Diagnose' element={<Diagnose/>} />
      
      {/* Protect Diagnose route */}
      {/* <Route 
        path="Diagnose" 
        element={<ProtectedRoute element={Diagnose} />} 
      /> */}

      <Route path='Login' element={<Login/>}/>
      <Route path='Register' element={<Register/>}/>
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
    {/* <App/> */}
  </StrictMode>,
)

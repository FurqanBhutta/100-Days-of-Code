import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './Components/Home'
import About from './Components/About'
import  Contact from './Components/Contact'
import Navebar from './Components/Navbar'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <> <Navebar/> <Home/> </>
    },
    {
      path: "/about",
      element: <> <Navebar/> <About/> </>
    },
    {
      path: "/contact",
      element: <> <Navebar/> <Contact/> </>
    },
  ])
  return (
   <>
  <RouterProvider router={router}/>
   </>
  )
}

export default App

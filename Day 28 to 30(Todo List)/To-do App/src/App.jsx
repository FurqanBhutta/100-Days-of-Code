import {BrowserRouter,Routes, Route,Navigate} from 'react-router-dom'
import './App.css'
import Home from './Compoents/Home'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        {/* Redirect from / to /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

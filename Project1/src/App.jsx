import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'

import Signup1 from './pages/Signup1'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup2" element={<signup2 />} />
          <Route path="/signup1" element={<Signup1 />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

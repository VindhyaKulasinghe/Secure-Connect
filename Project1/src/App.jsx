import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup2 from './pages/signup2'
function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup2/>}/>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

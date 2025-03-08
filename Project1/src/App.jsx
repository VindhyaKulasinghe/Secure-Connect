import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import signup2 from './pages/signup2'
function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup2" element={<signup2/>}/>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

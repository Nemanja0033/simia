import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import ProtectedRoute from "./utils/ProtectedRoute"
import Groops from "./pages/Groups"
import Login from "./pages/Login"
import Navbar from "./componnets/Navbar"
import BottomNav from "./componnets/BottomNav"

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/groups" element={<Groops />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  )
}

export default App
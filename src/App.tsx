import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import Login from "./pages/Login"
import Navbar from "./componnets/Navbar"
import BottomNav from "./componnets/BottomNav"
import Groups from "./pages/Groups"
import ProtectedRoute from "./routes/ProtectedRoute"
import AdminProtectionRoute from "./routes/AdminProtectionRoute"

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminProtectionRoute><Admin /></AdminProtectionRoute>} />
        <Route path="/groups" element={<ProtectedRoute><Groups /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  )
}

export default App
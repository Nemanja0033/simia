import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import ProtectedRoute from "./utils/ProtectedRoute"
import Groops from "./pages/Groups"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/groups" element={<Groops />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
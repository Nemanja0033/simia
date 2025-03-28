import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import Login from "./pages/Login"
import Navbar from "./components/Navbar"
import BottomNav from "./components/BottomNav"
import Groups from "./pages/Groups"
import ProtectedRoute from "./routes/ProtectedRoute"
import AdminProtectionRoute from "./routes/AdminProtectionRoute"
import UnauthorizedRoute from "./routes/UnauthorizedRoute"
import CreateGroup from "./pages/CreateGroup"
import GroupFeed from "./pages/GroupFeed"
import BlogEditor from "./pages/BlogEditor"
import ArticlePage from "./pages/ArticlePage"

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminProtectionRoute><Admin /></AdminProtectionRoute>} />
        <Route path="/groups" element={<ProtectedRoute><Groups /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/creategroup" element={<CreateGroup />} />
        <Route path="/unauthorized" element={<UnauthorizedRoute />} />
        <Route path="/group/:groupID" element={<GroupFeed />} />
        <Route path="/group/:groupID/newblog" element={<BlogEditor />} />
        <Route path="/article/:heading" element={<ArticlePage />} />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  )
}

export default App
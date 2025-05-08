import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Template from "./template/Template";
import Loading from "./components/Loading/Loading";
import DetailMoviePage from "./pages/DetailMoviePage/DetailMoviePage";
import MovieManagement from "./pages/Manager/MovieManagement/MovieManagement";
import AuthPage from "./pages/LoginPage/AuthPage";
import UserManagement from "./pages/Manager/UserManegement/UserManagement";
import UpdateUser from "./pages/Manager/UserManegement/UpdateUser";

import AdminPage from "./pages/AdminPage/AdminPage";

function App() {
  return (
    <div>
      <Loading />
      <BrowserRouter>
        <Toaster />
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Template content={<HomePage />} />} />
          <Route path="/login&register" element={<AuthPage />} />
          <Route
            path="/detail/:id"
            element={<Template content={<DetailMoviePage />} />}
          />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/movies" element={<MovieManagement />} />
          <Route path="/admin/users" element={<UserManagement />}></Route>
          <Route path="/admin/users/edit/:taiKhoan" element={<UpdateUser />} />
          {/* tạo route khi user nhập sai đường dẫn */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// npm install tailwindcss @tailwindcss/vite

// not found page , code pen

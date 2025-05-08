import React, { useState } from "react";
import { updateUserService } from "../../../api/userService";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom"; // <--- import thêm

export default function UpdateUser() {
  const location = useLocation(); // <--- lấy state
  const userState = location.state; // user được truyền qua lúc bấm nút Sửa
  const [user, setUser] = useState({
    taiKhoan: userState?.taiKhoan || "",
    matKhau: userState?.matKhau || "",
    email: userState?.email || "",
    soDt: userState?.soDt || "",
    maNhom: userState?.maNhom || "GP11",
    maLoaiNguoiDung: userState?.maLoaiNguoiDung || "KhachHang",
    hoTen: userState?.hoTen || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserService(user);
      toast.success("Cập nhật người dùng thành công!");
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật thất bại!");
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Cập nhật người dùng</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="taiKhoan"
          placeholder="Tài khoản"
          value={user.taiKhoan}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="password"
          name="matKhau"
          placeholder="Mật khẩu"
          value={user.matKhau}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="soDt"
          placeholder="Số điện thoại"
          value={user.soDt}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="maNhom"
          placeholder="mã nhóm"
          value={user.maNhom}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <select
          name="maLoaiNguoiDung"
          value={user.maLoaiNguoiDung}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="KhachHang">Khách hàng</option>
          <option value="QuanTri">Quản trị</option>
        </select>
        <input
          type="text"
          name="hoTen"
          placeholder="Họ tên"
          value={user.hoTen}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="col-span-2 bg-blue-500 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { hideLoading, showLoading } from "../../../redux/loadingSlice";
import { getListUserService } from "../../../api/userService";
import { message } from "antd"; // <-- thêm dòng này
import UpdateUser from "./UpdateUser";
export default function UserManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState(1);
  const itemsPerPage = 35;
  const fetchUsers = async () => {
    try {
      dispatch(showLoading());
      const responses = await getListUserService();

      const allUsers = responses.flatMap((res) => {
        if (res?.data?.content) {
          return res.data.content;
        }
        return []; // nếu response ko có content t  hì return mảng rỗng
      });

      setUsers(allUsers);
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error fetching users:", error);
      message.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const renderListUser = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);

    return currentUsers.map((user, index) => (
      <tr key={user.taiKhoan}>
        <td>{startIndex + index + 1}</td>
        <td>{user.taiKhoan}</td>
        <td>{user.matKhau}</td>
        <td>{user.hoTen}</td>
        <td>{user.email}</td>
        <td>{user.soDt}</td>
        <td>
          <button onClick={() => handleEditUser(user)}>Sửa</button>
          <button onClick={() => handleDeleteUser(user.taiKhoan)}>Xóa</button>
        </td>
      </tr>
    ));
  };

  const handleEditUser = (user) => {
    navigate(`/admin/users/edit/${user.taiKhoan}`, { state: user });
    // navigate(`/admin/user/edit/${user.taiKhoan}`);
  };

  const handleDeleteUser = (taiKhoan) => {
    console.log("Xóa user:", taiKhoan);
    // Gọi API xóa
  };
  const handleUpdateUser = (user) => {};
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Quản lý người dùng</h2>
      <table className="w-full border">
        <thead>
          <tr>
            <th>Id</th>
            <th>Tài Khoản</th>
            <th>Mật Khẩu</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Điện thoại</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>{renderListUser()}</tbody>
      </table>

      {/* Phân trang nếu cần */}
      <div className="flex justify-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1 border rounded mx-1"
        >
          Prev
        </button>
        <span className="px-3 py-1">{currentPage}</span>
        <button
          disabled={currentPage * itemsPerPage >= users.length}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-1 border rounded mx-1"
        >
          Next
        </button>
      </div>
    </div>
  );
}

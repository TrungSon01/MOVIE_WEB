import axios from "axios";
import { CYBER_TOKERN } from "./config";
import { Authorization } from "./config";

export const loginService = (user) => {
  return axios({
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
    method: "POST",
    data: user,
    headers: {
      TokenCybersoft: CYBER_TOKERN,
    },
  });
};

export const registerService = (user) => {
  return axios({
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",

    method: "POST",
    data: user,
    headers: {
      Authorization: Authorization,
      TokenCybersoft: CYBER_TOKERN,
    },
  });
};

export const updateUserService = (user) => {
  return axios({
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
    method: "POST",
    data: user,
    headers: {
      Authorization: Authorization,
      TokenCybersoft: CYBER_TOKERN,
    },
  });
};

export const getListUserService = () => {
  const requests = [];

  for (let i = 11; i <= 11; i++) {
    // từ GP01 đến GP10
    const groupCode = `GP${i.toString().padStart(2, "0")}`; // ép thành GP01, GP02,...
    const request = axios({
      url: `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=${groupCode}`,
      method: "GET",
      headers: {
        TokenCybersoft: CYBER_TOKERN,
      },
    });
    requests.push(request);
  }

  return Promise.all(requests); // đợi tất cả API về
};

// https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01

import axios, { all } from "axios";
import { CYBER_TOKERN, https, Authorization } from "./config";
const BASE_URL = "https://movienew.cybersoft.edu.vn/api";

export const addMovieService = (formData) => {
  return axios.post(`${BASE_URL}/QuanLyPhim/ThemPhimUploadHinh`, formData, {
    headers: {
      Authorization: Authorization,
      TokenCybersoft: CYBER_TOKERN,
      "Content-Type": "multipart/form-data",
    },
  });
};
export const getListMovieService = () => {
  return axios({
    url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=${"GP01"}`,
    method: "GET",
    headers: {
      TokenCybersoft: CYBER_TOKERN,
    },
  });
};

export const getDetailMovieService = (id) => {
  const url = `/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`;
  return https.get(url);
};

export const deleteMovieService = (maPhim) => {
  return axios.delete(`${BASE_URL}/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`, {
    headers: {
      Authorization: Authorization,
      TokenCybersoft: CYBER_TOKERN,
    },
  });
};

export const updateMovieService = (formData) => {
  return axios({
    url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload",
    method: "POST",
    data: formData,
    headers: {
      TokenCybersoft: CYBER_TOKERN,
    },
  });
};

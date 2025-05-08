import React, { useEffect, useState } from "react";
import { getListMovieService } from "../../api/movieService";
import { Button, Card, Popover, Pagination } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loadingSlice";
import { toast } from "react-hot-toast";

const { Meta } = Card;

export default function ListMovie() {
  const [listMovie, setListMovie] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Di chuyển useNavigate() lên đây

  useEffect(() => {
    dispatch(showLoading());
    getListMovieService()
      .then((res) => {
        dispatch(hideLoading());
        setListMovie(res.data.content);
      })
      .catch((err) => {
        dispatch(hideLoading());
        console.log(err);
      });
  }, [dispatch]); // Thêm ''dispatch'' vào dependency array

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  const renderListMovie = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentMovies = listMovie.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    const handleClick = (maPhim) => {
      const user = JSON.parse(localStorage.getItem("USER"));
      if (!user) {
        let isconfirm = confirm("Bạn cần đăng nhập để xem chi tiết");
        if (isconfirm) {
          navigate("/login&register");
        }

        return;
      }
      navigate(`/detail/${maPhim}`);
    };

    return currentMovies.map((movie) => {
      const desc = (
        <Popover
          content={
            <p className="w-72 bg-black text-white p-3 rounded-2xl">
              {movie.moTa}
            </p>
          }
          trigger="click"
        >
          <button className="text-blue-500 font-semibold px-4 py-2 rounded-lg border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 cursor-pointer w-full">
            Mô tả
          </button>
        </Popover>
      );
      return (
        <Card
          key={movie.maPhim}
          hoverable
          cover={
            <img
              alt="movie"
              src={movie.hinhAnh}
              className="h-100 object-cover"
            />
          }
        >
          <Meta title={movie.tenPhim} description={desc} />
          <Link
            to="#"
            className="mt-3 inline-block text-red-600 font-semibold px-4 py-2 rounded-lg border border-red-600 hover:bg-red-600 hover:text-white transition duration-300 w-full text-center"
            onClick={(e) => {
              e.preventDefault();
              handleClick(movie.maPhim);
            }}
          >
            Xem ngay
          </Link>
        </Card>
      );
    });
  };

  return (
    <div className="container">
      <div className="grid grid-cols-5 gap-4 mb-6">{renderListMovie()}</div>
      <Pagination
        showQuickJumper
        current={currentPage}
        total={listMovie.length}
        pageSize={itemsPerPage}
        onChange={onChangePage}
        className="text-center flex justify-center"
      />
    </div>
  );
}

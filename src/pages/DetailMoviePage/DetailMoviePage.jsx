import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getDetailMovieService } from "../../api/movieService";
import { Progress } from "antd";

export default function DetailMoviePage() {
  let [detailMovie, setDetailMovie] = useState({});
  // lấy param từ url
  let params = useParams();
  console.log(" params:", params);

  useEffect(() => {
    // gọi api lấy chi tiết phim theo id
    getDetailMovieService(params.id)
      .then((res) => {
        console.log(" res:", res);
        setDetailMovie(res.data.content);
      })
      .catch((err) => {
        console.log(" err:", err);
      });
  }, []);

  return (
    <div className="container  flex items-center space-x-20">
      <img src={detailMovie.hinhAnh} className="w-96" alt="" />
      <div>
        {" "}
        <h2>Đánh giá</h2>
        <Progress
          type="circle"
          percent={detailMovie.danhGia * 10}
          format={() => {
            return detailMovie.danhGia + " điểm";
          }}
          strokeWidth={10}
          size={300}
        />
      </div>
    </div>
  );
}

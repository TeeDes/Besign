import { useQuery } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import "./Review.scss";
const Review = ({ review }) => { //Review là một functional component nhận một prop là review, đại diện cho thông tin đánh giá cần hiển thị.
  const { isLoading, error, data } = useQuery(
    {
      queryKey: [review.userId],
      queryFn: () =>
        newRequest.get(`/users/${review.userId}`).then((res) => { //Sử dụng useQuery để thực hiện truy vấn dữ liệu từ /users/${review.userId} để lấy thông tin về người dùng đăng đánh giá.
          return res.data;
        }),
    },
  );

 //Sử dụng một vòng lặp để hiển thị số lượng hình sao tương ứng với điểm đánh giá (review.star).
  return (
    <div className="review">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="user">
          <img className="pp" src={data.img || "/images/noavatar.png"} alt="" />
          <div className="info">
            <span>{data.username}</span>
            <div className="country">
              <span>{data.country}</span>
            </div>
          </div>
        </div>
      )}
      <div className="stars"> 
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <img src="\images\star.png" alt="" key={i} />
          ))}
        <span>{review.star}</span>
      </div>
      <p>{review.desc}</p>
      <div className="helpful">
        <span>Helpful?</span>
        <img src="\images\like.png" alt="" />
        <span>Có</span>
        <img src="\images\dislike.png" alt="" />
        <span>Không</span>
      </div>
    </div>
  );
};

export default Review;
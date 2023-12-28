import React from 'react'
import "./GigCard.scss"
import { Link } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query"; //Import useQuery từ thư viện react-query để thực hiện các truy vấn dữ liệu.
import newRequest from "../../utils/newRequest"; //Import newRequest từ module ../../utils/newRequest để thực hiện các yêu cầu HTTP.


const GigCard = ({ item }) => { //GigCard là một functional component nhận một prop là item.
    const { isLoading, error, data } = useQuery({
      queryKey: [item.userId], //queryKey là một mảng chứa khóa truy vấn, ở đây là [item.userId].
      queryFn: () =>
        newRequest.get(`/users/${item.userId}`).then((res) => { //queryFn là một hàm thực hiện truy vấn dữ liệu sử dụng newRequest để lấy thông tin người dùng từ /users/${item.userId}.
          return res.data;
        }),
    });
    // dòng 35 Trong thẻ <span>, bạn đang tính toán điểm đánh giá trung bình bằng cách lấy tổng số sao (item.totalStars) chia cho số lượng người đánh giá (item.starNumber). Trước khi tính toán, có một kiểm tra !isNaN(item.totalStars / item.starNumber) để đảm bảo rằng phép chia không dẫn đến kết quả không phải là số (NaN - Not-a-Number). 
  return (
    <Link to={`/gig/${item._id}`} className="link">
    <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
            {isLoading ? (
                "loading" 
                ) : error ? (
                    "Có gì đó không đúng!"
                ) : (
                <div className="user">
                    <img src={data.img || "/images/noavatar.png"} alt="" />
                    <span>{data.username}</span>
                </div>
            )}
            <p className="title">{item.title}</p>
            <p className="desc">{item.desc}</p> 
            <div className="star"> 
                <img src="\images\star.png" alt="" />
                <span>{!isNaN(item.totalStars / item.starNumber) && Math.round(item.totalStars / item.starNumber)}</span> 
            </div> 
        </div> 

        <hr/>

        <div className="details">
            <img src="\images\heart.png" alt="" />
            <div className="price">
                <span>GIÁ</span>
                <h2>{item.price} VND</h2>
            </div>
        </div>

    </div>
    </Link>
  );
};

export default GigCard
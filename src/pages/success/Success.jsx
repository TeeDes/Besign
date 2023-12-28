import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import newRequest from '../../utils/newRequest';

const Success = () => {

  const { search } =useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent"); //payment_intent: Lấy giá trị của tham số payment_intent từ URL.

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/orders", { payment_intent });  //Trong hàm makeRequest, gửi một yêu cầu PUT đến endpoint "/orders" với thông tin payment_intent.
        setTimeout(() => {
          navigate("/orders"); //Sau khi thành công, sử dụng setTimeout để chờ 5 giây và sau đó điều hướng người dùng đến trang "/orders".
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);
  
  return (
    <div className="success-container">
      <div className="success-message">
        Thanh toán thành công! Bạn sẽ được chuyển đến trang đặt hàng. Vui lòng không đóng trang
      </div>
    </div>
  );
};

export default Success;
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review"; //Review là một component được import để hiển thị thông tin chi tiết của từng đánh giá.
import "./Reviews.scss";

const Reviews = ({ gigId }) => { //Reviews là một functional component nhận một prop là gigId, đại diện cho ID của dịch vụ mà đánh giá đang được hiển thị.

  const queryClient = useQueryClient() //Sử dụng useQuery để lấy danh sách đánh giá:
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => { //Sử dụng useQuery để thực hiện truy vấn dữ liệu từ API để lấy danh sách đánh giá dựa trên gigId.
        return res.data;
      }),
  });

  const mutation = useMutation({ //Sử dụng useMutation để thực hiện thêm mới đánh giá:
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess:()=>{ //onSuccess là một callback được gọi khi mutation thành công. Trong trường hợp này, nó sử dụng queryClient.invalidateQueries để làm mới dữ liệu đánh giá sau khi thêm mới.
      queryClient.invalidateQueries(["reviews"])
    }
  });

  const handleSubmit = (e) => { 
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star }); //Nó lấy giá trị mô tả và số sao từ biểu mẫu và sử dụng mutation.mutate để kích hoạt quá trình thêm mới đánh giá.
  };

  return (
    <div className="reviews">
      <h2>Nhận xét</h2>
      {isLoading
        ? "loading"
        : error
        ? "Có gì đó không ổn"
        : data.map((review) => <Review key={review._id} review={review} />)}
      <div className="add">
        <h3>Thêm bình luận</h3>
        <form action="" className="addForm" onSubmit={handleSubmit}>
          <input type="text" placeholder="Hãy viết cảm nghĩ của bạn" />
          <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>Gửi</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
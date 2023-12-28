import React, { useEffect, useRef, useState } from 'react'; //useEffect, useRef, useState là các hook của React để quản lý side effects, tham chiếu, và trạng thái component.
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from '../../utils/newRequest';
import { useLocation } from 'react-router-dom'; //useLocation là hook từ react-router-dom để lấy thông tin về địa chỉ URL hiện tại.


function Gigs() {

  const [sort, setSort ] = useState("price-asc"); //sort: State để lưu trữ loại sắp xếp hiện tại.
  const [open, setOpen ] = useState(false); //sự kiện bấm mở cái lọc
  const minRef = useRef(); //minRef, maxRef: Refs để lưu trữ giá trị của input min và max.
  const maxRef = useRef();

  const {search} = useLocation(); //Sử dụng useLocation để lấy thông tin từ địa chỉ URL, trong trường hợp này, lấy thông tin từ query parameters.

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}` //Ở đây, search là một thuộc tính của đối tượng location, nó chứa chuỗi query parameters từ địa chỉ URL. Ví dụ, nếu URL là http://example.com/gigs?min=10&max=100, thì search sẽ có giá trị là "?min=10&max=100".
        )
        .then((res) => {
          return res.data;
        }),
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => { //Sử dụng useEffect để thực hiện việc refetch (làm mới) danh sách sản phẩm khi state sort thay đổi
    refetch();
  }, [sort]);

  const apply = ()=>{ //Hàm apply được gọi khi người dùng nhấn nút áp dụng điều kiện tìm kiếm.
    refetch();
  };


  return (
    <div className='gigs'>
      <div className="container">
        <span className="breadcrumbs">BESIGN {">"} Thiết kế đồ họa {">"}</span>
        <h1>Sinh viên nghệ thuật</h1>
        <p>Khám phá tới tận biên giới của nghệ thuật cùng sinh viên</p>
        <div className="menu">
          <div className="left">
            <span>Mức giá</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Tìm kiếm</button>
          </div>
          <div className="right"> 
            <span className="sortBy">Sort By</span> 
            <span className="sortType">
              {sort === "price-asc" && " Giá Thấp đến cao"}
              {sort === "price-desc" && "Giá Cao đến thấp"}
              {sort === "sales" && "Bán chạy nhất"}
            </span>
            <img src="\images\down.png" alt="" onClick={() => setOpen(!open)} />
              {open && (
              <div className="rightMenu">
                <span onClick={() => reSort("price-asc")}>Giá Thấp đến cao</span>
                <span onClick={() => reSort("price-desc")}>Giá Cao đến thấp</span>
                <span onClick={() => reSort("sales")}>Bán chạy nhất</span>
              </div>
              )}
          </div>
        </div>
        <div className="cards"> 
          {isLoading // kiểm tra xem một truy vấn đang trong quá trình thực thi (đang chạy) hay không.
            ? "loading"
            : error
            ? "Something went wrong!"
            : data.map((gig) => <GigCard key={gig._id} item={gig} />)} 
        </div>
      </div>
    </div>
  );
} 

export default Gigs;
import React from 'react';
import { Link } from 'react-router-dom';
import "./CatCard.scss";

const CatCard = ({ item }) => { //Đây là một functional component có tên là CatCard, nhận một prop là item
  const { title, desc, img, cat } = item; //Sử dụng destructuring để trích xuất các thuộc tính title, desc, img, và cat từ prop item.

  return (
    <Link to={`/gigs?cat=${cat}`}>
      <div className='catcard'>
        <img src={img} alt={title} />
        <span className="desc">{desc}</span>
        <span className="title">{title}</span>
      </div>
    </Link>
  );
}

export default CatCard;

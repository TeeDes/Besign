import React from 'react';
import Slider from 'infinite-react-carousel';
import CatCard from '../catCard/CatCard'; //CatCard là một component để hiển thị thông tin của mỗi danh mục.
import "./Slide.scss";

const Slide = ({ slidesToShow, arrowsScroll, cards }) => {
  // Kiểm tra xem cards có tồn tại và có phải là mảng không
  if (!cards || !Array.isArray(cards)) {
    // Trả về một phần tử tùy chọn nếu không có cards
    return <div>No cards available</div>;
  }
 
  //Sử dụng .map để lặp qua mỗi phần tử trong mảng cards và hiển thị mỗi danh mục thông qua component CatCard.
  //Mỗi CatCard nhận một key là card.id và item là thông tin của danh mục tương ứng.
  return (
    <div className='slide'>
      <div className="container">
        <div>
          <p>Hãy chọn xem những danh mục dưới đây</p>
        </div>
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
          {cards.map(card => (
            <CatCard key={card.id} item={card} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Slide;

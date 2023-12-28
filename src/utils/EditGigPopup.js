// EditGigPopup.js
import React, { useState } from "react";
import newRequest from "../../utils/newRequest";

const EditGigPopup = ({ gigId, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    shortDescription: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gửi yêu cầu cập nhật đến server
      await newRequest.put(`/gigs/${gigId}`, formData);

      // Gọi hàm onUpdate để cập nhật dữ liệu mới
      onUpdate();

      // Đóng popup
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm: ", error);
    }
  };

  return (
    <div className="edit-gig-popup">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Tiêu đề:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label htmlFor="description">Mô tả:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label htmlFor="category">Danh mục:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <label htmlFor="shortDescription">Mô tả ngắn:</label>
        <input
          type="text"
          id="shortDescription"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
        />

        <button type="submit">Lưu</button>
      </form>
    </div>
  );
};

export default EditGigPopup;

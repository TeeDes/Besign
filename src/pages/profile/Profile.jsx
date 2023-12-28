import React, { useState } from 'react';
import './Profile.scss';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import getCurrentUser from '../../utils/getCurrentUser';

const Profile = () => {
  const userId = getCurrentUser()?._id; // Kiểm tra xem getCurrentUser() có giá trị không
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => newRequest.get(`/users/${userId}`).then((res) => res.data),
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isChangingAvatar, setIsChangingAvatar] = useState(false); // New state for changing avatar
  const [formData, setFormData] = useState({
    username: data?.username || '',
    desc: data?.desc || '',
    phone: data?.phone || '',
    country: data?.country || '',
  });

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      await saveProfileMutation.mutateAsync(formData);
      setIsEditing(false);
      queryClient.invalidateQueries(['user', userId]);
    } catch (error) {
      console.error('Lỗi khi lưu thông tin cá nhân:', error);
    }
  };

  const handleAvatarChange = () => {
    setIsChangingAvatar(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSaveAvatar = async () => {
    try {
      if (selectedImage) {
        const formData = new FormData();
        formData.append('avatar', selectedImage);

        await newRequest.post(`/users/${userId}/avatar`, formData);

        setIsEditing(false);
        setSelectedImage(null);
        queryClient.invalidateQueries(['user', userId]);
      }
    } catch (error) {
      console.error('Lỗi khi lưu ảnh đại diện:', error);
    }
  };
  
  const saveProfileMutation = useMutation({
    mutationFn: (formData) => newRequest.put(`/users/${userId}`, formData),
  });

  

  return (
    <div className="profile">
      <div className="avatar-column">
        <img
          className="user-avatar"
          src={data?.img || '/images/noavatar.png'}
          alt="Ảnh đại diện của người dùng"
        />
        {!isChangingAvatar && !isEditing && (
          <button onClick={handleAvatarChange}>Thay đổi ảnh đại diện</button>
        )}
        {isChangingAvatar && (
          <div className="change-avatar-form">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {selectedImage && <button onClick={handleSaveAvatar}>Lưu</button>}
          </div>
          
        )}
        <p>Ảnh đại diện</p>
      </div>
      <div className="info-column">
        <table className="user-info-table">
          <tbody>
            <tr>
              <td>Tên:</td>
              <td>{data?.username || 'N/A'}</td>
            </tr>
            <tr>
              <td>Mô tả:</td>
              <td>{data?.desc || 'N/A'}</td>
            </tr>
            <tr>
              <td>Số điện thoại:</td>
              <td>{data?.phone || 'N/A'}</td>
            </tr>
            <tr>
              <td>Ngành:</td>
              <td>{data?.country || 'N/A'}</td>
            </tr>
          </tbody>
        </table>
        {!isEditing && <button onClick={handleEditProfile}>Chỉnh sửa</button>}
        {isEditing && (
          <div className="edit-form">
            <label>
              Tên:
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </label>
            <label>
              Mô tả:
              <textarea
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              />
            </label>
            <label>
              Số điện thoại:
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </label>
            <label>
              Ngành:
              <input
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </label>
            <button onClick={handleSaveProfile}>Lưu</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

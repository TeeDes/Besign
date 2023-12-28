import axios from "axios";

const upload = async (file) => { //Định nghĩa một hàm upload nhận vào một đối số là file (hình ảnh cần tải lên).
  const data = new FormData(); //Tạo một đối tượng FormData, một giao diện trong JavaScript giúp xử lý dữ liệu biểu mẫu.
  data.append("file", file); //Thêm file vào đối tượng FormData với key là "file" và giá trị là file đầu vào.
  data.append("upload_preset", "besign"); //Thêm một trường upload_preset vào FormData. upload_preset là một thiết lập trên Cloudinary xác định cách mà hình ảnh được xử lý sau khi được tải lên.

  try {
    const res = await axios.post( //Sử dụng Axios để thực hiện một yêu cầu HTTP POST đến endpoint của Cloudinary với đối tượng FormData chứa dữ liệu file.
      "https://api.cloudinary.com/v1_1/dniohofxb/image/upload", 
      data);

    const { url } = res.data; //Giải pháp dữ liệu trả về từ Cloudinary, lấy URL của hình ảnh tải lên thành công.
    return url;
  } catch (err) {
    console.log(err);
  }
};

export default upload;
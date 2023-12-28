export const INITIAL_STATE = { //INITIAL_STATE là một object chứa các giá trị khởi tạo cho trạng thái ban đầu của form khi tạo gig mới.
    userId: JSON.parse(localStorage.getItem("currentUser"))?._id, //userId: Lấy giá trị _id từ thông tin người dùng hiện tại được lưu trong localStorage. Nếu không có, giá trị mặc định là undefined.
    title: "",
    cat: "",
    cover: "",
    images: [],
    desc: "",
    shortTitle: "",
    shortDesc: "",
    deliveryTime: 0,
    revisionNumber: 0,
    features: [],
    price: 0,
  };
  
  export const gigReducer = (state, action) => { //gigReducer là một hàm reducer, được sử dụng để cập nhật trạng thái của form dựa trên các hành động được kích hoạt bởi các loại hành động khác nhau (được đặt trong action.type).
    switch (action.type) {
      case "CHANGE_INPUT": //"CHANGE_INPUT": Cập nhật giá trị của một trường dựa trên tên trường (action.payload.name) và giá trị mới (action.payload.value).
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      case "ADD_IMAGES": //"ADD_IMAGES": Cập nhật cover và images dựa trên giá trị từ action.payload.
        return {
          ...state,
          cover: action.payload.cover,
          images: action.payload.images,
        };
      case "ADD_FEATURE": //"ADD_FEATURE": Thêm một đặc điểm mới vào mảng features.
        return {
          ...state,
          features: [...state.features, action.payload],
        };
      case "REMOVE_FEATURE": //"REMOVE_FEATURE": Loại bỏ một đặc điểm khỏi mảng features.
        return {
          ...state,
          features: state.features.filter(
            (feature) => feature !== action.payload
          ),
        };
  
      default:
        return state;
    }
  };
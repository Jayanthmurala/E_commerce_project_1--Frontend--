const endPoints = {
  login: {
    url: "/aip/v1/user/login",
    method: "POST",
  },
  register: {
    url: "/aip/v1/user/register",
    method: "POST",
  },
  forgotPassword: {
    url: "/aip/v1/user/forget-password",
    method: "POST",
  },
  otp: {
    url: "/aip/v1/user/verify-Otp",
    method: "POST",
  },
  allProducts: {
    url: "/aip/v1/product/all-product",
    method: "GET",
  },
  allCategories: {
    url: "/aip/v1/category/all-categories",
    method: "GET",
  },
  allSubCategories: {
    url: "/aip/v1/subcategory/all-subCategory",
    method: "GET",
  },
  imageUrls: {
    url: "/aip/v1/upload/images",
    method: "post",
  },
  addProduct: {
    url: "/aip/v1/product/create-product",
    method: "POST",
  },
  VendorProduct: {
    url: "/aip/v1/product/vendor-product",
    method: "GET",
  },
  logout: {
    url: "/aip/v1/user/logout",
    method: "GET",
  },
  quantityAdd: {
    url: "/aip/v1/cart/add",
    method: "POST",
  },
  quantityRemove: {
    url: "/aip/v1/cart/remove",
    method: "POST",
  },
  refreshToken: {
    url: "/aip/v1/user/refresh-token",
    method: "POST",
  },
};

export default endPoints;

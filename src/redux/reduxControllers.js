import axios from "axios";

// Backend Route
const SERVER_URL = process.env.REACT_APP_BACKEND_URL;

const get_All_dbUsers = async () => {
  const sessionStorageUser = JSON.parse(sessionStorage.getItem("user"));
  const response = await axios.get(`${SERVER_URL}/api/users`, {
    headers: {
      user_id: sessionStorageUser.id,
    },
  });
  return response.data;
};

// Creating A User
const register_user = async (userData) => {
  const response = await axios.post(`${SERVER_URL}/api/users/signup`, userData);

  if (response.data) {
    sessionStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// User login
const login_user = async (userData) => {
  const response = await axios.post(`${SERVER_URL}/api/users/signin`, userData);

  if (response.data) {
    sessionStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// User Logout
const logout_user = () => {
  sessionStorage.removeItem("user");
  window.location.assign("/");
};

// User Update
const updateUser = async (userData) => {
  const sessionStorageUser = JSON.parse(sessionStorage.getItem("user"));

  const response = await axios.patch(
    `${SERVER_URL}/api/users/update`,
    userData,
    {
      headers: {
        user_id: sessionStorageUser.id,
      },
    }
  );

  if (response.data) {
    sessionStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// User Avatar Update
const updateUserAvatar = async (userAVatar) => {
  const sessionStorageUser = JSON.parse(sessionStorage.getItem("user"));

  const response = await axios.patch(
    `${SERVER_URL}/api/users/avatar`,
    userAVatar,
    {
      headers: {
        user_id: sessionStorageUser.id,
      },
    }
  );

  if (response.data) {
    sessionStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// get All the Products In the Database
const fetchAllProducts = async () => {
  const response = await axios.get(`${SERVER_URL}/api/products`);

  return response.data;
};

// Creating A Product
const create_product = async (productData) => {
  const sessionStorageUser = JSON.parse(sessionStorage.getItem("user"));

  const response = await axios.post(
    `${SERVER_URL}/api/products/create`,
    productData,
    {
      headers: {
        user_id: sessionStorageUser.id,
      },
    }
  );
  return response.data;
};

const getAProductById = async (productId) => {
  const response = await axios.get(`${SERVER_URL}/api/products/${productId}`);

  return response.data;
};

// Updating A Product
const update_product = async (updateProductForm) => {
  const sessionStorageUser = JSON.parse(sessionStorage.getItem("user"));
  const response = await axios.patch(
    `${SERVER_URL}/api/products/${updateProductForm.productId}`,
    updateProductForm.productData,
    {
      headers: {
        user_id: sessionStorageUser.id,
      },
    }
  );

  return response.data;
};

// Delete A Product And Its images from The Database
const delete_product = async (productId) => {
  const sessionStorageUser = JSON.parse(sessionStorage.getItem("user"));

  const response = await axios.delete(
    `${SERVER_URL}/api/products/${productId}`,
    {
      headers: {
        user_id: sessionStorageUser.id,
      },
    }
  );

  return response.data;
};

// Review A Product
const review_product = async (reviewInfo) => {
  const sessionStorageUser = JSON.parse(sessionStorage.getItem("user"));

  const response = await axios.patch(
    `${SERVER_URL}/api/products/${reviewInfo.productId}/review`,
    reviewInfo.body,
    {
      headers: {
        user_id: sessionStorageUser.id,
      },
    }
  );

  return response.data;
};

// Delete Your Self from the Database
const delete_user = async (userId) => {
  const sessionStorageUser = JSON.parse(sessionStorage.getItem("user"));

  const response = await axios.delete(`${SERVER_URL}/api/users/${userId}`, {
    headers: {
      user_id: sessionStorageUser.id,
    },
  });

  return response.data;
};

// Delete A User As an Admin from the Database
const admin_delete_user = async (userId) => {
  const sessionStorageUser = JSON.parse(sessionStorage.getItem("user"));

  const response = await axios.delete(
    `${SERVER_URL}/api/users/admin/${userId}`,
    {
      headers: {
        user_id: sessionStorageUser.id,
      },
    }
  );

  return response.data;
};

const reduxContollers = {
  register_user,
  login_user,
  logout_user,
  delete_user,
  admin_delete_user,
  updateUser,
  updateUserAvatar,
  create_product,
  fetchAllProducts,
  getAProductById,
  get_All_dbUsers,
  review_product,
  delete_product,
  update_product,
};
export default reduxContollers;

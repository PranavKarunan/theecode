import axios from "axios";
export const addProduct = async (values) => {
  const token = values.token
  try {
    const { data } = await axios.post(
      "http://localhost:5000/product/createProduct",
      // `${process.env.REACT_APP_BACKEND_URL}/product/createProudct`,
      {
        values,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};

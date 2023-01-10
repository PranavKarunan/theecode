import React, { useState } from "react";
import LoginImg from "../Assets/login.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import  userReducer, { login }  from "../redux/reducer/userReducer";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const navigate = useNavigate()
  const initialValues = {
    email: "",
    password: "",
  };

const dispatch = useDispatch()
  const [formData, setFormdata] = useState(initialValues);
const userData = useSelector(state=>state.SAVE_USER_DETAILS)

console.log("userData" ,userData)
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be 6 characters or more")
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      setFormdata(values);
      submitData();
      
    },
  });

  const submitData = async () => {
    console.log(formData)
    const res = await axios.post("http://localhost:5000/auth/login", formData);
    const userId = res.data.details._id
    console.log(userId)
    if(res.statusText === "OK"){
      navigate("/home")
      dispatch(login({
        userId:userId
      }))
      
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img src={LoginImg} className="w-full h-full object-cover" />
      </div>
      <div className="bg-gray-100 flex flex-col justify-center">
        <form
          className="max-w-[400px] w-full mx-auto bg-white p-4"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="text-xl font-bold text-center py-6 ">Product management</h1>
          <div className="flex flex-col py-2">
            <label>UserName</label>
            <input
              className={`border p-2 ${
                formik.errors.email && "border-red-700"
              }`}
              name="email"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-700">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input
              className={`border p-2 ${
                formik.errors.password && "border-red-700"
              }`}
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-700">{formik.errors.password}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full my-2 py-2 border bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Sign In
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
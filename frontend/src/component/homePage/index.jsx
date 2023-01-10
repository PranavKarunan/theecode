import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../functions/user.js";
import "./style.css";

export default function Home() {
  const userId = useSelector((state) => state.user.user.userId);
  const token = useSelector((state) => state.user.user.token);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    addProduct({ name, category, userId,token });

  }

  return (
    <div>
      <div className="header">
        <h1>welcome user</h1>
        <button onClick={() => setShow(true)}>Add Product</button>
      </div>

      {show && (
        <div className="InputForm">
          <div className="Products_form ">
            <form className="form" onSubmit={handleSubmit}>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={"Product Name"}
              />
              <br />
              <input
                type="text"
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder={"Category"}
              />
              <br />
              <input
                name="userId"
                type="text"
                id="userId"
                value={userId}
              />
              <br />
              <button className="button_submit" type="submit">
                Add Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

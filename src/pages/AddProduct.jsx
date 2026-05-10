import { useState } from "react";

import { db } from "../firebase/config";

import { collection, addDoc } from "firebase/firestore";

function AddProduct() {

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    await addDoc(collection(db, "products"), {
      name,
      price,
      category,
      image
    });

    alert("Product Added Successfully");
  };

  return (

    <div className="container mt-5">

      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          className="form-control my-3"
          type="text"
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="form-control my-3"
          type="text"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="form-control my-3"
          type="text"
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="form-control my-3"
          type="text"
          placeholder="Image URL"
          onChange={(e) => setImage(e.target.value)}
        />

        <button className="btn btn-dark">
          Add Product
        </button>

      </form>
    </div>
  );
}

export default AddProduct;
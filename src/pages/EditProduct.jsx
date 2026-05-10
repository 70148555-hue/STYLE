import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { db } from "../firebase/config";

import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

function EditProduct() {

  // Get dynamic ID from URL
  const { id } = useParams();

  // Navigate after update
  const navigate = useNavigate();

  // States
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  // Fetch existing product data
  useEffect(() => {

    const fetchProduct = async () => {

      const docRef = doc(db, "products", id);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        const data = docSnap.data();

        setName(data.name);
        setPrice(data.price);
        setCategory(data.category);
        setImage(data.image);
      }
    };

    fetchProduct();

  }, [id]);

  // Update product
  const handleUpdate = async (e) => {

    e.preventDefault();

    const docRef = doc(db, "products", id);

    await updateDoc(docRef, {
      name,
      price,
      category,
      image
    });

    alert("Product Updated Successfully");

    navigate("/products");
  };

  return (

    <div className="container mt-5">

      <h2>Edit Product</h2>

      <form onSubmit={handleUpdate}>

        {/* Product Name */}

        <input
          className="form-control my-3"
          type="text"
          value={name}
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
        />

        {/* Price */}

        <input
          className="form-control my-3"
          type="text"
          value={price}
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* Category */}

        <input
          className="form-control my-3"
          type="text"
          value={category}
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
        />

        {/* Image URL */}

        <input
          className="form-control my-3"
          type="text"
          value={image}
          placeholder="Image URL"
          onChange={(e) => setImage(e.target.value)}
        />

        {/* Update Button */}

        <button className="btn btn-warning">
          Update Product
        </button>

      </form>

    </div>
  );
}

export default EditProduct;
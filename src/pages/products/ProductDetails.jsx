import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, "products", id);

      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        setProduct({
          id: productSnap.id,
          ...productSnap.data(),
        });
      } else {
        console.log("Product not found");
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <img
        src={product.image}
        alt={product.name}
        width="300"
      />

      <h1>{product.name}</h1>

      <h2>Rs {product.price}</h2>

      <p>{product.description}</p>

      <p>
        <b>Category:</b> {product.category}
      </p>
    </div>
  );
}
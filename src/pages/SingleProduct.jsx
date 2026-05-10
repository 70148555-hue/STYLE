import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import { db } from "../firebase/config";

import { doc, getDoc } from "firebase/firestore";

function SingleProduct() {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {

    const fetchSingleProduct = async () => {

      const docRef = doc(db, "products", id);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        setProduct(docSnap.data());
      }
    };

    fetchSingleProduct();

  }, [id]);

  return (

    <div className="container mt-5">

      {
        product && (

          <div className="card p-5">

            <img
              src={product.image}
              height="400"
            />

            <h1>{product.name}</h1>

            <h3>{product.price}</h3>

            <p>{product.category}</p>

          </div>
        )
      }

    </div>
  );
}

export default SingleProduct;
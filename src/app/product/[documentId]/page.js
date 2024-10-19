"use client";
import { addToCart } from "@/libs/fetaures/cartSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const SingleProductPage = ({ params }) => {
  const dispatch = useDispatch();
  const { documentId } = params;
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:1337/api/products/${documentId}?populate=*`)
      .then(response => setProduct(response.data.data))
      .catch(error => console.error("Error fetching product:", error));
  }, [documentId]);

  if (!product) return <div>Loading...</div>;

  const handleImageClick = (imageUrl) => setSelectedImage(imageUrl);

  const handleBuyNow = () => {
    dispatch(addToCart(product));
    window.location.href = "/checkout";
  };

  return (
    <div className="flex p-15">
      <div className="flex flex-col space-y-4">
        {product.product_multiple_image.map((img) => (
          <img
            key={img.id}
            src={img.url}
            alt={product.products_name}
            className="w-20 h-20 cursor-pointer border p-1"
            onClick={() => handleImageClick(img.url)}
          />
        ))}
      </div>
      <div className="flex flex-col w-1/2 space-y-4">
        <img
          className="w-full h-auto"
          src={selectedImage || product.product_main_image.url}
          alt={product.products_name}
        />
      </div>
      <div className="w-1/2 flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">{product.products_name}</h1>
        <p>{product.product_description}</p>
        <div>
          <p className="text-lg">
            Price: ₹{product.selling_price}{" "}
            <span className="line-through">₹{product.original_price}</span>
          </p>
          <p className={`text-lg ${product.stock_quantity > 0 ? "text-green-500" : "text-red-500"}`}>
            {product.stock_quantity > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;

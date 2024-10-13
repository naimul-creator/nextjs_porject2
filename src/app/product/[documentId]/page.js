"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const SingleProductPage = ({ params }) => {
  const { documentId } = params;
  const [product, setProduct] = useState(null); // State for product data
  const [selectedImage, setSelectedImage] = useState(""); // State for selected image

  useEffect(() => {
    axios
      .get(`http://localhost:1337/api/products/${documentId}?populate=*`)
      .then((response) => setProduct(response.data.data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [documentId]);

  if (!product) {
    return <div>Loading...</div>; // Loading state
  }

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="flex p-15 space-x-6">
      {/* Thumbnail Images */}
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
      {/* Left Section: Images */}
      <div className="flex flex-col w-1/2 space-y-4">
        {/* Main Image */}
        <div className="border p-2">
          <img
            className="w-full h-auto"
            src={selectedImage || product.product_main_image.url}
            alt={product.products_name}
          />
        </div>
      </div>

      {/* Right Section: Product Information */}
      <div className="w-1/2 flex flex-col space-y-4">
        {/* Product Title and Description */}
        <h1 className="text-3xl font-bold">{product.products_name}</h1>
        <p>{product.product_description}</p>

        {/* Price and Stock Information */}
        <div>
          <p className="text-lg">
            Price: ₹{product.selling_price}{" "}
            <span className="line-through">₹{product.original_price}</span>
          </p>
          {product.stock_quantity > 0 ? (
            <p className="text-lg text-green-500">In Stock</p>
          ) : (
            <p className="text-lg text-red-500">Out of Stock</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded">
            Go to Cart
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;

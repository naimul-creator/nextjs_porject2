"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetching data using Axios
    axios
      .get("http://localhost:1337/api/products?populate=*")
      .then((response) => {
        setProducts(response.data.data); // Assuming the data is in `response.data.data`
      })
      .catch((error) => {
        console.error("Error fetching the products:", error);
      });
  }, []);

  return (
    <div className="p-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.documentId}
            className="bg-white rounded-lg shadow-lg p-5 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          >
            <Link href={`/product/${product.documentId}`}>
              
              <div className="relative h-64 mb-4">
                <Image
                  src={product.product_main_image.url}
                  alt={product.products_name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg h-10 w-10"
                />
              </div>
            </Link>

            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              {product.products_name}
            </h2>
            <p className="text-gray-600 mb-4">
              {product.product_description.slice(0, 100)}...
            </p>

            <div className="flex items-center justify-between mb-4">
              <p className="text-xl font-bold text-green-500">
                ${product.selling_price}
              </p>
              <p className="text-gray-400 line-through">
                ${product.orginal_price}
              </p>
            </div>

            <div className="flex justify-between items-center text-gray-500">
              <span>Brand: {product.prodcut_brand}</span>
              <span>Rating: {product.product_rating} ★</span>
            </div>
          </div>
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};

export default ProductList;

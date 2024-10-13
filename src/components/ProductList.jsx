"use client"; 

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/products?populate=*")
      .then((response) => setProducts(response.data.data))
      .catch((error) => console.error("Error fetching the products:", error));
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.length > 0 ? (
        products.map((product) => (
          <div className="bg-white rounded-lg p-4 shadow" key={product.documentId}>
            <Link href={`/product/${product.documentId}`}>
              <div className="relative w-full h-56">
                <Image
                  src={product.product_main_image.url}
                  alt={product.products_name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
            </Link>
            <h2 className="text-lg font-semibold mt-2">{product.products_name}</h2>
            <p className="text-sm text-gray-500 mb-2">
              {product.product_description.slice(0, 60)}...
            </p>
            <div className="flex justify-between text-sm font-medium">
              <span className="text-green-500">${product.selling_price}</span>
              <span className="line-through text-gray-400">${product.orginal_price}</span>
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

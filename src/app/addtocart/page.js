"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa"; 
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "@/libs/fetaures/cartSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [quantity, setQuantity] = useState({});

  const handleQuantityChange = (id, increment) => {
    setQuantity((prev) => {
      const newQty = Math.min(Math.max((prev[id] || 1) + increment, 1), 5); // পরিমাণ ১ থেকে ৫ এর মধ্যে
      return { ...prev, [id]: newQty };
    });
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id)); // প্রোডাক্ট রিমুভ করা হচ্ছে
  };

  return (
    <div className="p-20 bg-slate-500 text-white min-h-screen flex">
      <div className="flex-grow">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        {items.length === 0 ? (
          <p className="text-center text-xl text-gray-300">No products available</p>
        ) : (
          <table className="w-full table-auto border-separate border-spacing-y-4">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {items.map((product) => (
                <tr key={product.id} className="border-b border-orange-600">
                  <td className="py-4 flex items-center space-x-4">
                    <Image
                      src={product.product_main_image.url}
                      alt={product.products_name}
                      width={60}
                      height={30}
                      className="object-cover rounded-md"
                    />
                    <span>{product.products_name}</span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center space-x-3">
                      <button
                        className="bg-gray-700 text-white px-2 py-1 rounded"
                        onClick={() => handleQuantityChange(product.id, -1)}
                      >
                        -
                      </button>
                      <span>{quantity[product.id] || 1}</span>
                      <button
                        className="bg-gray-700 text-white px-2 py-1 rounded"
                        onClick={() => handleQuantityChange(product.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4">
                    ${product.selling_price * (quantity[product.id] || 1)}
                  </td>
                  <td className="py-4">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemove(product.id)}
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Cart;

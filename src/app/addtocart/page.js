"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa"; 
import { useSelector } from "react-redux";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const [quantity, setQuantity] = useState({});

  const handleQuantityChange = (id, increment) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [id]: Math.max((prevQuantity[id] || 1) + increment, 1),
    }));
  };

  return (
    <div className="p-20 bg-slate-500 text-white min-h-screen flex">
      {/* Shopping Cart Section */}
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
                      src={product.image}
                      alt={product.products_name}
                      width={60}
                      height={30}
                      className="object-cover rounded-md"
                    />
                    <span className="text-blue-400 hover:underline cursor-pointer">
                      {product.products_name}
                    </span>
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
                  <td className="py-4">${product.selling_price}</td>
                  <td className="py-4">
                    <button className="text-red-500 hover:text-red-700">
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Order Summary Section */}
      <div className="mt-10 bg-gray-800 p-6 rounded-lg w-1/4 ml-10">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Original Price</span>
            <span>$6,592.00</span>
          </div>
          <div className="flex justify-between text-green-400">
            <span>Savings</span>
            <span>-$299.00</span>
          </div>
          <div className="flex justify-between">
            <span>Store Pickup</span>
            <span>$99.00</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>$799.00</span>
          </div>
          <div className="border-t border-gray-700 my-4"></div>
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>$7,191.00</span>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          <button className="flex-grow bg-gray-600 text-white py-1 px-2 rounded hover:bg-gray-500">
            Continue Shopping
          </button>
          <button className="flex-grow bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-500">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

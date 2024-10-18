"use client";
import React from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "@/libs/fetaures/cartSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const deliveryCharges = 68.0;

  const totalSellingPrice  = items.reduce(
    (total, product) => total + product.selling_price * product.quantity,
    0
  );

  const totalOriginalPrice = items.reduce(
    (total, product) => total + product.orginal_price * product.quantity,
    0
  );




  const discountAmount = (totalOriginalPrice - totalSellingPrice).toFixed(2);
  const finalAmount = (totalSellingPrice + deliveryCharges).toFixed(2);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    window.location.href = "/checkout";
  };

  return (
    <div className="p-20 bg-slate-500 text-white min-h-screen flex">
      <div className="flex-grow">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        {items.length === 0 ? (
          <p className="text-center text-xl text-gray-300">
            No products available
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {items.map((product) => (
              <div
                key={product.id}
                className="border-b border-orange-600 flex justify-between py-4"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={product.product_main_image.url}
                    alt={product.products_name}
                    width={60}
                    height={30}
                    className="object-cover rounded-md"
                  />
                  <span>{product.products_name}</span>
                </div>
                <div className="flex items-center">
                  <button
                    className="bg-blue-500 text-white p-2 mx-1"
                    onClick={() => dispatch(incrementQuantity(product.id))}
                  >
                    +
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    className="bg-red-500 text-white p-2 mx-1"
                    onClick={() => dispatch(decrementQuantity(product.id))}
                  >
                    -
                  </button>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="">
                    ৳{(product.selling_price * product.quantity).toFixed(2)}
                  </span>
                  <span className="line-through">
                    ৳{(product.orginal_price * product.quantity).toFixed(2)}
                  </span>
                </div>

                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemove(product.id)}
                >
                  <FaTrash size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-1/3 ml-8">
        <h2 className="text-2xl font-bold mb-4">Price Details</h2>
        <div className="bg-gray-700 p-5 rounded-lg border border-white shadow-lg">
          <table className="w-full table-auto">
            <tbody>
              <tr className="border-b border-gray-600">
                <td className="py-2">
                  Price ({`${items.length} item${items.length > 1 ? "s" : ""}`}
                  ):
                </td>
                <td className="py-2 text-right">৳{totalSellingPrice.toFixed(2)}</td>
              </tr>
              <tr className="border-b border-gray-600">
                <td className="py-2">Delivery Charges:</td>
                <td className="py-2 text-right">
                  ৳{deliveryCharges.toFixed(2)}
                </td>
              </tr>
              <tr className="border-b border-gray-600">
                <td className="py-2">Discount:</td>
                <td className="py-2 text-right">৳{discountAmount}</td>
              </tr>
              <tr className="font-bold">
                <td className="py-2">Total Amount:</td>
                <td className="py-2 text-right">৳{finalAmount}</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 text-green-300">
            You will save ৳{discountAmount} on this order!
          </p>

          <button
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg text-lg font-bold hover:bg-green-700 transition"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

"use client";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

const CheckoutPage = () => {
  const checkoutItems = useSelector((state) => state.cart.items);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalSellingPrice = checkoutItems.reduce(
      (total, item) => total + item.selling_price * item.quantity,
      0
    );

    const deliveryCharges = 68;
    const finalAmount = totalSellingPrice + deliveryCharges;

    // অর্ডার ডেটা তৈরির জন্য
    const orderData = {
      data: {
        order_id: checkoutItems.map((product) => product.documentId), // অর্ডারের আইডি
        total_price: finalAmount, // মোট দাম
        product_image: checkoutItems.map((item) => item.product_main_image.url), // পণ্যের ছবি
        products_name: checkoutItems.map((item) => item.products_name), // পণ্যের নাম
        product_price: checkoutItems.map((item) => item.selling_price), // পণ্যের দাম
        product_quantity: checkoutItems.map((item) => item.quantity), // পণ্যের পরিমাণ
      },
    };

    try {
      // Strapi এ axios POST রিকোয়েস্ট পাঠানো হচ্ছে
      const response = await axios.post(
        "http://localhost:1337/api/products?populate=*",
        orderData
      );

      console.log("Order placed successfully:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const totalSellingPrice = checkoutItems.reduce(
    (total, item) => total + item.selling_price * item.quantity,
    0
  );

  const totalOriginalPrice = checkoutItems.reduce(
    (total, item) => total + item.original_price * item.quantity,
    0
  );

  const deliveryCharges = 68;
  const discountAmount = totalOriginalPrice - totalSellingPrice;
  const finalAmount = totalSellingPrice + deliveryCharges;

  return (
    <div className="container mx-auto p-4 flex">
      <div className="w-2/3 pr-4">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        {checkoutItems.map((citem) => (
          <div
            key={citem.documentId}
            className="flex items-center space-x-4 my-4 border-b pb-4"
          >
            <Image
              src={citem.product_main_image.url}
              alt={citem.products_name}
              width={100}
              height={100}
              className="rounded"
            />
            <div>
              <h3 className="text-lg font-semibold">{citem.products_name}</h3>
              <p>Price: ৳{citem.selling_price}</p>
              <p>Quantity: {citem.quantity}</p>
              <p>Total: ৳{citem.selling_price * citem.quantity}</p>
            </div>
          </div>
        ))}
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded"
          >
            Place Order
          </button>
        </form>
      </div>

      <div className="w-1/3 ml-8">
        <h2 className="text-2xl font-bold mb-4">Price Details</h2>
        <div className="bg-gray-700 p-5 rounded-lg border border-white shadow-lg">
          <table className="w-full table-auto">
            <tbody>
              <tr className="border-b border-gray-600">
                <td className="py-2">
                  Price (
                  {`${checkoutItems.length} item${
                    checkoutItems.length > 1 ? "s" : ""
                  }`}
                  ) :
                </td>
                <td className="py-2 text-right">
                  ৳{totalSellingPrice.toFixed(2)}
                </td>
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
                <td className="py-2 text-right">৳{finalAmount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 text-green-300">
            You will save ৳{discountAmount} on this order!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

 "use client"; // প্রয়োজনে

import { useSelector } from "react-redux";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";

const CheckoutPage = () => {
  const checkoutItems = useSelector((state) => state.cart.items);

  // ইনপুট স্টেট তৈরি করা
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userNumber, setUserNumber] = useState("");

  const totalSellingPrice = checkoutItems.reduce(
    (total, product) => total + product.selling_price * product.quantity,
    0
  );

  const totalOriginalPrice = checkoutItems.reduce(
    (total, product) => total + product.original_price * product.quantity,
    0
  );

  const discountAmount = (totalOriginalPrice - totalSellingPrice)
  const deliveryCharges = 68;
  const finalAmount = totalSellingPrice + deliveryCharges;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // অর্ডার ডেটা তৈরির জন্য
    const orderData = {
      data: {
        user_name: userName,
        user_email: userEmail,
        user_address: userAddress,
        user_number: userNumber,
        total_or_price: totalOriginalPrice, // এখানে যোগ করুন
        total_se_price: totalSellingPrice, // এখানে যোগ করুন
        product_discount: discountAmount, // এখানে যোগ করুন (সংখ্যা হিসেবে)
        order_items: checkoutItems.map((item) => ({
          product_id: item.documentId,
          product_name: item.products_name,
          product_quantity: item.quantity,
          product_image: item.product_main_image.url,
        })),
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:1337/api/place-orders?populate=*",
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Order placed successfully:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 flex">
      <div className="w-2/3 pr-4">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        {checkoutItems.map((item) => (
          <div
            key={item.documentId}
            className="flex items-center space-x-4 my-4 border-b pb-4"
          >
            <Image
              src={item.product_main_image.url}
              alt={item.products_name}
              width={100}
              height={100}
              className="rounded"
            />
            <div>
              <h3 className="text-lg font-semibold">{item.products_name}</h3>
              <p>Price: ৳{item.selling_price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: ৳{(item.selling_price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}

        {/* ফর্ম */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="text-orange-500 w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="text-orange-500 w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="Your Address"
            value={userAddress}
            onChange={(e) => setUserAddress(e.target.value)}
            className="text-orange-500 w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="number"
            placeholder="Your Phone Number"
            value={userNumber}
            onChange={(e) => setUserNumber(e.target.value)}
            className="text-orange-500 w-full p-2 border border-gray-300 rounded"
            required
          />
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
                  {`${checkoutItems.length} item${checkoutItems.length > 1 ? "s" : ""}`}
                  ) :
                </td>
                <td className="py-2 text-right">৳{totalSellingPrice.toFixed(2)}</td>
              </tr>
              <tr className="border-b border-gray-600">
                <td className="py-2">Delivery Charges:</td>
                <td className="py-2 text-right">৳{deliveryCharges.toFixed(2)}</td>
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

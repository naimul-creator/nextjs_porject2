"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
      {/* Shipping Address Section Start */}
      <div className="w-1/2 p-4">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="border rounded-xl shadow-lg p-4 mb-6 bg-white">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="flex items-center gap-4 mt-4">
            <Image
              src="https://res.cloudinary.com/nextjs-ecommarce/image/upload/v1727261440/55eaeef0_5325_4fd1_9a7a_9cb993d07d5a_4a4b051fc4.webp"
              alt="Product Image"
              width={100}
              height={100}
              className="rounded-xl"
            />
            <div>
              <p className="font-bold">Huawei Mate 40</p>
              <p className="text-gray-500">Fast charging cable</p>
              <p className="font-bold">Price: ৳2000</p>
              <p className="font-bold">Quantity: 3</p>
            </div>
          </div>
        </div>
        <div className="border rounded-xl shadow-lg p-4 mb-6 bg-white">
          <h2 className="text-lg font-semibold">Shipping Address</h2>
          <form className="flex flex-col gap-4 mt-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </form>
        </div>
      </div>
      {/* Shipping Address Section End */}

      {/* Order Summary Section Start */}
      <div className="w-1/2 p-4">
        <div className="border rounded-xl shadow-lg p-4 mb-6 bg-white">
          <div className="flex justify-between items-center">
            <p className="font-bold">Items Total:</p>
            <p className="font-bold text-lg">৳6000</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-bold">Discount:</p>
            <p className="font-bold text-lg">৳50</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="font-bold">Delivery Fee:</p>
            <p className="font-bold text-lg">৳145</p>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <p className="font-bold">Tax:</p>
            <p className="font-bold text-lg">৳0</p>
          </div>
          <div className="border-t mt-2 pt-2 flex justify-between items-center">
            <p className="font-bold">Total:</p>
            <p className="font-bold text-lg">৳6145</p>
          </div>
        </div>

        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg mt-4 w-full">
          Place Order (Cash on Delivery)
        </button>
      </div>
      {/* Order Summary Section End */}
    </div>
  );
}

"use client";
import React, { useState } from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Header() {
  const [dropdown, setDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const items = useSelector((state) => state.cart.items);

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          PeakMart
        </Link>

        {/* Search Bar */}
        <div className="relative flex-1 mx-4 hidden md:block">
          <input
            type="text"
            placeholder="Search for products..."
            className="px-4 py-2 rounded-lg w-full text-black"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <div className="relative hidden md:block">
            <button
              onClick={() => setDropdown(!dropdown)}
              className="flex items-center space-x-2"
            >
              <span>Categories</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {dropdown && (
              <div className="absolute top-10 left-0 bg-white text-black rounded-lg shadow-lg">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-200">Electronics</li>
                  <li className="px-4 py-2 hover:bg-gray-200">Fashion</li>
                  <li className="px-4 py-2 hover:bg-gray-200">Home & Garden</li>
                </ul>
              </div>
            )}
          </div>

          {/* Cart and Account Icons */}
          <Link href="/addtocart" className="flex items-center">
            <FaShoppingCart className="text-xl" />
            <span className="ml-2">{items.length}</span>
          </Link>

          <Link href="/account" className="flex items-center">
            <FaUser className="text-xl" />
            {/* আপনার ইউজারের তথ্য এখানে দেখাতে পারেন */}
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav
        className={`bg-gray-700 py-2 ${menuOpen ? "block" : "hidden"} md:block`}
      >
        <div className="container mx-auto flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <Link href="/deals" className="hover:text-red-500">
            Deals
          </Link>
          <Link href="/new-arrivals" className="hover:text-red-500">
            New Arrivals
          </Link>
          <Link href="/about" className="hover:text-red-500">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-red-500">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
}

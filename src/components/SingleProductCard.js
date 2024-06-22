import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ProductDetails } from "../Pages/ProductDetails";
import axios from "axios";
import { useAuth } from "../Providers/AuthProvider";

export const SingleProductCard = (product) => {
  console.log(product);
  const {
    setWishListItems,
    setWishListCount,
    addToCart,
    fetchCartItems,
    fetchWishList,
    deleteWishListItems,
  } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="relative w-full md:w-[300px] flex max-h-full flex-col m-1 shadow-lg rounded-[20px] ">
        <img
          className="cursor-pointer rounded-t-lg w-[450px] hover:opacity-60"
          onClick={() => {
            navigate(
              `/wishlist/productdetails/${product.product.products?._id}`
            );
          }}
          src={product.product.products?.displayImage}
        />
        <p className="absolute bg-slate-400 top-[0px] left-[0px] bg-grey py-[2px] px-[6px] rounded-br-lg rounded-tl-lg">
          PLUS_SIZE
        </p>
        <button
          onClick={() => {
            deleteWishListItems(product.product.products._id);
            fetchCartItems();
          }}
          className="w-[30px] m-1 h-[30px] absolute top-[0px] right-[0px] border  bg-grey rounded-full flex justify-center items-center hover:bg-white "
        >
          X
        </button>
        <div className="absolute flex bottom-[200px]">
          <StarIcon color="success"></StarIcon>
          <div className="text-slate-400">
            {product.product.products?.ratings?.toFixed(2)}
          </div>
        </div>
        <p>Bewakoof®</p>
        <div className="h-[60px]">
          <p>{product.product.products?.name}</p>
        </div>

        <p>
          {" "}
          <CurrencyRupeeIcon style={{ fontSize: "20px" }} />{" "}
          {product.product.products?.price}
        </p>

        <button
          onClick={() => {
            addToCart(product.product.products._id);
            deleteWishListItems(product.product.products._id);
            fetchCartItems();
          }}
          className="border rounded-md mx-1 bg-[#42a2a2] text-white my-1 p-1"
        >
          Move To Bag
        </button>
      </div>
    </>
  );
};

{
  /*

*/
}

import React, { useEffect } from "react";
import { useAuth } from "../Providers/AuthProvider";
import axios from "axios";
import { SingleProductCard } from "../components/SingleProductCard";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useNavigate } from "react-router-dom";

export const WishList = () => {
  const navigate = useNavigate();
  const { wishlistItems, fetchWishList, wishListCount } = useAuth();

  useEffect(() => {
    fetchWishList();
  }, []);

  const deleteAllWishListItems = async () => {
    try {
      const response = await axios.delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/`,
        {
          headers: {
            projectID: "gar9pityowqx",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);

      if (response.status === "success" || response.status === 200) {
        fetchWishList();
        alert(response.data.message);
      }
    } catch (err) {}
  };

  return (
    <div className="mt-20">
      <div
        className={`flex justify-between ${
          wishListCount ? "block" : "hidden"
        } items-center bg-gray-200 px-4 py-2 rounded-lg`}
      >
        <h1 className="text-lg font-bold">
          {localStorage.getItem("token")
            ? wishListCount
              ? `Wish List Count: ${wishListCount}`
              : "Your Wishlist is Empty"
            : "Please Login to View Your Wishlist"}
        </h1>
        {wishListCount ? (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600"
            onClick={deleteAllWishListItems}
          >
            Clear Wishlist
          </button>
        ) : null}
      </div>

      {wishListCount ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {wishlistItems.map((product) => (
            <SingleProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center ">
          <img
            className="w-[30%]"
            src="https://www.unboxindustry.com/assets/images/wishlistEmpty.png"
            alt="Empty Wishlist"
          />
          <h2 className="text-2xl font-bold my-4 text-gray-800">
            No Products Found
          </h2>
          <p className="text-gray-600 mb-4">
            Oops! It seems there are no products in your wishlist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
          >
            <ShoppingBagOutlinedIcon className="mr-2" />
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

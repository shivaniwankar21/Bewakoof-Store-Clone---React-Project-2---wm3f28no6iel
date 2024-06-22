import React from "react";
import { useAuth } from "../Providers/AuthProvider";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export const PaymentProcess = () => {
  const navigate = useNavigate();
  const {
    cartItemList,
    totalAmmount,
    addToWishList,
    deleteCartItem,
    fetchCartItems,
  } = useAuth();
  const userDetails = JSON.parse(localStorage.getItem("userAddressDetails"));
  console.log(userDetails);

  return (
    <div className=" mt-[6rem] container mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border text-slate-600  rounded-md p-4">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
            <button
              className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => navigate("/address")}
            >
              Update Address
            </button>
          </div>
          <hr />

          <h3>{userDetails.area}</h3>
          <h3>{userDetails.landmark}</h3>
          <h3>{userDetails.city}</h3>
          <h3>{userDetails.state}</h3>
          <h3>{userDetails.country}</h3>
          <h3>{userDetails.addressType}</h3>
          <h2>Zip code : {userDetails.zipCode}</h2>
        </div>
        <div className="border  text-slate-600 rounded-md p-4">
          <h2 className="text-xl font-semibold mb-4">Contact Info</h2>
          <h1>{userDetails.name}</h1>
          <h2>Mobile : +91-{userDetails.phone}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="flex flex-col gap-4">
          {cartItemList &&
            cartItemList.map((product) => (
              <div key={product.product._id} className="border rounded-md">
                <div className="flex bg-gray-100 p-4 justify-between">
                  <div>
                    <p className="text-2xl mb-3">{product.product.name}</p>
                    <p className="mb-3 text-3xl">
                      <CurrencyRupeeIcon style={{ fontSize: "20px" }} />{" "}
                      {product.product.price}{" "}
                      <span className="text-sm line-through">
                        {product.product.price * 2}
                      </span>
                    </p>
                    <div className="text-green flex gap-1">
                      <h1> You saved</h1>
                      <span className="font-bold text-xl">
                        <CurrencyRupeeIcon style={{ fontSize: "20px" }} />
                        {product.product.price * 1.75 - product.product.price}
                      </span>
                    </div>
                    <div className="m-1 flex gap-2">
                      <div className="border rounded-md p-1 flex justify-center items-center">
                        <label>SIZE :</label>
                        {product.size}
                      </div>

                      <div className="border rounded-md p-1 flex justify-center items-center">
                        <label>Quantity :</label>
                        {product.quantity}
                      </div>
                    </div>
                  </div>
                  <div>
                    <img
                      className="w-[150px] rounded-lg"
                      src={product.product.displayImage}
                      alt={product.product.name}
                    />
                  </div>
                </div>

                <div className="bg-gray-200 flex justify-between p-4">
                  <Button
                    className="text-white bg-[#42a2a2] border px-4 py-1 rounded-md"
                    onClick={() => {
                      deleteCartItem(product.product._id);
                      fetchCartItems();
                    }}
                    variant="outlined"
                    color="inherit"
                    startIcon={<DeleteForeverOutlinedIcon />}
                  >
                    REMOVE
                  </Button>
                  <Button
                    className="text-white bg-[#42a2a2] border px-4 py-1 rounded-md"
                    onClick={() => {
                      addToWishList(product.product._id);
                      deleteCartItem(product.product._id);
                      fetchCartItems();
                    }}
                    variant="outlined"
                    color="inherit"
                    startIcon={<FavoriteBorderIcon />}
                  >
                    MOVE TO WISHLIST
                  </Button>
                </div>
              </div>
            ))}
        </div>

        <div className="border rounded-md p-4">
          <h2 className="text-xl font-semibold mb-4">Price Summary</h2>
          <div className="p-2 bg-gray-200 border-b-2">
            <div className="flex justify-between mb-4">
              <p>Total MRP (Incl. of taxes)</p>
              <p>₹{totalAmmount}</p>
            </div>
            <div className="flex justify-between mb-4">
              <p>Delivery Fee</p>
              <p
                className={`text-${
                  totalAmmount > 2000 ? "green" : "metal"
                } text-xl`}
              >
                {totalAmmount > 2000 ? "free" : "₹49"}
              </p>
            </div>
            <div className="flex justify-between mb-4">
              <p>Bag Discount</p>
              <p>
                ₹
                {totalAmmount -
                  cartItemList.reduce(
                    (totalDiscount, item) =>
                      totalDiscount + item.product.price * 0.75,
                    0
                  )}
              </p>
            </div>
            <div className="flex justify-between mb-4">
              <p>Sub Total</p>
              <p>
                ₹{" "}
                {cartItemList.reduce(
                  (totalDiscount, item) =>
                    totalDiscount + item.product.price * 0.75,
                  0
                )}
              </p>
            </div>
          </div>
          <div className="bg-gray-200 p-4">
            <p>Total</p>
            <p className="font-bold text-xl">
              ₹
              {cartItemList.reduce(
                (totalDiscount, item) =>
                  totalDiscount + item.product.price * 0.75,
                0
              )}
            </p>
          </div>
          <button
            onClick={() => navigate("/paymentprocess/confirmorderpayment")}
            className="bg-[#42a2a2] text-white font-bold py-3 px-6 rounded-full mt-6 w-full hover:bg-blue-600"
            disabled={
              cartItemList.reduce(
                (totalPrice, item) => totalPrice + item.product.price * 0.75,
                0
              ) === 0
            }
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

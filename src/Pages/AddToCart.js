import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Button } from "primereact/button";
import { useAuth } from "../Providers/AuthProvider";
import { SingleProductCard } from "../components/SingleProductCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Carousel } from "primereact/carousel";
import {
  responsiveOptions,
  bestDealsResponsiveOptions,
} from "../utilStaticData/StaticData";

export const AddToCart = () => {
  const navigate = useNavigate();
  const {
    wishlistItems,
    cartItemList,
    cartItemCount,
    getProductQuntityInAddToCart,
    addToWishList,
    totalAmmount,
    deleteAllCartItems,
    addToCart,
    fetchWishList,
    fetchCartItems,
  } = useAuth();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const bestSellerProTemplate = (product) => {
    return <SingleProductCard product={product} />;
  };

  const deleteCartItems = async (id) => {
    try {
      const response = await axios.delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/${id}`,
        {
          headers: {
            projectID: "gar9pityowqx",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        fetchCartItems();
        alert(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" mt-[130px]">
      {cartItemCount ? (
        <>
          <h1 className="bg-amber-400 text-center mx-4 md:mx-[130px] text-xl font-bold text-white p-2 border">
            My Bag {cartItemCount} items and Total amount {totalAmmount} and
            Quantity of products {getProductQuntityInAddToCart}
          </h1>

          <div className="flex justify-center mx-4 md:mx-[130px] gap-1 text-xl">
            <div className="w-full md:w-[100%] bg-amber-400 rounded-md p-3 my-2 flex justify-between items-center">
              <h1>Click here to clear cart {">>"}</h1>
              <button
                className="text-white bg-[#42a2a2] font-bold py-1 flex justify-between px-5 rounded-md hover:text-black"
                onClick={deleteAllCartItems}
              >
                <DeleteForeverIcon /> <p>Clear Cart</p>
              </button>
            </div>
          </div>

          <div className="md:flex justify-center gap-1">
            <div className="md:flex-col w-full md:w-1/2 flex-wrap">
              {cartItemList &&
                cartItemList.map((product) => (
                  <div
                    key={product.product._id}
                    className="md:flex-col shadow-md border rounded-lg mb-2"
                  >
                    <div className="flex p-[30px] justify-between">
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
                          <h1>You saved</h1>
                          <span className="font-bold text-xl">
                            <CurrencyRupeeIcon style={{ fontSize: "20px" }} />
                            {product.product.price * 1.75 -
                              product.product.price}
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

                    <div className="md:flex gap-1 justify-between p-[30px]">
                      <Button
                        className="text-white bg-[#42a2a2] px-3 p-1 rounded-md"
                        onClick={() => deleteCartItems(product.product._id)}
                        variant="outlined"
                        color="inherit"
                        startIcon={<DeleteForeverOutlinedIcon />}
                      >
                        REMOVE
                      </Button>
                      <Button
                        className="text-white bg-[#42a2a2] px-3 p-1 rounded-md"
                        onClick={() => {
                          addToWishList(product.product._id);
                          deleteCartItems(product.product._id);
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

            <div className="bg-silver w-full md:w-1/3 h-fit">
              <p className="bg-silver border hover:text-bewYellow p-2 text-lg opacity-60 border-black mb-[15px]">
                Whistles! Get extra 15% cashback on prepaid orders above Rs.699.
                Coupon code - PARTY
              </p>

              <div className="m-2 p-1 text-midnight rounded-lg bg-[#87CEFA]">
                <p>Apply Coupon // Gift Card // Referral</p>
              </div>
              <h1 className="bg-grey border p-2 border-black mb-[15px]">
                PRICE SUMMARY
              </h1>

              <div className="p-2 border-b-2">
                <div className="flex justify-between mb-[15px]">
                  <p>Total MRP (Incl. of taxes)</p>
                  <p>₹{totalAmmount}</p>
                </div>
                <div className="flex justify-between mb-[15px]">
                  <p>Delivery Fee</p>
                  <p
                    className={`text-${
                      totalAmmount > 2000 ? "green" : "metal"
                    } text-xl`}
                  >
                    {totalAmmount > 2000 ? "free" : "₹49 "}
                  </p>
                </div>
                <div className="flex justify-between mb-[15px]">
                  <p>Bag Discount</p>
                  <p>
                    ₹
                    {totalAmmount -
                      cartItemList?.reduce(
                        (totalDiscount, item) =>
                          totalDiscount + item.product.price * 0.75,
                        0
                      )}
                  </p>
                </div>
                <div className="flex justify-between mb-[15px]">
                  <p>Sub Total</p>
                  <p>
                    ₹{" "}
                    {cartItemList?.reduce(
                      (totalDiscount, item) =>
                        totalDiscount + item.product.price * 0.75,
                      0
                    )}
                  </p>
                </div>
              </div>

              <div className="flex justify-between p-2">
                <div>
                  <p>Total</p>
                  <p className="text-bold text-2xl">
                    ₹
                    {cartItemList?.reduce(
                      (totalDiscount, item) =>
                        totalDiscount + item.product.price * 0.75,
                      0
                    )}
                  </p>
                </div>

                <button
                  className="bg-[#42a2a2] text-white font-bold py-2 flex justify-between px-5 rounded-md hover:text-black"
                  onClick={() => {
                    if (localStorage.getItem("userAddressDetails")) {
                      navigate("/paymentprocess");
                    } else {
                      navigate("/address");
                    }
                  }}
                >
                  ADD ADDRESS
                </button>
              </div>
              <div className="flex justify-between text-sm ">
                <div className="flex flex-col justify-center items-center ">
                  <img
                    className="w-[50px]"
                    src="https://images.bewakoof.com/web/cart-badge-trust.svg"
                    alt="trust"
                  />
                  <p>100% SECURE PAYMENTS</p>
                </div>
                <div className="flex flex-col justify-center items-center ">
                  <img
                    className="w-[50px]"
                    src="https://images.bewakoof.com/web/cart-easy-return.svg"
                    alt="return"
                  />
                  <p>EASY RETURNS & QUICK REFUNDS</p>
                </div>
                <div className="flex flex-col justify-center items-center ">
                  <img
                    className="w-[50px]"
                    src="https://images.bewakoof.com/web/quality-check.svg"
                    alt="quality"
                  />
                  <p>QUALITY ASSURANCE</p>
                </div>
              </div>
            </div>
          </div>

          <div className=" md:mx-[120px]">
            <h1 className="text-xl m-[20px] font-bold">
              Want to add more from your wishlist..
            </h1>

            <Carousel
              value={wishlistItems}
              numVisible={5}
              numScroll={1}
              responsiveOptions={bestDealsResponsiveOptions}
              className="custom-carousel"
              circular
              autoplayInterval={3000}
              itemTemplate={bestSellerProTemplate}
            />
          </div>
        </>
      ) : (
        <div className="flex  flex-col items-center justify-center  animate-fadeIn">
          <img
            className="w-1/3"
            src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png"
          />
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            No Products Found
          </h2>
          <p className="text-gray-600">
            Oops! It seems there are no products in your cart.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-sky-500 text-white px-4 py-2 rounded-md shadow hover:bg-sky-600"
          >
            <ShoppingBagOutlinedIcon className="mr-2" />
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

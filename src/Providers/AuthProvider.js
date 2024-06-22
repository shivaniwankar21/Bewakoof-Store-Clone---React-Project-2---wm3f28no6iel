import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { getHeaders, API_BASE_URL } from "../apiServices/ApiCallBewkoof";
import { toast } from "react-toastify";

// creating context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Token related States start
  const [getName, setName] = useState(localStorage.getItem("name"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Wishlist / addtocart list states start
  const [wishListCount, setWishListCount] = useState(0);
  const [wishlistItems, setWishListItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [getProductQuntityInAddToCart, setProductQuantityInAddToCart] =
    useState(0);
  const [totalAmmount, setTotalAmmount] = useState(0);

  // search / filter
  const [getGender, setGender] = useState("Men");
  const [getSearchProduct, setSearchProduct] = useState("");
  const [getCategories, setCategories] = useState([]);
  const [orderCreatedResponse, setOrderCreatedResponse] = useState();
  const [orderHistory, setOrderHistory] = useState([]);

  const NameHandler = (data) => {
    setName(data);
    localStorage.setItem("name", data);
  };

  const TokenHandler = (tokenFromLogInApi) => {
    setToken(tokenFromLogInApi);
    localStorage.setItem("token", tokenFromLogInApi);
  };

  // Wishlist Fetch data, add to wishlist, remove from wishlist
  const fetchWishList = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/ecommerce/wishlist/`,
        getHeaders(localStorage.getItem("token"))
      );

      if (response.status === 200) {
        setWishListItems(response.data.data.items);
        setWishListCount(response.data.results);
      }
    } catch (err) {
      toast.error("Custom error msg =>", err);
    }
  };

  const addToWishList = async (id) => {
    console.log("add to wishList called");
    console.log(token);
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/v1/ecommerce/wishlist/`,
        {
          productId: id,
        },
        {
          headers: {
            projectID: "gar9pityowqx",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.status === "success") {
        setWishListItems(response.data.data.items);
        setWishListCount(response.data.results);
        toast.success("Product Added successfully!");
      } else {
        toast.error(`${response.data.message}`);
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  // Fetch Cart Items and add to cart items
  const addToCart = async (id, quantity = 1, size = "M") => {
    try {
      if (quantity && size) {
        const response = await axios.patch(
          `${API_BASE_URL}/api/v1/ecommerce/cart/${id}`,
          {
            quantity: quantity,
            size: size,
          },
          {
            headers: {
              projectId: "gar9pityowqx",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.status === "success") {
          setCartItemList(response.data.items);
          setCartItemCount(response.results);
          toast.success(response.data.message);
        }
      }
    } catch (err) {
      console.log("Error Shows ", err);
    }
  };

  const deleteWishListItems = async (id) => {
    try {
      const response = await axios.delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${id}`,
        {
          headers: {
            projectID: "gar9pityowqx",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.status === "success") {
        setWishListCount(response.data.results);
        setWishListItems(response.data.data.items);
        toast.success(response.data.message);
      }
    } catch (err) {
      console.log("Error shows ", err);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/ecommerce/cart`,
        getHeaders(localStorage.getItem("token"))
      );

      if (response.data.status === "success") {
        setCartItemList(response.data.data.items);
        setTotalAmmount(response.data.data.totalPrice);
        setProductQuantityInAddToCart(response.data.results);
        setCartItemCount(response.data.data.items.length);
      }
    } catch (err) {
      console.log("Error Shows ", err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [cartItemCount]);

  const deleteAllCartItems = async () => {
    try {
      const response = await axios.delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart/`,
        {
          headers: {
            projectID: "gar9pityowqx",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        fetchCartItems();
        toast.success(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCartItem = async (id) => {
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
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  let object = {
    API_BASE_URL,
    totalAmmount,
    deleteCartItem,
    setTotalAmmount,
    fetchWishList,
    getSearchProduct,
    setSearchProduct,
    getProductQuntityInAddToCart,
    wishListCount,
    setWishListCount,
    cartItemCount,
    setCartItemCount,
    deleteWishListItems,
    deleteAllCartItems,
    getCategories,
    setCategories,
    cartItemList,
    orderCreatedResponse,
    setOrderCreatedResponse,
    setCartItemList,
    getGender,
    setGender,
    addToCart,
    wishlistItems,
    getName,
    TokenHandler,
    cartItemCount,
    NameHandler,
    setWishListItems,
    addToWishList,
    token,
    fetchCartItems,
    orderHistory,
    setOrderHistory,
  };
  return (
    <>
      <AuthContext.Provider value={object}>{children}</AuthContext.Provider>
    </>
  );
};

// custom hooks
export const useAuth = () => {
  return useContext(AuthContext);
};

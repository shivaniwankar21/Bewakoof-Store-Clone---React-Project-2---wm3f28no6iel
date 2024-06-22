import React, { useState } from "react";
import { Button } from "@mui/material";
import { useAuth } from "../Providers/AuthProvider";
import { SmartButtonOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();

  const { NameHandler, TokenHandler, fetchWishList, fetchCartItems } =
    useAuth();
  const [data, setData] = useState({
    name: "Lokesh",
    email: "lokesh123@gmail.com",
    password: "12345",
    // phone: "",
    appType: "ecommerce",
  });
  const onChangeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submitLoginDetails = (e) => {
    e.preventDefault();

    axios
      .post("https://academics.newtonschool.co/api/v1/user/login", data, {
        headers: {
          projectID: "gar9pityowqx",
        },
      })
      .then((result) => {
        console.log("Login Response");
        console.log(result);
        console.log("Toekn IN Response");
        console.log(result.data.token);
        console.log("Name IN Response");
        console.log(result.data.data.name);

        NameHandler(result.data.data.name);
        TokenHandler(result.data.token);
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("name", result.data.data.name);
        fetchWishList(result.data.token);
        fetchCartItems(result.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message === "Incorrect EmailId or Password") {
          alert("Incorrect EmailId or Password");
        } else if (
          err.response.data.message === "please provide email and password"
        ) {
          alert("please provide email and password");
        }
      });
  };

  return (
    <>
      <div className=" mt-[8rem] flex flex-col md:flex-row justify-center md:w-full ">
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold my-1 text-center">
            Welcome to the world of Bewakoof®!
          </h1>
          <img
            className="h-auto w-full md:w-4/5 mx-auto"
            src="https://images.bewakoof.com/web/group-19-1617704502.png"
            alt="Bewakoof"
          />
        </div>
        <div className="w-full md:w-1/3">
          <form className="leading-8 flex flex-col justify-center my-10 md:my-0">
            <h1 className="text-3xl font-bold text-center my-4">
              Login / Sign up
            </h1>
            <h2 className="text-2xl text-center opacity-50 font-bold">
              For Latest trends, exciting offers and everything Bewakoof®!
            </h2>

            <div className="leading-8">
              <label className="text-xl">Email</label>
              <input
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                required
                className="border w-full p-2 rounded-md"
                placeholder="Enter your email address"
                type="email"
              />
            </div>
            <div className="leading-8">
              <label className="text-xl">Password</label>
              <input
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                required
                className="border w-full p-2 rounded-md"
                placeholder="Enter your password"
                type="password"
              />
            </div>
            <div className="flex flex-col justify-center items-center ">
              <Button
                onClick={submitLoginDetails}
                className="w-full p-2"
                variant="contained"
              >
                Log In
              </Button>
              <div>or</div>
              <Button
                onClick={() => {
                  navigate("/register");
                }}
                className="w-full p-3"
                variant="contained"
              >
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

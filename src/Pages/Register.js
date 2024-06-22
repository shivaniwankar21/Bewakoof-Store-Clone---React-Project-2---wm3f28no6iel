import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    appType: "ecommerce",
  });

  const onChangeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const submitCreateAccountDetails = (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password) {
      setError("All fields are mandatory");
      return;
    }

    axios
      .post("https://academics.newtonschool.co/api/v1/user/signup", data, {
        headers: {
          projectID: "gar9pityowqx",
        },
      })
      .then((result) => {
        if (result.data.status === "success") {
          console.log("Account created successfully");
          console.log(result);
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-[6rem] flex flex-col md:flex-row justify-center items-center h-screen">
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
        <form className="flex flex-col justify-center my-8 mx-4 md:mx-0">
          <h1 className="text-3xl font-bold text-center my-4">
            Create An Account
          </h1>
          <h2 className="text-2xl text-center opacity-50 font-bold">
            For Latest trends, exciting offers and everything Bewakoof®!
          </h2>
          <div className="leading-8">
            <label className="text-xl">Name</label>
            <input
              required
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              className="border w-full p-2 rounded-md"
              placeholder="Enter your name"
              type="text"
            />
          </div>

          <div className="leading-8">
            <label className="text-xl">Email</label>
            <input
              required
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              className="border w-full p-2 rounded-md"
              placeholder="Enter your email address"
              type="email"
            />
          </div>

          <div className="leading-8">
            <label className="text-xl">Phone</label>
            <input
              required
              minLength={10}
              maxLength={10}
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
              className="border w-full p-2 rounded-md"
              placeholder="Enter your number"
              type="text"
            />
          </div>

          <div className="leading-8">
            <label className="text-xl">Password</label>
            <input
              required
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              className="border w-full p-2 rounded-md"
              placeholder="Enter your password"
              type="password"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex flex-col gap-2 justify-center items-center mt-5">
            <Button
              type="submit"
              className="w-full p-3"
              variant="contained"
              onClick={submitCreateAccountDetails}
            >
              Register
            </Button>
            <Button
              variant="contained"
              className="w-full my-3"
              onClick={() => navigate("/login")}
            >
              Already have an account? Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

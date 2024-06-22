import React, { useState, useEffect } from "react";
import { useAuth } from "../Providers/AuthProvider";
import { Carousel } from "primereact/carousel";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";

import {
  bestDealsResponsiveOptions,
  responsiveOptions,
  getSliderImageObject,
  bannerImgs,
  toHotToMissedSectionImage,
  afterSliderSmallCarousal,
  getCategoryImageObject,
} from "../utilStaticData/StaticData";

// import { MyCarousel } from "../components/Carousel";
// import { mySlider } from "../utilStaticData/StaticData";

export const Home = () => {
  const navigate = useNavigate();
  const { getGender } = useAuth();

  const [getProduct, setProducts] = useState([]);
  const ob = getCategoryImageObject();
  const entries = Object.entries(ob);

  const productTemplate = (pro) => {
    return (
      <>
        <img src={pro} />
      </>
    );
  };

  useEffect(() => {
    const bestSellerPro = `https://academics.newtonschool.co/api/v1/ecommerce/clothes/products?sort={"rating":-1}`;

    fetch(bestSellerPro, {
      headers: {
        projectId: "gar9pityowqx",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const bestSellerProTemplate = (product) => {
    return (
      <>
        <div className=" w-fit mx-1">
          <img
            onClick={() => {
              navigate(`/productlist/productdetails/${product._id}`);
            }}
            className="w-full md:w-[340px] rounded-t-md"
            src={product.displayImage}
            alt={product.name}
          />

          <p className="absolute top-[0px] text-sm px-2 rounded-tl-md rounded-br-md bg-slate-400">
            PLUS_SIZE
          </p>

          <p className="flex justify-between">
            <b>Bewakoof®</b>
          </p>

          <div className="h-[2.5rem]">
            <p className="text-sm">{product.name}</p>
          </div>
          <p className="text-slate-500">Category : {product.subCategory}</p>
          <p>
            <CurrencyRupeeIcon style={{ fontSize: "20px" }} /> {product.price}
          </p>
          <button className="p-1 border bg-[#42a2a2] border-black border-b-0  m-1 rounded-md w-full">
            VICOUS RYAN
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <div className=" w-full mt-[110px] bg-white z-[1]">
        {/* Home Page Main Corousel start */}
        <Carousel
          value={getSliderImageObject}
          numVisible={3}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          className="custom-carousel"
          circular
          autoplayInterval={3000}
          itemTemplate={productTemplate}
        />
        {/* Home Page Main Corousel end */}

        {/* <MyCarousel data={mySlider} /> */}

        {/* Home Page small Corousel start */}
        <ul className="flex flex-wrap justify-center ">
          {afterSliderSmallCarousal.map((value) => (
            <li className="text-center ">
              <img className="w-[7rem] m-1 cursor-not-allowed" src={value} />
              {/* <span className="text-lg text-gray-800">Best Sellers</span> */}
            </li>
          ))}
        </ul>
        {/* Home Page small Corousel end */}

        <img src={bannerImgs[0]} className="w-full my-1" />

        {/* Trending Category Section start  */}
        <div>
          <h1 className="text-center font-bold text-3xl my-1">
            {"TRENDING CATEGORIES"}
          </h1>
          <ul className="flex flex-wrap justify-evenly">
            {entries.map(([key, value]) => (
              <li
                onClick={() => navigate(`/productlist?type=${key}`)}
                className="text-center "
              >
                <img
                  style={{
                    height: "300px",
                    width: getGender === "Men" ? "270px" : "250px",
                  }}
                  className="cursor-pointer"
                  src={value}
                />
                <span className="text-lg text-gray-600 font-bold hover:text-black">
                  {key.toUpperCase()}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* Trending Category Section End  */}

        {/* Banner image 2 */}
        <img src={bannerImgs[1]} className="w-full my-[15px]" />

        {/* Best Deals Corousal start  */}
        <div>
          <h1 className="text-center font-bold text-3xl my-1">
            {"BEST DEALS"}
          </h1>
          <Carousel
            value={getProduct}
            numVisible={5}
            numScroll={1}
            responsiveOptions={bestDealsResponsiveOptions}
            className="custom-carousel"
            circular
            autoplayInterval={3000}
            itemTemplate={bestSellerProTemplate}
          />
        </div>
        {/* Best Deals Corousal end  */}

        {/* Banner Image 3 */}
        <img src={bannerImgs[2]} className="w-full my-1" />

        {/* TO HOT TO BE MISSED section start  */}
        <div>
          <h1 className="text-center font-bold text-xl my-1">
            {" TO HOT TO BE MISSED "}
          </h1>
          <div className="flex flex-wrap">
            {toHotToMissedSectionImage.map((img) => (
              <img src={img} className="w-1/2" />
            ))}
          </div>
        </div>
        {/* TO HOT TO BE MISSED section end  */}

        {/* Banner Image 4 */}
        <img src={bannerImgs[3]} className="w-full my-1" />
      </div>
      <Footer />
    </>
  );
};

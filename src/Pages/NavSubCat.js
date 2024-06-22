import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Providers/AuthProvider";

export const NavCat = () => {
  const { API_BASE_URL, getGender, getCategories, setCategories } = useAuth();
  let navigate = useNavigate();

  const catUrl = `${API_BASE_URL}/api/v1/ecommerce/clothes/categories`;

  const handleInitailSetGender = () => {
    if (getGender === "Men") {
      const menCat = [
        "hoodie",
        "jeans",
        "jogger",
        "kurta",
        "pyjamas",
        "shirt",
        "shorts",
        "sweater",
        "tracksuit",
        "trouser",
      ];
      setCategories(menCat);
    } else if (getGender === "Women") {
      const womenCat = ["jeans", "jogger", "jumpsuit", "kurti", "shirt"];
      setCategories(womenCat);
    }
  };
  useEffect(() => {
    handleInitailSetGender();
  }, []);

  useEffect(() => {
    handleInitailSetGender();
    // fetch(catUrl, {
    //   headers: {
    //     projectId: "gar9pityowqx",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setCategories(data.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching products:", error);
    //   });
  }, [getGender]);

  // console.log("Inside sub navbar");
  // console.log(getCategories);
  // console.log(getGender);

  //
  //

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory) {
      navigate(`/productlist?type=${selectedCategory}`);
    }
  };

  const navi = (subCategory) => {
    navigate(`/productlist?type=${subCategory}`);
  };

  return (
    <div>
      <div>
        {/* Navbar for larger devices */}
        <nav className="flex fixed w-full   top-[60px] bg-white z-30 justify-around items-center py-1 px-3 md:border-b-2">
          {getCategories.map((catName, index) => (
            <p
              className="cursor-pointer text-sm text-black-700 hover:text-slate-400"
              key={index}
              onClick={() => {
                navi(catName);
              }}
            >
              {catName.toUpperCase()}
            </p>
          ))}
        </nav>

        {/* Dropdown navbar for smaller devices */}
        <nav className="flex  md:hidden fixed w-full bg-red-300 top-[60px] bg-red z-30 justify-center items-center py-0 md:py-1 px-0 md:px-3 border-b-2">
          <select
            className="outline-none w-full text-center"
            onChange={handleCategoryChange}
            defaultValue=""
          >
            <option className="w-1/2" value="" disabled>
              -- Select Category --
            </option>
            {getCategories.map((catName, index) => (
              <option className="w-1/2" value={catName} key={index}>
                {catName.toUpperCase()}
              </option>
            ))}
          </select>
        </nav>
      </div>
    </div>
  );
};

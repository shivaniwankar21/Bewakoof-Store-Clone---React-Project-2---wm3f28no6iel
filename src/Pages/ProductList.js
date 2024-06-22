import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { getRequestForPagination } from "../apiServices/ApiCallBewkoof";
import { useAuth } from "../Providers/AuthProvider";
import { AsideFilters } from "../components/AsideFilters";
import { SingleProductCard } from "../components/SingleProductCard";

export const ProductList = () => {
  const { API_BASE_URL, getSearchProduct, getGender, setGender } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [noProductFound, setNoProductFound] = useState("");
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [searchParams] = useSearchParams();
  const subCategory = searchParams.get("type");

  const fetchData = async (url) => {
    setIsFetching(true);
    try {
      const res = await axios.get(url, {
        headers: {
          projectId: "gar9pityowqx",
        },
      });
      return res.data.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    } finally {
      setIsFetching(false);
    }
  };

  const handleScroll = debounce(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100 && !isFetching) {
      const nextPageUrl = buildUrl(page);
      fetchData(nextPageUrl).then((data) => {
        if (data && data.length > 0) {
          setProducts((prevData) => [...prevData, ...data]);
          setPage((prevPage) => prevPage + 1);
        } else {
          alert("No data found");
        }
      });
    }
  }, 500);

  const buildUrl = (pageNumber) => {
    let url = `${API_BASE_URL}/api/v1/ecommerce/clothes/products?limit=20&page=${pageNumber}`;

    if (getSearchProduct) {
      url += `&search={"name":"${getSearchProduct}"}`;
    } else if (subCategory && getGender) {
      url += `&filter={"gender":"${getGender}", "subCategory":"${subCategory}"}`;
    } else if (subCategory) {
      url += `&filter={"subCategory":"${subCategory}"}`;
    } else if (getGender) {
      url += `&filter={"gender":"${getGender}"}`;
    }

    return url;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    fetchData(buildUrl(1)).then((data) => {
      if (data) {
        setProducts(data);
        setPage(2);
      }
    });
  }, [getSearchProduct, getGender, subCategory]);

  return (
    <div className="flex justify-center w-full mt-[5.5rem]">
      <AsideFilters list={products} setList={setProducts} />
      <div className="w-[80%] sm:w-[100%]">
        <div className="flex flex-col flex-wrap md:flex-row items-center justify-evenly bg-slate-50 ">
          {products &&
            products.map((product, index) => (
              <div
                className="relative sm:w-[100%] md:max-w-[23%] max-w-[100%] max-h-full m-1 shadow-lg rounded-[20px]"
                key={index}
              >
                <div className="cursor-pointer rounded-t-lg w-[100%]">
                  <img
                    className="rounded-t-lg"
                    onClick={() => {
                      navigate(`/productlist/productdetails/${product._id}`);
                    }}
                    src={product.displayImage}
                    alt={product.name}
                  />
                </div>
                <p className="absolute text-sm top-[0px] bg-slate-500 py-[2px] px-[6px] rounded-br-lg rounded-tl-lg">
                  PLUS_SIZE
                </p>
                <div className="absolute bottom-[13rem] flex">
                  <StarIcon className="text-amber-500" />
                  <div className="text-slate-100">
                    {product.ratings.toFixed(2)}
                  </div>
                </div>
                <p className="flex justify-between">
                  <b>Bewakoof®</b>
                </p>
                <div className="h-[4rem]">
                  <p>{product.name}</p>
                </div>
                <p className="text-slate-500">
                  Category : {product.subCategory}
                </p>
                <p>
                  <CurrencyRupeeIcon style={{ fontSize: "20px" }} />{" "}
                  {product.price}{" "}
                  <span className="text-sm line-through">
                    {product.price * 2}
                  </span>
                </p>
                <button className="border rounded-md bg-sky-300 text-white my-1 p-1">
                  <CurrencyRupeeIcon style={{ fontSize: "20px" }} />{" "}
                  {product.price - 50} for tribe members
                </button>
                <Button
                  style={{
                    padding: "5px",
                    borderTop: "1px solid black",
                    width: "100%",
                  }}
                >
                  VICOUS RYAN
                </Button>
              </div>
            ))}
          {noProductFound && (
            <div className="text-center w-full bg-midnight text-white p-4 rounded-lg shadow-md">
              <p className="text-lg">No Products Found</p>
              <p className="text-sm mt-2">
                Please try again later or refine your search criteria.
              </p>
              <h1>{noProductFound}</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

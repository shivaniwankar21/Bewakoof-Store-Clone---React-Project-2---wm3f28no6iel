import React from "react";
import axios from "axios";

export const API_BASE_URL = `https://academics.newtonschool.co`;

const myProjectIdBewkoof = "gar9pityowqx";

// Headers
export const getHeaders = (token) => {
  return {
    headers: {
      method: "GET",
      projectID: myProjectIdBewkoof,
      Authorization: `Bearer ${token}`,
    },
  };
};

const getRequest = async (url) => {
  const response = await fetch(url, getHeaders());
  if (!response.ok) throw new Error(`HTTP error! status:`);
  return response.json();
};

// Get Request
// export const getRequestForPegination = async (getGender, page) => {
//   return await axios.get(
//     `${API_BASE_URL}api/v1/ecommerce/clothes/products?limit=20&page=${page}&gender=${getGender}`,
//     getHeaders()
//   );
// };

// Product Search Api Called
export const callSearchApi = async (getSearchProdct) => {
  const searchApi = `${API_BASE_URL}/api/v1/ecommerce/clothes/products?search={"description":"${getSearchProdct}"}`;

  return await axios.get(searchApi, getHeaders());
};

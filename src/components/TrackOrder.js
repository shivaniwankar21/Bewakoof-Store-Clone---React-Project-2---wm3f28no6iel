import React, { useEffect, useState } from "react";
import { useAuth } from "../Providers/AuthProvider";
import axios from "axios";
import { Modal } from "../Portals/PortalM";

export function TrackOrder() {
  const { orderCreatedResponse, orderHistory, setOrderHistory } = useAuth();
  const [getOrderProduct, setOrderProduct] = useState();
  console.log("Order Created Response");
  console.log(orderCreatedResponse);

  const { items, totalPrice, status, shipmentDetails, orderDate } =
    orderCreatedResponse;
  console.log(items);
  const { product: productId, quantity, size, _id } = items[0];

  const { type, address } = shipmentDetails;
  const { city, street, country, state, zipCode } = address;

  // Order history APi Call

  // const getOrderHistory = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://academics.newtonschool.co/api/v1/ecommerce/order/`,
  //       {
  //         headers: {
  //           projectId: "gar9pityowqx",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     console.log("Order History");
  //     console.log(response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   // getOrderHistory();
  //   getHistory();
  // }, []);

  const getOrderDetails = async () => {
    try {
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/ecommerce/order/`,
        {
          headers: {
            projectId: "gar9pityowqx",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Get Order Detail s...");
      console.log(response);
      console.log(response.data);
      console.log(response.data.data);
      setOrderHistory(response.data.data);
      setOrderProduct(response.data.data.items[0]);
    } catch (err) {
      console.log("Inside catch Block");
      console.log(err);
    }
  };

  useEffect(() => {
    getOrderDetails();
    getSingleOrderDetails(productId);
  }, []);

  const getSingleOrderDetails = async (orderId) => {
    const res = await axios.get(
      `https://academics.newtonschool.co/api/v1/ecommerce/order/${orderId}`,
      {
        headers: {
          projectId: "gar9pityowqx",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Single Product details");
    console.log(res);
  };

  // Modal Purpose
  const [open, setopen] = useState(false);

  const handleOpenModal = () => {
    setopen(!open);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-[60px]">
      {open && <Modal isOpen={handleOpenModal} />}
      <div className="flex flex-col items-center">
        <button
          className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          onClick={() => setopen(!open)}
        >
          Order History
        </button>

        <div className="bg-gray-100 p-4 rounded-lg w-full max-w-xl">
          <h1 className="text-xl font-bold mb-2">Order Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h1 className="text-lg font-semibold">Order Status:</h1>
              <p>{status}</p>
              <h1 className="text-lg font-semibold mt-2">Total Price:</h1>
              <p>{totalPrice}</p>
              <h1 className="text-lg font-semibold mt-2">Order Date:</h1>
              <p>{orderDate}</p>
              <h1 className="text-lg font-semibold mt-2">Quantity:</h1>
              <p>{quantity}</p>
              <h1 className="text-lg font-semibold mt-2">Order Id:</h1>
              <p>{_id}</p>
              <h1 className="text-lg font-semibold mt-2">Product Id:</h1>
              <p>{productId}</p>
              <h1 className="text-lg font-semibold mt-2">Size:</h1>
              <p>{size}</p>
            </div>
            <div>
              <div className="mb-4">
                <h1 className="text-lg font-semibold">Shipping Details</h1>
                <h2>{type}</h2>
                <p>
                  {city}, {street}, {country}, {state}, {zipCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

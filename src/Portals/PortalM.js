import React from "react";
import ReactDOM from "react-dom";
import { useAuth } from "../Providers/AuthProvider";

export const Modal = ({ isOpen }) => {
  const { orderHistory } = useAuth();

  const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);

    const formattedDate = dateTime.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const formattedTime = dateTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const formattedDateTime = `${formattedDate} ${formattedTime}`;

    return formattedDateTime;
  };

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-transparent mt-[50px]">
        <div
          className="bg-slate-200 rounded-lg min-h-80 m-4 relative w-full max-w-[600px] shadow-lg"
          style={{ maxHeight: "80vh", overflowY: "auto" }} // Added styles for scrollbar
        >
          <div className="flex fixed w-[45%]  justify-between items-center px-4 py-2 rounded-t-lg bg-gray-800 text-white">
            <h1 className="text-xl font-semibold">Order History Page...</h1>
            <button
              className="bg-sky-400  right-[28%] w-10 h-10 rounded-lg hover:text-white font-bold flex justify-center items-center"
              onClick={() => isOpen()}
            >
              X
            </button>
          </div>

          <div className="flex flex-col gap-4 p-4">
            {orderHistory.map((order) => (
              <div
                key={order.order._id}
                className="border border-gray-300 flex flex-col md:flex-row rounded-lg shadow-lg bg-white"
              >
                <img
                  className="w-full md:w-[200px] h-auto rounded-tl-lg md:rounded-l-lg md:rounded-t-none md:rounded-bl-lg object-cover"
                  src={order.order.items[0].product.displayImage}
                  alt={order.order.items[0].product.name}
                />
                <div className="flex flex-col flex-grow p-4">
                  <p className="text-xs text-gray-500 mb-2">
                    Order Date: {formatDate(order.createdAt)}
                  </p>
                  <h1 className="text-lg font-semibold mb-2">
                    Name: {order.order.items[0].product.name}
                  </h1>
                  <h1 className="text-md mb-2">
                    Price: {order.order.items[0].product.price}
                  </h1>
                  <h1 className="text-md mb-2">
                    Total Price: {order.order.totalPrice}
                  </h1>
                  <h1 className="text-sm mb-2">Order ID: {order.order._id}</h1>
                  <div>
                    <h1 className="text-lg font-semibold mb-1">
                      Shipping Details
                    </h1>
                    <h1 className="text-md">
                      Type: {order.order.shipmentDetails?.type}
                    </h1>
                    <h1 className="text-md">
                      Address: {order.order.shipmentDetails?.address?.street},{" "}
                      {order.order.shipmentDetails?.address?.city},{" "}
                      {order.order.shipmentDetails?.address?.country},{" "}
                      {order.order.shipmentDetails?.address?.state}{" "}
                      {order.order.shipmentDetails?.address?.zipCode}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal-root")
  );
};

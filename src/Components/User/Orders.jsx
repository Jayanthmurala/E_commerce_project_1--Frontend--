import React from "react";
import { useSelector } from "react-redux";

const Orders = () => {
  const { orderHistory } = useSelector((state) => state.userDetails);
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Orders</h2>

      {orderHistory?.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orderHistory.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-md overflow-hidden border"
            >
              <div className="w-full h-52 bg-gray-100 overflow-hidden">
                <img
                  src={order.product_details.image[0]}
                  alt={order.product_details.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {order.product_details.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Order ID:{" "}
                  <span className="font-medium text-gray-700">
                    {order.orderId}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Payment:{" "}
                  <span className="text-green-600 font-semibold">
                    {order.payment_status}
                  </span>
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <p className="text-sm text-gray-500">Subtotal:</p>
                    <p className="text-lg font-bold text-gray-800">
                      ₹{order.subTotalAmt}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total:</p>
                    <p className="text-lg font-bold text-blue-600">
                      ₹{order.totalAmt}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Ordered on:{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

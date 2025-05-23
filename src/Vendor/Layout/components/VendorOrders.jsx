import React, { useEffect, useState } from "react";
import Axios from "../../../Api";
import OrderDetailsModal from "./OrderDetailsModal";

const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await Axios.get("/aip/v1/order/vendor");
        if (res.status === 200) {
          setOrders(res.data.orders || []);
        }
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="mt-14 p-6">
      <h1 className="text-2xl font-bold mb-6">Vendor Orders</h1>
      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between"
          >
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img
                src={order.product_details?.image?.[0]}
                alt={order.product_details?.name}
                className="h-20 w-20 object-cover rounded-md border"
              />
              <div>
                <p className="font-semibold text-lg">
                  {order.product_details?.name}
                </p>
                <p className="text-sm text-gray-500">
                  Order ID: {order.orderId}
                </p>
                <p className="text-sm text-gray-500">
                  Product ID: {order.productId}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Payment: {order.payment_status}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedOrder(order)}
              className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default VendorOrders;

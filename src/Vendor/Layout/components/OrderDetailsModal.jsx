import React from "react";

const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Order Details</h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <img
            src={order.product_details?.image?.[0]}
            alt={order.product_details?.name}
            className="w-full sm:w-40 h-40 object-cover rounded-lg"
          />

          <div className="flex-1">
            <p>
              <strong>Product:</strong> {order.product_details?.name}
            </p>
            <p>
              <strong>Order ID:</strong> {order.orderId}
            </p>
            <p>
              <strong>Product ID:</strong> {order.productId}
            </p>
            <p>
              <strong>Payment ID:</strong> {order.paymentId}
            </p>
            <p>
              <strong>Payment Status:</strong> {order.payment_status}
            </p>
            <p>
              <strong>Subtotal:</strong> ₹{order.subTotalAmt}
            </p>
            <p>
              <strong>Total:</strong> ₹{order.totalAmt}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {order.product_details?.image?.length > 1 && (
          <>
            <hr className="my-4" />
            <h3 className="font-semibold mb-2">More Images</h3>
            <div className="flex gap-2 overflow-auto">
              {order.product_details.image.slice(1).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Product ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md"
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsModal;

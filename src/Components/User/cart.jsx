import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa";
import endPoints from "../../Api/endPoints";
import Axios from "../../Api";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const { products } = useSelector((state) => state.data);
  const { shopping_cart, address_details } = useSelector(
    (state) => state.userDetails
  );

  const [cartItems, setCartItems] = useState([]);
  const [cartProduct, setCartProduct] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    setCartItems(shopping_cart);
  }, [shopping_cart]);

  useEffect(() => {
    if (!products.length || !cartItems.length) return;

    const enrichedCart = cartItems
      .map((item) => {
        const product = products.find((p) => p._id === item.productId);
        if (!product) return null;

        return {
          productId: item.productId,
          quantity: item.quantity,
          name: product.name,
          price: product.price,
          image: product.image,
          discount: product.discount,
          stock: product.stock || 50,
        };
      })
      .filter(Boolean);

    setCartProduct(enrichedCart);
  }, [products, cartItems]);

  const calculateTotal = () => {
    return Math.ceil(
      cartProduct.reduce(
        (total, item) =>
          total +
          (item.price - (item.price * item.discount) / 100) * item.quantity,
        0
      )
    );
  };

  const removeHandler = async (id) => {
    setLoadingId(id);
    try {
      const res = await Axios({
        ...endPoints.quantityRemove,
        data: { productId: id },
      });

      if (res.status === 200) {
        setCartItems((prev) =>
          prev
            .map((item) =>
              item.productId === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0)
        );
        toast.success("Product quantity decreased");
      }
    } catch (error) {
      toast.error("Error removing product");
      console.log(error);
    } finally {
      setLoadingId(null);
    }
  };

  const addHandler = async (id) => {
    setLoadingId(id);
    try {
      const res = await Axios({
        ...endPoints.quantityAdd,
        data: { productId: id },
      });

      if (res.status === 200) {
        setCartItems((prev) =>
          prev.map((item) =>
            item.productId === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
        toast.success("Product quantity increased");
      }
    } catch (error) {
      toast.error("Error adding product");
      console.log(error);
    } finally {
      setLoadingId(null);
    }
  };

  const clearHandler = async () => {
    try {
      const res = await Axios({
        url: "/aip/v1/cart/clear-cart",
        method: "DELETE",
      });
      if (res.status === 200) {
        toast.success("Cart cleared");
        setCartItems([]);
        setCartProduct([]);
      }
    } catch (error) {
      toast.error("Error clearing cart");
      console.log(error);
    }
  };

  const placeOrderHandler = async () => {
    if (address_details.length === 0) {
      toast.error("Please add an address");
      return;
    }
    if (cartProduct.length === 0) {
      toast.error("Please add a product");
      return;
    }

    if (selectedPayment === "cod") {
      try {
        const res = await Axios({
          url: "/aip/v1/order/create",
          method: "POST",
          data: {
            addressId: address_details[0]._id,
            subTotalAmt: 100,
            totalAmt: calculateTotal() + 100,
            productIds: cartProduct.map((item) => item.productId),
          },
        });

        if (res.status === 200) {
          toast.success("Order placed successfully");
          clearHandler();
        }
      } catch (error) {
        toast.error("Order failed");
        console.log(error);
      }
    }

    if (selectedPayment === "online") {
      try {
        const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
        const stripePromise = await loadStripe(stripePublicKey);
        const res = await Axios({
          url: "/aip/v1/order/online",
          method: "POST",
          data: {
            list_items: cartProduct.map((item) => ({
              name: item.name,
              image: item.image,
              productId: item.productId,
              price: item.price,
              quantity: item.quantity,
              discount: item.discount,
            })),
            totalAmt: calculateTotal(),
            addressId: address_details[0]._id,
            subTotalAmt: 100,
          },
        });

        const { data: responseData } = res;
        stripePromise.redirectToCheckout({ sessionId: responseData.id });
      } catch (error) {
        toast.error("Online payment failed");
        console.log(error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* LEFT: Address */}
      <div className="col-span-1 bg-white p-4 rounded-lg shadow-md h-fit">
        <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
        {address_details.length > 0 ? (
          <div className="text-gray-700 leading-relaxed">
            <p>
              <strong>Address:</strong> {address_details[0].addressLine}
            </p>
            <p>
              <strong>City:</strong> {address_details[0].city}
            </p>
            <p>
              <strong>State:</strong> {address_details[0].state}
            </p>
            <p>
              <strong>Pin:</strong> {address_details[0].pinCode}
            </p>
            <p>
              <strong>Country:</strong> {address_details[0].country}
            </p>
            <p>
              <strong>Mobile:</strong> {address_details[0].mobile}
            </p>
          </div>
        ) : (
          <p className="text-red-500">No address found.</p>
        )}
      </div>

      {/* RIGHT: Cart */}
      <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button
            onClick={clearHandler}
            className="text-red-500 hover:bg-red-600 hover:text-white border border-red-500 hover:border-red-700 px-4 py-2 rounded cursor-pointer"
          >
            Clear cart
          </button>
        </div>

        {cartProduct.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cartProduct.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between mb-4 border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item?.image?.[0]}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  {item.discount > 0 ? (
                    <div className="flex items-center gap-2">
                      <p className="text-gray-500 line-through">
                        ₹{item.price}
                      </p>
                      <p className="text-gray-800 font-bold">
                        ₹
                        {Math.ceil(
                          item.price - (item.price * item.discount) / 100
                        )}{" "}
                        <span className="text-sm text-green-600">
                          ({item.discount}% OFF)
                        </span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-800 font-bold">₹{item.price}</p>
                  )}
                  {item.stock < 20 && (
                    <p className="text-red-500 text-sm">
                      Hurry! Only {item.stock} left
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="bg-gray-200 p-1 rounded cursor-pointer"
                  onClick={() => removeHandler(item.productId)}
                  disabled={loadingId === item.productId}
                >
                  <FaMinus />
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  className="bg-gray-200 p-1 rounded cursor-pointer"
                  onClick={() => addHandler(item.productId)}
                  disabled={loadingId === item.productId}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          ))
        )}

        {/* Payment Options */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Payment Options:</h3>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="cod"
                checked={selectedPayment === "cod"}
                onChange={(e) => setSelectedPayment(e.target.value)}
              />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="online"
                checked={selectedPayment === "online"}
                onChange={(e) => setSelectedPayment(e.target.value)}
              />
              Online Payment
            </label>
          </div>
        </div>

        {/* Total & Order Button */}
        <div className="mt-6 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">
              Total Items: {cartProduct.length}
            </h3>
            <h2 className="text-xl font-semibold">
              Sub Total: ₹{calculateTotal()}
            </h2>
          </div>
          <button
            onClick={placeOrderHandler}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

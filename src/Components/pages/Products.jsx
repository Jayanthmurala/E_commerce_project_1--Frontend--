import { useSelector, useDispatch } from "react-redux";
import Axios from "../../Api";
import endPoints from "../../Api/endPoints";
import toast from "react-hot-toast";
import useUserData from "../../hooks/useUserData";
import { setUser } from "../../store/Slices/userSlice";
// import { useEffect } from "react";

const Products = ({ products }) => {
  useUserData(); // ✅ triggers fetch on mount

  const dispatch = useDispatch();

  const { shopping_cart } = useSelector((state) => state.userDetails);

  const fetchUser = async () => {
    const res = await Axios.get("/aip/v1/user/user-details");
    if (res.status === 200) {
      dispatch(setUser(res?.data?.Data));
    }
  };

  const removeHandler = async (id) => {
    const res = await Axios({
      ...endPoints.quantityRemove,
      data: { productId: id },
    });

    if (res.status === 200) {
      toast.error("Product removed from cart");
      fetchUser(); // ✅ refresh user data after change
    }
  };

  const addHandler = async (id) => {
    const res = await Axios({
      ...endPoints.quantityAdd,
      data: { productId: id },
    });

    if (res.status === 200 || res.status === 201) {
      toast.success("Product added to cart");
      fetchUser(); // ✅ refresh user data after change
    }
  };

  const getCartItem = (productId) =>
    shopping_cart.find((item) => item.productId === productId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.slice(0, 24).map((product) => {
        const cartItem = getCartItem(product._id);
        const inCart = Boolean(cartItem);

        return (
          <div
            key={product._id}
            className="relative bg-white rounded-lg shadow hover:shadow-xl transition duration-300 p-4"
          >
            {product.discount > 0 && (
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                {product.discount}% OFF
              </span>
            )}
            <img
              src={product.image[1]}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h4 className="text-lg font-semibold text-gray-800 mb-1">
              {product.name}
            </h4>
            <p className="text-sm text-gray-600 mb-1">{product.description}</p>
            <p className="text-md text-gray-800 font-bold mb-1">
              ₹{product.price}
            </p>
            <p
              className={`text-sm font-medium mb-2 ${
                product.stock < 20 ? "text-red-500" : "text-gray-600"
              }`}
            >
              Stock: {product.stock}
            </p>

            {!inCart ? (
              <button
                onClick={() => addHandler(product._id)}
                className="bg-blue-600 text-white w-full py-1 rounded hover:bg-blue-700 cursor-pointer transition"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center justify-between">
                <button
                  onClick={() => removeHandler(product._id)}
                  className="bg-gray-200 px-3 py-1 cursor-pointer rounded hover:bg-gray-300"
                >
                  −
                </button>
                <span className="px-3">{cartItem.quantity}</span>
                <button
                  onClick={() => addHandler(product._id)}
                  className="bg-gray-200 px-3 py-1 cursor-pointer rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Products;

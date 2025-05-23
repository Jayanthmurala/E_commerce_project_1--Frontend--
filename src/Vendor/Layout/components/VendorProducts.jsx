import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputProduct from "./InputProduct";
import Axios from "../../../Api";
import endPoints from "../../../Api/endPoints";
import toast from "react-hot-toast";
import useData from "../../../hooks/useData";

const VendorProducts = () => {
  const [showModal, setShowModal] = useState(false);
  const [vendorProducts, setVendorProducts] = useState([]);
  const saveData = useData();
  const navigate = useNavigate();

  const fetchVendorProducts = async () => {
    try {
      const response = await Axios({
        ...endPoints.VendorProduct,
      });
      setVendorProducts(response?.data?.data);
    } catch (error) {
      console.error("Error fetching vendor products:", error);
    }
  };
  useEffect(() => {
    fetchVendorProducts();
  }, []);

  // Delete Functionality
  const deleteProduct = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;
    const res = await Axios({
      url: "/aip/v1/product/delete-product",
      data: { id },
      method: "DELETE",
    });
    if (res.status === 200) {
      setVendorProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
      saveData();
      toast.success("Product deleted successfully");
    }
  };

  return (
    <div className="mt-14 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Products
        </h1>
        {showModal && <InputProduct setShowModal={setShowModal} />}
        <button
          onClick={() => setShowModal(true)}
          className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
        >
          Add Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* Example Product Card */}
        {vendorProducts?.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={product.image[0]}
              alt={product.name}
              className="w-full h-40 object-cover mb-2"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            {/* <Link
              to={`/vendor/products/${product._id}`}
              className="text-blue-600 hover:underline"
            >
              View Details
            </Link> */}
            <div className="flex justify-between mt-2">
              <button
                onClick={() => navigate(`/vendor/edit/${product._id}`)}
                className="bg-blue-500 text-white px-6 py-1  rounded-2xl cursor-pointer "
              >
                Edit
              </button>
              <button
                onClick={() => deleteProduct(product._id)}
                className="bg-red-500 text-white px-4 rounded-2xl py-1 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorProducts;

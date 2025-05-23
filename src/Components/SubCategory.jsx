import { useParams } from "react-router-dom";
import Axios from "../Api";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Products from "./pages/Products";

const SubCategory = () => {
  const [subcategory, setSubCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchSubCategory = async () => {
    try {
      const res = await Axios.get(`/aip/v1/category/allSubCat-Cat/${id}`);
      setSubCategory(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      toast.error("Failed to load subcategories.");
    }
  };

  const productsHandler = async (subId) => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/aip/v1/subcategory/product-subCategory/${subId}`
      );
      setProducts(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Choose a Subcategory
      </h1>

      <section className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-10">
        {subcategory.map((subcat) => (
          <div
            key={subcat._id}
            onClick={() => productsHandler(subcat._id)}
            className="bg-white shadow hover:shadow-lg transition rounded-lg overflow-hidden cursor-pointer group"
          >
            <img
              src={subcat.image}
              alt={subcat.name}
              className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-3 text-center">
              <h3 className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition">
                {subcat.name}
              </h3>
            </div>
          </div>
        ))}
      </section>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Products</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">
            No products to show. Select a subcategory.
          </p>
        ) : (
          <Products products={products} />
        )}
      </div>
    </div>
  );
};

export default SubCategory;

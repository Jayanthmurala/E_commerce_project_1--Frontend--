import React, { useState } from "react";
import Axios from "../../Api";
import Products from "../pages/Products";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchHandler = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await Axios.get(`/aip/v1/product/search?query=${searchTerm}`);
      if (res.status === 200) {
        setProducts(res.data.data);
      }
    } catch (err) {
      setError("Failed to fetch search results.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search Products</h1>
      <form onSubmit={searchHandler} className="flex items-center gap-2">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search for products..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </form>

      {loading && <p className="mt-4 text-gray-600">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <Products products={products} />
    </div>
  );
};

export default Search;

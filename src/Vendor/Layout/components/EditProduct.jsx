import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import UploadImages from "../../../util/UploadImages";
import Axios from "../../../Api";
import toast from "react-hot-toast";
import useData from "../../../hooks/useData";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const savedata = useData();
  const { id } = useParams();
  console.log(id, "id fom params");
  const { category, subCategories } = useSelector((state) => state.data);
  const navigator = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: null,
    unit: "",
    categoryId: "",
    subCategoryId: "",
    stock: null,
    discount: null,
    description: "",
    image: [],
  });

  useEffect(() => {
    const Edit = async () => {
      const data = await Axios({
        url: `/aip/v1/product/${id}`,
        method: "GET",
      });
      if (data.status === 200) {
        setFormData(data?.data?.data);
      }
    };
    Edit();
  }, [id]);

  // handle form data
  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      const file = e.target.files[0];
      if (file) {
        const url = await UploadImages(file);
        console.log(url, "url");
        setFormData({
          ...formData,
          image: [...formData.image, url?.data?.data],
        });
      }
      setUploading(false);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // remove image
  const removeImage = (index) => {
    const updatedImages = [...formData.image];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, image: updatedImages });
  };
  //submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Axios({
      url: `/aip/v1/product/edit-product/${id}`,
      method: "POST",
      data: formData,
    });
    console.log(res, "res");
    if (res?.data?.success) {
      toast.success(res?.data?.message);
      navigator("/vendor/products");
      savedata();
    } else {
      toast.error(res?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative my-8">
        <div className="max-h-[90vh] overflow-y-auto p-6">
          <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

          <form onSubmit={handleSubmit}>
            {/* Product Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Product Name</label>
              <input
                type="text"
                name="name"
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Price</label>
              <input
                type="number"
                name="price"
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                required
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            {/* Units */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Units</label>
              <input
                type="text"
                name="unit"
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                value={formData.unit}
                onChange={handleChange}
              />
            </div>

            {/* Stock */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Stock</label>
              <input
                type="number"
                name="stock"
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                required
                value={formData.stock}
                onChange={handleChange}
              />
            </div>

            {/* Discount */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Discount</label>
              <input
                type="number"
                name="discount"
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                required
                value={formData.discount}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                required
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Category Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Category</label>
              <select
                name="categoryId"
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                value={formData.categoryId}
                onChange={handleChange}
              >
                <option value="">Select Subcategory</option>
                {category.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Subcategory</label>
              <select
                name="subCategoryId"
                className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                value={formData.subCategoryId}
                onChange={handleChange}
              >
                <option value="">Select Subcategory</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory._id} value={subCategory._id}>
                    {subCategory.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.image.length > 0 &&
                formData.image.map((image, index) => (
                  <div className="flex items-center mb-2" key={index}>
                    <img
                      src={image}
                      alt={`Image ${index}`}
                      height={50}
                      width={50}
                      className="mr-2"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="text-red-500 hover:text-red-700 border border-red-500 hover:border-red-700 rounded px-2 py-1"
                    >
                      Remove
                    </button>
                  </div>
                ))}
            </div>

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              name="image"
              ref={fileInputRef}
              onChange={handleChange}
              className="hidden"
            />

            {/* Upload Image Button */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                disabled={uploading}
                className={`w-full flex justify-center items-center text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded px-4 py-2 ${
                  uploading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {uploading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  "Upload Image"
                )}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded"
            >
              Submit Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

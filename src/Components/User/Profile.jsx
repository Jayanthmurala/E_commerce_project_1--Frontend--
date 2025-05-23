import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Axios from "../../Api";
import toast from "react-hot-toast";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const user = useSelector((state) => state.userDetails);
  useEffect(() => {
    setFormData(user);
  }, [user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await Axios({
        url: "/aip/v1/user/upload",
        method: "POST",
        data: formData,
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        window.location.reload();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Axios({
      url: "/aip/v1/user/update-details",
      method: "POST",
      data: formData,
    });

    if (res?.data?.success) {
      toast.success(res?.data?.message);
    }

    if (!res) {
      toast.error("Error updating details");
    }
  };

  return (
    <div className="text-gray-600 body-font max-h-full">
      <section className="container bg-amber-50 h-[90vh] flex flex-col gap-4 p-6 ">
        <h1 className="text-2xl text-center font-bold">Profile</h1>
        <div className="mb-4  border-2 border-dashed border-gray-400  p-4">
          <label className="block text-center text-lg underline font-medium text-gray-700">
            Avatar
          </label>
          <div className="flex items-center space-x-4 mt-2">
            {formData?.avatar && (
              <img
                src={user?.avatar}
                alt="Avatar Preview"
                className="w-16 h-16 rounded-full object-cover"
              />
            )}
            <label
              htmlFor="avatar"
              className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Upload Image
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 ">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                className="border border-gray-300 rounded-md p-2"
                type="text"
                value={formData.name}
                onChange={handleChange}
                name="name"
                id="name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                className="border border-gray-300 rounded-md p-2"
                type="email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                id="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="mobile">Mobile</label>
              <input
                className="border border-gray-300 rounded-md p-2"
                type="text"
                value={formData.mobile}
                onChange={handleChange}
                name="mobile"
                id="mobile"
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </section>

      {/* User Profile And Update Details */}
    </div>
  );
};

export default Profile;

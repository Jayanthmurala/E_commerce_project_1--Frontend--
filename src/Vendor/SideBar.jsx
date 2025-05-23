import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const selector = useSelector((state) => state.userDetails);
  return (
    <div className="flex flex-col gap-2 ">
      <h3 className="text-2xl font-semibold">{`WelCome ${
        selector.name ? selector?.name : "Vendor"
      }`}</h3>
      <span className="text-lg font-semibold underline mt-6">Dashboard</span>
      <div className="flex flex-col gap-2 my-4">
        <NavLink
          to="/vendor/orders"
          className={({ isActive }) =>
            isActive ? "text-blue-600 text-lg" : "text-gray-700"
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/vendor/products"
          className={({ isActive }) =>
            isActive ? "text-blue-600 text-lg" : "text-gray-700"
          }
        >
          Products
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;

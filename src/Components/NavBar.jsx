import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import endPoints from "../Api/endPoints";
import Axios from "../Api";
import { LuSearch } from "react-icons/lu";
import { FaBasketShopping } from "react-icons/fa6";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const NavBar = () => {
  const user = useSelector((state) => state.userDetails);
  const [menu, setMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await Axios({ ...endPoints.logout });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refresh_token");
    window.location.reload();
    setMenu(false);
    navigate("/");
  };

  return (
    <header className="bg-amber-200 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold text-black">
          OUTnOW
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div
            onClick={() => navigate("/search")}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 border-2 border-amber-50 text-white bg-amber-400 hover:bg-white hover:text-black rounded-md transition"
          >
            <LuSearch />
            <span>Search</span>
          </div>

          {user?._id ? (
            <div className="flex items-center gap-4 text-black font-medium">
              <span className="hidden md:inline">{user.name}</span>
              <div
                onClick={() => setMenu(!menu)}
                className="cursor-pointer relative"
              >
                <img
                  src={
                    user.avatar ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="avatar"
                  className="w-10 h-10 rounded-full border-2 border-transparent hover:border-yellow-600 transition"
                />
              </div>
              <div
                onClick={() => navigate("/cart")}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 border-2 border-amber-50 text-white bg-amber-400 hover:bg-white hover:text-black rounded-md transition"
              >
                <FaBasketShopping />
                {user.shopping_cart?.length > 0 ? (
                  <span>Items: {user.shopping_cart.length}</span>
                ) : (
                  <span>Cart</span>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 text-black">
              <NavLink
                to="/auth/login"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 underline" : "hover:text-blue-600"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/auth/register"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 underline" : "hover:text-blue-600"
                }
              >
                Register
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <HiX className="w-6 h-6 text-black" />
            ) : (
              <HiOutlineMenu className="w-6 h-6 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 space-y-3">
          <div
            onClick={() => {
              navigate("/search");
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 text-black hover:text-yellow-600 cursor-pointer"
          >
            <LuSearch />
            <span>Search</span>
          </div>
          {user?._id ? (
            <>
              <div className="text-black">{user.name}</div>
              <div
                onClick={() => {
                  navigate("/cart");
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-black hover:text-yellow-600 cursor-pointer"
              >
                <FaBasketShopping />
                <span>
                  {user.shopping_cart?.length > 0
                    ? `Items: ${user.shopping_cart.length}`
                    : "Cart"}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <NavLink to="/orders" onClick={() => setMobileMenuOpen(false)}>
                  Orders
                </NavLink>
                <NavLink to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-1 rounded-md"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-2 text-black">
              <NavLink
                to="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </NavLink>
              <NavLink
                to="/auth/register"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      )}

      {/* Desktop Dropdown Menu */}
      {menu && user?._id && (
        <div className="absolute top-16 right-6 w-40 bg-white shadow-md p-4 z-10 rounded-md hidden md:block">
          <NavLink
            to="/orders"
            onClick={() => setMenu(false)}
            className="block py-1 hover:text-yellow-600"
          >
            Orders
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => setMenu(false)}
            className="block py-1 hover:text-yellow-600"
          >
            Cart
          </NavLink>
          <NavLink
            to="/profile"
            onClick={() => setMenu(false)}
            className="block py-1 hover:text-yellow-600"
          >
            Profile
          </NavLink>
          <button
            onClick={handleLogout}
            className="mt-2 w-full bg-red-500 text-white py-1 rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default NavBar;

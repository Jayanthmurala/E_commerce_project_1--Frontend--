import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import useData from "./hooks/useData";

import useUserData from "./hooks/useUserData";

import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import DashBoard from "./Vendor";

const App = () => {
  useData();
  useUserData();

  return (
    <>
      <NavBar />
      <main>
        <Outlet />
        <Toaster position="top-center" reverseOrder={false} />
      </main>
      <Footer />
    </>
  );
};

export default App;

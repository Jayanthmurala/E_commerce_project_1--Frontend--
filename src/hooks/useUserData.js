import { useDispatch } from "react-redux";
import Axios from "../Api";
import { setUser } from "../store/Slices/userSlice";
import { useEffect, useRef } from "react";

const useUserData = () => {
  const dispatch = useDispatch();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetchUser = async () => {
      try {
        const res = await Axios({
          url: "/aip/v1/user/user-details",
          method: "GET",
        });

        if (res.status === 200) {
          dispatch(setUser(res?.data?.Data));
        } else {
          console.error("Failed to fetch user:", res);
        }
      } catch (error) {
        console.error("User fetch error:", error);
      }
    };

    fetchUser();
  }, [dispatch]);
};

export default useUserData;

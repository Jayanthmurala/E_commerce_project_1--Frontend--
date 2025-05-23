import Axios from "../Api/index.js";
import endPoints from "../Api/endPoints.js";
import { setProducts } from "../store/Slices/dataSlice.js";
import { useDispatch } from "react-redux";
import { setCategory, setSubCategories } from "../store/Slices/dataSlice.js";
import { useEffect, useRef } from "react";
const useData = () => {
  const hasFetched = useRef(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const data = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      const res = await Axios({
        ...endPoints.allProducts,
      });
      if (res.status === 200) {
        dispatch(setProducts(res?.data?.data));
      }
      // category
      const category = await Axios({
        ...endPoints.allCategories,
      });
      if (category.status === 200) {
        dispatch(setCategory(category?.data?.data));
      }
      // subcategory
      const subcategory = await Axios({
        ...endPoints.allSubCategories,
      });
      if (subcategory.status === 200) {
        dispatch(setSubCategories(subcategory?.data?.data));
      }
    };
    data();
  }, [dispatch]);
};

export default useData;

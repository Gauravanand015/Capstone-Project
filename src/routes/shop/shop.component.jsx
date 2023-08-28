import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getCollectionAndDocuments } from "../../utils/firebase.utlis";
import { useDispatch } from "react-redux";
import "./shop.styles.scss";
import { setCategories } from "../../store/categories/categories.action";
import Categories from "../categories-preview/categories-preview.component";
import Category from "../category/category.routes";

const Shop = () => {
  const dispatch = useDispatch();
  // console.log("first")
  useEffect(() => {
    // console.log("second")
    const getCategoriesMap = async () => {
      const categoryMap = await getCollectionAndDocuments("categories");
      dispatch(setCategories(categoryMap));
    };

    getCategoriesMap();
  }, [dispatch]);

  return (
    <Routes>
    {/* {console.log("Third")} */}
      <Route index element={<Categories />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;

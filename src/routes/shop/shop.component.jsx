// import { getCollectionAndDocuments } from "../../utils/firebase.utlis";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./shop.styles.scss";
import {
  fetchCategoriesAsync,
  // setCategories,
} from "../../store/categories/categories.action";
import Categories from "../categories-preview/categories-preview.component";
import Category from "../category/category.routes";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // const getCategoriesMap = async () => {
    // const categoryMap = await getCollectionAndDocuments("categories");
    dispatch(fetchCategoriesAsync());
    // };

    // getCategoriesMap();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<Categories />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;

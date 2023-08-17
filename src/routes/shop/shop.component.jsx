import { Routes, Route } from "react-router-dom";
import "./shop.styles.scss";
import Categories from "../categories-preview/categories-preview.component";
import Category from "../category/category.routes";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<Categories />}/>
      <Route path=":category" element = {<Category/>}/>
    </Routes>
  );
};

export default Shop;

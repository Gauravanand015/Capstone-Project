// import { CategoriesContext } from "../../context/product.context";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/products/product.component";
import "./category.styles.scss";
import { useSelector } from "react-redux";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/categories.selectors";
import Spinner from "../../components/spinner/spinner.components";

const Category = () => {
  // const { categoriesMap } = useContext(CategoriesContext);
  // console.log(categoriesMap);
  const category = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState(categoriesMap[category.category]);
  const isLoading = useSelector(selectCategoriesIsLoading);

  useEffect(() => {
    setProducts(categoriesMap[category.category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <h2 className="category-title">{category.category.toUpperCase()}</h2>
      <div className="category-container">
        {isLoading ? (
          <Spinner />
        ) : (
          products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </Fragment>
  );
};

export default Category;

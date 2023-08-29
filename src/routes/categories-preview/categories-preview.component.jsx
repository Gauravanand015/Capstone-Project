// import { useContext } from "react";
// import { CategoriesContext } from "../../context/product.context";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/catergory-preview/category-preview.component";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/categories.selectors.js";
import { Fragment } from "react";
import Spinner from "../../components/spinner/spinner.components";

const Categories = () => {
  // const { categoriesMap } = useContext

  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return (
            <CategoryPreview key={title} title={title} products={products} />
          );
        })
      )}
    </Fragment>
  );
};

export default Categories;

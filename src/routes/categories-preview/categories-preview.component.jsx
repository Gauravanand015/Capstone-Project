// import { useContext } from "react";
// import { CategoriesContext } from "../../context/product.context";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/catergory-preview/category-preview.component";
import {selectCategoriesMap} from '../../store/categories/categories.selectors.js'
import { Fragment } from "react";


const Categories = () => {
  // const { categoriesMap } = useContext

  const categoriesMap = useSelector(selectCategoriesMap)

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default Categories;

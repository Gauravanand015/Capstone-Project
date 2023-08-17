import { useContext } from "react";
import { CategoriesContext } from "../../context/product.context";
import CategoryPreview from "../../components/catergory-preview/category-preview.component";

const Categories = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <div>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </div>
  );
};

export default Categories;
